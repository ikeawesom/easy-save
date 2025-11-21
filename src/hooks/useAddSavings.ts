import { useEffect, useState } from "react";
import { useStorageState } from "./useStorageState";
import type { SavingsType } from "../financeTypes";

export function useAddSavings() {
    const [currentSavings, setCurrentSavings] = useStorageState("current_savings");
    const [savings, setSavings] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [financeType, setFinanceType] = useState<"save" | "spend">();

    const save = financeType === "save";
    const n = save ? 1 : -1;

    useEffect(() => {
        if (savings > 0 && !isModalOpen && isSubmit) {
            // submitted
            const new_savings = n * savings;
            const updatedSavings = currentSavings ? [...currentSavings, { amount: new_savings, date: new Date().toISOString() }] : [{ amount: new_savings, date: new Date().toISOString() }] as SavingsType[];
            setCurrentSavings(updatedSavings);
            reset();
        }
    }, [savings, isModalOpen])

    const onChangeSavings = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value)) {
            setSavings(value);
        } else {
            setSavings(0);
        }
    };

    const reset = () => {
        setIsModalOpen(false); setIsSubmit(false); setSavings(0);
    }
    const openModal = () => setIsModalOpen(true);

    const closeModal = () => { reset() };

    const submit = (s: "save" | "spend") => {
        if (savings > 0) {
            setFinanceType(s);
            setIsModalOpen(false);
            setIsSubmit(true);
        }
    };

    return {
        openModal, closeModal, onChangeSavings, submit, isModalOpen, savings, currentSavings
    }
}