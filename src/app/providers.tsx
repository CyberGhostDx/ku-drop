"use client";

import { HeroUIProvider } from "@heroui/react";

interface props {
  children: React.ReactNode;
}

const providers: React.FC<props> = ({ children }) => {
  return <HeroUIProvider>{children}</HeroUIProvider>;
};

export default providers;
