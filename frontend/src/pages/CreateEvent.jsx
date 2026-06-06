import { useState } from "react";
import api from "../services/api";

function CreateEvent() {
  const [formData, setFormData] = useState({
    name: "",
    totalSeats: "",
    eventDate: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/events", formData);

      setMessage("✅ Event created successfully");

      setFormData({
        name: "",
        totalSeats: "",
        eventDate: "",
      });

      console.log(res.data);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10">

      <h1 className="text-3xl font-bold mb-6">
        Create Event
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          type="text"
          name="name"
          placeholder="Event Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="number"
          name="totalSeats"
          placeholder="Total Seats"
          value={formData.totalSeats}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="date"
          name="eventDate"
          value={formData.eventDate}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <button
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          Create Event
        </button>

      </form>

      {message && (
        <p className="mt-4 font-semibold">
          {message}
        </p>
      )}

    </div>
  );
}

export default CreateEvent;