import * as R from 'ramda';

import { createOrderListProps } from '../../../interfaces';

const filterById = (productId: string | null, pieces: createOrderListProps[]): createOrderListProps[] => {
    const updatedPieces = pieces.filter((piece) => {
        const pieceId = R.prop('productId', piece);
        return pieceId !== productId;
    });

    return !!updatedPieces ? updatedPieces : [];
};

export default filterById;
