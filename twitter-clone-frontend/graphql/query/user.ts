import { graphql } from "@/gql";

export const verifyUserGoogleTokenQuery = graphql(`
	#graphql
	query VerifyUserGoogleTokenQuery($token: String!) {
		verifyGoogleToken(token: $token)
	}
`);

export const getCurrentUserQuery = graphql(`
  #graphql
  query getCurrentUser {
    getCurrentUser {
      id
      firstName
      lastName
      email
      profileImageURL
      tweets {
        id
        content
        imageURL
        author {
          firstName
          lastName
          profileImageURL
        }
      }
    }
  }
`);