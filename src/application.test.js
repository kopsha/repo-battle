import { render, screen } from '@testing-library/react';
import Main from './application';

test('renders learn react link', () => {
  render(<Main />);
  const linkElement = screen.getByText(/forgive/i);
  expect(linkElement).toBeInTheDocument();
});
