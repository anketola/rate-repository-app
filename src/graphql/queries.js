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

