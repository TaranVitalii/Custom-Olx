import styled from 'styled-components';

const CounterButton = styled.button`
    padding: 2px;
    width: 25px;
    box-shadow: 1px 1px 1px ${({ theme }) => theme.backgroundsColor.blackOpacity};
    ${({ theme }) => theme.fontStyles.p2};
    border: 1px solid ${({ theme }) => theme.backgroundsColor.blackOpacity} 6px;
`;

export default CounterButton;
