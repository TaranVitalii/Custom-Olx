import { URLS } from '../models';

export const getProducts = async () => {
    try {
        const response = await fetch(URLS.GET_PRODUCTS);

        return response.json();
    } catch (e) {
        return null;
    }
};
