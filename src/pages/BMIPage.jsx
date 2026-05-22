import BMICalculator from "../components/BMICalculator";

import Chatbot from "../components/Chatbot";

const BMIPage = () => {
  return (
    <div className="flex justify-center items-center h-screen relative">
      <BMICalculator />

      {/* ✅ CHATBOT */}
      <Chatbot />
    </div>
  );
};

export default BMIPage;