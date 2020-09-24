import * as R from 'ramda';
import { productsOriginsProps } from 'interfaces';

const getCurrentOrigin = (origin: string, origins: productsOriginsProps[] | null) => {
    if (R.isNil(origin) || R.isNil(origins)) return;
    return origins.find((item) => item.value === origin && item);
};

export default getCurrentOrigin;
