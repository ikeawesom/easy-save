import { useEffect, useState } from "react";

export function useLocalStorageState(key: string) {
    const [value, setValue] = useState<number>(() => {
        const stored = localStorage.getItem(key);
        if (stored !== null) {
            try {
                return JSON.parse(stored);
            } catch {
                return 0;
            }
        }
        return 0;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue] as const;
}