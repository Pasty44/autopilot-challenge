import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Input from './Input';
import Options from './Options';
import Spinner from './Spinner';
import ChevronPNG from './chevron-down.png';

const STATUSES = {
    INITIAL: 0,
    FETCHING: 1,
    SUCCESS: 2,
    ERROR: 3
};

const Container = styled.div`
    position: relative;
    width: 210px;

    ${Spinner} {
        position: absolute;
        top: 7px;
        left: 5px;
    }
`;

const Icon = styled.img`
    height: 13px;
    width: 20px;
    position: absolute;
    left: 5px;
    top: 11px;
`;

const Chevron = styled.img`
    width: 10px;
    padding: 10px;
    position: absolute;
    top: 3px;
    right: 3px;

    &:hover {
        cursor: pointer;
    }
`;

function SearchDropdown() {
    const [search, setSearch] = useState('');
    const [selection, setSelection] = useState({});
    const [options, setOptions] = useState(null);
    const [filteredOptions, setFilteredOptions] = useState(null);
    const [showOptions, setShowOptions] = useState(false);
    const [searchStatus, setSearchStatus] = useState(STATUSES.INITIAL);
    // Timeout used as a basic debounce, so searches don't happen every key press
    const searchTimeoutRef = useRef();

    const selectOption = useCallback((option) => {
        setSelection(option);
        setSearch(option.name);
        setShowOptions(false);
    }, [setShowOptions, setSelection, setSearch]);

    useEffect(() => {
        // If the search change is from them selecting an option, don't filter
        if (search === selection.name) return;

        clearTimeout(searchTimeoutRef.current);
        setFilteredOptions([]);
        setSelection({});

        if (search === '') {
            setSearchStatus(STATUSES.INITIAL);
        }
        // First time user searches, do an API call to fetch and cache options
        else if (options === null) {
            setSearchStatus(STATUSES.LOADING);
            searchTimeoutRef.current = setTimeout(() => {
                fetch(`https://restcountries.eu/rest/v2`)
                .then(res => res.json())
                .then(data => {
                    const transformedOptions = data.map(({ name, flag }) => ({ name, icon: flag}));

                    setOptions(transformedOptions);
                    setFilteredOptions(options.filter(({ name }) => (
                        name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
                    )));
                    setSearchStatus(STATUSES.SUCCESS);
                    setShowOptions(true);
                })
                .catch(() => setSearchStatus(STATUSES.ERROR));
            }, 500);
        }
        // If not first time, don't bother hitting API - just filter cached options
        else {
            setSearchStatus(STATUSES.LOADING);
            searchTimeoutRef.current = setTimeout(() => {
                setFilteredOptions(options.filter(({ name }) => (
                    name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
                )));
                setSearchStatus(STATUSES.SUCCESS);
                setShowOptions(true);
            }, 500);
        }
    }, [search, options, selection.name]);

    return (
        <Container>
            {searchStatus === STATUSES.LOADING && <Spinner />}
            {selection.icon && <Icon src={selection.icon} alt='icon' />}
            <Input
                onChange={setSearch}
                value={search}
                onFocus={() => setShowOptions(true)}
                aria-label='search'
            />
            <Chevron src={ChevronPNG} alt='chevron' onClick={() => setShowOptions(!showOptions)} />
            {(searchStatus === STATUSES.SUCCESS && showOptions === true) && (
                <Options options={filteredOptions} onSelect={selectOption} />
            )}
        </Container>
    );
};

export default SearchDropdown;
