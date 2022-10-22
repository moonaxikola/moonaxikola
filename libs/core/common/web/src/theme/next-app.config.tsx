import Document, { DocumentContext } from 'next/document';
import App, { AppContext } from 'next/app';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import { getParsedString } from '@moona/core/common/utils';
import cookie from 'cookie';

import { cookiesKey } from '../config';
import { defaultSettings } from '../contexts';

function createEmotionCache() {
  return createCache({ key: 'css' });
}

export async function documentGetInitialProps(context: DocumentContext) {
  const originalRenderPage = context.renderPage;

  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  context.renderPage = () =>
    originalRenderPage({
      enhanceApp: App =>
        function EnhanceApp(props) {
          return (
            <CacheProvider value={cache}>
              <App {...props} />
            </CacheProvider>
          );
        },
    });

  const initialProps = await Document.getInitialProps(context);

  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map(style => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return { ...initialProps, emotionStyleTags };
}

function getSettings(cookies: NextApiRequestCookies) {
  const themeMode = getParsedString(cookies[cookiesKey.theme] as string) || defaultSettings.theme;

  return { themeMode };
}

export async function appGetInitialProps(context: AppContext) {
  const appProps = await App.getInitialProps(context);

  const cookies = cookie.parse(context.ctx.req ? context.ctx.req.headers.cookie || '' : document.cookie);

  const settings = getSettings(cookies);

  return { ...appProps, settings };
}
