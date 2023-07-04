"use client";

import {
  Flex,
  Box,
  FormErrorMessage,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Divider,
  useToast,
} from "@chakra-ui/react";

import { FormEvent, FormEventHandler, useState } from "react";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

type FormData = {
  newPassword: string;
  confirmNewPassword: string;
};

import { zodResolver } from "@hookform/resolvers/zod";

import {
  ResetPasswordProps,
  ResetPasswordSchema,
  ResetPasswordSupportingDataProps,
} from "@/utils/validators/resetPassword.validator";

import amplifyConfigure from "@/utils/configure-amplify";

// run in every auth page
amplifyConfigure();

import { ErrorManager, ErrorResponse } from "@/utils/exceptions/errorManager";

import { resetPassword } from "@/services/auth/resetPassword";

export default function ResetPasswordPage() {
  const router = useRouter();
  const toast = useToast();

  const searchParams = useSearchParams();
  const verificationCode = searchParams.get("verificationCode") ?? "";
  const email = searchParams.get("email") ?? "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const [error, setError] = useState<ErrorResponse>({});
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: FormEventHandler<HTMLFormElement> = handleSubmit(
    async (data) => {
      setIsLoading(true);
      try {
        const resetPasswordData: ResetPasswordProps &
          ResetPasswordSupportingDataProps = {
          newPassword: data.newPassword,
          confirmNewPassword: data.confirmNewPassword,
          email: email,
          verificationCode: verificationCode,
        };

        const response = await resetPassword(resetPasswordData);
        setIsLoading(false);

        // set the userId in localstorage
        // localStorage.setItem('userId', JSON.stringify(response?.userId))

        // toast({
        //   title: "Password Reset!",
        //   description: "You've successfully reset your password",
        //   status: 'success',
        //   position: 'top',
        //   duration: 4000,
        //   isClosable: true,
        // });

        // setTimeout(() => {
        //   router.push('/auth/login');
        // }, 1000);
      } catch (err) {
        if (err instanceof Error) {
          setIsLoading(false);
          const errorResponse: ErrorResponse = ErrorManager.handle(err);
          setError(errorResponse);

          toast({
            title: errorResponse.title,
            description: errorResponse.message,
            status: "error",
            position: "top",
            duration: 5000,
            isClosable: true,
          });

          if (errorResponse.title === "User is not confirmed") {
            setTimeout(() => {
              toast({
                title: "Redirection Notice",
                description:
                  "You're about to be redirected to the code dashboard page",
                status: "warning",
                position: "top",
                duration: 4000,
                isClosable: true,
              });

              setTimeout(() => {
                router.push(`/dashboard`);
              }, 4000);
            }, 6000);
          }
        }
      }
    }
  );

  return (
    <>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Reset password</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              Enter and confirm your new password
            </Text>
          </Stack>

          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <form onSubmit={onSubmit}>
                <FormControl
                  id="newPassword"
                  isInvalid={!!errors.newPassword}
                  marginBottom={"4"}
                >
                  <FormLabel>New password</FormLabel>
                  <Input
                    {...register("newPassword")}
                    type="password"
                    autoComplete="off"
                    placeholder="Enter your new password"
                  />
                  <FormErrorMessage>
                    {errors.newPassword && errors.newPassword?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl
                  id="confirmNewPassword"
                  isInvalid={!!errors.confirmNewPassword}
                  marginBottom={"4"}
                >
                  <FormLabel>Confirm new password</FormLabel>
                  <Input
                    {...register("confirmNewPassword")}
                    type="password"
                    autoComplete="off"
                    placeholder="Confirm new password"
                  />
                  <FormErrorMessage>
                    {errors.confirmNewPassword &&
                      errors.confirmNewPassword?.message}
                  </FormErrorMessage>
                </FormControl>

                <Stack spacing={10}>
                  <Button
                    type="submit"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    isLoading={isLoading}
                  >
                    Reset Password
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
