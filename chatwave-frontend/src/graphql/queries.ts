/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const listRooms = /* GraphQL */ `
  query ListRooms {
    listRooms {
      pk
      sk
      avatarUrl
      title
      latestMessage
      latestMessageTime
      roomId
    }
  }
`;
export const listMessages = /* GraphQL */ `
  query ListMessages($roomId: ID!) {
    listMessages(roomId: $roomId) {
      pk
      sk
      key
      message
      senderEmail
      updatedAt
      roomId
    }
  }
`;
