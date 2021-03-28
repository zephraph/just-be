import 'lib/styles/base.css'
import 'react-notion/src/styles.css'
import 'lib/styles/notion-override.css'
import 'prismjs/themes/prism.css'
import 'windi.css'
import { Layout } from '@artsy/next-layout'
import { ChakraProvider } from '@chakra-ui/react'

import App from 'next/app'
import React from 'react'

export default class MyApp extends App {
  render() {
    return (
      <ChakraProvider>
        <Layout {...this.props} />
      </ChakraProvider>
    )
  }
}
