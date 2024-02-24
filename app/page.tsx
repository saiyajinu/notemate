"use client"

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log(status);
    
    if (status === "authenticated") {
      router.push("/notes");
    }
  });

  return (
    <>
    {
      status === "unauthenticated" ?
      <section className="">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center flex-col text-center py-12">
            <h2 className="text-4xl leading-9 font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
              Welcome to Notemate
            </h2>
            <p className="mt-4 text-2xl leading-6 text-gray-600">
              Your digital space for every note, plan, and idea. Sign in to get
              started.
            </p>
          </div>
        </div>
      </section>
      : <div className="m-auto text-center text-3xl font-bold">loading...</div>
    }
      
    </>
  );
};

export default Home;
