import * as R from 'ramda';
import React, { useMemo, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { yupResolver } from '@hookform/resolvers';

import schems from 'schems';
import { productSummaryProps } from 'interfaces';
import { inputFields } from 'models';

import { getProductsOrigins } from '../ProductsReducer';
import { updateProduct } from '../ProductsActions';

type OriginProps = {
    value: string;
    displayName: string;
};

type FormData = {
    [inputFields.productName]: string;
    [inputFields.productPrice]: number;
    [inputFields.productOrigin]: string;
};

const initialValue = {
    [inputFields.productName]: '',
    [inputFields.productPrice]: 0,
    [inputFields.productOrigin]: '',
};

const useEditProduct = (product: productSummaryProps | null) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const origins = useSelector(getProductsOrigins, shallowEqual);
    const [createdStatus, setCreatedStatus] = useState<string | null>(null);
    const productId = R.propOr(null, 'id', product);
    const createProductSchema = useMemo(() => schems.createProduct, []);
    const defaultValues = useMemo(
        () =>
            R.isNil(product)
                ? initialValue
                : {
                      name: R.prop('name', product),
                      price: R.prop('price', product),
                      origin: R.prop('origin', product),
                  },
        [product],
    );

    const { register, setValue, handleSubmit, reset, errors, formState } = useForm<FormData>({
        // validation schemas
        resolver: yupResolver(createProductSchema),
        defaultValues,
    });
    const { isDirty } = formState;

    /**
     * Validation form error
     */
    const productNameErrorMessage: string = useMemo(() => R.pathOr('', [inputFields.productName, 'message'], errors), [
        errors,
    ]);
    const productPriceErrorMessage: string = useMemo(
        () => R.pathOr('', [inputFields.productPrice, 'message'], errors),
        [errors],
    );
    const productOriginErrorMessage: string = useMemo(
        () => R.pathOr('', [inputFields.productOrigin, 'message'], errors),
        [errors],
    );

    return useMemo(() => {
        /**
         * Submit data
         */
        const onSubmit: SubmitHandler<FormData> = (data) => {
            reset(data);
            setCreatedStatus(null);
            setIsLoading(true);

            const payload = {
                product: data,
                setCreatedStatus,
                setIsLoading,
                productId,
            };
            dispatch(updateProduct(payload));
        };

        /**
         * On change product name handler
         */
        const onChangeProductNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
            const inputValue: string = R.pathOr('', ['target', 'value'], event);

            setValue(inputFields.productName, inputValue);
        };

        /**
         * On change product price handler
         */
        const onChangeProductPriceHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
            const inputValue: number = R.pathOr(0, ['target', 'value'], event);

            setValue(inputFields.productPrice, inputValue);
        };

        /**
         * On change product origin handler
         */
        const onChangeProductOriginHandler = (selectedValue: OriginProps) => {
            const value: string | null = R.propOr(null, 'value', selectedValue);

            if (R.isNil(value)) return;

            setValue(inputFields.productOrigin, value);
        };

        /**
         * On change product origin handler
         */
        const resetToDefaultHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            event.preventDefault();
            reset(defaultValues);
        };

        return {
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
            isLoading,
            register,
            isDirty,
        };
    }, [
        reset,
        register,
        origins,
        productOriginErrorMessage,
        productPriceErrorMessage,
        productNameErrorMessage,
        createdStatus,
        handleSubmit,
        setValue,
        isLoading,
        defaultValues,
        dispatch,
        productId,
        isDirty,
    ]);
};

export default useEditProduct;
