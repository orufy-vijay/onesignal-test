import styles from "./AnnouncementBar.module.css";

export default function AnnouncementBar() {
  return (
    <div className={styles.bar}>
      🔥 <strong>FLASH SALE:</strong> Up to 60% off sitewide — ends midnight!
      &nbsp;|&nbsp; Free shipping on orders over $49
    </div>
  );
}
