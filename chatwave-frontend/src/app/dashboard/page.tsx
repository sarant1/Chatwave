"use client";

import React, { useContext, useEffect } from "react";
import RoomsList from "@/components/RoomsList";
import MessageBox from "@/components/MessageBox";
import { Flex } from "@chakra-ui/react";
import { getCsrfCookie } from "@/utils/get-csrf-cookies";
import { AuthContext } from "@/contexts/auth.context";

const RoomsPage: React.FC = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    console.log("HELLO WORLD");
    fetchRooms();
  }, [user]);

  const fetchRooms = async () => {
    if (!user) return;
    const csrfToken = getCsrfCookie();

    try {
      const response = await fetch(
        `http://localhost:8080/api/room?email=${user.email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken,
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <Flex minHeight="92vh">
      <RoomsList />
      <MessageBox />
    </Flex>
  );
};

export default RoomsPage;
