import { useNavigate } from "react-router-dom";
import ProgressBar from "./ProgressBar";

function StepLayout({ title, step, total, children, onNext, disableNext }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center bg-white p-6">
      <div className="w-full max-w-md">
        {/* top bar */}
        <div className="flex items-center gap-3 mb-6">
          {step > 1 && (
            <button onClick={() => navigate(-1)} className="text-xl font-bold">
              ←
            </button>
          )}

          <ProgressBar step={step} total={total} />
        </div>

        <h2 className="text-2xl font-bold text-[#134611] mb-6">{title}</h2>

        {children}
      </div>

      {/* bottom next */}
      <button
        disabled={disableNext}
        onClick={onNext}
        className={`fixed bottom-6 w-[90%] max-w-md py-3 rounded-xl text-white
        ${disableNext ? "bg-gray-400" : "bg-[#134611]"}`}
      >
        Next
      </button>
    </div>
  );
}

export default StepLayout;
