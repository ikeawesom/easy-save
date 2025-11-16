import Container from "./components/Container";
import TextInput from "./components/TextInput";
import { twMerge } from "tailwind-merge";
import { useSavings } from "./hooks/useSavings";
import ErrorText from "./components/ErrorText";
import { formatMoney } from "./utils";

function App() {
  const {
    savings,
    locked,
    onChangeSavings,
    submitSavings,
    setLocked,
    saveSavings,
    error,
  } = useSavings();

  return (
    <section className="w-full flex items-center justify-start flex-col gap-6 p-10 min-h-screen bg-linear-to-br from-cyan-100 via-cyan-50 to-white">
      <h1 className="w-full text-center">
        Easy<span className="font-bold text-cyan-600">Save</span>
      </h1>
      <Container>
        {locked && saveSavings && savings ? (
          <div className="flex items-center justify-between gap-2">
            <p>
              Savings currently set to: <br />
              <span className="text-3xl font-bold text-cyan-600">
                ${formatMoney(savings ?? 0)}
              </span>{" "}
            </p>
            <button
              className={twMerge(
                "bg-white text-gray-800 rounded-md py-2 px-2 border shadow-sm border-gray-100"
              )}
              onClick={() => setLocked(false)}
            >
              ✎
            </button>
          </div>
        ) : (
          <form onSubmit={submitSavings}>
            <TextInput
              enabled={!locked}
              onChange={onChangeSavings}
              value={savings}
              id="save_amt"
              label="Enter savings goal:"
            />
            <button
              className={twMerge(
                "bg-cyan-600 text-white rounded-md py-2 px-6 mt-3",
                locked ? "opacity-45" : "cursor-pointer"
              )}
              type="submit"
              disabled={locked}
            >
              Submit
            </button>
          </form>
        )}
        {error && (
          <div className="mt-4">
            <ErrorText errorText={error} />
          </div>
        )}
      </Container>
    </section>
  );
}

export default App;
