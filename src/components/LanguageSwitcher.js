// src/components/LanguageSwitcher.js
import { useTranslation } from "react-i18next";

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("preferredLanguage", lng); // Persist user choice
  };

  return (
    <div>
      <button onClick={() => changeLanguage("en")}>English</button>
      <button onClick={() => changeLanguage("hi")}>Hindi</button>
      <button onClick={() => changeLanguage("hi")}>Mara</button>
    </div>
  );
}

export default LanguageSwitcher;
