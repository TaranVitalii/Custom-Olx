import styled from 'styled-components';

const PriceInput = styled.input`
    width: 100px;
    border-radius: 12px;
    margin-right: 10px;
    ${({ theme }) => theme.fontStyles.p3};
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;

export default PriceInput;
