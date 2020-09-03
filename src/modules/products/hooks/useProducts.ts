import * as R from 'ramda';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { productSummaryProps, productsOriginsProps, productsPageProps } from '../../../interfaces';
import { fetchProducts, fetchProductsOrigins } from '../ProductsActions';
import { getProductsSelector, getProductsOriginsSelector, getProductsConfigSelector } from '../ProductsReducer';

const useProducts = () => {
    const dispatch = useDispatch();
    const productsList: productSummaryProps[] | null = useSelector(getProductsSelector, shallowEqual);
    const productsOriginsList: productsOriginsProps[] | null = useSelector(getProductsOriginsSelector, shallowEqual);
    const { currentPage, pageCount }: productsPageProps = useSelector(getProductsConfigSelector, shallowEqual);
    const [page, setPage] = useState<number>(currentPage);
    const [minPriceValue, setMinPriceValue] = useState<number | null>(null);
    const [maxPriceValue, setMaxPriceValue] = useState<number | null>(null);
    const [selectedOrigin, setSelectedOrigin] = useState<string[] | []>([]);

    useEffect(() => {
        dispatch(
            fetchProducts({
                page,
                origins: selectedOrigin,
                maxPrice: maxPriceValue,
                minPrice: minPriceValue,
            }),
        );
        dispatch(fetchProductsOrigins());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [maxPriceValue, minPriceValue, selectedOrigin, page]);

    /**
     * OnChange min price handler
     */
    const onBlurMinPriceHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue: number = R.pathOr(0, ['target', 'value'], event);

        setMinPriceValue(inputValue);
    };

    /**
     * OnChange max price handler
     */
    const onBlurMaxPriceHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue: number = R.pathOr(0, ['target', 'value'], event);

        setMaxPriceValue(inputValue);
    };

    /**
     * OnChange handler
     */
    const onChangeOriginsHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked: boolean = R.pathOr(false, ['target', 'checked'], event);
        const checkedValue: string | null = R.pathOr(null, ['target', 'value'], event);

        if (R.isNil(checkedValue) && R.isNil(checkedValue)) return;

        if (isChecked) {
            setSelectedOrigin([...selectedOrigin, checkedValue]);
        } else {
            const updatedSelectedOrigins = selectedOrigin.filter((item) => item !== checkedValue);
            setSelectedOrigin(updatedSelectedOrigins);
        }
    };

    return useMemo(
        () => ({
            productsList,
            productsOriginsList,
            onChangeHandler: onChangeOriginsHandler,
            onBlurMinPriceHandler,
            onBlurMaxPriceHandler,
            pageCount,
            currentPage: page,
            setPage,
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [productsList, productsOriginsList, selectedOrigin, minPriceValue, maxPriceValue, pageCount, page],
    );
};

export default useProducts;
