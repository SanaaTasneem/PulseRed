import { useState } from "react";

function AddDonor() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bloodType: "",
    dateOfBirth: "",
    city: "",
    zipCode: ""
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await fetch("http://localhost:8080/api/donors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Donor added!");
    } else {
      alert("Failed to register donor.");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Donor</h2>

      <input name="firstName" placeholder="First Name" onChange={handleChange} />
      <br />

      <input name="lastName" placeholder="Last Name" onChange={handleChange} />
      <br />

      <input name="email" placeholder="Email" onChange={handleChange} />
      <br />

      <input name="phone" placeholder="Phone" onChange={handleChange} />
      <br />

      <input name="bloodType" placeholder="Blood Type" onChange={handleChange} />
      <br />

      <input name="dateOfBirth" placeholder="YYYY-MM-DD" onChange={handleChange} />
      <br />

      <input name="city" placeholder="City" onChange={handleChange} />
      <br />

      <input name="zipCode" placeholder="ZIP Code" onChange={handleChange} />
      <br />

      <button type="submit">Add Donor</button>
    </form>
  );
}

export default AddDonor;
