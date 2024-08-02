import Image from 'next/image';

export default function About() {
  return (
      <div className="container mx-auto px-4 py-8">
        <section className="text-center py-8">
          <h2 className="text-4xl font-bold text-green-900 mb-4">About Us</h2>
          <p className="text-lg text-gray-700">
            Welcome to M.S.NAZ HIGH SCHOOL®, where we provide quality education and foster an environment of innovation and excellence.
          </p>
        </section>

        <section className="py-8">
          <h2 className="text-3xl font-semibold text-green-900 mb-4">Our Mission</h2>
          <p className="text-lg text-gray-700">
            Our mission is to empower students with the knowledge and skills necessary to excel in a rapidly changing world, fostering critical thinking, creativity, and a lifelong love for learning.
          </p>
        </section>

        <section className="py-8">
          <h2 className="text-3xl font-semibold text-green-900 mb-4">Our Vision</h2>
          <p className="text-lg text-gray-700">
            Our vision is to be a leading educational institution recognized for academic excellence and innovative teaching practices, preparing students to be leaders and change-makers in their communities and beyond.
          </p>
        </section>

        <section className="py-8">
          <h2 className="text-3xl font-semibold text-green-900 mb-4">Our History</h2>
          <p className="text-lg text-gray-700">
            Established in 2004, M.S.NAZ HIGH SCHOOL® has grown from a small local school to a thriving educational institution with over 400 students. Our commitment to academic excellence and holistic development has been the cornerstone of our success.
          </p>
          <Image src="/jpg/resultad.jpg" alt="School History" width={100} height={80} className="mt-4 mx-auto" />
        </section>

        <section className="py-8">
          <h2 className="text-3xl font-semibold text-green-900 mb-4">Our Team</h2>
          <p className="text-lg text-gray-700">
            Our dedicated team of educators and staff are passionate about providing the best possible learning experience for our students. Meet the people who make M.S.NAZ HIGH SCHOOL® a special place.
          </p>
          <div className="flex flex-wrap justify-center mt-4">
            <div className="w-full md:w-1/2 lg:w-1/3 p-4">
              <Image src="/images/team-member-1.jpg" alt="Team Member 1" width={300} height={300} className="rounded-full mx-auto" />
              <h3 className="text-xl font-semibold text-green-900 mt-4 text-center">John Doe</h3>
              <p className="text-center text-gray-700">Principal</p>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 p-4">
              <Image src="/images/team-member-2.jpg" alt="Team Member 2" width={300} height={300} className="rounded-full mx-auto" />
              <h3 className="text-xl font-semibold text-green-900 mt-4 text-center">Jane Smith</h3>
              <p className="text-center text-gray-700">Vice Principal</p>
            </div>
            {/* Add more team members as needed */}
          </div>
        </section>

        <section className="py-8">
          <h2 className="text-3xl font-semibold text-green-900 mb-4">Contact Us</h2>
          <p className="text-lg text-gray-700">
            We would love to hear from you! Whether you have questions, feedback, or want to learn more about M.S.NAZ HIGH SCHOOL®, feel free to get in touch with us.
          </p>
          <div className="mt-4">
            <p className="text-lg text-gray-700"><strong>Email:</strong> info@msnazhighschool.com</p>
            <p className="text-lg text-gray-700"><strong>Phone:</strong> +92-XXX-XXXXXXX</p>
            <p className="text-lg text-gray-700"><strong>Address:</strong> 123 School Road, City, Country</p>
          </div>
        </section>
      </div>
  );
}
