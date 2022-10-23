import Document, { DocumentContext } from 'next/document';
import App, { AppContext } from 'next/app';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';
import createCache, { EmotionCache } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import { getParsedString, isString, isOneOf } from '@moona/common/utils';
import cookie from 'cookie';

import { cookiesKey } from '../config';
import { defaultSettings, SettingsValueProps } from '../contexts';
import { ThemeMode } from './Theme.types';

/**
 * @internal
 *
 * Create a cache that's used for server-side rendering.
 */
function createEmotionCache(): EmotionCache {
  return createCache({ key: 'css' });
}

/**
 * @internal
 *
 * Get user settings from cookies.
 *
 * @param cookies - Cookies from the request.
 */
function getSettings(cookies: NextApiRequestCookies): SettingsValueProps {
  const settings = defaultSettings;

  if (isString(cookies[cookiesKey.themeMode])) {
    const themeMode = getParsedString(cookies[cookiesKey.themeMode] || '') as ThemeMode;
    settings.themeMode = isOneOf(themeMode, 'light', 'dark') ? themeMode : defaultSettings.themeMode;
  }

  return settings;
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

export async function appGetInitialProps(context: AppContext) {
  const appProps = await App.getInitialProps(context);

  const cookies = cookie.parse(context.ctx.req ? context.ctx.req.headers.cookie || '' : document.cookie);

  const settings = getSettings(cookies);

  return { ...appProps, settings };
}
