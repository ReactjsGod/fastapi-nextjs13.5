"use client";

//import { UserButton, useUser } from "@clerk/nextjs";
import React from "react";
import { motion, useAnimation } from "framer-motion";
import { Container, FlexboxGrid, Input } from "rsuite";
import { FaUserCircle } from "react-icons/fa";
import { RiSearch2Line } from "react-icons/ri";
import Link from "next/link";
//import { useAppSelector } from "@hooks";
//import { selectItems } from "@Slices";
//import { useTheme } from "@providers";
/* import {
  Basket,
  IntlController,
  MobileNav,
  ThemeController,
} from "@Controllers"; */
import { useRouter } from "next/navigation";
import { useTheme } from "@Providers";
import { selectItems } from "@Slices";
import { useAppSelector } from "@Hooks";
import { Basket, ThemeController } from "@Controllers";

//import { useTranslations } from "next-intl";

const Header = () => {
  const basketItems = useAppSelector(selectItems);
  // const t = useTranslations("common");
  // const { user } = useUser();
  const router = useRouter();
  const inputControls = useAnimation();
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [inputVisible, setInputVisible] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [openCheckout, setOpenCheckout] = React.useState<boolean>(false);

  const themeContext = useTheme();
  if (!themeContext) {
    throw new Error("Sorry no theme available");
  }
  const { theme, toggleTheme } = themeContext;

  // Handle the input field click
  const handleInputClick = async () => {
    // Toggle input visibility
    setInputVisible(!inputVisible);

    // If input is being shown, animate the input field to slide open and focus it
    if (!inputVisible) {
      await inputControls.start({ width: "100%", left: "-100%" });
      inputRef?.current?.focus();
    }
  };

  const handleScroll = () => {
    if (window.scrollY >= 100) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  // Close the input field when clicking elsewhere
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setInputVisible(false);
        inputControls.start({ width: "0%" });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputControls]);

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Container
        className={`${
          !scrolled && "bg-gray-900/80"
        } h-20 z-10 border-b backdrop-blur-2xl flex justify-center items-center text-white fixed w-full duration-700 ease-in-out`}
      >
        <FlexboxGrid
          className="w-full px-5"
          justify="space-between"
          align="middle"
        >
          <FlexboxGrid.Item>
            <FlexboxGrid className="w-full px-5" justify="space-between">
              <FlexboxGrid.Item>
                <button
                  className={`flex gap-1 text-[var(--main-color)] items-center hover:no-underline font-bold btn-animate`}
                  onClick={() => router.push("/")}
                >
                  <span className="text-2xl ">NEW fastAPI</span>
                </button>
              </FlexboxGrid.Item>
            </FlexboxGrid>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item className="hidden sm:inline">
            <FlexboxGrid
              className="w-full px-5 gap-10"
              justify="space-between"
              align="middle"
            >
              <FlexboxGrid.Item>
                <Container className="relative">
                  <motion.div
                    initial={{ width: "0%", left: "0%" }}
                    animate={inputControls}
                    className={`${
                      !inputVisible && "hidden"
                    } flex flex-col justify-center items-center`}
                  >
                    <Input ref={inputRef} placeholder="Search a product..." />
                  </motion.div>
                  <RiSearch2Line
                    className={`text-2xl absolute right-1 text-[var(--main-color)] top-1/2 bottom-1/2 cursor-pointer my-auto`}
                    onClick={handleInputClick}
                  />
                </Container>
              </FlexboxGrid.Item>

              <FlexboxGrid.Item>
                Theme
                {/* <div
                  className={`flex flex-col justify-center items-center ${
                    scrolled && theme === "light" ? "text-black" : "text-white"
                  }`}
                >
                  {user ? (
                    <UserButton afterSignOutUrl="/"  />
                  ) : (
                    <Link href={"/sign-in"}>
                      <FaUserCircle className="text-gray-400 text-4xl" />
                    </Link>
                  )}
                  {user && (
                    <span>
                      {t("com1")} {user?.firstName}
                    </span>
                  )}
                </div> */}
              </FlexboxGrid.Item>
              <FlexboxGrid.Item>
                <Basket scrolled={scrolled} theme={theme} />
              </FlexboxGrid.Item>
              <FlexboxGrid.Item>
                <ThemeController scrolled={scrolled} />
              </FlexboxGrid.Item>
              <FlexboxGrid.Item>{/* <IntlController /> */}</FlexboxGrid.Item>
            </FlexboxGrid>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item className="inline sm:hidden">
            {/*  <MobileNav
              scrolled={scrolled}
              theme={theme}
              basketItems={basketItems}
            /> */}
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Container>
    </>
  );
};
export default Header;
