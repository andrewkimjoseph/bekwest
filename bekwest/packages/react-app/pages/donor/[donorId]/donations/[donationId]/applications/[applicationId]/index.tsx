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
    <Box className="flex flex-col h-screen align-center" bgColor={"#E6E8FA"}>
      <Box className="flex flex-row items-left items-center py-2 mx-4 relative">
        <Text fontSize={20}>Donation 0: Application 0</Text>
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
        <Text fontSize={16}>Applicant Age Bracket</Text>
        <Card variant={"outline"} borderRadius={12} w={"full"} mt={2}>
          <CardBody>
            <Text fontSize={16}>18 - 22 years</Text>
          </CardBody>
        </Card>
      </Box>
      <Box w={"full"} px={4} className="flex flex-col" mt={4}>
        <Text fontSize={16}>Applicant Country of Residence</Text>
        <Card variant={"outline"} borderRadius={12} w={"full"} mt={2}>
          <CardBody>
            <Text fontSize={16}>Kenya</Text>
          </CardBody>
        </Card>
      </Box>


      <Box w={"full"} px={4} className="flex flex-col" mt={4}>
        <Text fontSize={16}>Pitch statement for Donation 1</Text>
        <Card variant={"outline"} borderRadius={12} w={"full"} mt={2}>
          <CardBody>
            <Text fontSize={16}>I need to improve my livelihood</Text>
          </CardBody>
        </Card>
      </Box>

      <Box mb={24} bottom={0} px={4} position={"absolute"} className="w-full">
        <Button
          w={"full"}
          onClick={() => router.push("/donor/1")}
          mb={24}
          loadingText="Creating your donor account"
          borderRadius={"10"}
          bgColor={"#EB3C7F"}
          textColor={"white"}
          _hover={{
            bgColor: "#1E1E49",
            textColor: "white",
          }}
        >
          Approve application
        </Button>
      </Box>
    </Box>
  );
}
