import { string, object, number } from 'yup';

import { inputFields } from 'models';

const schema = object().shape({
    [inputFields.productName]: string()
        .min(3, 'Must be 3 or more letters')
        .max(20, 'Must be 20 or less letters')
        .required('Product name is required'),
    [inputFields.productPrice]: number()
        .moreThan(0, 'Must be more 0')
        .required('Price is required')
        .typeError('Insert the number'),
    [inputFields.productOrigin]: string().required('Origin is required'),
});

export default {
    createProduct: schema,
};
