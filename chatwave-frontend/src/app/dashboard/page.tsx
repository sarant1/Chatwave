"use client";
import React, { useContext, useEffect, useState } from "react";
import RoomsList from "@/components/RoomsList";
import MessageBox from "@/components/MessageBox";
import { Flex } from "@chakra-ui/react";
import { AuthContext } from "@/contexts/auth.context";
import { Room } from "@/API";
import { API } from "aws-amplify";
import { GraphQLQuery } from "@aws-amplify/api";
import * as queries from "@/graphql/queries";
import { ListRoomsQuery } from "@/API";
const RoomsPage: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    fetchRooms();
  }, [user]);

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

  return (
    <Flex h="92vh">
      <RoomsList rooms={rooms} />
      <MessageBox />
    </Flex>
  );
};

export default RoomsPage;
