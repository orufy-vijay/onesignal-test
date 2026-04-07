import { useState } from "react";
import styles from "./OneSignalTestCards.module.css";

function getOS() {
  return window.OneSignal;
}

function Card({ icon, title, children }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={styles.cardIcon}>{icon}</span>
        <h3 className={styles.cardTitle}>{title}</h3>
      </div>
      <div className={styles.cardBody}>{children}</div>
    </div>
  );
}

function Result({ value }) {
  if (value === null) return null;
  return (
    <pre className={styles.result}>
      {typeof value === "object" ? JSON.stringify(value, null, 2) : String(value)}
    </pre>
  );
}

export default function OneSignalTestCards({ osReady }) {
  // Tags
  const [tagKey, setTagKey] = useState("");
  const [tagValue, setTagValue] = useState("");
  const [tagsResult, setTagsResult] = useState(null);

  // Login
  const [extId, setExtId] = useState("");
  const [loginResult, setLoginResult] = useState(null);

  // Subscription info
  const [subInfo, setSubInfo] = useState(null);

  // isPushSupported
  const [supported, setSupported] = useState(null);

  // Slidedown
  const [slidedownResult, setSlidedownResult] = useState(null);

  if (!osReady) {
    return (
      <div className={styles.wrapper}>
        <p className={styles.waiting}>⏳ Waiting for OneSignal to initialise…</p>
      </div>
    );
  }

  const OS = getOS();

  const log = (label, data) => {
    if (data !== undefined) {
      console.log(`[OneSignal] ${label}`, data);
    } else {
      console.log(`[OneSignal] ${label}`);
    }
  };

  // ── Tag helpers ──────────────────────────────────────────────────────────
  async function handleAddTag() {
    if (!tagKey) return;
    log("addTag →", { key: tagKey, value: tagValue });
    OS.User.addTag(tagKey, tagValue);
    const result = `✅ Tag set: ${tagKey} = "${tagValue}"`;
    log("addTag ✓", result);
    setTagsResult(result);
  }

  async function handleRemoveTag() {
    if (!tagKey) return;
    log("removeTag →", tagKey);
    OS.User.removeTag(tagKey);
    const result = `🗑 Tag removed: ${tagKey}`;
    log("removeTag ✓", result);
    setTagsResult(result);
  }

  async function handleGetTags() {
    log("getTags →");
    const tags = await OS.User.getTags();
    log("getTags ✓", tags);
    setTagsResult(tags);
  }

  // ── Login/Logout ─────────────────────────────────────────────────────────
  async function handleLogin() {
    if (!extId) return;
    log("login →", extId);
    await OS.login(extId);
    const result = `✅ Logged in as: ${extId}`;
    log("login ✓", result);
    setLoginResult(result);
  }

  async function handleLogout() {
    log("logout →");
    await OS.logout();
    log("logout ✓");
    setLoginResult("👋 Logged out");
  }

  // ── Subscription Info ────────────────────────────────────────────────────
  function handleSubInfo() {
    const sub = OS.User.PushSubscription;
    const info = {
      id: sub.id ?? "n/a",
      token: sub.token ? sub.token.slice(0, 40) + "…" : "n/a",
      onesignalId: OS.User.onesignalId ?? "n/a",
    };
    log("PushSubscription info", info);
    setSubInfo(info);
  }

  // ── isPushSupported ───────────────────────────────────────────────────────
  function handleCheckSupport() {
    const result = OS.Notifications.isPushSupported();
    log("isPushSupported →", result);
    setSupported(result);
  }

  // ── Slidedown ─────────────────────────────────────────────────────────────
  async function handleSlidedown() {
    try {
      log("Slidedown.promptPush →");
      await OS.Slidedown.promptPush();
      log("Slidedown.promptPush ✓");
      setSlidedownResult("✅ Slidedown prompt triggered");
    } catch (e) {
      log("Slidedown.promptPush ✗", e);
      setSlidedownResult("⚠️ " + e.message);
    }
  }

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.heading}>OneSignal API Playground</h2>
      <p className={styles.sub}>Interactive cards to test SDK functions</p>

      <div className={styles.grid}>
        {/* ── Tags ── */}
        <Card icon="🏷️" title="User Tags">
          <div className={styles.row}>
            <input
              className={styles.input}
              placeholder="Key"
              value={tagKey}
              onChange={(e) => setTagKey(e.target.value)}
            />
            <input
              className={styles.input}
              placeholder="Value"
              value={tagValue}
              onChange={(e) => setTagValue(e.target.value)}
            />
          </div>
          <div className={styles.row}>
            <button className={styles.btn} onClick={handleAddTag}>Add Tag</button>
            <button className={`${styles.btn} ${styles.btnOutline}`} onClick={handleRemoveTag}>Remove Tag</button>
            <button className={`${styles.btn} ${styles.btnOutline}`} onClick={handleGetTags}>Get All Tags</button>
          </div>
          <Result value={tagsResult} />
        </Card>

        {/* ── Login ── */}
        <Card icon="👤" title="Login / Logout">
          <div className={styles.row}>
            <input
              className={styles.input}
              placeholder="External User ID"
              value={extId}
              onChange={(e) => setExtId(e.target.value)}
            />
          </div>
          <div className={styles.row}>
            <button className={styles.btn} onClick={handleLogin}>Login</button>
            <button className={`${styles.btn} ${styles.btnOutline}`} onClick={handleLogout}>Logout</button>
          </div>
          <Result value={loginResult} />
        </Card>

        {/* ── Subscription Info ── */}
        <Card icon="📋" title="Subscription Info">
          <p className={styles.desc}>Fetch the current push subscription details.</p>
          <button className={styles.btn} onClick={handleSubInfo}>Get Info</button>
          <Result value={subInfo} />
        </Card>

        {/* ── isPushSupported ── */}
        <Card icon="✅" title="isPushSupported">
          <p className={styles.desc}>Check if this browser supports push notifications.</p>
          <button className={styles.btn} onClick={handleCheckSupport}>Check Support</button>
          <Result value={supported !== null ? (supported ? "✅ Push is supported" : "❌ Not supported") : null} />
        </Card>

        {/* ── Slidedown Prompt ── */}
        <Card icon="💬" title="Slidedown Prompt">
          <p className={styles.desc}>Trigger OneSignal's native opt-in slidedown UI.</p>
          <button className={styles.btn} onClick={handleSlidedown}>Trigger Slidedown</button>
          <Result value={slidedownResult} />
        </Card>

        {/* ── Opt In / Out ── */}
        <Card icon="🔔" title="Opt In / Opt Out">
          <p className={styles.desc}>Directly opt the user's push subscription in or out.</p>
          <div className={styles.row}>
            <button
              className={styles.btn}
              onClick={async () => {
                log("PushSubscription.optIn →");
                await OS.User.PushSubscription.optIn();
                log("PushSubscription.optIn ✓");
                setSubInfo({ status: "✅ Opted in" });
              }}
            >
              Opt In
            </button>
            <button
              className={`${styles.btn} ${styles.btnOutline}`}
              onClick={async () => {
                log("PushSubscription.optOut →");
                await OS.User.PushSubscription.optOut();
                log("PushSubscription.optOut ✓");
                setSubInfo({ status: "🔕 Opted out" });
              }}
            >
              Opt Out
            </button>
          </div>
          <Result value={subInfo} />
        </Card>
      </div>
    </section>
  );
}
