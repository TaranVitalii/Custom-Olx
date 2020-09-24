import * as R from 'ramda';
import React, { useMemo } from 'react';
import Select from 'react-select';
import styled from 'styled-components';

import Portal from 'components/Portal';
import Input from 'components/Input';
import Button from 'components/Button';
import Label from 'components/Label';
import locale from 'locale';
import { inputFields, createProductStatus } from 'models';
import CloseImg from 'modules/header/assets/close.png';
import { productSummaryProps } from 'interfaces';

import useEditProduct from '../hooks/useEditProduct';
import { getCurrentOrigin } from '../helpers';

type EditProductModalProps = {
    closeModal: (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
    updatedProductMessage: string;
    failedProductMessage: string;
    product: productSummaryProps | null;
};

const EditProductModal = ({
    closeModal,
    updatedProductMessage,
    failedProductMessage,
    product,
}: EditProductModalProps) => {
    const productOrigin: string = R.propOr('asia', 'origin', product);
    const {
        origins,
        createdStatus,
        onChangeProductOriginHandler,
        onChangeProductPriceHandler,
        onChangeProductNameHandler,
        resetToDefaultHandler,
        onSubmit,
        productOriginErrorMessage,
        productPriceErrorMessage,
        productNameErrorMessage,
        handleSubmit,
        register,
        isLoading,
        isDirty,
    } = useEditProduct(product);

    const defaultOriginValue = useMemo(() => getCurrentOrigin(productOrigin, origins), [origins, productOrigin]);

    return (
        <Portal>
            <Background>
                <ModalContainer onSubmit={handleSubmit(onSubmit)}>
                    {createdStatus === createProductStatus.updated && (
                        <UpdatedProductMessage>{updatedProductMessage}</UpdatedProductMessage>
                    )}
                    {createdStatus === createProductStatus.failed && (
                        <FailedProductMessage>{failedProductMessage}</FailedProductMessage>
                    )}
                    <Label>{locale.productName}</Label>
                    <Input
                        name={inputFields.productName}
                        ref={(e) => {
                            register(e);
                        }}
                        onChange={onChangeProductNameHandler}
                        disabled={isLoading}
                    />
                    <ErrorMessage>{productNameErrorMessage}</ErrorMessage>
                    <Label>{locale.price}</Label>
                    <Input
                        name={inputFields.productPrice}
                        ref={(e) => {
                            register(e);
                        }}
                        onChange={onChangeProductPriceHandler}
                        type="number"
                        disabled={isLoading}
                    />
                    <ErrorMessage>{productPriceErrorMessage}</ErrorMessage>
                    <Label>{locale.origin}</Label>
                    {!R.isNil(origins) && (
                        <SelectStyled
                            ref={register({ name: inputFields.productOrigin })}
                            defaultValue={defaultOriginValue}
                            isDisabled={isLoading}
                            getOptionLabel={(option: any) => option.displayName}
                            name={inputFields.productOrigin}
                            options={origins}
                            onChange={onChangeProductOriginHandler}
                        />
                    )}
                    <ErrorMessage>{productOriginErrorMessage}</ErrorMessage>
                    <Button type="submit" disabled={isLoading || !isDirty}>
                        {locale.createProduct}
                    </Button>

                    <Button onClick={resetToDefaultHandler} disabled={isLoading || !isDirty}>
                        {locale.resetForm}
                    </Button>
                    <Close src={CloseImg} onClick={closeModal} />
                </ModalContainer>
            </Background>
        </Portal>
    );
};

EditProductModal.defaultProps = {
    failedProductMessage: locale.creationFailed,
    updatedProductMessage: locale.yourProductUpdated,
};

const UpdatedProductMessage = styled(Label)`
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

export default EditProductModal;
