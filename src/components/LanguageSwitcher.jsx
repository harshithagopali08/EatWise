import { useTranslation } from "react-i18next";

function LanguageSwitcher() {

  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (

    <div className="absolute top-5 right-5 flex gap-2">

      <button
        onClick={() => changeLanguage("en")}
        className="px-3 py-1 bg-gray-200 rounded"
      >
        English
      </button>

      <button
        onClick={() => changeLanguage("hi")}
        className="px-3 py-1 bg-gray-200 rounded"
      >
        हिंदी
      </button>

      <button
        onClick={() => changeLanguage("te")}
        className="px-3 py-1 bg-gray-200 rounded"
      >
        తెలుగు
      </button>

    </div>
  );
}

export default LanguageSwitcher;