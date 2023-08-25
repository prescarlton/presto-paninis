import { Order } from "@prisma/client";
import { Card, CardDescription, CardHeader, CardTitle } from "./card";
import { api } from "../../utils/api";

interface IOrderCard {
  order: Order;
}
const OrderCard = ({ order }: IOrderCard) => {
  const completeOrder = api.orders.completeOrder.useMutation();

  const onClickComplete = async () => {
    // await completeOrder.mutateAsync({ orderId: order.id });
  };

  return (
    <Card className="w-1/2">
      <CardHeader>
        <CardTitle>
          {order.orderedBy} - {order.order}
        </CardTitle>
        {order.orderMods && (
          <CardDescription>{order.orderMods}</CardDescription>
        )}
      </CardHeader>
    </Card>
  );
};
export default OrderCard;
