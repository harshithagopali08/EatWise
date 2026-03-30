import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="fixed top-5 left-5 flex gap-4">
      <Link to="/" className="bg-orange-500 text-white px-4 py-2 rounded">
        Calorie
      </Link>
      <Link to="/bmi" className="bg-green-600 text-white px-4 py-2 rounded">
        BMI
      </Link>
    </div>
  );
};

export default Navbar;