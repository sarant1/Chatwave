import React, { useEffect, useContext, useState } from "react";
import { GraphQLSubscription } from "@aws-amplify/api";
import { Container } from "@chakra-ui/react";
import CreateNewMessageBox from "./CreateNewMessage";
import {
  OnCreateMessageByRoomIdSubscription,
  OnCreateMessageByRoomIdSubscriptionVariables,
} from "@/API";
import * as subscriptions from "@/graphql/subscriptions";
import MessageItem from "@/components/MessageItem";
import { MessageItemProps } from "@/utils/types";
import { AuthContext } from "@/contexts/auth.context";
import { onCreateMessageByRoomId } from "@/graphql/subscriptions";
import { Amplify, API, graphqlOperation } from "aws-amplify";
const MessageBox: React.FC = () => {
  const { selectedRoom } = useContext(AuthContext);
  const [currentMessages, setCurrentMessages] = useState<MessageItemProps[]>(
    []
  );

  // const subscribeToMessages = () => {
  //   const sub = API.graphql<
  //     GraphQLSubscription<OnCreateMessageByRoomIdSubscription>
  //   >(
  //     graphqlOperation(subscriptions.onCreateMessageByRoomId, {
  //       roomId: { selectedRoom },
  //     })
  //   ).subscribe({
  //     // Update current messages here on subscribe
  //     next: ({ value }) => console.log(value.data?.onCreateMessageByRoomId),
  //     error: (error) => console.warn(error),
  //   });
  //   console.log("SUBSCRIPTION", sub);
  //   // Stop receiving data updates from the subscription
  //   return () => sub.unsubscribe();
  // };

  return (
    <>
      <Container
        borderWidth="1px"
        borderRadius="lg"
        borderColor="gray.400"
        m={4}
        display="flex"
        flexDirection="column-reverse"
        overflowY="scroll"
        lineHeight="1.5"
      >
        <CreateNewMessageBox
          setCurrentMessages={setCurrentMessages}
          currentMessages={currentMessages}
        />
        {selectedRoom &&
          currentMessages.map((message) => (
            <MessageItem
              key={message.key}
              message={message.message}
              created_at={message.created_at}
              sender_id={message.sender_id}
            />
          ))}
      </Container>
    </>
  );
};

export default MessageBox;
