
export default function Finance() {
  return (
    <main className="min-h-screen sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3 bg-yellow-100/50">
    <div className="container mx-auto p-4">
    <div className="relative overflow-hidden">
      <h1 className="text-center text-5xl font-serif font-bold tracking-tight p-2">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-yellow-500 hover:from-orange-400 hover:to-green-500 transition-all duration-300">
          Finance Management
        </span>
      </h1>
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-green-600 to-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
    </div>
  </div>
  <section className="bg-gray-900 py-16">
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      
7      <div className="group perspective">
        <div className="relative h-64 bg-gray-800 rounded-lg shadow-lg transform transition-all duration-300 ease-out hover:rotate-y-180">
          <div className="absolute inset-0 backface-hidden">
            <div className="h-full flex flex-col justify-center items-center p-6 text-center">
              <h3 className="text-2xl font-bold text-white mb-2">Card 1</h3>
              <p className="text-gray-300">Hover to reveal more</p>
            </div>
          </div>
          <div className="absolute inset-0 backface-hidden rotate-y-180">
            <div className="h-full flex flex-col justify-center items-center p-6 text-center bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg">
              <h3 className="text-2xl font-bold text-white mb-2">Revealed!</h3>
              <p className="text-gray-100">This is the back of Card 1</p>
            </div>
          </div>
        </div>
      </div>

7      <div className="group">
        <div className="relative h-64 bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 ease-out hover:scale-105">
          <div className="absolute inset-0 bg-gradient-to-tr from-green-400 to-blue-500 opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
          <div className="relative h-full flex flex-col justify-center items-center p-6 text-center">
            <h3 className="text-2xl font-bold text-white mb-2 transform transition-all duration-300 group-hover:scale-110">Card 2</h3>
            <p className="text-gray-300 transform transition-all duration-300 group-hover:translate-y-2">Hover for effect</p>
          </div>
        </div>
      </div>

7      <div className="group">
        <div className="relative h-64 bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-bl from-red-500 to-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          <div className="relative h-full flex flex-col justify-center items-center p-6 text-center">
            <h3 className="text-2xl font-bold text-white mb-2 transform transition-all duration-300 group-hover:translate-x-3">Card 3</h3>
            <p className="text-gray-300 transform transition-all duration-300 group-hover:-translate-x-3">Slide for surprise</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</main>
  );
}