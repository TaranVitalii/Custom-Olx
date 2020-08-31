import * as R from 'ramda';
import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useCounterProps } from '../interfaces';
import {
    removeFromOrder,
    increaseProductCount,
    decreaseProductCount,
    updateProductCount,
} from '../../products/ProductsActions';

const useCounter = ({ productId, count }: useCounterProps) => {
    const dispatch = useDispatch();
    const [updatedCount, setUpdatedCount] = useState<number>(count);

    useEffect(() => {
        setUpdatedCount(count);
    }, [count]);

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
};

export default useCounter;
