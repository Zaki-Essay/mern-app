import colors from '@/constants/colors'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body style={{ backgroundColor: colors.main }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
