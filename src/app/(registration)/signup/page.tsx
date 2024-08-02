import Image from "next/image";

import { LoginForm } from "~/app/_components/forms/LoginForm";


export default function loginPage() {
  return (
    <section className="col-span-12 grid  place-content-center bg-[url('/jpg/Schoolview.jpg')] bg-cover">
      <div className="grid outline outline-green-700 h-[45rem] w-[27rem] place-items-center rounded-lg bg-green-800/50 shadow-lg">
        <div className="grid justify-items-center gap-4">
          <Image
            src={"/logo/off_logo_green.png"}
            alt="logo"
            width={350}
            height={350}
          />
          <h1 className="text-6xl font-serif font-semi-bold text-amber-600 transition hover:text-pink-600">
            MSNS-LMS{" "}
          </h1>

        <LoginForm />
        <div className="flex justify-center gap-10">
          {/* Button 1 */}

          {/* Button 2 */}
          <button
            type="submit" // Important: Set type to "button" for non-form actions
            className="rounded hover:outline outline-2 outline-pink-700 bg-green-700 px-6 py-3 font-bold transition hover:bg-white/50"
          >
           Register
          </button>
        </div>
      </div>
      </div>
    </section>
  );
}