import styles from "./Footer.module.css";

const COLS = [
  {
    title: "Shop",
    links: ["New Arrivals", "Flash Sales", "Best Sellers", "Gift Cards"],
  },
  {
    title: "Support",
    links: ["Help Center", "Track Order", "Returns", "Contact Us"],
  },
  {
    title: "Company",
    links: ["About", "Blog", "Careers", "Privacy"],
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div className={styles.brand}>
          <a href="#" className={styles.logo}>
            Shop<span>Pulse</span>
          </a>
          <p>
            Deals that matter, delivered the moment they go live — via push
            notifications powered by OneSignal.
          </p>
        </div>
        {COLS.map((col) => (
          <div key={col.title} className={styles.col}>
            <h4>{col.title}</h4>
            <ul>
              {col.links.map((l) => (
                <li key={l}>
                  <a href="#">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className={styles.bottom}>
        <span>© 2026 ShopPulse. All rights reserved.</span>
        <span>
          Push notifications by <strong>OneSignal</strong>
        </span>
      </div>
    </footer>
  );
}
