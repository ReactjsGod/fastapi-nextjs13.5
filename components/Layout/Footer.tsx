'use client'

import Image from "next/image";
import React from "react";
import { Container } from "rsuite";

const Footer = () => {
  return (
    <Container className="bg-black/90 h-6 flex justify-center items-center">
      <div className="flex gap-4">
        <span className="text-base"> &copy; Finvero Shop</span>
      </div>
      
    </Container>
  );
};
export default Footer;
