from Models.Modal import OrderCreateRequest
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse



import os
import stripe
import json


""" from dotenv import load_dotenv
load_dotenv() """


MONGODB_URI = os.environ.get("MONGODB_URI")
STRIP_API_KEY = os.environ.get("STRIP_API_KEY")

# TRYING STRIPE CHECKOUT
stripe.api_key = STRIP_API_KEY


app = FastAPI()


@app.post("/api/checkout")
async def create_order(data: OrderCreateRequest, request: Request):
    try:
        request_body = await request.body()
        request_data = json.loads(request_body.decode())

        currency = "usd" 
        database_items = []
        line_items_stripe = []

        print("MONGODB_URI", MONGODB_URI)
        print("STRIP_API_", STRIP_API_KEY)

        for item in request_data["items"]:
            line_item = {
                "price_data": {
                    "currency": currency,
                    "product_data": {
                        "name": item["title"],
                    },
                    "unit_amount": round(item["price"] * 100),
                },
                "quantity": item["quantity"],
            }
            line_items_stripe.append(line_item)

            print("THIS LINE ITEMS", line_items_stripe)

        # Create a Stripe Checkout session
        session = stripe.checkout.Session.create(
            customer_email=data.email,
            payment_method_types=["oxxo", "card"] if currency == "mxn" else ["card"],
            submit_type="pay",
            mode="payment",
            line_items=line_items_stripe,
            shipping_options=[],
            billing_address_collection="auto",
            success_url="https://morpheus-jade.vercel.app/success?session_id={CHECKOUT_SESSION_ID}?success=true",
            cancel_url="https://morpheus-jade.vercel.app/cancel?canceled=true",
            metadata={"test": "ok"},
        ) 
        #print("THE REQUEST DATA", request_data)
        return session["url"]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
