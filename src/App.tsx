import { twMerge } from "tailwind-merge";
import Container from "./components/Container";
import ErrorText from "./components/ErrorText";
import { Modal } from "./components/Modal";
import TextInput from "./components/TextInput";
import { useSavings } from "./hooks/useSavings";
import { formatMoney } from "./utils";
import { pages, type PageType } from "./lib";
import { usePage } from "./hooks/usePage";

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

  const isInvalidSavings =
    savingGoal <= 0 || monthlySavingGoal <= 0 || monthlySavingGoal > savingGoal;

  if (isLoading) {
    return (
      <section className="w-full flex items-center justify-center min-h-screen bg-linear-to-br from-cyan-100 via-cyan-50 to-white">
        <div className="text-cyan-600 text-lg">Loading...</div>
      </section>
    );
  }

  return (
    <section className="w-full flex items-center justify-start flex-col gap-2 p-10 min-h-screen bg-linear-to-br from-cyan-100 via-cyan-50 to-white">
      <h1 className="w-full text-center text-4xl mb-4">
        Easy<span className="font-bold text-cyan-600">Save</span>
      </h1>

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
                "bg-cyan-600 text-white rounded-md py-2 px-6 hover:bg-cyan-700 transition-colors",
                isInvalidSavings ? "opacity-50" : ""
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
