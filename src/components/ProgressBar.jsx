function ProgressBar({ step, total }) {
  const percent = (step / total) * 100;

  return (
    <div className="w-full h-2 bg-gray-200 rounded-full">
      <div
        className="h-2 bg-[#134611] rounded-full transition-all"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}

export default ProgressBar;
