'use client'


import { UserButton, useUser } from "@clerk/nextjs";
import { Mobilemenuprop } from "@Types";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'
import { FaCartArrowDown, FaUserCircle } from 'react-icons/fa';
import { RiSearch2Line } from 'react-icons/ri';
import { Container, Input } from 'rsuite';

const MobilMenu = ({scrolled, theme,basketItems }:Mobilemenuprop) => {

    const { user } = useUser();
    const router = useRouter();
    const [isOpen, setIsOpen] = React.useState(false);
    const ButtonRef = React.useRef<HTMLButtonElement | null>(null);
    const MenuRef = React.useRef<HTMLDivElement | null>(null);
  
    React.useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
          if (ButtonRef.current && ButtonRef.current.contains(e.target as Node)) {
            return;
          }
    
          if (MenuRef.current && !MenuRef.current.contains(e.target as Node)) {
            setIsOpen(false);
          }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);
  
const checkout = ()=>{
    router.push("/checkout");
    setIsOpen(false);
}

    return (
    <Container className="relative">
    <button
      id="Hamburger menu"
      name="Hamburger menu"
      ref={ButtonRef}
      onClick={() => {
        if (isOpen) {
          setIsOpen(false);
        } else {
          setIsOpen(true);
        }
      }}
      className="md:hidden btn-animate flex flex-col items-center duration-500 transition-all ease-in-out"
    >
      <div
        className={`w-6 h-0.5  dark:bg-white mb-1 ${
          scrolled ? "bg-black" : "bg-white"
        } ${isOpen && "rotate-45 relative top-1"}`}
      />
      <div
        className={`w-6 h-0.5  mb-1 dark:bg-white ${
          scrolled ? "bg-black" : "bg-white"
        } ${
          isOpen && "rotate-180 opacity-0 duration-300 ease-linear"
        }`}
      />
      <div
        className={`w-6 h-0.5 dark:bg-white  ${
          scrolled ? "bg-black" : "bg-white"
        } ${isOpen && "-rotate-45 relative bottom-2"}`}
      />
    </button>
    {isOpen && (
      <Container 
      ref={MenuRef}
      className="absolute backdrop-blur-2xl shadow-[0px_20px_20px_10px_#fed7d7] -bottom-[13.7rem] -left-44 w-[200px] p-2 rounded-b-xl">
        <Container className="flex flex-col gap-y-5 justify-center items-center">
          <div>
            <Container className="relative">
              <Input
                placeholder="Search a product..."
              />

              <RiSearch2Line
                className={`text-2xl absolute right-1 text-[var(--main-color)] top-1/2 bottom-1/2 cursor-pointer my-auto`}
              />
            </Container>
          </div>
          <div>
            <div
              className={`flex flex-col justify-center items-center text-black dark:text-white`}
            >

              {user ? (
                <UserButton afterSignOutUrl="/" />
              ) : (
                <Link href={"/sign-in"}>
                  <FaUserCircle className="text-gray-400 text-4xl" />
                </Link>
              )}
              {user && <span>Hello, {user?.firstName}</span>}
            </div>
          </div>
          <div>
            <button
              onClick={checkout}
              className="relative active:translate-y-2 duration-500 ease-in-out"
            >
              <div
                className={`absolute bg-[var(--main-color)] w-6 h-6 ${
                  scrolled && theme === "light"
                    ? "text-black"
                    : "text-white"
                }  font-extrabold text-lg flex justify-center items-center rounded-full left-[0.7rem] bottom-[1.45rem]`}
              >
                {basketItems.length}
              </div>
              <FaCartArrowDown
                className={`text-4xl ${
                  scrolled && theme === "light"
                    ? "text-black"
                    : "text-white"
                }`}
              />
            </button>
          </div>
        </Container>
      </Container>
    )}
  </Container>
  )
}

export default MobilMenu