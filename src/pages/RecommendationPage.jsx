import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

function RecommendationPage() {
  const { i18n, t } = useTranslation();
  const [result, setResult] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getPlan();
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;

    const userId = JSON.parse(storedUser)?.id;

    fetch(`https://eat-wise-phi.vercel.app/api/api/user/profile/${userId}`)
      .then((res) => res.json())
      .then((data) => setUser({ ...data }))
      .catch((err) => console.log(err));
  }, []);

  const getPlan = async () => {
    try {
      const language =
        i18n.language === "hi"
          ? "Hindi"
          : i18n.language === "te"
            ? "Telugu"
            : "English";

      const res = await fetch(
        "https://eat-wise-phi.vercel.app/api/api/recommend",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ language }),
        },
      );

      const data = await res.json();
      if (data?.data?.meals) {
        setResult(data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={page}>
      <h2 style={title}>🍽 {t("smartDiet")}</h2>

      <button style={button} onClick={getPlan}>
        {t("generatePlan")}
      </button>

      <div style={card}>
        <h3 style={sectionTitle}>📊 {t("yourHealth")}</h3>

        <div style={healthGrid}>
          {user ? (
            <>
              <Info
                label={t("bmi")}
                value={(user.weight / (user.height / 100) ** 2).toFixed(1)}
              />
              <Info
                label={t("calories")}
                value={Math.round(user.weight * 22)}
              />
              <Info
                label={t("goal")}
                value={
                  user?.goal
                    ? user.goal
                        .split(",")
                        .map((g) => t(`goals.${goalMap[g.trim()] || g}`))
                        .join(", ")
                    : "..."
                }
              />

              <Info
                label={t("risk")}
                value={
                  user?.medical
                    ? user.medical
                        .split(",")
                        .map((m) =>
                          t(`conditions.${conditionMap[m.trim()] || m}`),
                        )
                        .join(", ")
                    : "..."
                }
              />
            </>
          ) : (
            <>
              <Info label={t("bmi")} value="..." />
              <Info label={t("goal")} value="..." />
              <Info label={t("calories")} value="..." />
              <Info label={t("risk")} value="..." />
            </>
          )}
        </div>

        {result?.meals && (
          <>
            <h3 style={sectionTitle}>🍱 {t("dailyMeal")}</h3>

            <div style={mealGrid}>
              <Meal
                title={`🌅 ${t("meals.breakfast")}`}
                items={result.meals.breakfast}
                style={tl}
              />
              <Meal
                title={`🍛 ${t("meals.lunch")}`}
                items={result.meals.lunch}
                style={tr}
              />
              <Meal
                title={`🌙 ${t("meals.dinner")}`}
                items={result.meals.dinner}
                style={bl}
              />
              <Meal
                title={`🍎 ${t("meals.snacks")}`}
                items={result.meals.snacks}
                style={br}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Meal({ title, items = [], style }) {
  return (
    <div style={style}>
      <h4 style={mealTitle}>{title}</h4>
      {items.map((item, i) => (
        <p key={i} style={itemText}>
          🍽 {item}
        </p>
      ))}
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div style={infoCard}>
      <p style={{ fontSize: 13 }}>{label}</p>
      <strong>{value}</strong>
    </div>
  );
}

// styles unchanged
const page = { padding: 30, background: "#f5f7f5", minHeight: "100vh" };
const title = { textAlign: "center", marginBottom: 20 };
const button = {
  display: "block",
  margin: "0 auto 30px",
  padding: "12px 30px",
  background: "#ff7a00",
  color: "#fff",
  border: "none",
  borderRadius: 10,
};
const card = {
  background: "#fff",
  borderRadius: 16,
  padding: 25,
  maxWidth: 900,
  margin: "auto",
  boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
};
const sectionTitle = { color: "#2e7d32", marginBottom: 15 };
const healthGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: 15,
  marginBottom: 25,
};
const infoCard = {
  background: "#e8f0e6",
  padding: 15,
  borderRadius: 10,
  textAlign: "center",
};
const mealGrid = { display: "grid", gridTemplateColumns: "1fr 1fr" };
const tl = {
  padding: 20,
  borderRight: "1px solid #e0e0e0",
  borderBottom: "1px solid #e0e0e0",
};
const tr = { padding: 20, borderBottom: "1px solid #e0e0e0" };
const bl = { padding: 20, borderRight: "1px solid #e0e0e0" };
const br = { padding: 20 };
const mealTitle = { color: "#2e7d32" };
const itemText = { fontSize: 14 };
const goalMap = {
  "Weight Loss": "weightLoss",
  "Muscle Gain": "muscleGain",
  "Healthy Diet": "healthyDiet",
  "Calorie Tracking": "calorieTracking",
};

const conditionMap = {
  PCOS: "pcos",
  Diabetes: "diabetes",
  Thyroid: "thyroid",
  None: "none",
};
export default RecommendationPage;
