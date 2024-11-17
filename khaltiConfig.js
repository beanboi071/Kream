// khaltiConfig.js
const khaltiConfig = {
    publicKey: process.env.NEXT_PUBLIC_KHALTI_PUBLIC_KEY, // Add your Khalti public key here
    productIdentity: "1234567890",
    productName: "Your Cart Items",
    productUrl: "http://localhost:3000/cart",
    eventHandler: {
      onSuccess(payload) {
        console.log("Payment successful:", payload);
        // Handle the successful payment here (e.g., send payload to the server for verification)
      },
      onError(error) {
        console.log("Payment error:", error);
      },
      onClose() {
        console.log("Khalti checkout closed");
      },
    },
    paymentPreference: ["KHALTI", "EBANKING", "MOBILE_BANKING", "CONNECT_IPS", "SCT"],
  };
  
  export default khaltiConfig;
  