"use client";

import RoomItem from "@/components/RoomItem";
import React from "react";
import { Container, Text, Flex, Icon, useDisclosure } from "@chakra-ui/react";
import { BsPencilSquare } from "react-icons/bs";
import CreateMessageModal from "@/components/CreateMessageModal";
import { useContext } from "react";
import { AuthContext } from "@/contexts/auth.context";
import { Room } from "@/API";

interface RoomsListProps {
  rooms: Room[];
}

const RoomsList: React.FC<RoomsListProps> = ({ rooms }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, setSelectedRoom } = useContext(AuthContext);

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
          key={room.sk}
          title={room.title}
          latestMessage={room.latestMessage}
          latestMessageTime={room.latestMessageTime}
          setSelectedRoom={setSelectedRoom}
          sk={room.sk}
          __typename="Room"
        />
      ))}
    </Container>
  );
};

export default RoomsList;
