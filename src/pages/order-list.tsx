import OrderCard from "../components/ui/orderCard";
import PageLayout from "../layouts/PageLayout";
import { api } from "../utils/api";

const OrderListPage = () => {
  const orders = api.orders.listAllOrders.useQuery();
  return (
    <PageLayout title="Order List">
      <h1 className="self-start text-2xl font-bold">Open orders</h1>
      <div className="grid gap-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-8">
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
