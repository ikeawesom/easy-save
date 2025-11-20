import { useState, useEffect } from "react";
import { useStorageState } from "./useStorageState";

export function useSavings() {
  const [savingGoal, setSavingGoal, savingGoalLoading] = useStorageState("saving_goal");
  const [, setShowMonthlySavingsReach] = useStorageState(
    "show_monthly_savings_reach"
  );

  const [, setShowEditSavings] = useStorageState(
    "show_final_savings_reach"
  );
  const [monthlySavingGoal, setMonthlySavingGoal, monthlyLoading] =
    useStorageState("monthly_savings");

  const [locked, setLocked] = useState(false);
  const [error, setError] = useState<string>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!savingGoalLoading && !monthlyLoading) {
      if (savingGoal > 0 && monthlySavingGoal > 0) {
        setLocked(true);
      }
    }
  }, [savingGoalLoading, monthlyLoading, savingGoal, monthlySavingGoal]);

  const onChangeSavings = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setSavingGoal(value);
    } else {
      setSavingGoal(0);
    }
  };

  const onChangeMonthlySavings = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setMonthlySavingGoal(value);
    } else {
      setMonthlySavingGoal(0);
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
    if (savingGoal && monthlySavingGoal && savingGoal > 0 && monthlySavingGoal > 0) {
      setError(undefined);
      setLocked(true);
      setIsModalOpen(false);
      setShowMonthlySavingsReach(0);
      setShowEditSavings(0);
    } else {
      setError("Please enter valid savingGoal values greater than 0!");
    }
  };

  return {
    savingGoal,
    monthlySavingGoal,
    locked,
    error,
    isModalOpen,
    onChangeSavings,
    onChangeMonthlySavings,
    submit,
    setLocked,
    openModal,
    closeModal,
    isLoading: savingGoalLoading || monthlyLoading,
  };
}
