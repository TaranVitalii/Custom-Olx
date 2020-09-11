import * as R from 'ramda';
import { useEffect, useMemo } from 'react';
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
    const createdAtFormatted = moment(createdAt).format('LL');
    const updatedAtFormatted = moment(updatedAt).format('LL');

    useEffect(() => {
        dispatch(fetchProductById(productId));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return useMemo(
        () => ({
            currentProduct,
            name,
            price,
            origin,
            createdAtFormatted,
            updatedAtFormatted,
        }),
        [currentProduct, name, price, origin, createdAtFormatted, updatedAtFormatted],
    );
};

export default useProductInfo;
