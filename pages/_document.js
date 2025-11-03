import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Y-Ultimate</title>
        <meta name="description" content="Empowering underprivileged children through Ultimate Frisbee" />
        <link rel="icon" href="/yu-icon.png" />
        {/* Razorpay Script */}
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
