import * as R from 'ramda';

import { createOrderListProps } from 'interfaces';

const findProduct = (productId: string | null, pieces: createOrderListProps[]): createOrderListProps | null => {
    const duplicateProduct = pieces.find((piece) => {
        const pieceId = R.prop('productId', piece);
        return pieceId === productId;
    });

    return !!duplicateProduct ? duplicateProduct : null;
};

export default findProduct;
