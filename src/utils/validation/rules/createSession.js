/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
export default {
    phone    : [ 'required', 'trim', 'integer', { min_length: 12 } ],
    password : [ 'required', 'trim', 'string', { min_length: 8 } ]
};
