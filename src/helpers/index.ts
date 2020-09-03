import * as R from 'ramda';

const makeStringFromArray = (origins: string[] | null): string | null => {
    if (R.isNil(origins) || R.isEmpty(origins)) return null;

    return origins.join(',');
};

export default makeStringFromArray;
