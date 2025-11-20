import { twMerge } from "tailwind-merge";
import type { MonthlySavings, SavingsType } from "../../financeTypes";
import Container from "../Container";
import SavingRecord from "./SavingRecord";

export default function SavingsContainer({
  monthly_savings,
}: {
  monthly_savings: MonthlySavings;
}) {
  const len = Object.keys(monthly_savings).length;

  return (
    <Container
      className={twMerge(
        "min-h-[30vh]",
        len === 0 && "grid place-items-center"
      )}
    >
      {len > 0 ? (
        <div className="overflow-hidden w-full rounded-lg shadow-inner border border-gray-100">
          {Object.keys(monthly_savings).map((month: string, id: number) => {
            return (
              <div key={id}>
                <p
                  className={twMerge(
                    "w-full ml-2 font-bold max-w-[800px]",
                    id === 0 ? "mt-2" : "mt-4"
                  )}
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
