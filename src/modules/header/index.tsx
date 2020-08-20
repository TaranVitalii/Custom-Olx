import React from 'react';
import styled from 'styled-components';

import locale from '../../locale';

const Header = () => (
    <Container>
        <Content>
            <LeftContent>
                <Title>{locale.marketProducts}</Title>
            </LeftContent>
            <RightContent>
                <Title>{locale.yourBag}</Title>
            </RightContent>
        </Content>
    </Container>
);

const Title = styled.div`
    ${({ theme }) => theme.fontStyles.h1};
`;

const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
`;

const Content = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: ${({ theme }) => theme.backgroundsColor.gray};
`;

const LeftContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 20px;
`;

const RightContent = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 10px 20px;
`;

export default Header;
