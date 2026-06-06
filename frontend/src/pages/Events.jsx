import { useEffect, useState } from "react";
import api from "../services/api";
import RegisterModal from "../components/RegisterModal";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const fetchEvents = async () => {
    try {
      const res = await api.get("/events");

      setEvents(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-10">
      <h1 className="text-3xl font-bold mb-8">All Events</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {events.map((event) => (
          <div key={event._id} className="border rounded-lg p-5 shadow">
            <h2 className="text-xl font-bold">{event.name}</h2>

            <p className="mt-2">Total Seats: {event.totalSeats}</p>

            <p>Available Seats: {event.availableSeats}</p>

            <p>Registrations: {event.totalRegistrations}</p>

            <p>Date: {new Date(event.eventDate).toLocaleDateString()}</p>

            <button
              onClick={() => setSelectedEvent(event._id)}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
            >
              Register
            </button>
          </div>
        ))}
      </div>
      {selectedEvent && (
        <RegisterModal
          eventId={selectedEvent}
          onClose={() => {
            setSelectedEvent(null);
            fetchEvents();
          }}
        />
      )}
    </div>
  );
}

export default Events;
