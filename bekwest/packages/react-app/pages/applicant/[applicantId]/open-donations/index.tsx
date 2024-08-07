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
  export default function ParticularDonation() {
    const [entitySelection, setEntitySelection] = useState("Donor");
  
    return (
      <Box className="flex flex-col h-screen align-center" bgColor={"#E6E8FA"}>
        <Box className="flex flex-row items-left items-center py-2 mx-4 relative">
          <Text fontSize={26}>Applications Made</Text>
  
  
          <Spacer></Spacer>
          <ArrowBackIcon
            color={"#EB3C7F"}
            onClick={() => router.back()}
            boxSize={6}
          />
        </Box>
  
        <Box px={4} mb={2}>
          <Divider borderColor="black" />
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
  
    
      </Box>
    );
  }
  