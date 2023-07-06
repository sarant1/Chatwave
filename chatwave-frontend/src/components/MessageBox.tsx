import React from "react";
import { Container, Flex } from "@chakra-ui/react";
import CreateNewMessageBox from "./CreateNewMessage";

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
      >
        <CreateNewMessageBox />
      </Container>
    </>
  );
};

export default MessageBox;
