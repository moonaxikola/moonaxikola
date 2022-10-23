import { forwardRef } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import Link from '@mui/material/Link';

import type { NextLinkProps } from './NextLink.types';
import { NextLinkComposed } from './NextLinkComposed';
import { Anchor } from './NextLink.styles';

export const NextLink = forwardRef<HTMLAnchorElement, NextLinkProps>((props, ref) => {
  const {
    activeClassName = 'active',
    as,
    className: classNameProps,
    href,
    linkAs: linkAsProp,
    locale,
    noLinkStyle,
    prefetch,
    replace,
    role, // Link don't have roles.
    scroll,
    shallow,
    ...other
  } = props;

  const router = useRouter();
  const pathname = typeof href === 'string' ? href : href.pathname;
  const className = clsx(classNameProps, {
    [activeClassName]: router.pathname === pathname && activeClassName,
  });

  const isExternal =
    typeof href === 'string' && (href.indexOf('http') === 0 || href.indexOf('mailto:') === 0);

  if (isExternal) {
    if (noLinkStyle) {
      return <Anchor className={className} href={href} ref={ref} {...other} />;
    }

    return <Link className={className} href={href} ref={ref} {...other} />;
  }

  const linkAs = linkAsProp || as;
  const nextjsProps = { to: href, linkAs, replace, scroll, shallow, prefetch, locale };

  if (noLinkStyle) {
    return <NextLinkComposed className={className} ref={ref} {...nextjsProps} {...other} />;
  }

  return <Link component={NextLinkComposed} className={className} ref={ref} {...nextjsProps} {...other} />;
});
