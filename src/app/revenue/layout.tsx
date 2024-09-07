import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Footer } from "../_components/footer/footer";
import { Header } from "../_components/header/header";
import MainMenu from "../_components/mainmenu/mainmenu";

export const metadata = {
  title: "MSNS-WEB",
  description: "Clerk Dashbaord",
  icons: [{ rel: "icon", url: "/logo/logo-white.png" }],
};

export default function RevenueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <body>
    <Header />
      <ScrollArea className="rounded-lg shadow-md">
      {children}
      <MainMenu />
    </ScrollArea>
    <Footer />
    </body>
    </>
  );
}
