"use client";

import React from "react";
import {
  removeFromBasket,
  selectItems,
  selectTotal,
  updateQuantity,
} from "@Slices";
import { BasketProps } from "@Types";
import { useRouter } from "next/navigation";
import { Container, FlexboxGrid, Input } from "rsuite";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@Hooks";
import { FaCartArrowDown } from "react-icons/fa";

const Basket = ({ scrolled, theme }: BasketProps) => {
  const basketItems = useAppSelector(selectItems);
  const [openCheckout, setOpenCheckout] = React.useState<boolean>(false);
  const modalRef = React.useRef<HTMLDivElement | null>(null);
  const CartButtonRef = React.useRef<HTMLButtonElement | null>(null);
  const total = useAppSelector(selectTotal);
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Close the basket modal when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        CartButtonRef.current &&
        CartButtonRef.current.contains(e.target as Node)
      ) {
        return;
      }

      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setOpenCheckout(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Increase the quantity of an item in the basket
  const handleIncreaseQuantity = (itemId: string) => {
    dispatch(updateQuantity({ _id: itemId, quantity: 1 }));
  };

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

  const checkout = () => {
    router.push("/checkout");
    setOpenCheckout(false);
  };

  return (
    <>
      <Container className="relative  h-full">
        <button
          ref={CartButtonRef}
          onClick={() => setOpenCheckout(!openCheckout)}
          className="active:translate-y-2 duration-500 ease-in-out"
        >
          <div
            className={`absolute bg-[var(--main-color)] w-6 h-6 ${
              scrolled && theme === "light" ? "text-black" : "text-white"
            }  font-extrabold text-lg flex justify-center items-center rounded-full left-[0.7rem] bottom-[1.45rem]`}
          >
            {basketItems.length}
          </div>
          <FaCartArrowDown
            className={`text-4xl ${
              scrolled && theme === "light" ? "text-black" : "text-white"
            }`}
          />
        </button>
      </Container>

      {openCheckout && (
        <Container
          ref={modalRef}
          className="w-[325px] fixed shadow-[-8px_0px_12px_1px_#4a5568] ml-auto  right-0 rounded-b-xl top-[77px]"
        >
          <Container className="dark:text-white space-y-4 text-black bg-white/5 backdrop-blur-2xl w-full px-5 py-1 rounded-b-xl">
            <div className="flex justify-end w-full">
              <button
                onClick={close}
                className="btn cart close rounded-b-xl text-white z-[1]"
              >
                X
              </button>
            </div>
            <h2 className="text-lg text-center">Your Basket</h2>

            <Container className="space-y-3 w-full max-h-[400px] overflow-y-scroll scrollbar-hide">
              {basketItems.map((item:any) => (
                <Container
                  className="border text-center flex justify-center shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] p-4 rounded-xl"
                  key={item._id}
                >
                  <Container>
                    <Container className="gap-4 flex-col mx-auto justify-center items-center lg:flex-row">
                      <div>
                        <Image
                          className="rounded-xl"
                          src={item?.images[0]}
                          alt={item.title}
                          height={100}
                          width={100}
                        />
                      </div>
                      <div>{item.title}</div>
                    </Container>
                  </Container>
                  <Container>
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
                              onClick={() => handleDecreaseQuantity(item._id)}
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
                  </Container>
                </Container>
              ))}
            </Container>
            <Container className="flex text-2xl font-bold mt-4">
              <FlexboxGrid justify="space-between" align="middle">
                <FlexboxGrid.Item>Total:</FlexboxGrid.Item>
                <FlexboxGrid.Item>{total.toFixed(2)} </FlexboxGrid.Item>
              </FlexboxGrid>
            </Container>
            <Container className="w-1/2 mx-auto">
              <button className="btn" onClick={checkout}>
                <span className="text-white text-xl z-[1] font-bold tracking-wider">
                  Checkout
                </span>
              </button>
            </Container>
          </Container>
        </Container>
      )}
    </>
  );
};

export default Basket;
