import Link from "next/link";
export default function Home() {
  const linkCards = [
    {
      title: "Enroll Now →",
      description: "M.S. Naz High School® - Web Portal",
      href: "/signup",
    },
    {
      title: "Our Socials →",
      description: "Learn more about M.S.N.S® | WEB",
      href: "https://www.instagram.com/msnazhighschool/",
    },
  ];

  const videos = [
    "/mp4/clip1.mp4",
    "/mp4/clip4.mp4",
    "/mp4/clip3.mp4",
    "/mp4/clip5.mp4",
  ];

  return (
    <main className="w-full min-h-screen bg-gradient-to-b from-[#BCE7AD] to-[#16c7b8] text-white">
      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Hero Section */}
        <h1 className="text-5xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-center text-3d">
          MSNS - <span className="text-[hsl(108,45%,20%)]">LMS</span> Coming SOON!
        </h1>

        {/* Link Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {linkCards.map((card, index) => (
            <Link 
              key={index}
              className="group relative bg-green-800 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 ease-out hover:scale-105 flex flex-col justify-center items-center p-6 text-center"
              href={card.href}
              target="_blank"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-700 to-orange-500 opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-2 transform transition-all duration-300 group-hover:scale-110">{card.title}</h3>
                <div className="text-gray-300 transform transition-all duration-300 group-hover:translate-y-2">
                  {card.description}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Video Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 aspect-[3/4] sm:aspect-[4/3]">
          {videos.map((src, index) => (
            <video
              key={index}
              src={src}
              loop
              muted
              autoPlay
              playsInline
              className="w-full h-full object-cover rounded-lg"
            />
          ))}
        </div>
      </div>
    </main>
  );
}