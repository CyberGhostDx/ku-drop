"use client";
import React, { useActionState, useState } from "react";
import Link from "next/link";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@heroui/react";
import { Form, Input } from "@heroui/react";
import axiosInstance from "@/libs/axios";
import { Menu, X } from "lucide-react"; // Make sure lucide-react is installed

// Your submitForm action (remains the same)
async function submitForm(prevState, formData) {
  const username = formData.get("username");
  const password = formData.get("password");
  try {
    const res = await axiosInstance.post("/auth/login", { username, password });
    console.log(res.data);
    return { success: true, message: "Login successful!" }; // Corrected typo: messge -> message
  } catch (e) {
    console.error("Login error:", e);
    return { success: false, message: "Login failed. Please check your credentials." };
  }
}

const Navbar = () => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu

  const [state, formAction] = useActionState(
    async (prev, formData) => {
      const res = await submitForm(prev, formData);
      onClose(); // Close the modal after form submission
      return res;
    },
    null,
  );

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false); // Close mobile menu when a link is clicked
  };

  const handleLoginButtonClick = () => {
    onOpen(); // Open the login modal
    setIsMobileMenuOpen(false); // Close mobile menu when login button is pressed
  };

  return (
    <nav className="fixed shadow-lg right-10 top-7 z-50">
      <div className="flex items-center justify-end w-full">
        {/* Desktop Navigation */}
        <div className="bg-white hidden lg:flex gap-6 font-bold items-center text-base *:hover:text-green-500 *:duration-150 p-4 lg:px-6 lg:py-2 rounded-2xl">
          <Link href="/">หน้าเเรก</Link>
          <Link href="/timetable">ตารางเรียน</Link>
          <Link href="/travel">การเดินทาง</Link>
          <Button
            onPress={handleLoginButtonClick}
            className="items-center justify-center bg-[#2AD349] text-white font-bold rounded-2xl text-base"
          >
            Login
          </Button>
          {/* Login Modal */}
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1 text-bold text-[#15A713] text-2xl font-bold text-center">
                    Log in to KU DROP
                  </ModalHeader>
                  <ModalBody>
                    <Form
                      action={formAction}
                      className="flex flex-col gap-4 w-full"
                    >
                      <Input
                        name="username"
                        variant="bordered"
                        placeholder="Username"
                        className="w-full"
                        label="Username"
                        labelPlacement="outside"
                        classNames={{
                          label: "font-bold",
                          inputWrapper:
                            "data-[focus=true]:border-default-200 duration-150",
                        }}
                        required
                      />
                      <Input
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="Password"
                        variant="bordered"
                        className="w-full"
                        labelPlacement="outside"
                        classNames={{
                          label: "font-bold",
                          inputWrapper:
                            "data-[focus=true]:border-default-200 duration-150",
                        }}
                        required
                        autoComplete="password"
                      />
                      <Button
                        type="submit"
                        className="bg-primary text-white font-bold rounded-lg w-full mt-2 mb-4"
                      >
                        Log in
                      </Button>
                    </Form>
                  </ModalBody>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>

        {/* Mobile Menu Button (Hamburger Icon) */}
        <Button
          onPress={toggleMobileMenu}
          className="lg:hidden text-gray-800 focus:outline-none z-50
                     bg-white p-2 rounded-full shadow hover:bg-gray-100 active:bg-gray-200 border-none"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          isIconOnly
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6 text-gray-700" />
          ) : (
            <Menu className="h-6 w-6 text-gray-700" />
          )}
        </Button>
      </div>

      {/* Mobile Menu Content */}
      <div
        id="mobile-menu"
        className={`lg:hidden absolute top-full mt-2 right-0 w-48 bg-white shadow-lg p-4 transition-all duration-300 ease-in-out origin-top-right rounded-lg ${
          isMobileMenuOpen
            ? "opacity-100 scale-y-100 visible"
            : "opacity-0 scale-y-0 invisible"
        }`}
      >
        <div className="flex flex-col space-y-4 font-bold text-base *:hover:text-green-500 *:duration-150">
          <Link href="/" onClick={handleLinkClick}>หน้าเเรก</Link>
          <Link href="/timetable" onClick={handleLinkClick}>ตารางเรียน</Link>
          <Link href="/travel" onClick={handleLinkClick}>การเดินทาง</Link>
          <Button
            onPress={handleLoginButtonClick}
            className="items-center justify-center bg-[#2AD349] text-white font-bold rounded-2xl text-base"
          >
            Login
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
