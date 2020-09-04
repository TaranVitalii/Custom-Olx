import * as R from 'ramda';

import { createOrderListProps } from 'interfaces';

const checkProductExist = (productId: string | null, pieces: createOrderListProps[]) => {
    if (!pieces) return false;

    const isProductExist = pieces.findIndex((piece: createOrderListProps) => {
        const pieceId = R.prop('productId', piece);
        return productId === pieceId;
    });

    if (isProductExist < 0) {
        return false;
    }
    return true;
};

export default checkProductExist;
