import { Avatar, Box, Container, Flex, Text } from "@chakra-ui/react";
import React from "react";

const RoomItem: React.FC = () => {
  return (
    <Container
      maxW={{ base: "100vw", md: "sm" }}
      minH="100vh"
      m={0}
      paddingInlineStart={0}
      paddingInlineEnd={0}
      padding={0}
    >
      <Box
        p={3}
        minW="100%"
        borderWidth="1px"
        borderBottom="1px"
        borderColor="black"
        m={0}
      >
        <Flex>
          <Avatar
            size="md"
            mr={3}
            src={
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            }
          />
          <Flex w="full" flexDir={"column"}>
            <Flex justifyContent="space-between" w="full">
              <Text fontWeight="bold">elon@gmail.com</Text>
              <Text color="gray.600">3:41pm</Text>
            </Flex>
            <Text>Hello how is the weather today ?</Text>
          </Flex>
        </Flex>
      </Box>
    </Container>
  );
};

export default RoomItem;
