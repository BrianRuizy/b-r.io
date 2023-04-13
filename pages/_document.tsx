import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <script // eslint-disable-next-line
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
          <meta
            name="google-site-verification"
            content="RJQJipgMnyEfg3XESXsr7jXnVDOaAr1xtlCGRaoTQSo"
          />
          <link
            rel="webmention"
            href="https://webmention.io/b-r.io/webmention"
          />
          <link
            rel="pingback"
            href="https://webmention.io/b-r.io/xmlrpc"
          />
          <link href="https://github.com/brianruizy" rel="me" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
