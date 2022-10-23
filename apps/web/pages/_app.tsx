import 'reflect-metadata';
import Head from 'next/head';
import { appGetInitialProps, MoonaNextAppProps, MoonaNextProvider } from '@moona/common/web';

export default function MyApp({ Component, pageProps, settings }: MoonaNextAppProps) {
  const getLayout = Component.getLayout ?? (page => page);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <MoonaNextProvider
        settings={settings}
        requestConfig={{
          config: {
            baseURL: 'http://localhost:3000',
            withCredentials: true,
          },
        }}
      >
        {getLayout(<Component {...pageProps} />)}
      </MoonaNextProvider>
    </>
  );
}

MyApp.getInitialProps = appGetInitialProps;
