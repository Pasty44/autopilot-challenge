import React from 'react';
import { render, fireEvent, waitForDomChange } from '@testing-library/react';
import SearchDropdown from './index';

const dummyOptions = [
    { name: 'Australia', icon: 'icon1' },
    { name: 'Austria', icon: 'icon2' }
];

beforeAll(() => {
    window.fetch = () => Promise.resolve({json: () => Promise.resolve(dummyOptions)});
});

test('list is rendered after search', async () => {
    const SearchDropdownElement = render(<SearchDropdown />);
    const input = SearchDropdownElement.getByLabelText('search');
    fireEvent.change(input, { target: { value: 'aus' } });
    expect(input.value).toBe('aus');
    await waitForDomChange(SearchDropdownElement);
    expect(SearchDropdownElement.container.getElementsByTagName('li')).toHaveLength(2);
});

test('input is populated with selection', async () => {
    const SearchDropdownElement = render(<SearchDropdown />);
    const input = SearchDropdownElement.getByLabelText('search');
    fireEvent.change(input, { target: { value: 'aus' } });
    expect(input.value).toBe('aus');
    await waitForDomChange(SearchDropdownElement);
    fireEvent.click(SearchDropdownElement.container.getElementsByTagName('li')[0], { button: 0 });
    expect(input.value).toBe('Australia');
    expect(SearchDropdownElement.container.getElementsByTagName('img')).toHaveLength(1);
});

/*

    Could add more tests for dropdown functionality, or loading spinner, or focus/blurring,
    or API call on first search vs array filtering on subsequent ones, etc.

*/
