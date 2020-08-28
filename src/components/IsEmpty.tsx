import styled from 'styled-components';

const IsEmpty = styled.div`
    padding: 14px 16px;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.backgroundsColor.gray};
    color: ${({ theme }) => theme.textColors.white};
    ${({ theme }) => theme.fontStyles.h1};
`;

export default IsEmpty;
