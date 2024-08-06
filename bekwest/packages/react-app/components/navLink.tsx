import { ReactNode } from "react";
import { Link } from "@chakra-ui/react";
interface NavLinkProps {
  children: ReactNode;
  href: string;
}

const NavLink = ({ children, href }: NavLinkProps) => (
  <Link
    px={3}
    py={2}
    rounded={"md"}
    textColor={"white"}
    fontSize={"16px"}
    fontWeight={"bold"}
    _hover={{
      textColor: "white",
      textDecoration: "none",
      bg: "#EB3C7F",
    }}
    href={href}
  >
    {children}
  </Link>
);

export default NavLink;