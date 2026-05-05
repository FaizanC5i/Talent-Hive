import { TalentPlatform } from "@/components/platform/TalentPlatform";
import { useAuth } from "@/contexts/AuthContext";
import Login from "./Login";

const Index = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <TalentPlatform /> : <Login />;
};

export default Index;
