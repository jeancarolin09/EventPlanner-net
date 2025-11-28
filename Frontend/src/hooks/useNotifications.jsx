import { useState, useEffect } from "react";

export const useNotifications = (interval = 5000) => {
  const [notifications, setNotifications] = useState([]);
  const [counts, setCounts] = useState({
    messages: 0,
    invitations: 0,
    activities: 0,
  });

  const fetchNotifications = async () => {
    try {
      const jwt = localStorage.getItem("jwt");
      const res = await fetch("http://localhost:8000/api/notifications", {
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Erreur API notifications");

      const data = await res.json();
      setNotifications(data.notifications);

      // Calcul automatique des badges par type
      setCounts({
        messages: data.notifications.filter(
          (n) => n.relatedTable === "message" && !n.isRead
        ).length,
        invitations: data.notifications.filter(
          (n) => n.relatedTable === "invitation" && !n.isRead
        ).length,
        activities: data.notifications.filter(
          (n) => n.relatedTable === "activity" && !n.isRead
        ).length,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const markAllAsRead = async () => {
    try {
      const jwt = localStorage.getItem("jwt");
      await fetch("http://localhost:8000/api/notifications/mark-all-read", {
        method: "POST",
        headers: { Authorization: `Bearer ${jwt}`,
         "Content-Type": "application/json"
    },
      });

    
        setUnreadCount(0);
        // 🔥 force update des notifications
        fetchNotifications();

    } catch (err) {
        console.error(err);
    }
};

  useEffect(() => {
    fetchNotifications();
    const timer = setInterval(fetchNotifications, interval);
    return () => clearInterval(timer);
  }, [interval]);

  return { notifications, counts, markAllAsRead };
};
