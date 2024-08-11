import { useState } from 'react';
import { LayersIcon } from "@radix-ui/react-icons";
import { BookCheckIcon, FileStackIcon, ChevronDownIcon, ChevronUpIcon, ArrowRightIcon } from "lucide-react";

interface ServiceItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  buttons: Array<{ text: string; href: string }>;
}

const AccordionItem: React.FC<ServiceItem & { isOpen: boolean; toggle: () => void }> = ({ title, description, icon, buttons, isOpen, toggle }) => {
  return (
    <div className="border-2 border-green-900 bg-green-200 rounded-md my-2">
      <button
        className="flex w-full items-center justify-between p-4 text-left"
        onClick={toggle}
      >
        <div className="flex items-center">
          {icon}
          <span className="ml-3 text-xl font-medium">{title}</span>
        </div>
        {isOpen ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
      </button>
      {isOpen && (
        <div className="px-6 pb-4">
          <p className="text-gray-600 mb-3">{description}</p>
          <div className="flex flex-wrap gap-2">
            {buttons.map((button, index) => (
              <button
                key={index}
                onClick={() => window.location.href = button.href}
                className="flex items-center justify-center w-full sm:w-auto px-4 py-2 text-sm font-medium text-pink-700 bg-white border border-pink-700 rounded-lg shadow-sm transition hover:bg-pink-700 hover:text-white"
              >
                <ArrowRightIcon className="h-4 w-4 mr-2" />
                {button.text}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const ClassesCard = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const services: ServiceItem[] = [
    {
      title: "Montessori",
      description: "Easily enroll new students and manage their financial records.",
      icon: <LayersIcon className="h-6 w-6 text-green-500" />,
      buttons: [
        { text: "Nursery", href: "/student/academics/montessori/nursery" },
        { text: "Prep", href: "/student/academics/montessori/prep" },
      ],
    },
    {
      title: "Primary",
      description: "Track and manage student attendance efficiently.",
      icon: <BookCheckIcon className="h-6 w-6 text-green-500" />,
      buttons: [
        { text: "ONE | I", href: "/student/academics/primary/one" },
        { text: "TWO | II", href: "/student/academics/primary/two" },
        { text: "THREE | III", href: "/student/academics/primary/three" },
        { text: "FOUR | IV", href: "/student/academics/primary/four" },
        { text: "FIVE | V", href: "/student/academics/primary/five" },
      ],
    },
    {
      title: "Middle",
      description: "Organize and view class schedules and exam datesheets.",
      icon: <FileStackIcon className="h-6 w-6 text-blue-500" />,
      buttons: [
        { text: "SIX | VI", href: "/student/academics/middle/six" },
        { text: "SEVEN | VII", href: "/student/academics/middle/seven" },
      ],
    },
    {
      title: "Matriculation | SSC",
      description: "Organize and view class schedules and exam datesheets.",
      icon: <FileStackIcon className="h-6 w-6 text-blue-500" />,
      buttons: [
        { text: "SSC-1 | NINE (IX) | JUNIOR", href: "/student/academics/ssc/ssc-one" },
        { text: "SSC-1 | NINE (IX) | SENIOR", href: "/student/academics/ssc/ssc-one" },
        { text: "SSC-2 | TEN (X)", href: "/student/academics/ssc/ssc-two" },
      ],
    }
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="rounded-lg border bg-transparent shadow-sm p-4">
      {services.map((service, index) => (
        <AccordionItem
          key={index}
          {...service}
          isOpen={openIndex === index}
          toggle={() => toggleAccordion(index)}
        />
      ))}
    </div>
  );
};
