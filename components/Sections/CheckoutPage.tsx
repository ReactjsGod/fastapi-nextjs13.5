"use client";

import {
  removeFromBasket,
  selectItems,
  selectTotal,
  updateQuantity,
} from "@Slices";
import { useAppDispatch, useAppSelector } from "@Hooks";
import { useRouter } from "next/navigation";
import React from "react";

//import { useLocale } from "next-intl";
import { useUser } from "@clerk/nextjs";
import { Container, FlexboxGrid, Input } from "rsuite";

interface Imagecheckout {
  title: string;
  description: string;
  price: number;
  quantity: number;
  UserProperties: {};
  reviewed: boolean;
}

const Checkout = () => {
  const basketItems = useAppSelector(selectItems);
  const total = useAppSelector(selectTotal);
  const router = useRouter();
  //const lang = useLocale();
  //const { isSignedIn, user } = useUser();
  const [isSignedIn, setIsSignedIn] = React.useState<boolean>(true);
  const [address, setAddress] = React.useState("");
  const dispatch = useAppDispatch();

  const formattedBasketItems = basketItems.map((item: { title: string; description: string; price: number; quantity: number; }) => ({
    title: item.title,
    description: item.description,
    price: item.price,
    quantity: item.quantity,
    //UserProperties: {},
    reviewed: false,
  }));

  const handleCheckout = async () => {
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: formattedBasketItems,
          locale: "en",
          email: "charles@gmail.com",
          address: address,
          name: "charles",
        }),
      });
      const session = await response.json();

      if (response.status === 200) {
        router.push(session.url);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Increase the quantity of an item in the basket
  const handleIncreaseQuantity = (itemId: string) => {
    dispatch(updateQuantity({ _id: itemId, quantity: 1 }));
  };

  console.log("BASKET ITEMS", basketItems);

  // Decrease the quantity of an item in the basket
  const handleDecreaseQuantity = (itemId: string) => {
    const item = basketItems.find((item: { _id: string; }) => item._id === itemId);
    if (item) {
      if (item.quantity === 1) {
        dispatch(removeFromBasket({ _id: itemId }));
      } else {
        dispatch(updateQuantity({ _id: itemId, quantity: -1 }));
      }
    }
  };

  return (
    <Container className="flex min-h-screen flex-col items-center justify-between pt-24 text-black dark:text-white">
      <h2 className="text-3xl font-semibold pb-4">Your Shopping Basket</h2>
      <Container className="grid grid-cols-1 md:grid-cols-2 p-4">
        <Container className="flex flex-col gap-y-4 w-full">
          {basketItems.length > 0 ? (
            basketItems.map((item: { _id: string; title: string; description: string; price: number; quantity:number; }) => (
              <FlexboxGrid
                align="middle"
                justify="center"
                key={item._id}
                className="bg-white dark:bg-black/70 gap-2 rounded-md p-4 shadow-md dark:shadow-white dark:shadow-lg transition duration-300 ease-in-out transform"
              >
                <FlexboxGrid.Item>
                  {/* <Image
                    className="rounded-xl"
                    src={item.images[0]}
                    alt={item.title}
                    height={100}
                    width={100}
                  /> */}
                </FlexboxGrid.Item>

                <FlexboxGrid.Item className="w-[280px]">
                  <Container className="w-[280px]">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.description}</p>
                    <p className="text-lg font-bold">
                      ${item.price.toFixed(2)}
                    </p>
                  </Container>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item>
                  <Container className="max-w-[200px] mx-auto">
                    <FlexboxGrid
                      justify="space-between"
                      align="middle"
                      className="gap-2"
                    >
                      <FlexboxGrid.Item>
                        <Container>
                          <button
                            className="btn cart close rounded-b-xl text-white z-[1]"
                            onClick={() => handleDecreaseQuantity(item?._id)}
                          >
                            -
                          </button>
                        </Container>
                      </FlexboxGrid.Item>
                      <FlexboxGrid.Item>
                        <Container className="w-10 h-10 border flex justify-center items-center rounded-lg font-bold">
                          {item.quantity}
                        </Container>
                      </FlexboxGrid.Item>
                      <FlexboxGrid.Item>
                        <Container>
                          <button
                            className="btn cart close rounded-b-xl text-white z-[1]"
                            onClick={() => handleIncreaseQuantity(item._id)}
                          >
                            +
                          </button>
                        </Container>
                      </FlexboxGrid.Item>
                    </FlexboxGrid>
                  </Container>
                </FlexboxGrid.Item>
              </FlexboxGrid>
            ))
          ) : (
            <p className="">You have no items in Your Cart</p>
          )}
        </Container>
        <Container className="md:border-l mx-auto p-4">
          <div className="mt-4">
            <label htmlFor="address" className="text-lg font-semibold">
              Delivery Address:
            </label>
            <Input
              type="text"
              id="address"
              className="w-full p-2 border rounded-md"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e)}
            />
          </div>
          <div className="max-w-screen-xl w-full">
            <div className="mt-8">
              <p className="text-lg font-semibold">
                Subtotal ({basketItems.length} items):
              </p>
              <p className="text-xl font-bold">${total.toFixed(2)}</p>
            </div>
            <button
              disabled={!isSignedIn}
              onClick={handleCheckout}
              className="btn disabled:text-gray-300 disabled:bg-gray-500 font-bold "
            >
              {isSignedIn
                ? "Proceed to Checkout"
                : "Must be signed in to checkout"}
            </button>
          </div>
        </Container>
      </Container>
    </Container>
  );
};

export default Checkout;
