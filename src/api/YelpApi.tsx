import axios from 'axios';

// todo - add Authorization Bearer
export default axios.create({
  baseURL: 'https://api.yelp.com/v3/businesses',
  headers: {
    Authorization:
      'Bearer 9F2lkxTSIZC_mvWUdjklY_-U6z8c5K6QOi7ls-IPCmJEphK3MQHsG8OZG3SKzi8xCiKEz9wMsJ0Leu0HuARtE7EOkFikcl52D7WCUJldoILH--P6i-yvdqm6tfayYXYx',
  },
});
