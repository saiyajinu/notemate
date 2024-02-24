"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";

const Navbar = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    (async () => {
      const res: any = await getProviders();
      setProviders(res);
    })();
  }, []);

  const router = useRouter()

  let navSignOut = () => {
    signOut();
    router.push('/')
  }

  const pathname = usePathname()

  useEffect(() => {
    if(session?.user){
      if(pathname != '/notes'){
        router.push('/notes')
        console.log('reroute /n');
        
      }
        
    } 
    else {
      if(pathname != '/'){
        router.push('/')  
        console.log('reroute /');
      }
            
    }
  })
  

  return (
    <div className="w-full bg-pink-100">
      <div className="flex flex-row justify-between border-b-2 border-black w-5/6 mx-auto font-bold text-2xl py-2">
      <div className="flex justify-center items-center">NoteMate</div>
      {!session?.user ? (
        <>
          {providers &&
            Object.values(providers).map((provider: any) => (
              <button
                type="button"
                key={provider.name}
                onClick={() => {
                  signIn(provider.id);
                }}
                className="black_btn"
              >
                Sign in
              </button>
            ))}
        </>
      ) : (
        <div className="flex flex-row gap-4">
          <button type="button" onClick={() => signOut()}>
            Sign Out
          </button>
          <div className="rounded-full overflow-hidden">
            <Image
              src={session?.user.image || ""}
              width={37}
              height={37}
              alt="profile"
            />
          </div>
          
        </div>
      )}
    </div>
    </div>
    
  );
};

export default Navbar;
