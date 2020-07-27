import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    border-radius: 3px;
    -webkit-box-shadow: 0px 6px 8px 0px rgba(200,200,200,0.75);
    -moz-box-shadow: 0px 6px 8px 0px rgba(200,200,200,0.75);
    box-shadow: 0px 6px 8px 0px rgba(200,200,200,0.75);
`;

const Option = styled.li`
    align-items: center;
    display: flex;
    padding: 10px;

    img {
        margin-right: 10px;
        height: 13px;
        width: 20px;
    }

    &:hover {
        background-color: #EEEEEE;
        color: purple;
        cursor: pointer;
    }
`;

function Options({ onSelect, options = [] }) {
    if (options.length === 0) {
        return (
            <p>No results found</p>
        );
    }

    return (
        <Container>
            <ul>
                {
                options.length === 0 ?
                <p>No results found</p> :
                options.map(({ name, icon }) => (
                    <Option key={name} onClick={() => onSelect({ name, icon })}>
                        <img src={icon} alt='icon' />
                        {name}
                    </Option>
                ))
                }
            </ul>
        </Container>
    );
}

export default Options;
