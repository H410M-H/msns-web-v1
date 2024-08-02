import {
    PersonIcon,
    BarChartIcon,
    GearIcon,
  } from "@radix-ui/react-icons";
  import { NotebookPenIcon, PlusCircleIcon, UsersIcon } from "lucide-react";
  import Link from "next/link";
  
  export const AdminCards = () => {
    const services = [
      {
        title: "Profile",
        description:
          "View/ modify Profile settings",
        icon: <PersonIcon className="mb-4 h-12 w-12 text-green-500" />,
        href: "/admin/profile",
      },
      {
        title: "Faculty",
        description:
          "Manage Faculty preferences",
        icon: <UsersIcon className="mb-4 h-12 w-12 text-blue-500" />,
        href: "/admin/alumni",
      },
      {
        title: "User Management",
        description:
          "Easily enroll new students and manage their financial records.",
        icon: <PlusCircleIcon className="mb-4 h-12 w-12 text-blue-500" />,
        href: "/registration/portal",
      },
      {
        title: "Academics",
        description: "Create and manage new classes or courses for the school.",
        icon: <NotebookPenIcon className="mb-4 h-12 w-12 text-indigo-500" />,
        href: "/admin/academics",
      },
      {
        title: "Revenue & Finance",
        description: "Generate comprehensive financial reports and analytics.",
        icon: <BarChartIcon className="mb-4 h-12 w-12 text-purple-500" />,
        href: "/revenue",
      },
      {
        title: "Settings",
        description: "Customize Settings & Preferences",
        icon: <GearIcon className="mb-4 h-12 w-12 text-red-500" />,
        href: "/admin/settings",
      },
    ];
  
    return (
      <section className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <Link
            href={service.href}
            key={index}
            className="transform rounded-lg bg-yellow-100 p-6 shadow-md transition duration-300 ease-in-out hover:scale-105 hover:cursor-pointer"
          >
            <div className="flex flex-col items-center text-center">
              {service.icon}
              <h3 className="mb-2 text-xl font-semibold">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          </Link>
        ))}
      </section>
    );
  };
  