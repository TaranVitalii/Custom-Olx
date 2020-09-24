import React from 'react';
import styled from 'styled-components';

import { originsProps } from 'interfaces';

const Origin = ({ name, value, onChangeHandler, checked }: originsProps) => (
    <Container>
        <input type="checkbox" checked={checked} value={value} onChange={onChangeHandler} />
        <OriginName>{name}</OriginName>
    </Container>
);

const Container = styled.div`
    display: flex;
    padding-left: 10px;
`;

const OriginName = styled.div`
    ${({ theme }) => theme.fontStyles.p2};
`;

export default Origin;
