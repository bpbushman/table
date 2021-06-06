import { gql } from "@apollo/client";

export const GET_All_POSTS = gql`
  query getPosts {
    getPosts {
      username
      body
      timeStamp
      id
      likes {
        username
      }
      comments {
        username
        body
        timeStamp
      }
    }
  }
`;

export const GET_TIMELINE_POSTS = gql`
  query getTimelinePosts {
    getTimelinePosts {
      username
      body
      timeStamp
      id
      likes {
        username
      }
      comments {
        username
        body
        timeStamp
      }
    }
  }
`;

export const GET_USERS = gql`
  query getUsers {
    getUsers {
      username
      id
      banner
    }
  }
`;

export const GET_FOLLOWED_USERS = gql`
  query getFollowedUsers {
    getFollowedUsers{
      username
      id
      banner
    }
  }
`;
