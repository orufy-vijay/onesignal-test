import styles from "./Hero.module.css";

const MINI_PRODUCTS = [
  { emoji: "👟", name: "Sneakers",    price: "$49",  off: "−40%" },
  { emoji: "🎧", name: "Headphones", price: "$79",  off: "−30%" },
  { emoji: "⌚", name: "Smart Watch", price: "$129", off: "−25%" },
  { emoji: "💻", name: "Laptop Bag", price: "$34",  off: "−50%" },
];

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.text}>
        <span className={styles.eyebrow}>🏷️ Limited Time Deals</span>
        <h1>
          Discover Deals <span>Before Anyone Else</span>
        </h1>
        <p>
          Subscribe to instant push notifications and never miss a flash sale,
          restock, or exclusive offer again.
        </p>
        <div className={styles.cta}>
          <button
            className="btn btn-primary"
            onClick={() =>
              document
                .getElementById("onesignal-panel")
                ?.scrollIntoView({ behavior: "smooth", block: "center" })
            }
          >
            🔔 Get Deal Alerts
          </button>
          <button
            className="btn btn-dark"
            onClick={() =>
              document
                .getElementById("products")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Browse Products
          </button>
        </div>
      </div>

      <div className={styles.imageWrap}>
        <div className={styles.card}>
          {MINI_PRODUCTS.map((p) => (
            <div key={p.name} className={styles.miniProduct}>
              <span className={styles.emoji}>{p.emoji}</span>
              <span className={styles.pName}>{p.name}</span>
              <span className={styles.price}>{p.price}</span>
              <span className={styles.saleBadge}>{p.off}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
