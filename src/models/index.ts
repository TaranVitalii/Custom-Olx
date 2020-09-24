export const basicUrl = 'https://yalantis-react-school-api.yalantis.com/api/v1';

export const URLS = {
    FETCH_PRODUCTS: `${basicUrl}/products`,
    FETCH_PRODUCT_BY_ID: `${basicUrl}/products/`,
    FETCH_PRODUCTS_ORIGINS: `${basicUrl}/products-origins`,
    CREATE_ORDER: `${basicUrl}/orders`,
};

export enum createProductStatus {
    created = 'created',
    failed = 'failed',
    updated = 'updated',
}

export enum inputFields {
    productName = 'name',
    productPrice = 'price',
    productOrigin = 'origin',
}
