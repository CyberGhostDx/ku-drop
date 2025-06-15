"use client";

import { HeroUIProvider, ToastProvider } from "@heroui/react";

interface props {
  children: React.ReactNode;
}

const providers: React.FC<props> = ({ children }) => {
  return (
    <HeroUIProvider>
      <ToastProvider placement="bottom-center" />
      {children}
    </HeroUIProvider>
  );
};

export default providers;
