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
      roomId
      latestMessage
      latestMessageTime
    }
  }
`;
export const listMessages = /* GraphQL */ `
  query ListMessages($roomId: ID!) {
    listMessages(roomId: $roomId) {
      pk
      sk
      type
      imageKey
      key
      message
      senderEmail
      otherUserEmail
      updatedAt
      roomId
    }
  }
`;
