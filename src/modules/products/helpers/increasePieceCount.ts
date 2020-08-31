import * as R from 'ramda';

import { createOrderListProps } from '../../../interfaces';

const increasePieceCount = (pieces: createOrderListProps[], productId: string, currentProductCount: number) =>
    pieces.map((piece: createOrderListProps) => {
        const pieceProductId = R.prop('productId', piece);
        if (pieceProductId === productId) {
            return { productId, count: currentProductCount + 1 };
        } else {
            return piece;
        }
    });

export default increasePieceCount;
