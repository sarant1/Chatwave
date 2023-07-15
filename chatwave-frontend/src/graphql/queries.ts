/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const listRooms = /* GraphQL */ `
  query ListRooms {
    listRooms {
      pk
      sk
      title
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
      key
      message
      sender_id
      updatedAt
      roomId
    }
  }
`;
