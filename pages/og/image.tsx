import { Text, Flex, Divider } from '@chakra-ui/react'
import { useRouter } from 'next/router'

const image = () => {
  const router = useRouter()
  const { title } = router.query
  return (
    <>
      <Flex
        flexDirection="column"
        justifyContent="center"
        textAlign="center"
        alignItems="center"
        height="100%"
        width="max-content"
        maxWidth="1000px"
        margin="0 auto"
        pb="50px"
      >
        <Text className="bastia" fontSize="6xl" color="gray.500">
          just be
        </Text>
        {title && (
          <>
            <Divider my={4} />
            <Text className="bastia" fontSize="7xl">
              {title}
            </Text>
          </>
        )}
      </Flex>
    </>
  )
}

image.Layout = null

export default image
