import { Order } from "@prisma/client";
import { Card, CardContent, CardFooter, CardHeader } from "./card";
import { api } from "../../utils/api";
import { Button } from "./button";
import dayjs from "dayjs";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "./use-toast";

interface IOrderCard {
  order: Order;
}
const OrderCard = ({ order }: IOrderCard) => {
  const completeOrder = api.orders.completeOrder.useMutation();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const onClickComplete = async () => {
    await completeOrder.mutateAsync(
      { orderId: order.id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(api.orders.listAllOrders.getQueryKey());
          toast({
            title: "Order Completed!",
          });
        },
      }
    );
  };

  const orderNo = order.id.toString().padStart(4, "0");

  return (
    <Card className="flex h-72 flex-col overflow-hidden">
      <CardHeader className="bg-rose-100 py-2 px-3">
        <div className="flex justify-between text-lg font-bold">
          <h2>#{orderNo}</h2>
          <h2>{order.orderedBy}</h2>
        </div>
        <h3 className="text-sm opacity-60">
          {dayjs(order.created).format("M/DD/YY @ h:mm")}
        </h3>
      </CardHeader>
      <CardContent className="p-2">
        <div className="flex items-center gap-1">
          <p className="font-bold">Item:</p>
          <p>{order.order}</p>
        </div>
        {order.orderMods && (
          <div className="flex items-center gap-1">
            <p className="font-bold">Mods:</p>
            <p>{order.orderMods}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="mt-auto flex justify-end">
        <Button onClick={onClickComplete}>Close</Button>
      </CardFooter>
    </Card>
  );
};
export default OrderCard;
