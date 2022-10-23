import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import cookies from 'js-cookie';

import { SettingsValueProps } from './SettingsContext.types';
import { cookiesExpires, cookiesKey } from '../../config';

/**
 * @internal
 *
 * Use cookies to store settings values and return the values and a function to update them.
 * The function will update the values in the cookies and the state.
 *
 * @param {SettingsValueProps}  defaultSettings - moonaxikola web app default settings
 * @returns
 */
export function useSettingCookies(
  defaultSettings: SettingsValueProps,
): [SettingsValueProps, Dispatch<SetStateAction<SettingsValueProps>>] {
  const [settings, setSettings] = useState<SettingsValueProps>(defaultSettings);

  const onChangeSetting = () => {
    cookies.set(cookiesKey.theme, settings.theme, { expires: cookiesExpires });
  };

  useEffect(() => {
    onChangeSetting();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings]);

  return [settings, setSettings];
}
