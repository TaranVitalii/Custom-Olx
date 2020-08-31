import styled from 'styled-components';

const Input = styled.input`
    padding: 2px;
    width: 20px;
    text-align: center;
    box-shadow: 1px 1px 1px ${({ theme }) => theme.backgroundsColor.blackOpacity};
    ${({ theme }) => theme.fontStyles.p2};
    border: 1px solid ${({ theme }) => theme.backgroundsColor.blackOpacity} 6px;
`;

export default Input;
