import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import RootLayout from '@/app/layout';

describe('Root layout', () => {
  it('renders successfully', () => {
    render(<RootLayout />);
  });
});
