import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      totalCount
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      edges {
        node {
          id
          ownerName
          name        
          createdAt
          fullName        
          ratingAverage
          reviewCount
          stargazersCount        
          forksCount   
          ownerAvatarUrl
          description
          language          
        }
        cursor
      }
    }
  }
`;

export const GET_USER = gql`
  query {
    me {
      id
      username
    }
  }
`;

export const GET_ONEREPOSITORY = gql`
  query GetRepository ($id: ID!) {
    repository(id: $id) {
      id
      ownerName
      name        
      createdAt
      fullName        
      ratingAverage
      reviewCount
      stargazersCount        
      forksCount   
      ownerAvatarUrl
      description
      language
      url
    }
  }
`;