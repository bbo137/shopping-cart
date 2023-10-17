import { Link } from "react-router-dom"

function NavBar(props) {
  return (
    <>
      <div id="nav-bar">
        <Link to="/home">Home</Link>
        <Link to="/shop">Shop</Link>
      </div>
    </>
  )
}

export default NavBar