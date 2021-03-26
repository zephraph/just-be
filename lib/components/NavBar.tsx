import Link from 'next/link'
import { Flex, Text } from '@chakra-ui/react'
import { AnimatedHeader } from './AnimatedHeader'
interface NavBarProps {
  backPath?: string
}

export const NavBar = ({ backPath }: NavBarProps) => {
  const fontColor = 'text-gray-600 hover:text-gray-800 ease-out duration-300'
  return (
    <nav className="flex justify-between items-center pt-3 pb-16 md:pt-4">
      <AnimatedHeader className={fontColor} />
      <Flex justifyContent="flex-end" width="230px" ml={3} flex={1}>
        <Link href="/about">
          <Text
            fontSize="lg"
            fontWeight="500"
            className={`hover:underline cursor-pointer ${fontColor}`}
            mr={3}
          >
            About
          </Text>
        </Link>
        <Link href="/">
          <Text
            fontSize="lg"
            fontWeight="500"
            className={`hover:underline cursor-pointer ${fontColor}`}
            mr={3}
          >
            Blog
          </Text>
        </Link>
        <Link href="/tips">
          <Text
            fontSize="lg"
            fontWeight="500"
            className={`hover:underline cursor-pointer ${fontColor}`}
          >
            Tips
          </Text>
        </Link>
      </Flex>
    </nav>
  )
}
