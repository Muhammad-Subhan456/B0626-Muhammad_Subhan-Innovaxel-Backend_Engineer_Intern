import { useState } from "react";
import api from "../services/api";

function RegisterModal({
  eventId,
  onClose,
}) {
  const [userName, setUserName] =
    useState("");

  const [message, setMessage] =
    useState("");

  const handleRegister = async () => {
    try {
      const res = await api.post(
        "/registrations",
        {
          userName,
          eventId,
        }
      );

      setMessage(
        res.data.message
      );
    } catch (error) {
      setMessage(
        error.response?.data?.message
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">

      <div className="bg-white p-6 rounded w-96">

        <h2 className="text-xl font-bold mb-4">
          Register User
        </h2>

        <input
          type="text"
          placeholder="User Name"
          value={userName}
          onChange={(e) =>
            setUserName(
              e.target.value
            )
          }
          className="w-full border p-2"
        />

        <button
          onClick={handleRegister}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
        >
          Register
        </button>

        <button
          onClick={onClose}
          className="mt-4 ml-3 bg-red-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>

        {message && (
          <p className="mt-3">
            {message}
          </p>
        )}

      </div>

    </div>
  );
}

export default RegisterModal;