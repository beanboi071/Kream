"use client";
import KhaltiCheckout from "khalti-checkout-web";
import { CartContext, cartProductPrice } from "../components/AppContext";
import AddressInputs from "../components/layout/AddressInputs";
import SectionHeader from "../components/layout/SectionHeader";
import CartProduct from "../components/menu/CartProduct";
import { useProfile } from "../components/UseProfile";

import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CartPage() {
  const { cartProducts, removeCartProduct } = useContext(CartContext);
  const [address, setAddress] = useState({});
  const { data: profileData } = useProfile();

  useEffect(() => {
    if (profileData?.city) {
      const { phone, streetAddress, city, postalCode, country } = profileData;
      setAddress({ phone, streetAddress, city, postalCode, country });
    }
  }, [profileData]);

  // Calculate subtotal
  let subtotal = cartProducts.reduce((sum, product) => sum + cartProductPrice(product), 0);
  
  function handleAddressChange(propName, value) {
    setAddress((prevAddress) => ({ ...prevAddress, [propName]: value }));
  }

  function proceedToCheckout(ev) {
    ev.preventDefault();

    const khaltiConfig = {
      publicKey: process.env.NEXT_PUBLIC_KHALTI_PUBLIC_KEY,
      productIdentity: "1234567890",
      productName: "Cart Total",
      productUrl: "http://localhost:3000/",
      eventHandler: {
        onSuccess(payload) {
          const totalAmount = (subtotal + 40) * 100; // Total amount with delivery
          // Send request to verify payment
          fetch("/api/verify-payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: payload.token, amount: totalAmount }),
          })
            .then(response => response.json())
            .then(data => {
              if (data.success) {
                toast.success("Payment successful!");
              } else {
                toast.error("Payment verification failed!");
              }
            })
            .catch(() => toast.error("Server error during verification"));
        },
        onError(error) {
          toast.error("Payment failed!");
        },
        onClose() {
          console.log("Payment widget is closed");
        },
      },
      paymentPreference: ["KHALTI"],
    };

    // Initialize Khalti Checkout
    const khaltiCheckout = new KhaltiCheckout(khaltiConfig);
    const totalAmount = (subtotal + 40) * 100; // Total amount with delivery
    khaltiCheckout.show({ amount: totalAmount });
  }

  if (cartProducts?.length === 0) {
    return (
      <section className="mt-8 text-center">
        <SectionHeader mainHeader="Cart" />
        <p className="mt-4">Your shopping cart is empty 😔</p>
      </section>
    );
  }

  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeader mainHeader="Cart" />
      </div>
      <div className="mt-8 grid gap-8 grid-cols-2">
        <div>
          {cartProducts.map((product, index) => (
            <CartProduct
              key={index}
              index={index}
              product={product}
              onRemove={removeCartProduct}
            />
          ))}
          <div className="py-2 pr-16 flex justify-end items-center">
            <div className="text-gray-500">
              Subtotal: Rs {subtotal}
              <br />
              Delivery: Rs 40
              <br />
              Total: Rs {subtotal + 40}
            </div>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2>Checkout</h2>
          <form onSubmit={proceedToCheckout}>
            <AddressInputs
              addressProps={address}
              setAddressProp={handleAddressChange}
            />
            <button type="submit">Pay Rs {subtotal + 40}</button>
          </form>
        </div>
      </div>
    </section>
  );
}
