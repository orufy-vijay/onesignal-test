import styles from "./Products.module.css";

const PRODUCTS = [
  { id: 1, emoji: "🎧", name: "Wireless Headphones", cat: "Electronics", price: "$79",  old: "$112", tag: "sale",  tagLabel: "−30%" },
  { id: 2, emoji: "👟", name: "Running Sneakers",    cat: "Footwear",    price: "$49",  old: "$82",  tag: "sale",  tagLabel: "−40%" },
  { id: 3, emoji: "⌚", name: "Smart Watch Pro",     cat: "Electronics", price: "$129", old: "$172", tag: "new",   tagLabel: "New"  },
  { id: 4, emoji: "👜", name: "Canvas Tote Bag",     cat: "Fashion",     price: "$24",  old: "$38",  tag: "hot",   tagLabel: "🔥 Hot" },
  { id: 5, emoji: "💄", name: "Skincare Set",        cat: "Beauty",      price: "$44",  old: "$55",  tag: "sale",  tagLabel: "−20%" },
  { id: 6, emoji: "🎮", name: "Gaming Controller",   cat: "Gaming",      price: "$59",  old: "$79",  tag: "new",   tagLabel: "New"  },
];

export default function Products({ onAddToCart }) {
  return (
    <section className="section" id="products">
      <div className="section-header">
        <h2>🔥 Flash Sale Picks</h2>
        <a href="#">View all →</a>
      </div>
      <div className={styles.grid}>
        {PRODUCTS.map((p) => (
          <div key={p.id} className={styles.card}>
            <div className={styles.img}>
              {p.emoji}
              <span className={`tag tag-${p.tag}`}>{p.tagLabel}</span>
            </div>
            <div className={styles.body}>
              <div className={styles.name}>{p.name}</div>
              <div className={styles.cat}>{p.cat}</div>
              <div className={styles.foot}>
                <div className={styles.price}>
                  {p.price} <span className={styles.old}>{p.old}</span>
                </div>
                <button
                  className={styles.addBtn}
                  onClick={() => onAddToCart(p.name)}
                >
                  Add +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
