import { type NextPage } from "next";

import { api } from "../utils/api";
import PageLayout from "../layouts/PageLayout";
import { Button } from "../components/ui/button";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const countOrders = api.orders.countOrders.useQuery();
  const router = useRouter();

  const onClick = () => {
    router.push("/order");
  };

  return (
    <PageLayout title="Home">
      <h1 className="text-center text-4xl font-bold text-rose-500">
        Welcome to Presto Paninis!
      </h1>
      <h2 className="mb-4 text-center text-3xl text-rose-300">
        {countOrders.data || 0} happy customers have placed an order
      </h2>
      <Button onClick={onClick} className="self-center">
        Start an order
      </Button>
    </PageLayout>
  );
};

export default Home;
