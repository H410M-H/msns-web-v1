import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Footer } from "../_components/footer/footer";
import { Header } from "../_components/header/header";
import { HorizontalMenu } from "../_components/menubar/menubar";

export const metadata = {
  title: "MSNS-WEB | Clerk ",
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
      <HorizontalMenu />
      {children}
    </ScrollArea>
    <Footer />
    </body>
    </>
  );
}