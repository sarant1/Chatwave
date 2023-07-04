import { Avatar, Box, Container, Flex, Text } from "@chakra-ui/react";
import React from "react";

const RoomItem: React.FC = () => {
  return (
    <Box
      p={3}
      minW="100%"
      borderWidth="2px"
      borderColor="gary.400"
      borderRadius="lg"
      mb={2}
      _hover={{ cursor: "pointer", bg: "gray.300" }}
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
  );
};

export default RoomItem;
