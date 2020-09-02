import { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { productSummaryProps } from '../../../interfaces';
import { fetchProducts } from '../ProductsActions';
import { getProductsSelector } from '../ProductsReducer';

const useProductInfo = () => {
    const dispatch = useDispatch();
    const productsList: productSummaryProps[] | null = useSelector(getProductsSelector, shallowEqual);

    useEffect(() => {
        dispatch(fetchProducts());
    }, []);

    return {
        productsList,
    };
};

export default useProductInfo;
