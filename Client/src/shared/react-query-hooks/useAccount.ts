import { useRouter } from "next/router";
import { ENDPOINTS, MODULES } from "../constants";
import { useShopQuery } from "../queries";

type Acccount = {
  Username: string;
  Id: number;
};

const useAccount = () => {
  const router = useRouter();

  const { data, error, isLoading } = useShopQuery<Acccount>(
    ["acc/identify", global.isAuthorized],
    `${ENDPOINTS.ACCOUNT.PATH}${ENDPOINTS.ACCOUNT.IDENTIFY}`,
    true
  );

  const ROUTE_IS_REG_OR_LOGIN =
    router.route === MODULES.ACCOUNT.REGISTER ||
    router.route === MODULES.ACCOUNT.LOGIN;

  if (data?.Username) {
    global.isAuthorized = true;
    if (ROUTE_IS_REG_OR_LOGIN) {
      router.push(MODULES.HOME);
    }
  }

  if (error && !ROUTE_IS_REG_OR_LOGIN) {
    global.isAuthorized = false;
    router.push(MODULES.ACCOUNT.LOGIN);
  }

  return { data, error, isLoading };
};

export default useAccount;
