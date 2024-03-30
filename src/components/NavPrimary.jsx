import { Link } from 'react-router-dom'

const NavPrimary = () => {
  return (
    <div id="nav-primary">
      <Link to="/">Home</Link>
      <Link to="/character-count">Character Count</Link>
    </div>
  )
}

export default NavPrimary