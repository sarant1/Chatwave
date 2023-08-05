"use client";
import { Spinner, Flex } from "@chakra-ui/react";
import React, { useEffect, useContext, useState } from "react";
import { Container, IconButton } from "@chakra-ui/react";
import CreateNewMessageBox from "./CreateNewMessage";
import MessageItem from "@/components/MessageItem";
import { MessageItemProps } from "@/utils/types";
import { AuthContext } from "@/contexts/auth.context";
import { API, graphqlOperation } from "aws-amplify";
import { GraphQLQuery } from "@aws-amplify/api";
import * as queries from "@/graphql/queries";
import { ListMessagesQuery } from "@/API";
import { BiArrowBack } from "react-icons/bi";

interface MessageBoxProps {
  currentMessages: MessageItemProps[];
  setCurrentMessages: React.Dispatch<React.SetStateAction<MessageItemProps[]>>;
}

const MessageBox: React.FC<MessageBoxProps> = ({
  currentMessages,
  setCurrentMessages,
}) => {
  const { selectedRoom, setSelectedRoom } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!selectedRoom.id) return;
    fetchMessages();
  }, [selectedRoom]);

  // query messages
  const fetchMessages = async () => {
    if (!selectedRoom.id) return;
    setIsLoading(true);
    try {
      const messages = await API.graphql<GraphQLQuery<ListMessagesQuery>>(
        graphqlOperation(queries.listMessages, { roomId: selectedRoom.id })
      );
      setCurrentMessages(messages.data?.listMessages as MessageItemProps[]);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <Flex
      display={{ base: selectedRoom.id ? "flex" : "none", xl: "flex" }}
      flexDir="column"
      w="full"
      h="full"
      justifyContent="center"
      alignItems={{ base: "center", xl: "flex-start" }}
    >
      <IconButton
        aria-label="back"
        display={selectedRoom.id ? "flex" : "none"}
        icon={<BiArrowBack />}
        mx={4}
        my={1}
        onClick={() => {
          setSelectedRoom({ id: null, title: null });
          setCurrentMessages([]);
          console.log("selected room to null: ", selectedRoom);
        }}
      >
        Test
      </IconButton>
      <Container
        borderWidth="1px"
        borderRadius="lg"
        borderColor={{ base: "", xl: "gray.400" }}
        mx={4}
        mb={4}
        display={selectedRoom.id ? "flex" : "none"}
        flexDirection="column-reverse"
        overflowY="scroll"
        lineHeight="1.5"
        flex="1"
        justifyContent={isLoading && selectedRoom.id ? "center" : ""}
        paddingInlineStart={{ base: "2px", xl: 4 }}
        paddingInlineEnd={{ base: "2px", xl: 3 }}
      >
        {isLoading && selectedRoom.id ? (
          <Flex justifyContent="center" alignItems="center">
            <Spinner size="xl" />
          </Flex>
        ) : (
          <>
            <CreateNewMessageBox />
            {selectedRoom.id &&
              currentMessages.map((message) => (
                <MessageItem
                  type={message.type}
                  key={message.key}
                  imageKey={message.imageKey}
                  message={message.message}
                  updatedAt={message.updatedAt}
                  senderEmail={message.senderEmail}
                  roomId={message.roomId}
                  otherUserEmail={message.otherUserEmail}
                />
              ))}
          </>
        )}
      </Container>
    </Flex>
  );
};

export default MessageBox;
