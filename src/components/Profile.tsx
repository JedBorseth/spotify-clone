import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
const Profile = () => {
  const [state, setState] = useState(false);
  const { data: session } = useSession();

  const toggleMenu = () => {
    setState(!state);
  };
  return (
    <>
      <div
        className="relative z-30 grid h-10 w-24 items-center justify-between gap-3 rounded-3xl bg-neutral-900 px-1 text-white"
        onClick={toggleMenu}
      >
        <p className="flex w-full items-center gap-1 px-1">
          <span>{session?.user?.name}</span>

          {state ? (
            <ChevronUpIcon className="h-5 w-5" />
          ) : (
            <ChevronDownIcon className="h-5 w-5" />
          )}
        </p>
      </div>
      {state ? (
        <div className="absolute right-3 top-10 z-20 h-16 w-14 rounded-b bg-red-400 pt-6 text-center hover:bg-red-300">
          <button
            className=" text-gray-200 hover:text-white"
            onClick={() => signOut()}
          >
            Logout
          </button>
        </div>
      ) : null}
    </>
  );
};

export default Profile;
