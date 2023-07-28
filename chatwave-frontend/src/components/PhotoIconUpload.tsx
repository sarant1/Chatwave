import { Box, CloseButton, Spinner, IconButton, Input } from "@chakra-ui/react";
import React, { ChangeEvent, useEffect, useState } from "react";
import { AiFillPicture } from "react-icons/ai";

interface PhotoIconUploadProps {
  file: Blob | null | undefined;
  setFile: React.Dispatch<React.SetStateAction<Blob | null | undefined>>;
  setImageKey: React.Dispatch<React.SetStateAction<string | null>>;
  setFormData: React.Dispatch<React.SetStateAction<FormData | null>>;
  setPresignedUrl: React.Dispatch<React.SetStateAction<string | null>>;
}
interface Fields {
  "Content-Type": String;
  bucket: String;
  "X-Amz-Algorithm": String;
  "X-Amz-Credential": String;
  "X-Amz-Date": String;
  "X-Amz-Security-Token": String;
  key: String;
  policy: String;
  "x-amz-signature": String;
}
interface S3UploadResponse {
  url: String;
  fields: Fields;
  key: String;
}

const PhotoIconUpload = ({
  file,
  setFile,
  setImageKey,
  setFormData,
  setPresignedUrl,
}: PhotoIconUploadProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    getPresignedUrl();
  }, [file]);
  const getPresignedUrl = async () => {
    setIsLoading(true);
    try {
      const url = process.env.NEXT_PUBLIC_PRESIGNED_URL_ENDPOINT;
      const formData = new FormData();
      if (!url) {
        throw new Error(
          "presigned_url_endpoint is not defined in the environment variables"
        );
      }
      const response = await fetch(url, {
        method: "GET",
      });
      const data: S3UploadResponse = await response.json();
      setImageKey(data.key.toString()); // Ensure the key is a string primitive
      Object.entries(data.fields).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append("file", file as File);
      setFormData(formData);
      setPresignedUrl(data.url.toString());
    } catch (error) {
      console.log(error);
      setFile(null);
    }
    setIsLoading(false);
  };
  return (
    <div>
      <Box position="relative" display="inline-block">
        <IconButton
          aria-label="upload picture"
          icon={
            !isLoading ? <AiFillPicture size={30} /> : <Spinner size="sm" />
          }
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("fileinput")?.click();
          }}
          backgroundColor={file && !isLoading ? "green.200" : "none"}
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
        accept=".png,.jpeg"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setFile(e.target.files?.[0]);
        }}
      />
    </div>
  );
};

export default PhotoIconUpload;
