import axios from 'axios';
import * as R from 'ramda';

import { URLS } from 'models';
import { pageProps } from 'interfaces';
import makeStringFromArray from 'helpers';

export const fetchProductsRequest = async ({ page = 1, origins, maxPrice, minPrice }: pageProps) => {
    try {
        const response = await axios(URLS.FETCH_PRODUCTS, {
            params: {
                page,
                origins: makeStringFromArray(origins),
                maxPrice,
                minPrice,
            },
        });
        const data = R.prop('data', response);

        return data;
    } catch (e) {
        return null;
    }
};

export const fetchProductByIdRequest = async (id: any) => {
    try {
        const response = await axios(URLS.FETCH_PRODUCT_BY_ID + id);
        const data = R.prop('data', response);

        return data;
    } catch (e) {
        return null;
    }
};

export const fetchProductOriginsRequest = async () => {
    try {
        const response = await axios(URLS.FETCH_PRODUCTS_ORIGINS);
        const data = R.prop('data', response);

        return data;
    } catch (e) {
        return null;
    }
};
