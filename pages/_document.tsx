import {
  getCspInitialProps,
  provideComponents,
} from '@next-safe/middleware/dist/document';
import Document, { Html, Main } from 'next/document';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await getCspInitialProps({
      ctx,
      //trustifyStyles: true,
    });

    return initialProps;
  }

  render() {
    let { Head, NextScript } = provideComponents(this.props);
    return (
      <Html>
        <Head>
          <link
            rel='stylesheet'
            href='//fonts.googleapis.com/css?family=Roboto:100,300,400,500,700'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
