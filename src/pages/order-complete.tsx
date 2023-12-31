import PageLayout from "../layouts/PageLayout";

const OrderCompletePage = () => {
  return (
    <PageLayout title="Order Complete!">
      <div className="flex flex-col items-center self-center">
        <h1 className="text-4xl font-bold text-rose-500">
          Your order has been placed!
        </h1>
        <h2>
          Please wait for your name to be called and your sando to be done.
        </h2>
      </div>
    </PageLayout>
  );
};
export default OrderCompletePage;
