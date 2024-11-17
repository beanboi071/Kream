import fetch from "node-fetch"; // Ensure you have node-fetch or a similar package installed

export default async function handler(req, res) {
console.log("called");
    const { token, amount } = req.body;

  const response = await fetch('https://khalti.com/api/v2/payment/verify/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Key ${process.env.KHALTI_SECRET_KEY}`,
    },
    body: JSON.stringify({ token, amount })
  });

  const data = await response.json();

  if (data && data.status === 'SUCCESS') {
    // Handle success - You can update the order status, etc.
    res.status(200).json({ success: true });
  } else {
    // Handle failure
    res.status(400).json({ success: false, message: 'Payment verification failed!' });
  }
}
