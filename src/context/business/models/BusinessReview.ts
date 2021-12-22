export interface BusinessReview {
  id: string;
  rating: number;
  user: ReviewUser;
  text: string;
  time_created: string;
  url: string;
}

export interface ReviewUser {
  id: string;
  profile_url: string;
  image_url: string;
  name: string;
}
