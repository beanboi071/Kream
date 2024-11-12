export default function AddressInputs({
  addressProps,
  setAddressProp,
  disabled = false,
}) {
  const { phone, streetAddress, postalCode, city, country } = addressProps;
  return (
    <>
      <label>Phone</label>
      <input
        disabled={disabled}
        type="tel"
        placeholder="Phone number"
        value={phone || ""}
        onChange={(ev) => setAddressProp("phone", ev.target.value)}
      />
      <label>Address</label>
      <input
        disabled={disabled}
        type="text"
        placeholder="Address "
        value={streetAddress || ""}
        onChange={(ev) => setAddressProp("streetAddress", ev.target.value)}
      />
     
     
    </>
  );
}
