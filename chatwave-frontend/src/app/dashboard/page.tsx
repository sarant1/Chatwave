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
const RoomsPage: React.FC = () => {
  const { user, selectedRoom } = useContext(AuthContext);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [sub, setSub] = useState<any>(null);
  const [currentMessages, setCurrentMessages] = useState<MessageItemProps[]>(
    []
  );
  useEffect(() => {
    fetchRooms();
  }, [user]);

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

  // subscribe to messages for that room
  const subscribeToMessages = () => {
    if (!selectedRoom || !currentMessages) return;
    setSub(
      API.graphql<GraphQLSubscription<OnCreateMessageByRoomIdSubscription>>(
        graphqlOperation(subscriptions.onCreateMessageByRoomId, {
          roomId: selectedRoom.id,
        })
      ).subscribe({
        // Update current messages here on new message
        next: ({ value }) => {
          console.log(value.data?.onCreateMessageByRoomId);
          setCurrentMessages((prevMessages) => [
            value.data?.onCreateMessageByRoomId as MessageItemProps,
            ...prevMessages,
          ]);
        },
        error: (error) => console.warn(error),
      })
    );
    console.log("SUBSCRIPTION", sub);
    // Stop receiving data updates from the subscription
    return () => sub.unsubscribe();
  };

  return (
    <Flex h="92vh">
      <RoomsList rooms={rooms} />
      <MessageBox
        currentMessages={currentMessages}
        setCurrentMessages={setCurrentMessages}
      />
    </Flex>
  );
};

export default RoomsPage;
