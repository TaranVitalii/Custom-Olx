import { URLS } from '../models';

export const fetchProductsRequest = async () => {
    try {
        const response = await fetch(URLS.FETCH_PRODUCTS);

        return response.json();
    } catch (e) {
        return null;
    }
};

export const fetchProductByIdRequest = async (id: any) => {
    try {
        const response = await fetch(URLS.FETCH_PRODUCT_BY_ID + id);

        return response.json();
    } catch (e) {
        return null;
    }
};
