"use client";

import MenuItem from "./MenuItem";
import { useSupabase } from "@/app/supabase-provider";
import { UserDetails } from "@/types";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineMenu } from "react-icons/ai";
import { CiUser } from "react-icons/ci";
import { TbUserFilled } from "react-icons/tb";

interface UserMenuProps {
  user?: User | null;
}

export default function UserMenu({ user }: UserMenuProps) {
  const { supabase } = useSupabase();
  const router = useRouter();
  // get session from api
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Signed Out");
        router.refresh();
      }
    } catch (error) {
      toast.error("An error occurred during signout.");
    }
  };


  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => ({})}
          className="
            hidden
            md:block
            text-sm 
            font-medium
            py-3 
            px-4 
            rounded-full 
            hover:bg-[#232325]

            transition 
            cursor-pointer
          "
        >
          How it works
        </div>
        <div
          onClick={toggleOpen}
          className="
          p-4
          md:py-1
          md:px-2
          border-[1px] 
          border-[#232325]
          flex 
          flex-row 
          items-center 
          gap-3 
          rounded-full 
          cursor-pointer 
          hover:shadow-md 
          transition
          "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <TbUserFilled />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="
          bg-[#232325]
          text-white
            absolute 
            rounded-xl 
            shadow-md
            w-[40vw]
            md:w-3/4 
            overflow-hidden 
            right-0 
            top-12 
            text-sm
          "
        >
          <div className="flex flex-col cursor-pointer">
            {user?.id ? (
              <>
                <MenuItem
                  label="Account"
                  onClick={() => router.push("/account")}
                />
                <MenuItem
                  label="My Trips"
                  onClick={() => router.push("/trips")}
                />
                <MenuItem
                  label="Help"
                  onClick={() => router.push("/contactus")}
                />
                <hr className="text-[#232325] bg-[#232325] "/>
                <MenuItem
                  label="Logout"
                  onClick={() => {
                    signOut();
                    toggleOpen();
                  }}
                />
              </>
            ) : (
              <>
                <MenuItem
                  label="Login"
                  onClick={() => {
                    router.push("/signin");
                    toggleOpen();
                  }}
                />
                <MenuItem
                  label="Sign up"
                  onClick={() => {
                    router.push("/signup");
                    toggleOpen();
                  }}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
