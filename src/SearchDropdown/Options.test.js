import React from 'react';
import { render } from '@testing-library/react';
import Options from './Options';

const dummyOptions = [
    { name: 'test1', icon: 'icon1' },
    { name: 'test2', icon: 'icon2' }
];

test('renders no results found message', () => {
  const OptionsElement = render(<Options options={[]} />);
  expect(OptionsElement.getByText(/No results found/i)).toBeInTheDocument();
});

test('renders array of options', () => {
    const OptionsElement = render(<Options options={dummyOptions} />);
    expect(OptionsElement.container.getElementsByTagName('ul')).toHaveLength(1);
    expect(OptionsElement.container.getElementsByTagName('li')).toHaveLength(2);
    expect(OptionsElement.container.getElementsByTagName('img')).toHaveLength(2);
    expect(OptionsElement.getByText(/test1/i)).toBeInTheDocument();
    expect(OptionsElement.getByText(/test2/i)).toBeInTheDocument();
});
