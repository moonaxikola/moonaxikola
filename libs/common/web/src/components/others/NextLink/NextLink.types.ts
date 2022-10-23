import type { AnchorHTMLAttributes } from 'react';
import type { LinkProps as NextLinkProps } from 'next/link';
import type { LinkProps as MuiLinkProps } from '@mui/material/Link';

export interface NextLinkComposedProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>,
    Omit<NextLinkProps, 'href' | 'as' | 'onClick' | 'onMouseEnter' | 'onTouchStart'> {
  to: NextLinkProps['href'];
  linkAs?: NextLinkProps['as'];
}

type LinkProps = {
  activeClassName?: string;
  as?: NextLinkProps['as'];
  href: NextLinkProps['href'];
  linkAs?: NextLinkProps['as'];
  noLinkStyle?: boolean;
} & Omit<NextLinkComposedProps, 'to' | 'linkAs' | 'href'> &
  Omit<MuiLinkProps, 'href'>;

export type { LinkProps as NextLinkProps };
