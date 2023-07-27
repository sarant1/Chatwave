import { Box, CloseButton, Flex, IconButton, Input } from "@chakra-ui/react";
import React, { ChangeEvent, useState } from "react";
import { AiFillPicture } from "react-icons/ai";

interface PhotoIconUploadProps {
  file: File | null | undefined;
  setFile: React.Dispatch<React.SetStateAction<File | null | undefined>>;
}

const PhotoIconUpload = ({ file, setFile }: PhotoIconUploadProps) => {
  return (
    <div>
      <Box position="relative" display="inline-block">
        <IconButton
          aria-label="upload picture"
          icon={<AiFillPicture size={30} />}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("fileinput")?.click();
          }}
          backgroundColor={file ? "green.200" : "none"}
        />
        {file && (
          <CloseButton
            size="sm"
            color="red.500"
            position="absolute"
            top="-10px"
            right="-10px"
            onClick={() => setFile(null)}
          />
        )}
      </Box>
      <Input // handle file upload
        type="file"
        display="none"
        id="fileinput"
        accept=".png, .jpg, .jpeg"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setFile(e.target.files?.[0]);
          if (file) {
            console.log(file);
          }
        }}
      />
    </div>
  );
};

export default PhotoIconUpload;
