import { useState, useEffect, useCallback } from "react";

import Navbar from "./components/Navbar";
import AnnouncementBar from "./components/AnnouncementBar";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import OneSignalPanel from "./components/OneSignalPanel";
import Products from "./components/Products";
import PromoBanner from "./components/PromoBanner";
import Footer from "./components/Footer";
import Toast from "./components/Toast";

// Access the OneSignal instance loaded via CDN in index.html
function getOS() {
  return window.OneSignal;
}

export default function App() {
  const [cartCount, setCartCount] = useState(0);
  const [toast, setToast] = useState({ message: "", visible: false });
  const [subscribed, setSubscribed] = useState(false);
  const [osReady, setOsReady] = useState(false);

  // Wait for OneSignal (CDN) to be ready, then sync state
  useEffect(() => {
    window.OneSignalDeferred = window.OneSignalDeferred || [];
    window.OneSignalDeferred.push(function (OneSignal) {
      console.log("triggered defredd !")
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
      showToast("🛒 Added ${name} to cart!");
    },
    [showToast]
  );

  const toggleNotifications = useCallback(async () => {
    if (!osReady) return;
    const OS = getOS();
    if (subscribed) {
      await OS.User.PushSubscription.optOut();
      setSubscribed(false);
      showToast("🔕 Unsubscribed from notifications.");
    } else {
      await OS.Notifications.requestPermission();
      const granted = OS.Notifications.permission === true;
      setSubscribed(granted);
      if (granted) showToast("🔔 You're now subscribed to deal alerts!");
    }
  }, [osReady, subscribed, showToast]);

  console.log("osReady :" , osReady)

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