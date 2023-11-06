// Router
import { Link } from "react-router-dom";

// Styles
import styles from "./styles/OrderComplete.module.css";

function OrderComplete() {
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <h2>Your order was placed and will be shipped soon.</h2>
        <h2>Your order number is #9897513. We&apos;ll keep you uptaded via email.</h2>
        <Link to="/home">Back to Home</Link>
      </div>
    </div>
  )
}

export default OrderComplete