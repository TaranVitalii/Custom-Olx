import axios, { AxiosRequestConfig } from 'axios';
import * as R from 'ramda';

import { URLS } from 'models';
import { pageProps, productPropsRequest, createOrderProps } from 'interfaces';
import { makeStringFromArray } from 'helpers';

const apiKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmdWxsTmFtZSI6IlRhcmFuIFZpdGFsaWkiLCJpYXQiOjE1OTkwNzQ4MTcsImV4cCI6MTYwNDI1ODgxN30.U7YX1GcXAPG_SSG-IglXSPnyL5ZmbjBlx5FmUEZ5ky0';

export const fetchProductsRequest = async ({ page = 1, origins, maxPrice, minPrice, editable }: pageProps) => {
    const options: AxiosRequestConfig = {
        method: 'GET',
        headers: editable ? { Authorization: apiKey } : null,
        params: {
            page,
            origins: makeStringFromArray(origins),
            maxPrice,
            minPrice,
            editable,
        },
        url: URLS.FETCH_PRODUCTS,
    };

    const response = await axios(options);
    const data = R.prop('data', response);

    return data;
};

export const fetchProductByIdRequest = async (id: any) => {
    const response = await axios(URLS.FETCH_PRODUCT_BY_ID + id);
    const data = R.prop('data', response);

    return data;
};

export const fetchProductOriginsRequest = async () => {
    const response = await axios(URLS.FETCH_PRODUCTS_ORIGINS);
    const data = R.prop('data', response);

    return data;
};

export const createProductRequest = async (product: productPropsRequest) => {
    const options: AxiosRequestConfig = {
        method: 'POST',
        headers: { Authorization: apiKey },
        data: product,
        url: URLS.FETCH_PRODUCTS,
    };

    const response = await axios(options);
    const data = R.prop('data', response);

    return data;
};

export const updateProductRequest = async (product: productPropsRequest, id: any) => {
    const options: AxiosRequestConfig = {
        method: 'PATCH',
        headers: { Authorization: apiKey },
        data: product,
        url: URLS.FETCH_PRODUCT_BY_ID + id,
    };

    const response = await axios(options);
    const data = R.prop('data', response);

    return data;
};

export const createOrderRequest = async (order: createOrderProps) => {
    const options: AxiosRequestConfig = {
        method: 'POST',
        headers: { Authorization: apiKey },
        data: order,
        url: URLS.CREATE_ORDER,
    };

    const response = await axios(options);
    const data = R.prop('data', response);

    return data;
};
