import type { SavingsType } from "../../financeTypes";
import { twMerge } from "tailwind-merge";

export default function SavingRecord({
  saving,
  index,
}: {
  saving: SavingsType;
  index: number;
}) {
  const amt = saving.amount;

  return (
    <div
      key={saving.id}
      className={twMerge(
        "hover:bg-gray-500/10 p-2",
        index % 2 === 0 ? "bg-white" : "bg-gray-50"
      )}
    >
      <p className="text-sm text-gray-400">
        {saving.date.split("T")[0]}{" "}
        {saving.date.split("T")[1].split("Z")[0].split(".")[0]}
      </p>
      <h3
        className={twMerge(
          "font-bold",
          amt < 0 ? "text-red-700" : "text-green-700"
        )}
      >
        {amt < 0 ? `-$${amt * -1}` : `+$${amt}`}
      </h3>
    </div>
  );
}
