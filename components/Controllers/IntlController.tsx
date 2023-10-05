"use client";

import React from "react";
import { US } from "country-flag-icons/react/1x1";
import { MX } from "country-flag-icons/react/1x1";
import { Container } from "rsuite";
import Link from "next-intl/link";
import { useLocale } from "next-intl";

const IntlController = () => {
  const [openLang, setOpenLang] = React.useState<boolean>(false);
  const ButtonRef = React.useRef<HTMLButtonElement | null>(null);
  const MenuRef = React.useRef<HTMLDivElement | null>(null);
  const lang = useLocale();


  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ButtonRef.current && ButtonRef.current.contains(e.target as Node)) {
        return;
      }

      if (MenuRef.current && !MenuRef.current.contains(e.target as Node)) {
        setOpenLang(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <button
        ref={ButtonRef}
        onClick={() => setOpenLang(!openLang)}
        className="relative w-10 h-10 rounded-full overflow-hidden btn-animate"
      >
        {lang === "en" ? (
          <US title="United States" className="" />
        ) : (
          <MX title="United States" className="" />
        )}
      </button>
      {openLang && (
        <Container
          ref={MenuRef}
          className="w-[110px] shadow-[-8px_0px_12px_1px_#4a5568] ml-auto z-10 right-0 rounded-b-xl absolute p-2 -bottom-[3.5rem]"
        >
          {" "}
          {lang == "es" ? (
            <Link href={"/"} locale="en">
              <div className="w-10 h-10 mx-auto rounded-full overflow-hidden">
                <US title="United States" className="" />
              </div>
            </Link>
          ) : (
            <Link href={"/"} locale="es">
              <div className="w-10 h-10 mx-auto rounded-full overflow-hidden">
                <MX title="United States" className="" />
              </div>
            </Link>
          )}
        </Container>
      )}
    </>
  );
};

export default IntlController;
