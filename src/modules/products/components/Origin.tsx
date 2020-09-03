import React from 'react';
import styled from 'styled-components';

import { originsProps } from '../../../interfaces';

const Origin = ({ name, value, onChangeHandler }: originsProps) => (
    <Container>
        <RadioInput type="checkbox" value={value} onChange={onChangeHandler} />
        <OriginName>{name}</OriginName>
    </Container>
);

const Container = styled.div`
    display: flex;
    padding-left: 10px;
`;

const RadioInput = styled.input``;

const OriginName = styled.div`
    ${({ theme }) => theme.fontStyles.p2};
`;

export default Origin;
