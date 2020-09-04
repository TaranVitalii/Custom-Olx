import * as R from 'ramda';

import { createOrderListProps } from 'interfaces';

const updatePieceCount = (pieces: createOrderListProps[], productId: string, updatedCount: number) =>
    pieces.map((piece: createOrderListProps) => {
        const pieceProductId = R.prop('productId', piece);
        if (pieceProductId === productId) {
            return { productId, count: updatedCount };
        } else {
            return piece;
        }
    });

export default updatePieceCount;
