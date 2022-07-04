import Document, { Head , Main, Html, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preload" href="/public/fonts/IBMPlexSans-Bold.ttf" as="font" crossOrigin="anonymous"/>
          <link rel="preload" href="/public/fonts/IBMPlexSans-Regular.ttf" as="font" crossOrigin="anonymous"/>
          <link rel="preload" href="/public/fonts/IBMPlexSans-SemiBold.ttf" as="font" crossOrigin="anonymous"/>
        </Head>
        <body>
          <Main></Main>
          <NextScript />
        </body>
      </Html>
    );
  }
}
