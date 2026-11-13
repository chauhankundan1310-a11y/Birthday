import { Link } from 'react-router-dom';
import { FaBirthdayCake } from 'react-icons/fa';

export default function Navbar() {
  return (
    <nav className="landing-nav">
      <Link to="/" className="logo text-decoration-none d-flex align-items-center gap-2">
        <FaBirthdayCake /> Birthday Surprise
      </Link>
      <Link to="/create" className="btn-create text-decoration-none">Create One</Link>
    </nav>
  );
}
