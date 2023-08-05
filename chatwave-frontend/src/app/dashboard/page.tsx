"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
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
  const [newMessage, setNewMessage] = useState<MessageItemProps>();

  useEffect(() => {
    fetchRooms();
    subToOnCreateRoom();
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const sub = API.graphql<
      GraphQLSubscription<OnCreateMessageByRoomIdSubscription>
    >(
      graphqlOperation(subscriptions.onCreateMessageByRoomId, {
        roomId: selectedRoom.id,
      })
    ).subscribe({
      next: ({ value }) => {
        const message = value.data?.onCreateMessageByRoomId;
        console.log("THE INCOMING MESSAGE IS: ", message);
        if (!selectedRoom.id || !message) return;
        if (message.roomId === selectedRoom?.id) {
          setCurrentMessages((prev) => [message as MessageItemProps, ...prev]);
        } else {
          setNewMessage(message as MessageItemProps);
        }
      },
      error: (error) => console.warn(error),
    });

    return () => {
      sub.unsubscribe();
    };
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
    console.log("fetching rooms...");
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
