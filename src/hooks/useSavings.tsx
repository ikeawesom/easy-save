import { useState, useEffect } from "react";
import { useStorageState } from "./useStorageState";

export function useSavings() {
  const [savings, setSavings, savingsLoading] = useStorageState("savings_goal");
  const [monthlySavings, setMonthlySavings, monthlyLoading] =
    useStorageState("monthly_savings");

  const [locked, setLocked] = useState(false);
  const [error, setError] = useState<string>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!savingsLoading && !monthlyLoading) {
      if (savings > 0 && monthlySavings > 0) {
        setLocked(true);
      }
    }
  }, [savingsLoading, monthlyLoading, savings, monthlySavings]);

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

  const openModal = () => {
    setIsModalOpen(true);
    setError(undefined);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setError(undefined);
  };

  const submit = () => {
    if (savings && monthlySavings && savings > 0 && monthlySavings > 0) {
      setError(undefined);
      setLocked(true);
      setIsModalOpen(false);
    } else {
      setError("Please enter valid savings values greater than 0!");
    }
  };

  return {
    savings,
    monthlySavings,
    locked,
    error,
    isModalOpen,
    onChangeSavings,
    onChangeMonthlySavings,
    submit,
    setLocked,
    openModal,
    closeModal,
    isLoading: savingsLoading || monthlyLoading,
  };
}
