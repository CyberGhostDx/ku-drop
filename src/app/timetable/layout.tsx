import AuthGuard from "@/components/Auth/AuthGuard";

type props = {
  children: React.ReactNode;
};

const layout: React.FC<props> = ({ children }) => {
  return <AuthGuard>{children}</AuthGuard>;
};

export default layout;
