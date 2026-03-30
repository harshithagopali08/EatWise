import CalorieTracker from "../components/CalorieTracker";

const CaloriePage = () => {
  return (
    <div className="min-h-screen flex justify-center items-start pt-20 px-4">
      <div className="w-full lg:w-3/4">
        <CalorieTracker />
      </div>
    </div>
  );
};

export default CaloriePage;