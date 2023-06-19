import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import * as ReactRedux from 'react-redux';
import App from './App';
import { StatusType } from './utils/interfaces/StatusTypes';

beforeAll(() => cleanup());
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('App', () => {
  beforeEach(() => {
    (ReactRedux.useSelector as jest.Mock).mockImplementation(
      () => StatusType.SUCCESS,
    );
  });

  it('renders Brainhub logo', () => {
    render(<App />);
    const headerText = screen.getByText(/Brainhub/i);
    expect(headerText).toBeInTheDocument();
  });
});
