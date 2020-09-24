import * as R from 'ramda';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import queryString, { ParsedQuery } from 'query-string';

import { productSummaryProps, productsOriginsProps, productsPageProps } from 'interfaces';

import {
    fetchDebounceProducts,
    callProductsWithDebounce,
    fetchProducts,
    fetchProductsOrigins,
} from '../ProductsActions';
import { getProductsSelector, getProductsOriginsSelector, getProductsConfigSelector } from '../ProductsReducer';

const useProducts = (editable: boolean | null) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const queryParams: ParsedQuery<string | number> = queryString.parse(location.search, {
        parseNumbers: true,
        arrayFormat: 'comma',
    });
    const queryPage: number = R.propOr(1, 'page', queryParams);
    const minPrice: number | null = R.propOr(null, 'minPrice', queryParams);
    const maxPrice: number | null = R.propOr(null, 'maxPrice', queryParams);
    const queryOrigin: string[] | [] = R.propOr([], 'origins', queryParams);

    const productsList: productSummaryProps[] | null = useSelector(getProductsSelector, shallowEqual);
    const productsOriginsList: productsOriginsProps[] | null = useSelector(getProductsOriginsSelector, shallowEqual);
    const { currentPage, pageCount }: productsPageProps = useSelector(getProductsConfigSelector, shallowEqual);

    const [page, setPage] = useState<number>(queryPage ? queryPage : currentPage);
    const [minPriceValue, setMinPriceValue] = useState<number | null>(minPrice);
    const [maxPriceValue, setMaxPriceValue] = useState<number | null>(maxPrice);
    const [selectedOrigin, setSelectedOrigin] = useState<string[] | []>(queryOrigin);
    const url = queryString.stringify(
        {
            page,
            origins: selectedOrigin,
            maxPrice: maxPriceValue,
            minPrice: minPriceValue,
            editable,
        },
        { skipNull: true, arrayFormat: 'comma' },
    );

    useEffect(() => {
        dispatch(fetchProductsOrigins());
        dispatch(
            fetchProducts({
                page,
                origins: selectedOrigin,
                maxPrice: maxPriceValue,
                minPrice: minPriceValue,
                editable,
            }),
        );
        history.push({ search: url });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    useEffect(() => {
        history.push({ search: url });
        dispatch(
            fetchDebounceProducts({
                page,
                origins: selectedOrigin,
                maxPrice: maxPriceValue,
                minPrice: minPriceValue,
                editable,
            }),
        );

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [maxPriceValue, minPriceValue, selectedOrigin, editable]);

    return useMemo(() => {
        /**
         * OnChange handler
         */
        const onChangeOriginsHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
            const isChecked: boolean = R.pathOr(false, ['target', 'checked'], event);
            const checkedValue: string | null = R.pathOr(null, ['target', 'value'], event);

            if (R.isNil(checkedValue) && R.isNil(checkedValue)) return;
            if (isChecked) {
                setSelectedOrigin([...selectedOrigin, checkedValue]);
                dispatch(callProductsWithDebounce());
            } else {
                const updatedSelectedOrigins = selectedOrigin.filter((item) => item !== checkedValue);

                dispatch(callProductsWithDebounce());
                setSelectedOrigin(updatedSelectedOrigins);
            }
        };

        /**
         * OnChange max price handler
         */
        const onChangeMaxPriceHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
            const inputValue: number = R.pathOr(0, ['target', 'value'], event);

            setMaxPriceValue(R.isEmpty(inputValue) ? null : inputValue);
            dispatch(callProductsWithDebounce());
        };

        /**
         * OnChange min price handler
         */
        const onChangeMinPriceHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
            const inputValue: number = R.pathOr(0, ['target', 'value'], event);

            setMinPriceValue(R.isEmpty(inputValue) ? null : inputValue);
            dispatch(callProductsWithDebounce());
        };

        return {
            onChangeHandler: onChangeOriginsHandler,
            onChangeMaxPriceHandler,
            onChangeMinPriceHandler,
            productsOriginsList,
            currentPage: page,
            selectedOrigin,
            maxPriceValue,
            minPriceValue,
            productsList,
            pageCount,
            setPage,
        };
    }, [productsList, productsOriginsList, pageCount, page, selectedOrigin, dispatch, maxPriceValue, minPriceValue]);
};

export default useProducts;
