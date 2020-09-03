import * as R from 'ramda';

const calcPageCount = (totalItems: number | null, perPage: number | null): number => {
    if (R.isNil(totalItems) || R.isNil(perPage)) return 0;

    return Math.ceil(totalItems / perPage);
};

export default calcPageCount;
