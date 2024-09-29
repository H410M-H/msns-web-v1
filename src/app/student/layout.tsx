import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Header } from "../_components/shared/header/header";
import MainMenu from "../_components/shared/mainmenu/mainmenu";

export const metadata = {
  title: "MSNS-WEB | Revenue",
  description: "Clerk Dashbaord",
  icons: [{ rel: "icon", url: "/logo/logo-white.png" }],
};

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <><Header /><ScrollArea className="rounded-lg shadow-md">
      <MainMenu />
      {children}
    </ScrollArea></>
  );
}
