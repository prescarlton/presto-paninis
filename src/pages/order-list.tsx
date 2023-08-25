import OrderCard from "../components/ui/orderCard";
import PageLayout from "../layouts/PageLayout";
import { api } from "../utils/api";

const OrderListPage = () => {
  const orders = api.orders.listAllOrders.useQuery();
  return (
    <PageLayout title="Order List">
      <div className="flex w-1/2 flex-col items-center gap-1">
        {orders.data
          ? orders.data.map((ord) => <OrderCard order={ord} key={ord.id} />)
          : "Loading..."}
      </div>
      {orders.data && orders.data.length === 0 && (
        <h1 className="text-2xl opacity-50">There are no orders yet.</h1>
      )}
    </PageLayout>
  );
};
export default OrderListPage;
