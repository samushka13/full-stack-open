import { gql } from "@apollo/client";

export const USER_FRAGMENT = gql`
  fragment UserParts on User {
    id
    username
    reviews {
      edges {
        node {
          id
          rating
          createdAt
          text
          repository {
            id
            fullName
          }
        }
      }
    }
  }
`;
