import styled from 'styled-components';

const Button = styled.button`
    height: 40px;
    padding: 0 16px;
    border: none;
    outline: none;
    margin:8px;
    border-radius: 12px;
    ${({ theme }) => theme.fontStyles.p2};
]`;

export default Button;
