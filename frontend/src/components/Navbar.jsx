import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-slate-800 text-white px-8 py-4">

      <div className="max-w-6xl mx-auto flex gap-6">

        <Link to="/">
          Home
        </Link>

        <Link to="/create-event">
          Create Event
        </Link>

        <Link to="/events">
          Events
        </Link>

        <Link to="/registrations">
          Registrations
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;