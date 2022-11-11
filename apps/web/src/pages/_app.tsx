import Head from 'next/head';
import { appGetInitialProps, MoonaNextAppProps, MoonaNextProvider } from '@moona/common/web';

import { requestConfig } from '../config';

export default function MyApp({ Component, pageProps, settings }: MoonaNextAppProps) {
  const getLayout = Component.getLayout ?? (page => page);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <MoonaNextProvider settings={settings} requestConfig={requestConfig}>
        {getLayout(<Component {...pageProps} />)}
      </MoonaNextProvider>
    </>
  );
}

MyApp.getInitialProps = appGetInitialProps;
