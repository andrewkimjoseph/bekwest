"use client"

import {
    Box,
    Button,
    Select,
    Text,
    Spacer,
    Divider,
    Avatar,
    Card,
    CardBody,
  } from "@chakra-ui/react";
  
  import { ArrowBackIcon } from "@chakra-ui/icons";
  import { useState } from "react";
  import router from "next/router";
  export default function Home() {
    const [entitySelection, setEntitySelection] = useState("Donor");
  
    return (
      <Box className="flex flex-col h-svh align-center" bgColor={"#E6E8FA"}>
        <Box className="flex flex-row items-left items-center py-2 mx-4 relative">
          <Text fontSize={20}>Donation 1</Text>
          <Spacer></Spacer>
          <ArrowBackIcon
            color={"#EB3C7F"}
            onClick={() => router.back()}
            boxSize={6}
          />
        </Box>
  
        <Box px={4}>
          <Divider borderColor="black" />
        </Box>
        <Box w={"full"} px={4} className="flex flex-col" mt={4}>
          <Text fontSize={16}>Topic</Text>
          <Card variant={"outline"} borderRadius={12} w={"full"} mt={2}>
            <CardBody p={3}>
              <Text fontSize={16}>Climate change</Text>
            </CardBody>
          </Card>
        </Box>
        <Box w={"full"} px={4} className="flex flex-col" mt={4}>
          <Text fontSize={16}>Maximum Number Of Applicants</Text>
          <Card variant={"outline"} borderRadius={12} w={"full"} mt={2}>
            <CardBody p={3}>
              <Text fontSize={14}>3</Text>
            </CardBody>
          </Card>
        </Box>
  
  
        <Box w={"full"} px={4} className="flex flex-col" mt={4}>
          <Text fontSize={16}>Net Grant Amount</Text>
          <Card variant={"outline"} borderRadius={12} w={"full"} mt={2}>
            <CardBody p={3}>
              <Text fontSize={14}>1 cUSD</Text>
            </CardBody>
          </Card>
        </Box>
  
        <Box mb={24} bottom={0} px={4} position={"absolute"} className="w-full">
          <Button
            w={"full"}
            onClick={() => router.push("/applicant/1")}
            loadingText="Creating your donor account"
            borderRadius={"10"}
            bgColor={"#EB3C7F"}
            textColor={"white"}
            _hover={{
              bgColor: "#1E1E49",
              textColor: "white",
            }}
          >
            Make application
          </Button>
        </Box>
      </Box>
    );
  }
  