import { Link } from "react-router-dom"

function NavBar(props) {
  return (
    <>
      <Link to="/home">Home</Link>
      <Link to="/Shop">Shop</Link>
    </>
  )
}

export default NavBar