import { useState, useEffect, useCallback } from "react";
import OneSignal from "react-onesignal";

import Navbar from "./components/Navbar";
import AnnouncementBar from "./components/AnnouncementBar";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import OneSignalPanel from "./components/OneSignalPanel";
import Products from "./components/Products";
import PromoBanner from "./components/PromoBanner";
import Footer from "./components/Footer";
import Toast from "./components/Toast";

const ONESIGNAL_APP_ID = "YOUR_ONESIGNAL_APP_ID"; // 🔑 Replace with your App ID

export default function App() {
  const [cartCount, setCartCount] = useState(0);
  const [toast, setToast] = useState({ message: "", visible: false });
  const [subscribed, setSubscribed] = useState(false);
  const [osReady, setOsReady] = useState(false);

  // Init OneSignal once
  useEffect(() => {
    OneSignal.init({
      appId: ONESIGNAL_APP_ID,
      notifyButton: { enable: false },
      allowLocalhostAsSecureOrigin: true,
    }).then(() => {
      setOsReady(true);
      setSubscribed(OneSignal.Notifications.permission === true);
      OneSignal.Notifications.addEventListener("permissionChange", (perm) => {
        setSubscribed(perm === true);
      });
    });
  }, []);

  const showToast = useCallback((message) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 3000);
  }, []);

  const addToCart = useCallback(
    (name) => {
      setCartCount((c) => c + 1);
      showToast(`🛒 Added ${name} to cart!`);
    },
    [showToast]
  );

  const toggleNotifications = useCallback(async () => {
    if (!osReady) return;
    if (subscribed) {
      await OneSignal.User.PushSubscription.optOut();
      setSubscribed(false);
      showToast("🔕 Unsubscribed from notifications.");
    } else {
      await OneSignal.Notifications.requestPermission();
      const granted = OneSignal.Notifications.permission === true;
      setSubscribed(granted);
      if (granted) showToast("🔔 You're now subscribed to deal alerts!");
    }
  }, [osReady, subscribed, showToast]);

  return (
    <>
      <AnnouncementBar />
      <Navbar cartCount={cartCount} showToast={showToast} />
      <Hero />
      <Categories />
      <OneSignalPanel
        subscribed={subscribed}
        osReady={osReady}
        onToggle={toggleNotifications}
      />
      <Products onAddToCart={addToCart} />
      <PromoBanner />
      <Footer />
      <Toast message={toast.message} visible={toast.visible} />
    </>
  );
}
