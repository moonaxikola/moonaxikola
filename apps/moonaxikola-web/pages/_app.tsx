import 'reflect-metadata';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { RequestProvider } from '@moona/core/common/data-access';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <RequestProvider
      config={{
        baseURL: 'http://localhost:3333',
        headers: { 'Content-Type': 'application/json' },
      }}
    >
      <QueryClientProvider client={new QueryClient()}>
        <Head>
          <title>Welcome to Moonaxikola</title>
        </Head>
        <main className="app">
          <Component {...pageProps} />
        </main>
      </QueryClientProvider>
    </RequestProvider>
  );
}

export default CustomApp;
