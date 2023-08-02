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
import {
  OnCreateMessageByRoomIdSubscription,
  OnCreateRoomSubscription,
} from "@/API";
import * as subscriptions from "@/graphql/subscriptions";
import { GraphQLSubscription, GraphQLQuery } from "@aws-amplify/api";
import { graphqlOperation } from "aws-amplify";

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
    subToOnCreateRoom();
  }, [user]);

  useEffect(() => {
    if (sub) {
      sub.unsubscribe();
    }
    subscribeToRooms();
  }, [rooms, selectedRoom]);

  const subToOnCreateRoom = () => {
    if (!user) return;
    API.graphql<GraphQLSubscription<OnCreateRoomSubscription>>(
      graphqlOperation(subscriptions.onCreateRoom, {
        title: user.email,
      })
    ).subscribe({
      next: ({ value }) => {
        console.log("NEW ROOM: ", value.data?.onCreateRoom);
        let incomingRoom = value.data?.onCreateRoom as Room;
        if (incomingRoom.senderEmail != user.email) {
          incomingRoom.title = incomingRoom.senderEmail;
          console.log("INCOMING ROOM: ", incomingRoom);
        }
        setRooms((prev) => [incomingRoom, ...prev]);
      },
      error: (error) => console.warn(error),
    });
  };

  const fetchRooms = async () => {
    if (!user) return;
    try {
      const rooms = await API.graphql<GraphQLQuery<ListRoomsQuery>>({
        query: queries.listRooms,
      });
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
      <RoomsList rooms={rooms} setRooms={setRooms} newMessage={newMessage} />
      <MessageBox
        currentMessages={currentMessages}
        setCurrentMessages={setCurrentMessages}
      />
    </Flex>
  );
};

export default RoomsPage;
