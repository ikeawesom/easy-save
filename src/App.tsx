import { twMerge } from "tailwind-merge";
import Container from "./components/Container";
import ErrorText from "./components/ErrorText";
import { Modal } from "./components/Modal";
import TextInput from "./components/TextInput";
import { useSavings } from "./hooks/useSavings";
import { calculateMonthlySavings, formatMoney, getCurrentMonth } from "./utils";
import { pages, type PageType } from "./lib";
import { usePage } from "./hooks/usePage";
import { useEffect, useState } from "react";
import { useStorageState } from "./hooks/useStorageState";
import type { SavingsType } from "./financeTypes";
import { useAddSavings } from "./hooks/useAddSavings";
import SavingsContainer from "./components/savings/SavingsContainer";

export default function App() {
  const {
    savingGoal,
    monthlySavingGoal,
    locked,
    error,
    isModalOpen,
    onChangeSavings,
    onChangeMonthlySavings,
    submit,
    openModal,
    closeModal,
    isLoading,
  } = useSavings();

  const { page, setPage } = usePage();

  const {
    openModal: openSavingsModal,
    closeModal: closeSavingsModal,
    onChangeSavings: onChangeAddSavings,
    submit: submitSaving,
    isModalOpen: isAddSavingsModalOpen,
    savings: addedSavings,
    currentSavings: updatedSavings,
  } = useAddSavings();

  const [currentSavings, setCurrentSavings] =
    useStorageState("current_savings");

  const current_savings = (
    currentSavings ? currentSavings : []
  ) as SavingsType[];

  const current_savings_val = current_savings?.reduce(
    (acc, curr) => acc + curr.amount,
    0
  );

  const {
    current_month_savings,
    diff_monthly_savings,
    prev_month_savings,
    monthly_savings,
    diff_monthly_savings_str,
  } = calculateMonthlySavings(current_savings);

  useEffect(() => {
    if (updatedSavings) setCurrentSavings(updatedSavings);
  }, [addedSavings, updatedSavings]);

  const difference_to_monthly_goal = monthlySavingGoal - current_month_savings;
  const savings_progress_percentage = (current_savings_val / savingGoal) * 100;

  const isInvalidSavings =
    savingGoal <= 0 || monthlySavingGoal <= 0 || monthlySavingGoal > savingGoal;

  const isInvalidAddSavings = addedSavings <= 0;

  const [showMonthlySavingsReach, setShowMonthlySavingsReach] = useStorageState(
    "show_monthly_savings_reach"
  );

  const [showEditSavings, setShowEditSavings] = useStorageState(
    "show_final_savings_reach"
  );

  const showFinalModal =
    showEditSavings === 0 && savings_progress_percentage >= 100;

  const dismissFinalSavingsReach = () => {
    setShowEditSavings(1);
  };

  const dismissMonthlySavingsReach = () => {
    setShowMonthlySavingsReach(getCurrentMonth());
  };

  const [financeType, setFinanceType] = useState<"save" | "spend">("save");

  if (isLoading) {
    return (
      <section className="w-full flex items-center justify-center min-h-screen bg-linear-to-br from-cyan-100 via-cyan-50 to-white">
        <div className="text-cyan-600 text-lg">Loading...</div>
      </section>
    );
  }

  return (
    <section className="w-full flex items-center justify-start flex-col gap-2 p-10 min-h-screen bg-linear-to-br from-cyan-100 via-cyan-50 to-white pb-20">
      <h1 className="w-full text-4xl mb-4 max-w-[800px]">
        Easy<span className="font-bold text-cyan-600">Save</span>
      </h1>

      {/* Navigation Bar */}
      {locked && (
        <div className="w-full flex items-center justify-center fixed bottom-0 left-0">
          <Container className="rounded-none flex items-center justify-evenly p-0 overflow-hidden">
            {pages.map((item: PageType) => (
              <button
                onClick={() => setPage(item.id)}
                key={item.id}
                className="flex-1 hover:bg-black/10 py-4"
              >
                <p
                  className={page === item.id ? "text-cyan-600 font-bold" : ""}
                >
                  {item.name}
                </p>
              </button>
            ))}
          </Container>
        </div>
      )}
      {/* Home Page */}

      {page === "home" && (
        <>
          <Container>
            <div>
              <p className="text-gray-700">Total savings this month:</p>
              <div className="flex items-center justify-between">
                <h1
                  className={twMerge(
                    "font-bold",
                    current_month_savings < 0 ? "text-red-700" : "text-cyan-600"
                  )}
                >
                  {current_month_savings < 0
                    ? `-$${formatMoney(current_month_savings * -1)}`
                    : `$${formatMoney(current_month_savings)}`}
                </h1>
                {prev_month_savings > 0 && (
                  <p
                    className={twMerge(
                      "font-bold",
                      diff_monthly_savings >= 0
                        ? "text-green-700"
                        : "text-red-700"
                    )}
                  >
                    {diff_monthly_savings >= 0 ? "+" : ""}
                    {diff_monthly_savings_str}%
                  </p>
                )}
              </div>
              {difference_to_monthly_goal > 0 ? (
                <p className="mt-1 text-gray-700">
                  Just
                  <span className="font-bold text-green-700">
                    {" "}
                    ${formatMoney(difference_to_monthly_goal)}
                  </span>{" "}
                  to reach your monthly target!
                </p>
              ) : showMonthlySavingsReach !== getCurrentMonth() ? (
                <p className="mt-2 font-bold relative py-2 px-3 rounded-md bg-green-100 w-full border border-green-200 text-green-800">
                  You have reached your monthly <br />
                  target! 🎉
                  <span
                    onClick={dismissMonthlySavingsReach}
                    className="text-green-700 absolute top-0 right-3 text-lg"
                  >
                    x
                  </span>
                </p>
              ) : (
                <p className="mt-2 text-gray-700">
                  Keep saving to your{" "}
                  <span className="font-bold">ultimate goal! </span>
                </p>
              )}

              <p className="text-gray-700 mt-4">Total savings:</p>
              <div className="flex items-center justify-between">
                <h1
                  className={twMerge(
                    "font-bold",
                    current_month_savings < 0 ? "text-red-700" : "text-cyan-600"
                  )}
                >
                  {current_month_savings < 0
                    ? `-$${formatMoney(current_month_savings * -1)}`
                    : `$${formatMoney(current_month_savings)}`}

                  <span className="text-sm font-normal text-cyan-600">
                    /{formatMoney(savingGoal ?? 0)}
                  </span>
                </h1>
                {/* <h1 className="font-bold text-cyan-600">
                  ${formatMoney(current_savings_val ?? 0)}
                </h1> */}
              </div>
              {savings_progress_percentage < 100 && (
                <>
                  <p className="text-gray-700 mt-2 italic mb-1">
                    <span className="font-bold">
                      {savings_progress_percentage.toFixed(2)}%
                    </span>{" "}
                    there...
                  </p>

                  <div className="w-full rounded-lg border border-gray-200 h-9 overflow-hidden relative flex items-center justify-end">
                    <div
                      className={`bg-cyan-500 h-12 absolute left-0 top-0 animate-pulse`}
                      style={{ width: `${savings_progress_percentage}%` }}
                    />
                    <span className="mr-1 mb-1 text-lg z-20">🎉</span>
                  </div>
                </>
              )}
            </div>
          </Container>
          <h3 className="w-full mt-4 font-bold max-w-[800px]">
            Recent Savings
          </h3>
          <SavingsContainer monthly_savings={monthly_savings} />
        </>
      )}
      {/* Settings Page */}
      {page === "settings" &&
        (locked ? (
          <>
            <Container>
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-gray-700">Savings goal:</p>
                    <span className="text-3xl font-bold text-cyan-600">
                      ${formatMoney(savingGoal ?? 0)}
                    </span>
                  </div>

                  <button
                    className={twMerge(
                      "bg-white text-gray-800 rounded-md py-2 px-3 border shadow-sm border-gray-100 hover:bg-gray-50 transition-colors"
                    )}
                    onClick={openModal}
                    type="button"
                  >
                    ✎
                  </button>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-gray-700">Monthly goal:</p>
                    <span className="text-3xl font-bold text-cyan-600">
                      ${formatMoney(monthlySavingGoal ?? 0)}
                    </span>
                  </div>
                </div>
              </div>
            </Container>
          </>
        ) : (
          <Container>
            <div className="flex flex-col gap-4 items-center justify-center py-8">
              <h4 className="text-gray-600 text-center">
                Set your savings goals to get started!
              </h4>
              <button
                className="bg-cyan-600 text-white shadow-md rounded-md py-2 px-6 hover:bg-cyan-700 transition-colors"
                onClick={openModal}
              >
                Begin Saving
              </button>
            </div>
          </Container>
        ))}

      <button
        onClick={openSavingsModal}
        className="shadow-2xl fixed bottom-8 left-1/2 -translate-x-1/2 bg-cyan-600 text-white text-3xl font-bold rounded-full flex items-center pb-2 px-3 justify-center hover:brightness-50 duration-200"
      >
        +
      </button>
      {/* Modal to add savings - HOME PAGE */}
      <Modal
        isOpen={isAddSavingsModalOpen}
        onClose={closeSavingsModal}
        allowClose={false}
      >
        <div className="flex flex-col gap-4">
          <div className="flex w-full items-center justify-around">
            <button
              onClick={() => setFinanceType("save")}
              className={twMerge(
                "text-xl font-bold flex-1 pt-0 border-b pb-3",
                financeType === "save"
                  ? "text-cyan-600 border-cyan-600"
                  : "text-gray-800 border-transparent"
              )}
            >
              Add Savings
            </button>
            <button
              onClick={() => setFinanceType("spend")}
              className={twMerge(
                "text-xl font-bold flex-1 pt-0 pb-3 border-b",
                financeType === "spend"
                  ? "text-cyan-600 border-cyan-600"
                  : "text-gray-800 border-transparent"
              )}
            >
              Add Expense
            </button>
          </div>

          <TextInput
            enabled={true}
            onChange={onChangeAddSavings}
            value={addedSavings}
            id="add_save_amt"
            label={`Enter amount ${
              financeType === "save" ? "saved" : "spent"
            }:`}
          />

          <div className="flex gap-3 justify-end mt-2">
            <button
              className="rounded-md py-2 px-6 shadow-sm border border-gray-100"
              onClick={closeSavingsModal}
            >
              Cancel
            </button>
            <button
              disabled={isInvalidAddSavings}
              className={twMerge(
                "bg-cyan-600 text-white rounded-md py-2 px-6 transition-colors",
                isInvalidAddSavings
                  ? "opacity-50"
                  : "cursor-pointer duration-200 hover:bg-cyan-700"
              )}
              onClick={() => submitSaving(financeType)}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal to edit goals - SETTINGS PAGE */}
      <Modal isOpen={isModalOpen} onClose={closeModal} allowClose={false}>
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {locked ? "Edit Savings Goals" : "Set Savings Goals"}
          </h2>

          <TextInput
            enabled={true}
            onChange={onChangeSavings}
            value={savingGoal}
            id="save_amt"
            label="Enter savings goal:"
          />

          <TextInput
            enabled={true}
            onChange={onChangeMonthlySavings}
            value={monthlySavingGoal}
            id="monthly_save_amt"
            label="Enter monthly savings:"
          />

          {error && <ErrorText errorText={error} />}

          <div className="flex gap-3 justify-end mt-2">
            <button
              disabled={isInvalidSavings}
              className={twMerge(
                "bg-cyan-600 text-white rounded-md py-2 px-6 transition-colors",
                isInvalidSavings
                  ? "opacity-50"
                  : "cursor-pointer duration-200 hover:brightness-90 hover:bg-cyan-700"
              )}
              onClick={submit}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal to modify savings */}
      <Modal isOpen={showFinalModal} onClose={dismissFinalSavingsReach}>
        <h3 className="text-center">
          Awesome, you have hit your final saving goal! Are you ready for your
          next challenge?
        </h3>
        <div className="flex items-center justify-center gap-4 mt-4">
          <button
            className="shadow-xl bg-cyan-600 text-white rounded-md py-2 flex-1 px-6 transition-colors cursor-pointer duration-200 hover:brightness-90 hover:bg-cyan-700"
            onClick={() => {
              dismissFinalSavingsReach();
              openModal();
            }}
          >
            Increase Goals
          </button>
          <button
            onClick={dismissFinalSavingsReach}
            className="rounded-md py-2 px-6 shadow-sm border border-gray-100 flex-1"
          >
            Maybe Later
          </button>
        </div>
      </Modal>
    </section>
  );
}
