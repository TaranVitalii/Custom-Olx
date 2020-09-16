import * as R from 'ramda';
import React from 'react';
import Select from 'react-select';
import styled from 'styled-components';

import Portal from 'components/Portal';
import Input from 'components/Input';
import Button from 'components/Button';
import Label from 'components/Label';
import locale from 'locale';
import { createProductStatus, inputFields } from 'models';

import useCreateProduct from '../hooks/useCreateProduct';
import CloseImg from '../assets/close.png';

type CreateProductModalProps = {
    closeModal: (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
    createdProductMessage: string;
    failedProductMessage: string;
};

const CreateProductModal = ({ closeModal, createdProductMessage, failedProductMessage }: CreateProductModalProps) => {
    const {
        origins,
        createdStatus,
        onChangeProductOriginHandler,
        onChangeProductPriceHandler,
        onChangeProductNameHandler,
        onSubmit,
        productOriginErrorMessage,
        productPriceErrorMessage,
        productNameErrorMessage,
        handleSubmit,
        isLoading,
        register,
    } = useCreateProduct();

    return (
        <Portal>
            <Background>
                <ModalContainer onSubmit={handleSubmit(onSubmit)}>
                    {createdStatus === createProductStatus.created && (
                        <CreatedProductMessage>{createdProductMessage}</CreatedProductMessage>
                    )}
                    {createdStatus === createProductStatus.failed && (
                        <FailedProductMessage>{failedProductMessage}</FailedProductMessage>
                    )}
                    <Label>{locale.productName}</Label>
                    <Input
                        name={inputFields.productName}
                        ref={(e) => register(e)}
                        onChange={onChangeProductNameHandler}
                        disabled={isLoading}
                    />
                    <ErrorMessage>{productNameErrorMessage}</ErrorMessage>
                    <Label>{locale.price}</Label>
                    <Input
                        name={inputFields.productPrice}
                        ref={(e) => register(e)}
                        onChange={onChangeProductPriceHandler}
                        type="number"
                        disabled={isLoading}
                    />
                    <ErrorMessage>{productPriceErrorMessage}</ErrorMessage>
                    <Label>{locale.origin}</Label>
                    {!R.isNil(origins) && (
                        <SelectStyled
                            isDisabled={isLoading}
                            ref={() => register({ name: inputFields.productOrigin })}
                            getOptionLabel={(option: any) => option.displayName}
                            name={inputFields.productOrigin}
                            options={origins}
                            onChange={onChangeProductOriginHandler}
                        />
                    )}
                    <ErrorMessage>{productOriginErrorMessage}</ErrorMessage>
                    <Button type="submit" disabled={isLoading}>
                        {locale.createProduct}
                    </Button>

                    <Close src={CloseImg} onClick={closeModal} />
                </ModalContainer>
            </Background>
        </Portal>
    );
};

CreateProductModal.defaultProps = {
    failedProductMessage: locale.creationFailed,
    createdProductMessage: locale.yourProductCreated,
};

const CreatedProductMessage = styled(Label)`
    color: ${({ theme }) => theme.textColors.green};
`;

const FailedProductMessage = styled(Label)`
    color: ${({ theme }) => theme.textColors.red};
`;

const Close = styled.img`
    position: absolute;
    right: 26%;
    top: 32%;
    width: 20px;
    height: 20px;
`;

const SelectStyled = styled(Select)`
    width: 65%;
    border-radius: 8px;
    margin-top: 8px;
`;

const ErrorMessage = styled.div`
    ${({ theme }) => theme.fontStyles.p2};
    color: ${({ theme }) => theme.textColors.red};
`;

const ModalContainer = styled.form`
    width: 50%;
    display: flex;
    align-items: center;
    flex-direction: column;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.backgroundsColor.gray};
`;

const Background = styled.div`
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    position: fixed;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.backgroundsColor.darkGray};
`;

export default CreateProductModal;
