"use client"

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Section {
  title: string;
  content: string;
}

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export default function AboutUs() {
  const [activeSection, setActiveSection] = useState<number | null>(null);

  const sections: Section[] = [
    { title: 'About Us', content: 'Welcome to M.S.NAZ HIGH SCHOOL®, where we provide quality education and foster an environment of innovation and excellence.' },
    { title: 'Our Mission', content: 'Our mission is to empower students with the knowledge and skills necessary to excel in a rapidly changing world, fostering critical thinking, creativity, and a lifelong love for learning.' },
    { title: 'Our Vision', content: 'Our vision is to be a leading educational institution recognized for academic excellence and innovative teaching practices, preparing students to be leaders and change-makers in their communities and beyond.' },
    { title: 'Our History', content: 'Established in 2004, M.S.NAZ HIGH SCHOOL® has grown from a small local school to a thriving educational institution with over 400 students. Our commitment to academic excellence and holistic development has been the cornerstone of our success.' },
  ];

  const teamMembers: TeamMember[] = [
    { name: 'John Doe', role: 'Principal', image: '/images/team-member-1.jpg' },
    { name: 'Jane Smith', role: 'Vice Principal', image: '/images/team-member-2.jpg' },
  ];

  return (
    <div className="container mx-auto px-4 py-8 bg-yellow-200 shadow-lg rounded-lg">
      {sections.map((section, index) => (
        <motion.section
          key={index}
          className="mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
        >
          <motion.h2
            className="bg-white text-4xl font-bold text-green-900 mb-4 cursor-pointer"
            onClick={() => setActiveSection(activeSection === index ? null : index)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {section.title}
          </motion.h2>
          <motion.div
            initial={false}
            animate={{ height: activeSection === index ? 'auto' : 0, opacity: activeSection === index ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-lg text-gray-700">{section.content}</p>
            {section.title === 'Our History' && (
              <Image src="/jpg/resultad.jpg" alt="School History" width={400} height={300} className="mt-4 mx-auto rounded-lg shadow-lg" />
            )}
          </motion.div>
        </motion.section>
      ))}

      <motion.section
        className="mb-12"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: sections.length * 0.2 }}
      >
        <h2 className="text-4xl font-bold text-green-900 mb-4">Our Team</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 bg-white rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image src={member.image} alt={member.name} width={200} height={200} className="rounded-full mx-auto" />
              <h3 className="text-xl font-semibold text-green-900 mt-4 text-center">{member.name}</h3>
              <p className="text-center text-gray-700">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="mb-12"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: (sections.length + 1) * 0.2 }}
      >
        <h2 className="text-4xl font-bold text-green-900 mb-4">Contact Us</h2>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="text-lg text-gray-700 mb-4">
            We would love to hear from you! Whether you have questions, feedback, or want to learn more about M.S.NAZ HIGH SCHOOL®, feel free to get in touch with us.
          </p>
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-lg text-gray-700"><strong>Email:</strong> info@msnazhighschool.com</p>
            <p className="text-lg text-gray-700"><strong>Phone:</strong> +92-XXX-XXXXXXX</p>
            <p className="text-lg text-gray-700"><strong>Address:</strong> 123 School Road, City, Country</p>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}