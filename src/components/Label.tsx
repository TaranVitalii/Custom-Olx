import styled from 'styled-components';

const Label = styled.div`
    padding-top: 8px;
    ${({ theme }) => theme.fontStyles.h3};
`;

export default Label;
