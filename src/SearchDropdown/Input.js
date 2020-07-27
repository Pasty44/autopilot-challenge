import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
    padding: 8px 40px 8px 30px;
    border: 1px solid #EEEEEE;
    border-radius: 5px;
    font-size: 14px;
    margin: 1px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box; 
    width: 100%;

    &:focus {
        border: 2px solid blue;
        margin: 0;
        outline: none;
    }
`;

function Input({ onChange, ...props }) {
    return (
        <StyledInput
            type='text'
            placeholder='Search'
            onChange={e => onChange(e.target.value)}
            {...props}
        />
    );
}

export default Input;
