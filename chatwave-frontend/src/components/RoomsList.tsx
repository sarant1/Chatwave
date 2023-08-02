"use client";

import RoomItem from "@/components/RoomItem";
import React, { useEffect } from "react";
import { Container, Text, Flex, Icon, useDisclosure } from "@chakra-ui/react";
import { BsPencilSquare } from "react-icons/bs";
import CreateMessageModal from "@/components/CreateMessageModal";
import { useContext } from "react";
import { AuthContext } from "@/contexts/auth.context";
import { Room } from "@/API";
import { MessageItemProps } from "@/utils/types";

interface RoomsListProps {
  rooms: Room[];
  newMessage: MessageItemProps | null | undefined;
}

const RoomsList: React.FC<RoomsListProps> = ({ rooms, newMessage }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, selectedRoom } = useContext(AuthContext);
  const [refresh, setRefresh] = React.useState(false);

  useEffect(() => {
    console.log("neww message: ", newMessage?.message);
    if (newMessage) {
      let index = rooms.findIndex((room) => room.roomId === newMessage?.roomId);
      if (index !== -1) {
        rooms[index].latestMessage = newMessage?.message || "new message";
        rooms[index].latestMessageTime = newMessage?.updatedAt;
      } else {
        console.log("INDEX not found ");
      }
      setRefresh(!refresh);
    }
  }, [newMessage]);

  return (
    <Container
      maxW={{ base: "100vw", md: "lg" }}
      display={{ base: selectedRoom ? "none" : "", xl: "block" }}
      paddingInlineStart={0}
      paddingInlineEnd={0}
      padding={2}
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
          roomId={room.roomId}
          avatarUrl={room.avatarUrl}
          latestMessage={room.latestMessage}
          latestMessageTime={room.latestMessageTime}
          sk={room.sk}
          __typename="Room"
        />
      ))}
    </Container>
  );
};

export default RoomsList;
