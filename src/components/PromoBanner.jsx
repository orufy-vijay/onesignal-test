import styles from "./PromoBanner.module.css";

export default function PromoBanner() {
  return (
    <div className={styles.banner}>
      <div>
        <h2>🎁 Refer a Friend — Get $20 Off</h2>
        <p>Share ShopPulse with friends and earn store credit on every successful referral.</p>
      </div>
      <button className="btn btn-white">Learn More →</button>
    </div>
  );
}
