import { FC, ReactNode } from "react";
import Header from "./navbar";
import BekwestNavbar from "./navbar";

interface Props {
    children: ReactNode;
}
const Layout: FC<Props> = ({ children }) => {
    return (
        <>
            <div className="">
                <BekwestNavbar />
                <div className="">
                    {children}
                </div>
            </div>
        </>
    );
};

export default Layout;
