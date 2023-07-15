"use client";
import { GraphQLQuery, GraphQLSubscription } from "@aws-amplify/api";
import React, { useContext, useEffect, useState } from "react";
import RoomsList from "@/components/RoomsList";
import MessageBox from "@/components/MessageBox";
import { Flex } from "@chakra-ui/react";
import { getCsrfCookie } from "@/utils/get-csrf-cookies";
import { AuthContext } from "@/contexts/auth.context";
import { Room } from "@/utils/types";
import { refreshToken } from "@/services/auth/refreshToken";
import { onCreateMessageByRoomId } from "@/graphql/subscriptions";
const RoomsPage: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    //   fetchRooms();
  }, [user]);

  // const fetchRooms = async () => {
  //   if (!user) return;
  //   try {
  //     const csrfToken = getCsrfCookie();
  //     const accessToken = await refreshToken();
  //     const response = await fetch(`http://localhost:8080/api/room`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${accessToken}`,
  //         "X-CSRFToken": csrfToken,
  //       },
  //       credentials: "include",
  //     });
  //     const data = await response.json();
  //     setRooms(data);
  //   } catch (error: any) {
  //     console.log(error);
  //   }
  // };

  return (
    <Flex h="92vh">
      <RoomsList rooms={rooms} />
      <MessageBox />
    </Flex>
  );
};

export default RoomsPage;
