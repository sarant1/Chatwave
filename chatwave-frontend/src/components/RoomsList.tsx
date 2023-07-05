"use client";

import RoomItem from "@/components/RoomItem";
import React from "react";
import { Container, Text, Flex, Icon, useDisclosure } from "@chakra-ui/react";
import { BsPencilSquare } from "react-icons/bs";
import CreateMessageModal from "@/components/CreateMessageModal";
import { useContext } from "react";
import { AuthContext } from "@/contexts/auth.context";
import { Room } from "@/utils/types";

interface RoomsListProps {
  rooms: Room[];
}

const RoomsList: React.FC<RoomsListProps> = ({ rooms }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useContext(AuthContext);

  if (rooms.length > 0) {
    console.log(rooms);
  }

  return (
    <Container
      maxW={{ base: "100vw", md: "sm" }}
      m={0}
      paddingInlineStart={0}
      paddingInlineEnd={0}
      padding={4}
      borderRight={"1px"}
      borderColor="gray.200"
    >
      <Flex justifyContent={"space-between"} alignItems={"center"} m={2}>
        <Text fontSize="xl" fontWeight={"bold"}>
          Messages
        </Text>
        <Icon
          as={BsPencilSquare}
          w={5}
          h={5}
          _hover={{ cursor: "pointer", color: "gray.500" }}
          onClick={onOpen}
        />
      </Flex>
      <CreateMessageModal onClose={onClose} isOpen={isOpen} user={user} />
      {rooms.map((room) => (
        <RoomItem
          user={room.user}
          key={room.key}
          title={room.title}
          avatar_url={room.avatar_url}
          latest_message={room.latest_message}
          latest_message_time={room.latest_message_time}
        />
      ))}
    </Container>
  );
};

export default RoomsList;
