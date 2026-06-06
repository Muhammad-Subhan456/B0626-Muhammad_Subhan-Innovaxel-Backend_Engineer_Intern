import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold mb-4">Event Registration System</h1>

      <p className="text-gray-600 mb-8">Innovaxel Backend Assessment</p>

      <div className="flex gap-4">
        <Link
          to="/create-event"
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          Create Event
        </Link>

        <Link
          to="/events"
          className="bg-green-600 text-white px-6 py-3 rounded"
        >
          View Events
        </Link>
      </div>
      {/* <p className="mt-20 text-gray-500">Built with MERN Stack</p> */}
    </div>
  );
}

export default Home;
