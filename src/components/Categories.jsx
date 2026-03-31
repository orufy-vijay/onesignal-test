import styles from "./Categories.module.css";

const CATS = [
  { emoji: "👟", label: "Footwear" },
  { emoji: "🎧", label: "Electronics" },
  { emoji: "👗", label: "Fashion" },
  { emoji: "🏠", label: "Home & Living" },
  { emoji: "💄", label: "Beauty" },
  { emoji: "🎮", label: "Gaming" },
];

export default function Categories() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="section-header">
        <h2>Shop by Category</h2>
      </div>
      <div className={styles.grid}>
        {CATS.map((c) => (
          <div key={c.label} className={styles.card}>
            <span className={styles.emoji}>{c.emoji}</span>
            <span>{c.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
