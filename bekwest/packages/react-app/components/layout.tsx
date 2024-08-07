import { FC, ReactNode } from "react";
import Header from "./navbar";
import BekwestNavbar from "./navbar";
import { Box } from "@chakra-ui/react";

interface Props {
  children: ReactNode;
}
const Layout: FC<Props> = ({ children }) => {
  return (
    <Box >
      <BekwestNavbar />
      {children}
    </Box>
  );
};

export default Layout;
