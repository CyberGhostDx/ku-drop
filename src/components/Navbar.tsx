"use client";
import React, { useActionState } from "react";
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

async function submitForm(prevState: any, formData: FormData) {
  const username = formData.get("username");
  const password = formData.get("password");
  try {
    const res = await axiosInstance.post("/auth/login", { username, password });
    console.log(res.data);
  } catch (e) {
    console.log(e);
  }

  console.log(username);
  console.log(password);
}

const Navbar = () => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [state, formAction] = useActionState(
    async (prev: any, formData: FormData) => {
      const res = await submitForm(prev, formData);
      onClose();
      return res;
    },
    null,
  );

  return (
    <nav className="fixed bg-white shadow-lg right-10 px-6 py-2 top-7 rounded-2xl items-center justify-between z-50">
      <div className="items-center justify-between">
        <div className="hidden lg:flex gap-6 font-bold items-center justify-between text-base *:hover:text-green-500 *:duration-150">
          <Link href="/">หน้าเเรก</Link>
          <Link href="/timetable">ตารางเรียน</Link>
          <Link href="/travel">การเดินทาง</Link>
          <Button
            onPress={onOpen}
            className="items-center justify-center bg-[#2AD349] text-white font-bold rounded-2xl text-base"
          >
            Login
          </Button>
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
      </div>
    </nav>
  );
};

export default Navbar;
