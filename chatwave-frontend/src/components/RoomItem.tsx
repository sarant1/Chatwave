import { Avatar, Box, Container, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Room } from "@/utils/types";

const RoomItem: React.FC<Room> = (props) => {
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
        <Avatar size="md" mr={3} src={props.avatar_url} />
        <Flex w="full" flexDir={"column"}>
          <Flex justifyContent="space-between" w="full">
            <Text fontWeight="bold">{props.title}</Text>
            <Text color="gray.600">3:41ppm</Text>
          </Flex>
          <Text>{props.latest_message}</Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default RoomItem;
