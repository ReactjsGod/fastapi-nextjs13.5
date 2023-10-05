"use client";

import React from "react";
import Image from "next/image";
import { toast, Toaster } from "react-hot-toast";
import { Carousel } from "react-responsive-carousel";
import { Container, Panel, Rate } from "rsuite";
import { dataex } from "utils/ProductList/Listings";
import { Product } from "@Types";
import {BiCartAdd} from "react-icons/bi"

import { addToBasket } from "@Slices";
import { useAppDispatch } from "@Hooks";

const ProductsList = () => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [lang, setLang] = React.useState<string>("es");
  const dispatch = useAppDispatch();
  const renderPrice = (product: {
    productName?: string;
    //image?: string[];
    ID?: any;
    description?: string;
    price: number;
    rating?: number;
  }) => {
    const formattedPrice =
      lang === "es" ? product.price * 16 + "MXN" : product.price + "USD";
    return (
      <p className="font-bold text-[var(--main-color)]">{formattedPrice}</p>
    );
  };

  const addToCart = (product: {
    productName: string;
    image: string[];
    ID: any;
    description: string;
    price: number;
    rating?: number;
  }) => {
    toast.success(`You added an item to your basket`, {
      style: { backgroundColor: "#34A3F1", color: "white", fontWeight: 700 },
      icon: "⚠️",
    });

    const item = {
      _id: product.ID,
      title: product.productName,
      price: lang === "es" ? product.price * 16 : product.price,
      description: product.description,
      quantity: 1,
      images: product.image,
    };

    dispatch(addToBasket(item));
  };
  return (
    <>
      <Toaster />
      <Container className="w-full h-full my-5 flex justify-center items-center flex-col text-black dark:text-white">
        <Container className="w-full h-full my-5 flex justify-center items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
            {dataex.map((product) => (
              <Panel
                key={product.ID}
                shaded
                bordered
                bodyFill
                style={{ display: "inline-block", width: 280 }}
              >
                <Container className="h-[240px] overflow-hidden">
                  <Carousel
                    showStatus={false}
                    showThumbs={false}
                    infiniteLoop
                    className="h-full w-full overflow-hidden"
                  >
                    {product.image.map((imageURL, i) => (
                      <div
                        key={i + 1}
                        className="rounded-2xl object-contain bg-gray-400 bg-clip-padding backdrop-filter bg-opacity-10 overflow-auto w-full h-[300px] scrollbar-hide backdrop-blur-2xl"
                      >
                        <Image
                          className="w-full h-full object-contain mx-auto"
                          src={imageURL}
                          alt={product.productName}
                          height={240}
                          width={280}
                        />
                      </div>
                    ))}
                  </Carousel>
                </Container>

                <Panel className="h-full">
                  <Container className="h-full">
                    <Container className="flex flex-col gap-y-3 h-[300px] my-2">
                      <h1 className="text-lg text-center my-4">
                        {`productname.pron${product.ID}`}
                      </h1>
                      <p className="">
                        <small>{`descriptions.des${product.ID}`} </small>
                      </p>
                      <div className="flex justify-between items-center h-20">
                        {renderPrice(product)}
                        <p className="flex flex-col justify-center items-end">
                          <span>Rating</span>
                          <Rate
                            defaultValue={product.rating}
                            allowHalf
                            readOnly
                            size="xs"
                          />
                        </p>
                      </div>
                    </Container>
                    <Container className="flex flex-col gap-y-4">
                      <button
                        className="btn cart mx-auto"
                        onClick={() => addToCart(product)}
                      >
                        <div className="flex items-center w-full px-3 justify-around font-bold text-white">
                          <h1 className="text-lg flex items-center">+ </h1>
                          <BiCartAdd className="w-14 h-14" />
                        </div>
                      </button>
                    </Container>
                  </Container>
                </Panel>
              </Panel>
            ))}
            {products &&
              products?.map((product) => (
                <Panel
                  key={product._id}
                  shaded
                  bordered
                  bodyFill
                  style={{ display: "inline-block", width: 280 }}
                >
                  <Container className="h-[240px] overflow-hidden">
                    <Carousel
                      showStatus={false}
                      showThumbs={false}
                      infiniteLoop
                      className="h-full w-full overflow-hidden"
                    >
                      {product.image.map((imageURL, i) => (
                        <div
                          key={i + 1}
                          className="rounded-2xl object-contain bg-gray-400 bg-clip-padding backdrop-filter bg-opacity-10 overflow-auto w-full h-[300px] scrollbar-hide backdrop-blur-2xl"
                        >
                          <Image
                            className="w-full h-full object-contain mx-auto"
                            src={imageURL}
                            alt={product.productName}
                            height={240}
                            width={280}
                          />
                        </div>
                      ))}
                    </Carousel>
                  </Container>

                  <Panel className="h-full">
                    <Container className="h-full">
                      <Container className="flex flex-col gap-y-3 h-[300px] my-2">
                        <h1 className="text-lg text-center my-4">test</h1>
                        <p className="">
                          <small>test </small>
                        </p>
                        <div className="flex justify-between items-center h-20">
                          {renderPrice(product)}
                          <p className="flex flex-col justify-center items-end">
                            <span>test</span>
                            <Rate
                              defaultValue={product.rating}
                              allowHalf
                              readOnly
                              size="xs"
                            />
                          </p>
                        </div>
                      </Container>
                      <Container className="flex flex-col gap-y-4">
                        <button
                          className="btn cart mx-auto"
                          onClick={() => addToCart(product)}
                        >
                          <div className="flex items-center w-full px-3 justify-around font-bold text-white">
                            <h1 className="text-lg flex items-center">+ </h1>
                            <BiCartAdd className="w-14 h-14" />
                          </div>
                        </button>
                      </Container>
                    </Container>
                  </Panel>
                </Panel>
              ))}
          </div>
        </Container>
      </Container>
    </>
  );
};

export default ProductsList;
