import axios from 'axios';

// todo - add Authorization Bearer
export default axios.create({
  baseURL: 'https://api.yelp.com/v3/businesses',
  headers: {
    Authorization:
      'Bearer Y2hdSP3gAyoEV7-cNw3bkr5P5TH1uw5LcAlUjActj3uPcU1DTT9bi3b7r5CnaqFEBzdOy_C9lpwCaFLQHeqzf54VBVpPCkAVjZK4cpd5kXlywXCkIL17I5n7Uw-zYXYx',
  },
});
