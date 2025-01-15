
export interface IDetailReview {
  className?: string;
  id: number;
  teamId: number;
  userId: number;
  gatheringId: number;
  score: number;  // This replaces 'rating' from the previous interface
  comment: string;
  createdAt: string;
  User?: {
    teamId: number;
    id: number;
    name: string;    // This will be used as 'author'
    image: string;   // This will be used as 'authorImage'
  };
  Gathering?: {
    teamId: number;
    id: number;
    type: string;
    name: string;
    dateTime: string;
    location: string;
    image: string;
  };
}
// For the component props, we'll create a separate interface
export interface IDetailReviewProps {
  className?: string;
  score: number;     // From the API's 'score'
  comment: string;
  author?: string;   // From User.name
  date?: string;     // Formatted from createdAt
  authorImage?: string; // From User.image
}