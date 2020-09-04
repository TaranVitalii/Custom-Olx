import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import locale from 'locale';

import Bag from './assets/bag.png';
import { getTotalPrice } from '../products/ProductsReducer';

const Header = () => {
    const totalPrice = useSelector(getTotalPrice, shallowEqual);

    return (
        <Container>
            <Content>
                <LeftContent>
                    <Title>{locale.marketProducts}</Title>
                </LeftContent>
                <RightContent>
                    <StyledLink to="/bag">
                        <Title>{locale.yourBag}</Title>
                        {totalPrice > 0 && <TotalPrice>${totalPrice}</TotalPrice>}
                        <ImageMyBag src={Bag} />
                    </StyledLink>
                </RightContent>
            </Content>
        </Container>
    );
};

const ImageMyBag = styled.img`
    width: 40px;
    height: 40px;
`;

const Title = styled.div`
    padding-right: 32px;
    ${({ theme }) => theme.fontStyles.h1};
`;

const StyledLink = styled(Link)`
    display: flex;
    text-decoration: none;
    color: inherit;
    &:focus,
    &:hover,
    &:visited,
    &:link,
    &:active {
        text-decoration: none;
    }
`;

const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    max-height: 60px;
    -webkit-box-shadow: 1px -1px 10px 1px rgba(94, 45, 15, 1);
    -moz-box-shadow: 1px -1px 10px 1px rgba(94, 45, 15, 1);
    box-shadow: 1px -1px 10px 1px rgba(94, 45, 15, 1);
`;

const TotalPrice = styled.div`
    position: absolute;
    top: 30px;
    right: 45px;
    text-align: center;
    border-radius: 10px;
    color: red;
    z-index: 10000;
    padding: 4px 4px;
    opacity: 0.9;
    background-color: ${({ theme }) => theme.appBackground};
    ${({ theme }) => theme.fontStyles.p2};
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
