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
  useToast
} from "@chakra-ui/react";

import { FormEventHandler, useState } from "react";

import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';

type FormData = {
  email: string;
  password: string;
};

import { zodResolver } from "@hookform/resolvers/zod";

import { forgotPassword } from "@/services/auth/forgotPassword";
import { ForgotPasswordProps, ForgotPasswordSchema } from "@/utils/validators/forgotPassword.validator";

import amplifyConfigure from "@/utils/configure-amplify";

// run in every auth page
amplifyConfigure();

import { ErrorManager, ErrorResponse } from "@/utils/exceptions/errorManager";

export default function ForgotPasswordPage() {

  const router = useRouter();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const [error, setError] = useState<ErrorResponse>({});
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: FormEventHandler<HTMLFormElement> = handleSubmit(async (data) => {
    console.log("errors:", errors)
    setIsLoading(true)
    try {
      const forgotPasswordData: ForgotPasswordProps = {
        email: data.email,
      };

      const response = await forgotPassword(forgotPasswordData);
      setIsLoading(false);

      toast({
        title: "Success",
        description: "You've been sent a reset password link in your email",
        status: 'success',
        position: 'top',
        duration: 4000,
        isClosable: true,
      });

    } catch (err) {
      if (err instanceof Error) {
        setIsLoading(false);
        const errorResponse: ErrorResponse = ErrorManager.handle(err);
        setError(errorResponse);

        toast({
          title: errorResponse.title,
          description: errorResponse.message,
          status: 'error',
          position: 'top',
          duration: 5000,
          isClosable: true,
        });

        if (errorResponse.title === 'User is not confirmed') {
          setTimeout(() => {
            toast({
              title: "Redirection Notice",
              description: "You're about to be redirected to the code verification page",
              status: 'warning',
              position: 'top',
              duration: 4000,
              isClosable: true,
            });

            setTimeout(() => {
              router.push(`/verify?email=${data.email}`);
            }, 4000);
          }, 6000);
        }
      }
    } 
  });

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
            <Heading fontSize={"4xl"}>Forgot your password?</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
                You will recieve a email with a reset link
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
                  id="email" 
                  isInvalid={!!errors.email}
                  marginBottom={'4'}
                >
                  <FormLabel>Email address</FormLabel>
                  <Input
                    {...register("email")}
                    type="email"
                    autoComplete="off"
                    placeholder='Enter your email'
                  />
                  <FormErrorMessage>
                    {errors.email && errors.email?.message}
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
                    Request Password Reset Link
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Box>

          <Text fontSize={"lg"} color={"gray.600"} textAlign="center">
            Did not get a reset link? <Link color={"blue.400"} href='/signup'>Resend link</Link>
          </Text>
        </Stack>
      </Flex>
    </>
  );
}
