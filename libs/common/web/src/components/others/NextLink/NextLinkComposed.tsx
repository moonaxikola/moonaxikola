import { forwardRef } from 'react';
import Link from 'next/link';

import type { NextLinkComposedProps } from './NextLink.types';
import { Anchor } from './NextLink.styles';

export const NextLinkComposed = forwardRef<HTMLAnchorElement, NextLinkComposedProps>(
  function NextLinkComposed(props, ref) {
    const { to, linkAs, replace, scroll, shallow, prefetch, locale, ...other } = props;

    return (
      <Link
        href={to}
        prefetch={prefetch}
        as={linkAs}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
        passHref
        locale={locale}
      >
        <Anchor ref={ref} {...other} />
      </Link>
    );
  },
);
