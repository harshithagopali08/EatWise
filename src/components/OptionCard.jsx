function OptionCard({ label, selected, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-xl border flex justify-between items-center cursor-pointer
      ${selected ? "border-[#134611] bg-green-50" : "border-gray-300 bg-white"}`}
    >
      <span className="font-medium">{label}</span>

      <div
        className={`w-5 h-5 rounded-full border
        ${selected ? "bg-[#134611]" : ""}`}
      />
    </div>
  );
}

export default OptionCard;
