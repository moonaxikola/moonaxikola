import { render } from '@testing-library/react';

import { SignUpForm } from './SignUpForm';

describe('SignUpForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SignUpForm onSubmit={jest.fn()} />);
    expect(baseElement).toBeTruthy();
  });
});
