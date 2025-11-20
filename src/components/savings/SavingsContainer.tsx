import { twMerge } from "tailwind-merge";
import type { SavingsType } from "../../financeTypes";
import Container from "../Container";
import SavingRecord from "./SavingRecord";
import { groupSavingsByMonth } from "../../utils";

export default function SavingsContainer({
  current_savings,
}: {
  current_savings: SavingsType[];
}) {
  const monthly_savings = groupSavingsByMonth(current_savings);

  return (
    <Container
      className={twMerge(
        "min-h-[30vh]",
        current_savings.length === 0 && "grid place-items-center"
      )}
    >
      {current_savings.length > 0 ? (
        <div className="overflow-hidden w-full rounded-lg shadow-inner border border-gray-100">
          {Object.keys(monthly_savings).map((month: string, id: number) => {
            return (
              <div>
                <p
                  className={twMerge(
                    "w-full ml-2 my-2 font-bold max-w-[800px]",
                    id === 0 ? "" : "mt-6"
                  )}
                  key={id}
                >
                  {month}
                </p>
                {monthly_savings[month]
                  .sort(
                    (a, b) =>
                      new Date(b.date).getTime() - new Date(a.date).getTime()
                  )
                  .map((saving: SavingsType, index: number) => {
                    return (
                      <SavingRecord key={index} saving={saving} index={index} />
                    );
                  })}
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500">Hmmm, let's get saving!</p>
      )}
    </Container>
  );
}
