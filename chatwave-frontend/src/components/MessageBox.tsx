import React from "react";
import { Container } from "@chakra-ui/react";

const MessageBox: React.FC = () => {
  return (
    <>
      <Container
        borderWidth="1px"
        borderRadius="lg"
        borderColor="gary.200"
        m={4}
      ></Container>
    </>
  );
};

export default MessageBox;
