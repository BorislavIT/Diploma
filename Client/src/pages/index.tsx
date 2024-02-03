import { MODULES } from "@/shared/constants";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    router.push(MODULES.INVESTMENTS.PATH);
  }, []);

  return null;
};

export default Home;
