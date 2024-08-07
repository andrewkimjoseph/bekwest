import {
    Box,
    Button,
    Select,
    Text,
    Spacer,
    Divider,
    Card,
    CardBody,
    Avatar,
    AvatarBadge,
    AvatarGroup,
  } from "@chakra-ui/react";
  
  import { ArrowBackIcon, CheckCircleIcon } from "@chakra-ui/icons";
  import { useState } from "react";
  import router from "next/router";
  export default function Home() {
    const [entitySelection, setEntitySelection] = useState("Donor");
  
    return (
      <Box className="flex flex-col h-screen align-center" bgColor={"#E6E8FA"}>
        <Box className="flex flex-row items-left items-center py-2 mx-4 relative">
          <Text fontSize={26}>Welcome, AK!</Text>
  
          <CheckCircleIcon
            color={"#EB3C7F"}
            onClick={() => router.back()}
            ml={2}
            boxSize={6}
          />
  
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
  
        <Box className="flex flex-row items-left items-center py-2 mx-4 mt-4 relative">
          <Text fontSize={20} mr={4}>
            Donation(s) Created:
          </Text>
          {/* <Spacer></Spacer> */}
          <Text fontWeight={"bold"} fontSize={"20"}>
            4
          </Text>
        </Box>
  
        <Box className="flex flex-row items-left items-center py-2 mx-4 mb-4 relative">
          <Text fontSize={20} mr={4}>
            Amount Donated:{" "}
          </Text>
          {/* <Spacer></Spacer> */}
          <Text fontWeight={"bold"} fontSize={"20"}>
            10 cUSD
          </Text>
        </Box>
  
        <Box px={4}>
          <Divider borderColor="black" />
        </Box>
  
        
  
        <Box w={"full"} px={4} className="flex flex-col" mt={4}>
          <Text fontSize={22} mb={2}>
            Created Donations
          </Text>
        </Box>
  
        <Box overflowY="auto">
          {[1, 2, 3, 4, 5, 6].map((survey) => (
            <div>
              <Box className="flex flex-row items-left items-center py-2 mx-4 relative">
                <Card variant={"elevated"} borderRadius={12} w={"full"}>
                  <CardBody>
                    <Box className="flex flex-row items-left items-center relative">
                      <Avatar
                        name="Sasuke Uchiha"
                        size="lg"
                        bgColor={"#EB3C7F"}
                      />
  
                      <Box className="flex flex-col items-left relative ml-4">
                        <Text fontSize={20} mb={2}>
                          Topic: Climate change
                        </Text>
                        <Text fontSize={20} mb={2}>
                          Amount: 5
                        </Text>
                      </Box>
                    </Box>
                  </CardBody>
                </Card>
              </Box>
            </div>
          ))}
        </Box>
  
        <Box px={4} mt={10} mb={16} className="w-full">
          <Button
            w={"full"}
            mb={24}
            boxShadow="base"
            loadingText="Creating your donor account"
            borderRadius={"10"}
            bgColor={"#EB3C7F"}
            textColor={"white"}
            _hover={{
              bgColor: "#1E1E49",
              textColor: "white",
            }}
          >
            Create your donor account
          </Button>
        </Box>
      </Box>
    );
  }
  