"use client";
import React, { useContext, useEffect, useState } from "react";
import RoomsList from "@/components/RoomsList";
import MessageBox from "@/components/MessageBox";
import { Flex, Box } from "@chakra-ui/react";
import { AuthContext } from "@/contexts/auth.context";
import { Room } from "@/API";
import { API } from "aws-amplify";
import * as queries from "@/graphql/queries";
import { ListRoomsQuery } from "@/API";
import { MessageItemProps } from "@/utils/types";
import { OnCreateMessageByRoomIdSubscription } from "@/API";
import * as subscriptions from "@/graphql/subscriptions";
import { GraphQLSubscription, GraphQLQuery } from "@aws-amplify/api";
import { graphqlOperation } from "aws-amplify";
import { subscribe } from "diagnostics_channel";
const RoomsPage: React.FC = () => {
  const { user, selectedRoom } = useContext(AuthContext);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [currentMessages, setCurrentMessages] = useState<MessageItemProps[]>(
    []
  );
  const [sub, setSub] = useState<any>();
  const [newMessage, setNewMessage] = useState<MessageItemProps>();

  useEffect(() => {
    fetchRooms();
  }, [user]);

  useEffect(() => {
    if (sub) {
      sub.unsubscribe();
    }
    subscribeToRooms();
  }, [rooms, selectedRoom]);

  const fetchRooms = async () => {
    if (!user) return;
    try {
      const rooms = await API.graphql<GraphQLQuery<ListRoomsQuery>>({
        query: queries.listRooms,
      });
      console.log(rooms);
      setRooms(rooms.data?.listRooms as Room[]);
    } catch (err) {
      console.log(err);
    }
  };

  // this will subscribe to all rooms in the list and all messages
  const subscribeToRooms = () => {
    if (!user) return;
    setSub(
      rooms.forEach((room) => {
        API.graphql<GraphQLSubscription<OnCreateMessageByRoomIdSubscription>>(
          graphqlOperation(subscriptions.onCreateMessageByRoomId, {
            roomId: room.roomId,
          })
        ).subscribe({
          next: ({ value }) => {
            const message = value.data?.onCreateMessageByRoomId;
            if (message?.roomId === selectedRoom?.id) {
              setCurrentMessages((prev) => [
                message as MessageItemProps,
                ...prev,
              ]);
            } else {
              console.log("NEW MESSAGE IN ANOTHER ROOM");
              setNewMessage(message as MessageItemProps);
            }
          },
          error: (error) => console.warn(error),
        });
      })
    );
    console.log("SUBSCRIBED :)");
  };

  return (
    <Flex h="92vh">
      <RoomsList rooms={rooms} newMessage={newMessage} />
      <MessageBox
        currentMessages={currentMessages}
        setCurrentMessages={setCurrentMessages}
      />
    </Flex>
  );
};

export default RoomsPage;
