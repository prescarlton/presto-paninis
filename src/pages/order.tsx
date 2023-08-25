import { NextPage } from "next";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import PageLayout from "../layouts/PageLayout";
import { useState } from "react";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { api } from "../utils/api";
import { useToast } from "../components/ui/use-toast";
import { useRouter } from "next/router";

const OrderPage: NextPage = () => {
  const [orderValue, setOrderValue] = useState("");
  const [orderMods, setOrderMods] = useState("");
  const router = useRouter();
  const createMutation = api.orders.createOrder.useMutation();
  const { toast } = useToast();

  const onSubmit = async () => {
    await createMutation.mutateAsync(
      {
        order: orderValue,
        orderMods,
      },
      {
        onSuccess: () => {
          toast({
            title: "Order successfully placed!",
          });
          router.push("/order-complete");
        },
        onError: () => {
          toast({
            title: "Unable to place order",
          });
        },
      }
    );
  };

  const isSubmittable = Boolean(orderValue);

  const ingredients = [
    "Hoagie roll",
    "Ham",
    "Salami",
    "Pepperoni",
    "Provolone Cheese",
    "Onion",
    "Sub dressing",
    "Lettuce",
    "Tomato",
    "Banana peppers",
  ];

  return (
    <PageLayout title="Place an Order">
      <div className="flex flex-col gap-3">
        <h2 className="text-3xl font-bold ">
          Today's sandwich: <span className="text-red-500">Italian</span>
        </h2>
        <div className="flex flex-wrap gap-1">
          {ingredients.map((ingredient) => (
            <div
              className="rounded-md bg-red-100 px-2 py-1 text-red-500"
              key={ingredient}
            >
              {ingredient}
            </div>
          ))}
        </div>

        <Label htmlFor="order">Pick your sandwich</Label>
        <Select value={orderValue} onValueChange={setOrderValue}>
          <SelectTrigger>
            <SelectValue placeholder="Pick a sandwich, dawg" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="italian">Italian</SelectItem>
            <SelectItem value="veggie">Veggie Italian</SelectItem>
          </SelectContent>
        </Select>
        <Label htmlFor="orderMods">
          If you have any dietary restrictions or other requests, please let me
          know!
        </Label>
        <Textarea
          id="orderMods"
          value={orderMods}
          onChange={(e) => setOrderMods(e.target.value)}
          placeholder=""
        />
        <Button disabled={!isSubmittable} onClick={onSubmit}>
          Place Order
        </Button>
      </div>
    </PageLayout>
  );
};

export default OrderPage;
