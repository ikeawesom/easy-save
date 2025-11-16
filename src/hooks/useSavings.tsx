import { useEffect, useState } from "react";
import { useLocalStorageState } from "./useLocalStorageState";

export function useSavings() {
  const [savings, setSavings] = useLocalStorageState("savings_goal");
  const [monthlySavings, setMonthlySavings] =
    useLocalStorageState("monthly_savings");

  const [locked, setLocked] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (savings > 0 && monthlySavings > 0) {
      setLocked(true);
    }
  }, []);

  const onChangeSavings = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setSavings(value);
    } else {
      setSavings(0);
    }
  };

  const onChangeMonthlySavings = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setMonthlySavings(value);
    } else {
      setMonthlySavings(0);
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    if (locked) {
      setLocked(false);
      return;
    }

    if (savings && monthlySavings && savings > 0 && monthlySavings > 0) {
      setError(undefined);
      setLocked(true);
    } else {
      setError("Please enter valid savings values greater than 0!");
    }
  };

  return {
    // values
    savings,
    monthlySavings,

    // state
    locked,
    error,

    // handlers
    onChangeSavings,
    onChangeMonthlySavings,
    submit,
    setLocked,
  };
}
