import { ENDPOINTS } from "@/shared/constants";
import { useShopQuery } from "@/shared/queries";
import { Mp3File } from "./useMp3s";

export type ShoppingCart = {
  id: number;
  accountId: number;
  mp3s: Mp3File[];
};

const useShoppingCart = () => {
  const { data, error, isLoading } = useShopQuery<ShoppingCart>(
    ["getShoppingCart", global.isAuthorized],
    `${ENDPOINTS.SHOPPING_CART.PATH}`,
    true
  );

  return { data, error, isLoading };
};

export default useShoppingCart;
