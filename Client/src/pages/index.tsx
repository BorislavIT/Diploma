import { MODULES } from "@/shared/constants";
import { redirect } from "next/navigation";

const Home = () => {
  redirect(MODULES.INVESTMENTS.PATH);
};

export default Home;
