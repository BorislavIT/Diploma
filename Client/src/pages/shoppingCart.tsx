import React from "react";
import Button from "@/components/Button";
import useShoppingCart from "@/components/shop/useShoppingCart";
import useRemoveShoppingCartMp3 from "@/components/shop/useRemoveShoppingCartItem";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/contexts/ToastContext";

const ShoppingCart = () => {
  const { data } = useShoppingCart();
  const queryClient = useQueryClient();
  const { mutateAsync: removeShoppingCartMp3 } = useRemoveShoppingCartMp3();
  const toast = useToast();

  const quantityBodyTemplate = () => {
    return <span>1</span>;
  };

  const removeCartItem = async (mp3: any) => {
    try {
      await removeShoppingCartMp3(mp3);
      queryClient.invalidateQueries({
        queryKey: ["getShoppingCart", global.isAuthorized],
      });
      toast.success(`Successfully removed ${mp3.name} from shopping cart`);
    } catch (error) {
      toast.error((error as any).response?.data?.error as string);
    }
  };

  const renderShoppingCartItemActions = (mp3: any) => {
    return (
      <div>
        <Button
          onClick={() => removeCartItem(mp3)}
          icon="pi pi-trash"
          className="border-none w-auto"
        />
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      {data?.mp3s.length === 0 && <span>Your shopping cart is empty.</span>}
      {data?.mp3s?.length! > 0 && (
        <>
          <div className="overflow-auto scrollbar-custom max-h-[calc(100vh-420px)]">
            <DataTable value={data!.mp3s} className="p-datatable-sm">
              <Column
                field="name"
                header="Mp3"
                className="bg-dark text-white border border-solid border-pink"
                headerClassName="bg-dark text-white border border-solid border-pink"
              />
              <Column
                field="quantity"
                header="Quantity"
                body={quantityBodyTemplate}
                className="bg-dark text-white border border-solid border-pink"
                headerClassName="bg-dark text-white border border-solid border-pink"
              />
              <Column
                field="price"
                header="Price"
                className="bg-dark text-white border border-solid border-pink"
                headerClassName="bg-dark text-white border border-solid border-pink"
                body={(rowData) => `$${rowData.price.toFixed(2)}`}
              />
              <Column
                header="Remove"
                className="bg-dark text-white border border-solid border-pink text-right"
                headerClassName="bg-dark text-white border border-solid border-pink justify-end"
                body={(rowData) =>
                  renderShoppingCartItemActions({ Id: rowData.id })
                }
                filterHeaderClassName="justify-end"
              />
            </DataTable>
          </div>
          <div className="text-right mt-8">
            <h2 className="text-xl font-semibold">
              Total Amount: $
              {data!.mp3s.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
            </h2>
            <Button label="Checkout" className="p-button-success mt-2" />
          </div>
        </>
      )}
    </div>
  );
};

export default ShoppingCart;
