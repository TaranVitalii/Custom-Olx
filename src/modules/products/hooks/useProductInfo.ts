import * as R from 'ramda';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import moment from 'moment';

import { productSummaryProps } from '../../../interfaces';
import { fetchProductById } from '../ProductsActions';
import { getCurrentProductSelector } from '../ProductsReducer';

const useProductInfo = () => {
    const dispatch = useDispatch();
    const { productId } = useParams();
    const currentProduct: productSummaryProps | null = useSelector(getCurrentProductSelector, shallowEqual);
    const name: string | null = R.propOr(null, 'name', currentProduct);
    const price: string | null = R.propOr(null, 'price', currentProduct);
    const createdAt: string | null = R.propOr(null, 'createdAt', currentProduct);
    const updatedAt: string | null = R.propOr(null, 'updatedAt', currentProduct);
    const origin: string | null = R.propOr(null, 'origin', currentProduct);
    const createdAtFormated = moment(createdAt).format('LL');
    const updatedAtFormated = moment(updatedAt).format('LL');

    useEffect(() => {
        dispatch(fetchProductById(productId));
    }, []);

    return {
        currentProduct,
        name,
        price,
        origin,
        createdAtFormated,
        updatedAtFormated,
    };
};

export default useProductInfo;
