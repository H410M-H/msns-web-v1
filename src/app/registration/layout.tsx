import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Header } from "../_components/header/header";
import MainMenu from "../_components/mainmenu/mainmenu";

export const metadata = {
  title: "MSNS-LMS | Online Registration",
  description: "Clerk Dashbaord",
  icons: [{ rel: "icon", url: "/logo/logo-white.png" }],
};

export default function RegistrationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <body>
    <Header />
      <ScrollArea className="rounded-lg shadow-md">
        <MainMenu />
      {children}
    </ScrollArea>
    </body>
    </>
  );
}