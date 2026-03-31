import styles from "./Navbar.module.css";

const LINKS = ["Home", "Shop", "Deals", "New Arrivals", "About"];

export default function Navbar({ cartCount, showToast }) {
  return (
    <nav className={styles.nav}>
      <a href="#" className={styles.logo}>
        Shop<span>Pulse</span>
      </a>

      <ul className={styles.links}>
        {LINKS.map((l) => (
          <li key={l}>
            <a href="#">{l}</a>
          </li>
        ))}
      </ul>

      <div className={styles.actions}>
        <button
          className={styles.cartBtn}
          title="Cart"
          onClick={() => showToast("🛒 Cart is empty — add something!")}
        >
          🛒
          <span className={styles.cartCount}>{cartCount}</span>
        </button>
      </div>
    </nav>
  );
}
