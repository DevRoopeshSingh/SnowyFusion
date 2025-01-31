// utils/storage.js
export const hasVisited = () => {
  try {
    return (
      (window.localStorage &&
        window.localStorage.getItem("hasVisitedSnowyFusion")) ||
      (window.sessionStorage &&
        window.sessionStorage.getItem("hasVisitedSnowyFusion"))
    );
  } catch (error) {
    console.error("Error checking visit status:", error);
    return false;
  }
};

export const setVisited = () => {
  try {
    if (window.localStorage) {
      window.localStorage.setItem("hasVisitedSnowyFusion", "true");
    } else if (window.sessionStorage) {
      window.sessionStorage.setItem("hasVisitedSnowyFusion", "true");
    }
  } catch (error) {
    console.error("Failed to set visit status:", error);
  }
};
