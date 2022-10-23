import { render } from '@testing-library/react';

import NextLink from './NextLink';

describe('NextLink', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NextLink />);
    expect(baseElement).toBeTruthy();
  });
});
