import { Title } from 'lib/components/title'
import { getTableContents } from 'lib/notion/table'
import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import {
  Flex,
  Tag,
  Text,
  VStack,
  StackDivider,
  Kbd,
  HStack,
  Link,
  Box,
} from '@chakra-ui/react'
import { Parser } from 'simple-text-parser'
import NextLink from 'next/link'
import { compareDesc } from 'date-fns'
// @ts-ignore
import prettier from 'prettier/esm/standalone'
// @ts-ignore
import ts from 'prettier/esm/parser-typescript'

const ShortcutRegex = /((command|cmd|alt|ctrl|shift|option|opt)\+)+(del|space|enter|esc|`|=|-|f1[0-2]|f[0-9]|[A-Z]|[a-z]|[0-9])/g
const LinkTagRegex = /<a href="([^"]*)">([^<]+)<\/a>/g
const PreTagRegex = /<pre>((?:(?!<\/pre>).)*)<\/pre>/g

type DescriptionNode =
  | { type: 'shortcut'; text: string; keys: string[] }
  | { type: 'text'; text: string }
  | { type: 'group'; text: string; children: DescriptionNode[] }
  | { type: 'link'; text: string; href: string; external: boolean }
  | { type: 'newline'; text: '\n' }
  | { type: 'code'; text: string }

interface Tip {
  Name: string
  Description: string | DescriptionNode[]
  Tags: Array<{
    value: string
    color: string
  }>
  Date: string
}

export const getStaticProps: GetStaticProps = async () => {
  const tips = ((await getTableContents(process.env.TIPS_ID, {
    verbose: true,
  })) as unknown) as Tip[]
  const parser = new Parser()
  parser.addRule('\n', () => {
    return {
      type: 'newline',
      text: '\n',
    }
  })
  parser.addRule(PreTagRegex, (code, match) => {
    let text

    try {
      text = prettier
        .format(match, { parser: 'typescript', plugins: [ts], semi: false })
        .trim()
    } catch {
      text = match
    }

    return {
      type: 'code',
      text,
    }
  })
  parser.addRule(/\((.*)\)/, (group, match) => {
    return {
      type: 'group',
      text: group,
      children: parser.toTree(match),
    }
  })
  parser.addRule(ShortcutRegex, (shortcut) => {
    const shortcutKeys = shortcut
      .replace(/cmd|command/, '⌘')
      .replace(/option|opt/, '⌥')
      .split('+')
      .map((key) => (key.length === 1 ? key.toLocaleUpperCase() : key))

    return {
      type: 'shortcut',
      text: shortcutKeys.join('+'),
      keys: shortcutKeys,
    }
  })
  parser.addRule(LinkTagRegex, (link, href, text) => {
    return {
      type: 'link',
      text,
      href,
      external: href.startsWith('/') || href.includes('just-be.dev'),
    }
  })
  return {
    props: {
      tips: tips
        .map((tip) => {
          const tree = parser.toTree(tip.Description.toLocaleString())
          tip.Description = (tree.length === 1 && tree[0].type === 'text'
            ? tip.Description
            : tree) as any
          return tip
        })
        .sort((t1, t2) => compareDesc(new Date(t1.Date), new Date(t2.Date))),
    },
    revalidate: 60, // Revalidate at most every minute
  }
}

const renderDescription = (desc: Tip['Description']) => {
  if (typeof desc === 'string') {
    return <Text>{desc}</Text>
  } else {
    return (
      <>
        {desc.map((d) => {
          switch (d.type) {
            case 'text':
              return (
                <Text
                  as="span"
                  ml={d.text.startsWith(' ') ? '1px' : 0}
                  mr={d.text.endsWith(' ') ? '1px' : 0}
                >
                  {d.text}
                </Text>
              )
            case 'shortcut':
              return d.keys.map((key, index) => (
                <>
                  <Kbd fontSize="md">{key}</Kbd>
                  {index < d.keys.length - 1 && (
                    <Text as="span" mx="2px">
                      +
                    </Text>
                  )}
                </>
              ))
            case 'group':
              return (
                <HStack display="inline" spacing={0}>
                  <Text as="span">(</Text>
                  {renderDescription(d.children)}
                  <Text as="span">)</Text>
                </HStack>
              )
            case 'code': {
              const multiLine = d.text.split('\n').length > 1
              return (
                <Text
                  as="code"
                  className="notion-inline-code"
                  whiteSpace="pre"
                  display={multiLine ? 'block' : 'inline'}
                  mb={multiLine ? -7 : 0}
                >
                  {d.text}
                </Text>
              )
            }
            case 'link':
              return (
                <NextLink href={d.href} passHref>
                  <Link isExternal={!d.external} fontWeight="600">
                    {d.text}
                  </Link>
                </NextLink>
              )
            case 'newline':
              return <br />
            default:
              throw new Error('Unknown description node type')
          }
        })}
      </>
    )
  }
}

interface TipsPageProps {
  tips: Tip[]
}

const TipsPage = ({ tips }: TipsPageProps) => {
  return (
    <>
      <NextSeo
        title="Just Be | Tips"
        description="Tips and tricks I've picked up along the way"
      />
      <div>
        <Title text="Tips" />
        <VStack
          divider={<StackDivider borderColor="gray.200" />}
          spacing={4}
          align="stretch"
          mt={4}
        >
          {tips.map((tip) => {
            return (
              <VStack align="flex-start">
                <HStack display="inline" spacing={null}>
                  {renderDescription(tip.Description)}
                </HStack>
                <Flex alignItems="center">
                  {tip.Tags.map((tag) => {
                    return (
                      <Tag colorScheme={tag.color} mr={1}>
                        {tag.value}
                      </Tag>
                    )
                  })}
                </Flex>
              </VStack>
            )
          })}
        </VStack>
      </div>
    </>
  )
}

export default TipsPage
