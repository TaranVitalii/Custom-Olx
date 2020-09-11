import * as R from 'ramda';
import { useEffect, useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import {
    removeFromOrder,
    increaseProductCount,
    decreaseProductCount,
    updateProductCount,
} from 'modules/products/ProductsActions';

import { useCounterProps } from '../interfaces';

const useCounter = ({ productId, count }: useCounterProps) => {
    const dispatch = useDispatch();
    const [updatedCount, setUpdatedCount] = useState<number>(count);

    useEffect(() => {
        setUpdatedCount(count);
    }, [count]);

    return useMemo(() => {
        /**
         * Remove Product from order
         */
        const removeProductFromOrderHandler = () => dispatch(removeFromOrder(productId));

        /**
         * Increase order count Handler
         */
        const increaseOrderCountHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
            event.preventDefault();
            dispatch(increaseProductCount(productId));
        };

        /**
         * Decrease order count Handler
         */
        const decreaseOrderCountHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
            event.preventDefault();
            dispatch(decreaseProductCount(productId));
        };

        /**
         * OnChange handler for prompt counter
         */
        const onChangeTextInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
            const inputValue: number = R.pathOr(count, ['target', 'value'], event);

            setUpdatedCount(inputValue);
        };

        /**
         * OnChange handler for prompt counter
         */
        const onBlurCountInputHandler = () => {
            if (updatedCount === count) return;

            dispatch(updateProductCount(productId, updatedCount));
        };

        return {
            removeProductFromOrderHandler,
            increaseOrderCountHandler,
            decreaseOrderCountHandler,
            onChangeTextInputHandler,
            onBlurCountInputHandler,
            updatedCount,
        };
    }, [count, dispatch, productId, updatedCount]);
};

export default useCounter;
