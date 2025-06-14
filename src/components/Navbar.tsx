"use client";

import React from "react";
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

const Navbar = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [password, setPassword] = React.useState("");
  const [submitted, setSubmitted] = React.useState<{
    [k: string]: FormDataEntryValue;
  } | null>(null);
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  const getPasswordError = (value: string) => {
    if (value.length < 4) {
      return "Password must be 4 characters or more";
    }
    if ((value.match(/[A-Z]/g) || []).length < 1) {
      return "Password needs at least 1 uppercase letter";
    }
    if ((value.match(/[^a-z]/gi) || []).length < 1) {
      return "Password needs at least 1 symbol";
    }

    return null;
  };

  const onSubmit = (e: React.FormEvent, onClose: () => void) => {
    e.preventDefault();
    const data = Object.fromEntries(
      new FormData(e.currentTarget as HTMLFormElement),
    );

    const newErrors: { [key: string]: string } = {};

    const passwordError = getPasswordError(data.password as string);

    if (passwordError) {
      newErrors.password = passwordError;
    }

    if (data.name === "admin") {
      newErrors.name = "Nice try! Choose a different username";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (data.terms !== "true") {
      newErrors.terms = "Please accept the terms";
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitted(data);
    onClose(); // Close the modal on successful submission
    console.log("Form submitted successfully:", data);
  };

  return (
    <nav className="fixed bg-white shadow-lg right-10 px-6 py-2 top-7 rounded-2xl items-center justify-between z-50">
      <div className="items-center justify-between">
        <div className="hidden lg:flex gap-6 font-bold items-center justify-between text-base *:hover:text-green-500 *:duration-150">
          <Link href="">หน้าเเรก</Link>
          <Link href="">ตารางเรียน</Link>
          <Link href="">การเดินทาง</Link>
          <Button
            onPress={onOpen}
            className="items-center justify-center bg-[#2AD349] text-white font-bold rounded-2xl text-base"
          >
            Login
          </Button>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent className="flex items-center justify-center">
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1 text-bold text-[#15A713] text-2xl">
                    Log in to KU DROP
                  </ModalHeader>
                  <ModalBody>
                    <Form
                      onSubmit={(e) => onSubmit(e, onClose)}
                      // Change to flex-col to stack items vertically
                      // Remove justify-center and items-center as w-full will make them fill the width
                      className="flex flex-col gap-4 w-full" // Added w-full to Form to ensure it takes full modal width
                    >
                      <Input
                        name="name"
                        label={<strong>Username</strong>}
                        variant="bordered"
                        placeholder="Username"
                        className="w-full" // Make Input fields also take full width
                        labelPlacement="outside"
                        errorMessage={errors.name}
                        isInvalid={!!errors.name}
                      // classNames={{ label: "font-bold" }} // If you want bold labels, add this back
                      />
                      <Input
                        name="password"
                        label={<strong>Password</strong>}
                        type="password"
                        placeholder="Password"
                        value={password}
                        variant="bordered"
                        className="w-full"                         labelPlacement="outside"
                        onChange={(e) => setPassword(e.target.value)}
                        errorMessage={errors.password}
                        isInvalid={!!errors.password}
                      />
                      <Button
                        type="submit"
                        className="bg-[#2B86DB] text-white font-bold rounded-lg w-full mt-2 mb-4"                       >
                        Log in
                      </Button>
                    </Form>
                  </ModalBody>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
