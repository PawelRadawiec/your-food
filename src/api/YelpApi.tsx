import axios from 'axios';

// todo - add Authorization Bearer
export default axios.create({
  baseURL: 'https://api.yelp.com/v3/businesses',
  headers: {
    Authorization:
      'Bearer TJWyU0m_1Ehaq317UBbdkBc-LriNROIB2DDRMHCSfvkviotg6_RHUvBCHBUvYy4wD27l7P5G1c-LbLf4BL7fLz7tMonelw7ZpjM2prVw-ido817Y0GqzKCmZXR2zYXYx',
  },
});
