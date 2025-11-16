import { twMerge } from "tailwind-merge";
import Container from "./components/Container";
import ErrorText from "./components/ErrorText";
import { Modal } from "./components/Modal";
import TextInput from "./components/TextInput";
import { useSavings } from "./hooks/useSavings";
import { formatMoney } from "./utils";
import { pages, type PageType } from "./lib";
import { usePage } from "./hooks/usePage";
import { useEffect } from "react";
import { useStorageState } from "./hooks/useStorageState";
import type { SavingsType } from "./financeTypes";
import { useAddSavings } from "./hooks/useAddSavings";
import SavingRecord from "./components/savings/SavingRecord";

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

  useEffect(() => {
    if (updatedSavings) setCurrentSavings(updatedSavings);
  }, [addedSavings, updatedSavings]);

  const isInvalidSavings =
    savingGoal <= 0 || monthlySavingGoal <= 0 || monthlySavingGoal > savingGoal;

  const isInvalidAddSavings = addedSavings <= 0;

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
        <Container className="flex items-center justify-evenly p-0 overflow-hidden">
          {pages.map((item: PageType) => (
            <button
              onClick={() => setPage(item.id)}
              key={item.id}
              className="flex-1 hover:bg-black/10 py-4"
            >
              <p className={page === item.id ? "text-cyan-600 font-bold" : ""}>
                {item.name}
              </p>
            </button>
          ))}
        </Container>
      )}
      {/* Home Page */}

      {page === "home" && (
        <>
          <Container>
            <div>
              <p className="text-gray-700">Total savings:</p>
              <h1 className="font-bold text-cyan-600">
                ${formatMoney(current_savings_val ?? 0)}
              </h1>
            </div>
          </Container>
          <h3 className="w-full mt-4 font-bold max-w-[800px]">
            Recent Savings
          </h3>
          <Container
            className={twMerge(
              "min-h-[30vh]",
              current_savings.length === 0 && "grid place-items-center"
            )}
          >
            {current_savings.length > 0 ? (
              <div className="overflow-hidden w-full rounded-lg [box-shadow:inset_0_2px_4px_0_rgba(0,0,0,0.2)]">
                {current_savings
                  .sort(
                    (a, b) =>
                      new Date(b.date).getTime() - new Date(a.date).getTime()
                  )
                  // .filter((_, i: number) => i < 5)
                  .map((saving: SavingsType, index: number) => {
                    return (
                      <SavingRecord key={index} saving={saving} index={index} />
                    );
                  })}
              </div>
            ) : (
              <p className="text-gray-500">Hmmm, let's get saving!</p>
            )}
          </Container>
          <button
            onClick={openSavingsModal}
            className="fixed bottom-10 right-10 bg-cyan-600 text-white text-3xl font-bold rounded-full  flex items-center pb-2 px-3 justify-center hover:brightness-50 duration-200"
          >
            +
          </button>
        </>
      )}
      {/* Settings Page */}
      {page === "settings" && (
        <Container>
          {locked ? (
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
          ) : (
            <div className="flex flex-col gap-4 items-center justify-center py-8">
              <h3 className="text-gray-600 text-center">
                Set your savings goals to get started!
              </h3>
              <button
                className="bg-cyan-600 text-white text-lg shadow-md rounded-md py-2 px-6 hover:bg-cyan-700 transition-colors"
                onClick={openModal}
              >
                Begin Saving
              </button>
            </div>
          )}
        </Container>
      )}

      {/* Modal to add savings - HOME PAGE */}
      <Modal
        isOpen={isAddSavingsModalOpen}
        onClose={closeSavingsModal}
        allowClose={false}
      >
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-gray-800">Add Savings</h2>

          <TextInput
            enabled={true}
            onChange={onChangeAddSavings}
            value={addedSavings}
            id="add_save_amt"
            label="Enter amount saved:"
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
              onClick={submitSaving}
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
    </section>
  );
}
