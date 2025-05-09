import { gql } from '@apollo/client';

export const GET_TOKEN = gql`
  mutation Authenticate($username: String!, $password: String!) {
    authenticate(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`;

export const ADD_REVIEW = gql`
  mutation CreateReview($review: CreateReviewInput) {
    createReview(review: $review) {
      id
      user {
        id
        username
      }
      repository {
        id
        name
      }
      userId
      repositoryId
      rating
      createdAt
      text
    }
  }
`;

export const ADD_USER = gql`
  mutation CreateUser($user: CreateUserInput) {
    createUser(user: $user)  {
      id
      username
    }
  
  }
`;

export const DELETE_REVIEW = gql`
  mutation DeleteReview($deleteReviewId: ID!) {
    deleteReview(id: $deleteReviewId)
  }
`;