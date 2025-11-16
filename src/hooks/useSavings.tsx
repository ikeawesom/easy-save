import { useState, useEffect } from "react";

export function useSavings() {
  const [savings, setSavings] = useState<number>();
  const [locked, setLocked] = useState(false);
  const [saveSavings, setSaveSavings] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const cur = localStorage.getItem("savings_goal");

    if (cur) {
      setSavings(parseFloat(cur));
      setSaveSavings(true);
      setLocked(true);
    } else {
      setLocked(false);
      setSavings(0);
    }
  }, []);

  useEffect(() => {
    if (savings !== undefined && saveSavings) {
      localStorage.setItem("savings_goal", savings.toString());
    }
  }, [saveSavings]);

  const onChangeSavings = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setSavings(value);
      setSaveSavings(false);
    } else {
      setSavings(0);
    }
  };

  const submitSavings = (e: React.FormEvent) => {
    e.preventDefault();
    if (locked) {
      setLocked(false);
    } else {
      if (savings !== undefined && savings > 0) {
        setError(undefined);
        setLocked(true);
        setSaveSavings(true);
      } else {
        setError("Please enter a valid savings amount greater than 0!");
      }
    }
  };

  return {
    savings,
    locked,
    onChangeSavings,
    saveSavings,
    submitSavings,
    setLocked,
    error,
  };
}
