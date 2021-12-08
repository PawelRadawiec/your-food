import axios from 'axios';

// todo - add Authorization Bearer
export default axios.create({
  baseURL: 'https://api.yelp.com/v3/businesses',
  headers: {
    Authorization:
      'Bearer 1u73dSRRB1HJaPtTwpiVrBvZ5Kq63xxIkNv6CjI3MIKpKVAng8Cqt-Wn9cvrnsKGghwcdAKyArkHhWp8irXsebEYThQi0akZbuV2OYYnPTqiA5-E-nhTa413Xm9yYXYx',
  },
});
