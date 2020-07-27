import styled from 'styled-components';

const Spinner = styled.div`
    border: 2px solid #EEEEEE;
    border-top: 2px solid blue;
    border-radius: 50%;
    width: 8px;
    height: 8px;
    animation: spin 1s linear infinite;
    padding: 5px;
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

export default Spinner;
