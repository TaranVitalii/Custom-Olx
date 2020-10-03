import * as R from 'ramda';

const isSelected = (selectedOrigins: string[], currentOrigin: string): boolean => {
    if (R.isNil(selectedOrigins) || R.isNil(currentOrigin)) return false;

    const selectedIndex = selectedOrigins.indexOf(currentOrigin);

    return selectedIndex >= 0;
};

export default isSelected;
