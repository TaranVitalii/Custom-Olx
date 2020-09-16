import React, { useState, useCallback } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import locale from 'locale';
import { getTotalPrice } from 'modules/products/ProductsReducer';

import OpacityBag from '../assets/shopping-bag-opacity.png';
import BlackBag from '../assets/shopping-bag-black.png';
import YourOrderOpacity from '../assets/product.png';
import YourOrderBlack from '../assets/order.png';
import CreateNewProductImg from '../assets/createNewProduct.png';
import CreateProductModal from '../components/CreateProductModal';

const Header = () => {
    const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);
    const totalPrice = useSelector(getTotalPrice, shallowEqual);

    /**
     * Create new product handler
     */
    const createNewProductHandler = useCallback((event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        event.preventDefault();
        setIsVisibleModal(true);
    }, []);

    /**
     * Close modal handler
     */
    const closeModalHandler = useCallback((event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        event.preventDefault();
        setIsVisibleModal(false);
    }, []);

    return (
        <Container>
            <Content>
                <LeftContent>
                    <StyledLink to="/">
                        <Title>{locale.marketProducts}</Title>
                    </StyledLink>
                </LeftContent>
                <RightContent>
                    <CreateProduct src={CreateNewProductImg} onClick={createNewProductHandler} />
                    <StyledLink to="/your_products">
                        <Title>{locale.yourProducts}</Title>
                        <CustomImage src={YourOrderOpacity} />
                        <CustomHoverImage src={YourOrderBlack} />
                    </StyledLink>
                    {isVisibleModal && <CreateProductModal closeModal={closeModalHandler} />}
                    <StyledLink to="/bag">
                        <Title>{locale.yourBag}</Title>
                        {totalPrice > 0 && <TotalPrice>${totalPrice}</TotalPrice>}
                        <CustomImage src={OpacityBag} />
                        <CustomHoverImage src={BlackBag} />
                    </StyledLink>
                </RightContent>
            </Content>
        </Container>
    );
};

const CustomImage = styled.img`
    width: 40px;
    height: 40px;
`;

const CustomHoverImage = styled.img`
    width: 40px;
    height: 40px;
    display: none;
`;

const CreateProduct = styled.img`
    width: 34px;
    height: 34px;
    margin-right: 32px;
    &:hover {
        cursor: pointer;
    }
`;

const Title = styled.div`
    padding-right: 32px;
    ${({ theme }) => theme.fontStyles.h1};
`;

const StyledLink = styled(Link)`
    margin-right: 20px;
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
    &:hover ${CustomImage} {
        display: none;
    }

    &:hover ${CustomHoverImage} {
        display: inline;
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
    padding: 10px;
`;

export default Header;
