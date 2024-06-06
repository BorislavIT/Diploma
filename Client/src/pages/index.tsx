import { MODULES } from "@/shared/constants";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();

  router.push(MODULES.SHOP.PATH);

  return null;
};

export default Home;
