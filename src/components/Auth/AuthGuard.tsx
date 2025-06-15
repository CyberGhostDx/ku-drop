"use client";
import { useState, useEffect } from "react";
import { Spinner } from "@heroui/react";
import axiosInstance from "@/libs/axios";
import { useRouter } from "next/navigation";
import { ApiResponse } from "@/libs/api";
import useUserStore from "@/store/userStore";

type props = {
  children: React.ReactNode;
};

const AuthGuard: React.FC<props> = ({ children }) => {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const auth = async () => {
      try {
        const res = await axiosInstance.get<ApiResponse>("/auth/me");
        const data = res?.data;
        if (!data.success) {
          setUser(null);
          return router.push("/");
        }
        setUser(res.data.data);
      } catch {
        router.push("/");
      } finally {
        setIsLoading(false);
      }
    };
    auth();
  }, []);
  if (isLoading)
    return (
      <div className="w-ful h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  return children;
};

export default AuthGuard;
