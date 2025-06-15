"use client"
import React, { useActionState, useState } from "react"
import { ApiResponse } from "@/libs/api"
import Link from "next/link"
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  addToast,
  Avatar,
} from "@heroui/react"
import { Form, Input } from "@heroui/react"
import axiosInstance from "@/libs/axios"
import { Menu, X } from "lucide-react"
import useUserStore from "@/store/userStore"

async function submitForm(
  prevState: any,
  formData: FormData
): Promise<ApiResponse> {
  const username = formData.get("username")
  const password = formData.get("password")
  try {
    const res = await axiosInstance.post<ApiResponse>("/auth/login", {
      username,
      password,
    })
    return res?.data
  } catch (e) {
    console.error("Login error:", e)
    return {
      success: false,
      message: "Login failed. Please check your credentials.",
    }
    console.error("Login error:", e)
    return {
      success: false,
      message: "Login failed. Please check your credentials.",
    }
  }
}

const Navbar = () => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const setUser = useUserStore((state) => state.setUser)
  const user = useUserStore((state) => state.user)

  const [state, formAction, isPending] = useActionState(
    async (prev: any, formData: FormData) => {
      const res = await submitForm(prev, formData)
      if (!res.success) {
        return addToast({
          title: "Login failed",
          description: "Please try again.",
          color: "danger",
        })
      }
      addToast({
        title: "Login Successful",
        color: "success",
      })
      setUser(res.data)
      onClose()
      return res
    },
    null
  )

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false)
  }

  const handleLogin = () => {
    onOpen()
    setIsMobileMenuOpen(false)
  }

  const handleLogout = async () => {
    try {
      const res = await axiosInstance.post<ApiResponse>("auth/logout")
      if (!res?.data.success) {
        addToast({
          title: "Logout failed",
          description: "Please try again.",
          color: "danger",
        })
      }
      addToast({
        title: "Logout Successful",
        color: "success",
      })
      setUser(null)
    } catch {
      addToast({
        title: "Logout failed",
        description: "Please try again.",
        color: "danger",
      })
    }
  }

  return (
    <nav className="fixed right-10 top-7 z-50">
      <div className="flex items-center justify-end w-full">
        {/* Desktop Navigation */}
        <div className="bg-white hidden lg:flex gap-6 text-black font-bold items-center text-base *:hover:text-green-500 *:duration-150 p-4 lg:px-6 lg:py-2 rounded-2xl shadow-lg">
          <Link href="/">หน้าเเรก</Link>
          <Link href="/timetable">ตารางเรียน</Link>
          <Link href="/travel">การเดินทาง</Link>
          {user ? (
            <>
              <Avatar src={"/assets/images/avatar.jpg"} />
              <Button
                onPress={handleLogout}
                className="items-center justify-center bg-red-400 text-white font-bold rounded-2xl text-base"
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              onPress={handleLogin}
              className="items-center justify-center bg-[#2AD349] text-white font-bold rounded-2xl text-base"
            >
              Login
            </Button>
          )}
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
                        isLoading={isPending}
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

        <Button
          onPress={toggleMobileMenu}
          className="lg:hidden text-gray-800 focus:outline-none z-50
                     bg-white p-2 rounded-full shadow hover:bg-gray-100 active:bg-gray-200 border-none translate-y-15 sm:translate-y-0"
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
        className={`lg:hidden fixed top-20 right-7 bg-white shadow-inner p-4 transition-all duration-300 ease-in-out origin-top-right rounded-xl z-40 ${
          isMobileMenuOpen
            ? "opacity-100 scale-100 visible"
            : "opacity-0 scale-0 invisible"
        } translate-y-15 sm:translate-y-0`}
      >
        <div className="flex flex-col space-y-4 font-bold text-base *:hover:text-green-500 *:duration-150 min-w-40">
          <Link href="/" onClick={handleLinkClick}>
            หน้าเเรก
          </Link>
          <Link href="/timetable" onClick={handleLinkClick}>
            ตารางเรียน
          </Link>
          <Link href="/travel" onClick={handleLinkClick}>
            การเดินทาง
          </Link>
          {user ? (
            <>
              <Avatar src={"/assets/images/avatar.jpg"} />
              <Button
                onPress={handleLogout}
                className="items-center justify-center bg-red-400 text-white font-bold rounded-2xl text-base"
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              onPress={handleLogin}
              className="items-center justify-center bg-[#2AD349] text-white font-bold rounded-2xl text-base"
            >
              Login
            </Button>
          )}
          <div className="flex flex-col space-y-4 font-bold text-base *:hover:text-green-500 *:duration-150 min-w-40">
            <Link href="/" onClick={handleLinkClick}>
              หน้าเเรก
            </Link>
            <Link href="/timetable" onClick={handleLinkClick}>
              ตารางเรียน
            </Link>
            <Link href="/travel" onClick={handleLinkClick}>
              การเดินทาง
            </Link>
            {user ? (
              <>
                <Avatar src={"/assets/images/avatar.jpg"} />
                <Button
                  onPress={handleLogout}
                  className="items-center justify-center bg-red-400 text-white font-bold rounded-2xl text-base"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                onPress={handleLogin}
                className="items-center justify-center bg-[#2AD349] text-white font-bold rounded-2xl text-base"
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
