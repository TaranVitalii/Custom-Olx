import * as R from 'ramda';
import React, { useMemo, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { yupResolver } from '@hookform/resolvers';

import schems from 'schems';
import { getProductsOrigins } from 'modules/products/ProductsReducer';
import { inputFields } from 'models';

import { createProduct } from '../HeaderActions';

type OriginProps = {
    value: string;
    displayName: string;
};

type FormData = {
    [inputFields.productName]: string;
    [inputFields.productPrice]: number;
    [inputFields.productOrigin]: string;
};
const useCreateProduct = () => {
    const createProductSchema = useMemo(() => schems.createProduct, []);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const origins = useSelector(getProductsOrigins, shallowEqual);
    const [createdStatus, setCreatedStatus] = useState<string | null>(null);
    const { register, setValue, handleSubmit, errors } = useForm<FormData>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        // validation schemas
        resolver: yupResolver(createProductSchema),
        defaultValues: {
            [inputFields.productName]: '',
            [inputFields.productPrice]: 0,
            [inputFields.productOrigin]: '',
        },
    });

    /**
     * Validation form error
     */
    const productNameErrorMessage: string = R.pathOr('', [inputFields.productName, 'message'], errors);

    const productPriceErrorMessage: string = R.pathOr('', [inputFields.productPrice, 'message'], errors);

    const productOriginErrorMessage: string = R.pathOr('', [inputFields.productOrigin, 'message'], errors);

    return useMemo(() => {
        /**
         * Submit data
         */
        const onSubmit: SubmitHandler<FormData> = (data) => {
            setCreatedStatus(null);
            setIsLoading(true);

            const payload = {
                product: data,
                setCreatedStatus,
                setIsLoading,
            };

            dispatch(createProduct(payload));
        };

        /**
         * On change product name handler
         */
        const onChangeProductNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
            setCreatedStatus(null);
            const inputValue: string = R.pathOr('', ['target', 'value'], event);

            setValue(inputFields.productName, inputValue);
        };

        /**
         * On change product price handler
         */
        const onChangeProductPriceHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
            setCreatedStatus(null);
            const inputValue: number = R.pathOr(0, ['target', 'value'], event);

            setValue(inputFields.productPrice, inputValue);
        };

        /**
         * On change product origin handler
         */
        const onChangeProductOriginHandler = (selectedValue: OriginProps) => {
            setCreatedStatus(null);
            const value: string | null = R.propOr(null, 'value', selectedValue);

            if (R.isNil(value)) return;

            setValue(inputFields.productOrigin, value);
        };

        return {
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
        };
    }, [
        origins,
        productOriginErrorMessage,
        productPriceErrorMessage,
        productNameErrorMessage,
        createdStatus,
        handleSubmit,
        setValue,
        dispatch,
        isLoading,
        register,
    ]);
};

export default useCreateProduct;
