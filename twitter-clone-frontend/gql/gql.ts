/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n\t#graphql\n\tmutation CreateTweet($payload: CreateTweetData!) {\n\t\tcreateTweet(payload: $payload) {\n\t\t\tid\n\t\t}\n\t}\n": types.CreateTweetDocument,
    "\n\t#graphql\n\tquery getAllTweets {\n\t\tgetAllTweets {\n\t\t\tid\n\t\t\tcontent\n\t\t\timageURL\n\t\t\tauthor {\n\t\t\t\tid\n\t\t\t\tfirstName\n\t\t\t\tlastName\n\t\t\t\tprofileImageURL\n\t\t\t}\n\t\t}\n\t}\n": types.GetAllTweetsDocument,
    "\n\t#graphql\n\tquery getTweetImgPresignedUrl($imgType: String!, $imgName: String!) {\n\t  getTweetImgPresignedUrl(ImgType: $imgType, ImgName: $imgName)\n\t}\n  ": types.GetTweetImgPresignedUrlDocument,
    "\n\t#graphql\n\tquery VerifyUserGoogleTokenQuery($token: String!) {\n\t\tverifyGoogleToken(token: $token)\n\t}\n": types.VerifyUserGoogleTokenQueryDocument,
    "\n  #graphql\n  query getCurrentUser {\n    getCurrentUser {\n      id\n      firstName\n      lastName\n      email\n      profileImageURL\n      tweets {\n        id\n        content\n        imageURL\n        author {\n          firstName\n          lastName\n          profileImageURL\n        }\n      }\n    }\n  }\n": types.GetCurrentUserDocument,
    "\n  #graphql\n  query getUserByID($id: ID!) {\n    getUserById(id: $id) {\n      id\n      email\n      firstName\n      lastName\n      profileImageURL\n      tweets {\n        id\n        content\n        imageURL\n        author {\n          id\n          firstName\n          lastName\n          profileImageURL\n        }\n      }\n    }\n  }\n": types.GetUserByIdDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\t#graphql\n\tmutation CreateTweet($payload: CreateTweetData!) {\n\t\tcreateTweet(payload: $payload) {\n\t\t\tid\n\t\t}\n\t}\n"): (typeof documents)["\n\t#graphql\n\tmutation CreateTweet($payload: CreateTweetData!) {\n\t\tcreateTweet(payload: $payload) {\n\t\t\tid\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\t#graphql\n\tquery getAllTweets {\n\t\tgetAllTweets {\n\t\t\tid\n\t\t\tcontent\n\t\t\timageURL\n\t\t\tauthor {\n\t\t\t\tid\n\t\t\t\tfirstName\n\t\t\t\tlastName\n\t\t\t\tprofileImageURL\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\t#graphql\n\tquery getAllTweets {\n\t\tgetAllTweets {\n\t\t\tid\n\t\t\tcontent\n\t\t\timageURL\n\t\t\tauthor {\n\t\t\t\tid\n\t\t\t\tfirstName\n\t\t\t\tlastName\n\t\t\t\tprofileImageURL\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\t#graphql\n\tquery getTweetImgPresignedUrl($imgType: String!, $imgName: String!) {\n\t  getTweetImgPresignedUrl(ImgType: $imgType, ImgName: $imgName)\n\t}\n  "): (typeof documents)["\n\t#graphql\n\tquery getTweetImgPresignedUrl($imgType: String!, $imgName: String!) {\n\t  getTweetImgPresignedUrl(ImgType: $imgType, ImgName: $imgName)\n\t}\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\t#graphql\n\tquery VerifyUserGoogleTokenQuery($token: String!) {\n\t\tverifyGoogleToken(token: $token)\n\t}\n"): (typeof documents)["\n\t#graphql\n\tquery VerifyUserGoogleTokenQuery($token: String!) {\n\t\tverifyGoogleToken(token: $token)\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  query getCurrentUser {\n    getCurrentUser {\n      id\n      firstName\n      lastName\n      email\n      profileImageURL\n      tweets {\n        id\n        content\n        imageURL\n        author {\n          firstName\n          lastName\n          profileImageURL\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query getCurrentUser {\n    getCurrentUser {\n      id\n      firstName\n      lastName\n      email\n      profileImageURL\n      tweets {\n        id\n        content\n        imageURL\n        author {\n          firstName\n          lastName\n          profileImageURL\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  query getUserByID($id: ID!) {\n    getUserById(id: $id) {\n      id\n      email\n      firstName\n      lastName\n      profileImageURL\n      tweets {\n        id\n        content\n        imageURL\n        author {\n          id\n          firstName\n          lastName\n          profileImageURL\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query getUserByID($id: ID!) {\n    getUserById(id: $id) {\n      id\n      email\n      firstName\n      lastName\n      profileImageURL\n      tweets {\n        id\n        content\n        imageURL\n        author {\n          id\n          firstName\n          lastName\n          profileImageURL\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;