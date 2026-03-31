import styles from "./OneSignalPanel.module.css";

const FEATURES = [
  { icon: "⚡", text: "Instant flash sale alerts" },
  { icon: "🔁", text: "Back-in-stock notifications" },
  { icon: "🎁", text: "Exclusive member-only deals" },
  { icon: "🚚", text: "Order & shipping updates" },
];

export default function OneSignalPanel({ subscribed, osReady, onToggle }) {
  return (
    <div className={styles.panel} id="onesignal-panel">
      <div className={styles.left}>
        <div className={styles.logo}>
          <div className={styles.dot}>🔔</div>
          <span>Powered by OneSignal</span>
        </div>
        <h2>Never Miss a Deal Again</h2>
        <p>
          Enable push notifications to get real-time alerts for flash sales,
          back-in-stock items, and exclusive member offers.
        </p>
        <span className={`${styles.badge} ${subscribed ? styles.on : styles.off}`}>
          {!osReady ? "Checking…" : subscribed ? "Subscribed ✓" : "Not subscribed"}
        </span>
        <p className={styles.hint}>
          {subscribed
            ? "You're receiving push notifications."
            : "Subscribe to get deal alerts instantly."}
        </p>
      </div>

      <div className={styles.right}>
        <ul className={styles.features}>
          {FEATURES.map((f) => (
            <li key={f.text} className={styles.feature}>
              <span>{f.icon}</span> {f.text}
            </li>
          ))}
        </ul>

        <button
          className={`btn ${subscribed ? "btn-outline" : "btn-primary"}`}
          onClick={onToggle}
          disabled={!osReady}
        >
          {subscribed ? "Unsubscribe from Alerts" : "Enable Push Notifications"}
        </button>

        <p className={styles.fine}>No spam. Unsubscribe anytime.</p>
      </div>
    </div>
  );
}
