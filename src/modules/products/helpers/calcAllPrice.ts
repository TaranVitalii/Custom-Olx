import * as R from 'ramda';

import { createOrderListProps, productSummaryProps } from '../../../interfaces';

const calcAllPrice = (pieces: createOrderListProps[], products: productSummaryProps[]): number => {
    if (R.isEmpty(pieces) || R.isNil(pieces)) return 0;

    return pieces.reduce((acc, el) => {
        const count = R.prop('count', el);
        const productId = R.prop('productId', el);
        const product = products.find((item) => {
            const currentProductId = R.prop('id', item);
            return currentProductId === productId;
        });
        const price: number = R.propOr(0, 'price', product);
        return acc + count * price;
    }, 0);
};

export default calcAllPrice;
