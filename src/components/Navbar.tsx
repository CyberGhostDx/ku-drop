"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@heroui/react";

const Navbar = () => {
  return (
    <nav className="fixed bg-white shadow-lg right-10 px-6 py-2 top-7 rounded-2xl items-center justify-between z-50">
      <div className="items-center justify-between">
        <div className="hidden lg:flex gap-6 font-bold items-center justify-between text-base *:hover:text-green-500 *:duration-150">
          <Link href="">หน้าเเรก</Link>
          <Link href="">ตารางเรียน</Link>
          <Link href="">การเดินทาง</Link>
          <Button className="items-center justify-center bg-[#2AD349] text-white font-bold rounded-2xl text-base">
            Login
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
