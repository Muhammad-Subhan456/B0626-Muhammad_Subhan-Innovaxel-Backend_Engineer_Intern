import { useEffect, useState } from "react";
import api from "../services/api";

function Registrations() {
  const [registrations, setRegistrations] =
    useState([]);

  const fetchRegistrations = async () => {
    try {
      const res = await api.get(
        "/registrations"
      );

      setRegistrations(
        res.data.data
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const cancelRegistration =
    async (id) => {
      try {
        await api.delete(
          `/registrations/${id}`
        );

        fetchRegistrations();
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <div className="max-w-6xl mx-auto p-10">

      <h1 className="text-3xl font-bold mb-8">
        Active Registrations
      </h1>

      <div className="space-y-4">

        {registrations.map(
          (registration) => (
            <div
              key={registration._id}
              className="border p-4 rounded shadow flex justify-between"
            >
              <div>
                <h2 className="font-bold">
                  {
                    registration.userName
                  }
                </h2>

                <p>
                  Event:{" "}
                  {
                    registration
                      .eventId?.name
                  }
                </p>
              </div>

              <button
                onClick={() =>
                  cancelRegistration(
                    registration._id
                  )
                }
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          )
        )}

      </div>

    </div>
  );
}

export default Registrations;