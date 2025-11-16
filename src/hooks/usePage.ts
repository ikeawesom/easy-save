import { useEffect, useState } from "react";
import { useStorageState } from "./useStorageState";

export function usePage() {
    const [page, setPage] = useState("home");
    const [storedSavings] = useStorageState("saving_goal");

    useEffect(() => {
        if (storedSavings) {
            setPage("home");
        } else {
            setPage("settings");
        }
    }, [storedSavings]);

    return { page, setPage };
}