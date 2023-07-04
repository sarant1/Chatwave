"use client";

import React from "react";
import RoomsList from "@/components/RoomsList";
import MessageBox from "@/components/MessageBox";
import { Flex } from "@chakra-ui/react";

const RoomsPage: React.FC = () => {
  return (
    <Flex minHeight="92vh">
      <RoomsList />
      <MessageBox />
    </Flex>
  );
};

export default RoomsPage;
