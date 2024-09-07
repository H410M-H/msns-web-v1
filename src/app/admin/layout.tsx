import React, { type ReactNode } from "react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Header } from "~/app/_components/header/header";
import { Footer } from "~/app/_components/footer/footer";
import MainMenu from "../_components/mainmenu/mainmenu";

interface AdminDashboardLayoutProps {
  children: ReactNode; // ReactNode includes any valid JSX children
}

const AdminDashboardLayout: React.FC<AdminDashboardLayoutProps> = ({ children }) => {
  return (
    <body>
      <ScrollArea className="rounded-lg shadow-md">
        <Header />
        <MainMenu />
      {children}
    </ScrollArea>
    <Footer />
    </body>
  );
};

export default AdminDashboardLayout;