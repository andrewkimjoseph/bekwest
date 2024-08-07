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

  import { Pie } from 'react-chartjs-2';
  import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
  
  ChartJS.register(ArcElement, Tooltip, Legend);
  
  
  import { ArrowBackIcon, CheckCircleIcon } from "@chakra-ui/icons";
  import { useState } from "react";
  import router from "next/router";
  export default function ParticularDonation() {
    const [entitySelection, setEntitySelection] = useState("Donor");


    const data = {
      labels: ['January', 'February', 'March'],
      datasets: [
        {
          label: 'My First Dataset',
          data: [65, 59, 80],
          fill: true,
          backgroundColor: '#EB3C7F',
          borderColor: 'rgba(75, 192, 192, 0.2)',
        },
      ],
    };

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Chart.js Bar Chart',
        },
      },
    };
  
    return (
      <Box className="flex flex-col h-screen align-center" bgColor={"#E6E8FA"}>
        <Box className="flex flex-row items-left items-center py-2 mx-4 relative">
          <Text fontSize={26}>Donation 1: Applications</Text>
  
  
          <Spacer></Spacer>
          <ArrowBackIcon
            color={"#EB3C7F"}
            onClick={() => router.back()}
            boxSize={6}
          />
        </Box>
  
        <Box px={4} mb={2} >
          <Divider borderColor="black" />
        </Box>

        <Box px={4} mb={2} className="align-center justify-center flex flex-row" h={300}>
        {/* <Line data={data} /> */}

        <Pie data={data}  />
        </Box>



      <Box w={"full"} px={4} className="flex flex-col" mt={4}>
        <Text fontSize={16}>Topic</Text>
        <Card variant={"outline"} borderRadius={12} w={"full"} mt={2}>
          <CardBody p={2}>
            <Text fontSize={16} m={1}>I need to improve my livelihood</Text>
          </CardBody>
        </Card>
      </Box>

      <Box w={"full"} px={4} className="flex flex-col" mt={4}>
        <Text fontSize={16}>Maximum Number of Applicants</Text>
        <Card variant={"outline"} borderRadius={12} w={"full"} mt={2}>
          <CardBody p={2}>
            <Text fontSize={16} m={1}>3</Text>
          </CardBody>
        </Card>
      </Box>

      <Box w={"full"} px={4} className="flex flex-col" mt={4}>
        <Text fontSize={16}>Current Number Of Applicants</Text>
        <Card variant={"outline"} borderRadius={12} w={"full"} mt={2}>
          <CardBody p={2}>
            <Text fontSize={16} m={1}>2</Text>
          </CardBody>
        </Card>
      </Box>
  
  

      <Box mb={24} bottom={0} px={4} position={"absolute"} className="w-full">
        <Button
          w={"full"}
          mb={24}
          loadingText="Creating your donor account"
          borderRadius={"10"}
          bgColor={"#1E1E49"}
          textColor={"white"}
          _hover={{
            bgColor: "#EB3C7F",
            textColor: "white",
          }}
        >
          View applications
        </Button>
      </Box>
  


      </Box>
    );
  }
  