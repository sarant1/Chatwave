import React from "react";
import { Container, Flex } from "@chakra-ui/react";
import CreateNewMessageBox from "./CreateNewMessage";
import MessageItem from "./MessageItem";

const MessageBox: React.FC = () => {
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
      >
        <CreateNewMessageBox />
        <MessageItem message={"How are you doing"} sender={true} />
        <MessageItem message={"I am great and you!"} sender={false} />
        <MessageItem message={"awesome thanks"} sender={true} />
      </Container>
    </>
  );
};

export default MessageBox;
