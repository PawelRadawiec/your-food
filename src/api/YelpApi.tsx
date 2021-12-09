import axios from 'axios';

// todo - add Authorization Bearer
export default axios.create({
  baseURL: 'https://api.yelp.com/v3/businesses',
  headers: {
    Authorization:
      'Bearer vESwV_8ddMUpwtGO4TI965CFeeTeAVSIDHkBo91D9V6ZLMbgKCg93qxxLvAczVMMZCnr9SDQqNyZCJQkWUE3ri3SBUksjfCs-g6k4RARL7tXOrRcKRy6MR9miwixYXYx',
  },
});
