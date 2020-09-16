import styled from 'styled-components';

const Input = styled.input`
    width: 60%;
    height: 40px;
    border: none;
    outline: none;
    margin-top: 8px;
    padding: 0 16px;
    font-size: 14px;
    line-height: 20px;
    color: $main-black;
    border-radius: 12px;
    letter-spacing: 0.18px;
    background-color: $lightgrey;
    border: solid 1px #e4eff2;

    &::placeholder {
        ${({ theme }) => theme.fontStyles.p2};
        color: ${({ theme }) => theme.backgroundsColor.gray};
        letter-spacing: 0.18px;
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;

export default Input;
