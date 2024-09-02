import {
    BarChartIcon,
    GearIcon,
  } from "@radix-ui/react-icons";
  import { NotebookPenIcon, UsersIcon } from "lucide-react";
  import Link from "next/link";
  
  export const AdminCards = () => {
    const services = [
      {
        title: "Faculty",
        description:
          "Manage Faculty preferences",
        icon: <UsersIcon className="mb-4 h-12 w-12 text-blue-500" />,
        href: "/admin/alumni",
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
        icon: <BarChartIcon className="mb-4 h-12 w-12 text-green-500" />,
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
<div className="bg-[url('/jpg/Schoolview.jpg')] bg-cover bg-center flex items-center justify-center animate-fade-in">
      <div className="grid grid-cols-1 p-8 gap-8 sm:grid-cols-2 max-w-4xl w-full animate-slide-in-up">
        {services.map((service, index) => (
          <Link
            href={service.href}
            key={index}
            className="relative p-6 transform transition-transform duration-500 ease-in-out hover:scale-105 hover:rotate-1 hover:z-10"
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-700 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl opacity-80 transition duration-700 ease-in-out hover:rotate-0 hover:skew-y-0 hover:scale-105"></div>
            <div className="relative px-6 py-8 bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl">
              <div className="flex flex-col items-center text-center">
                {service.icon}
                <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
                <p className="mt-2 text-gray-700">{service.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
    );
  };
  