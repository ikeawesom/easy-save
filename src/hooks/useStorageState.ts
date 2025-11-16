import { useState, useEffect } from "react";

export function useStorageState(key: string) {
    const [value, setValue] = useState<any>(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadValue = async () => {
            try {
                const result = localStorage.getItem(key);
                if (result) {
                    setValue(JSON.parse(result));
                }
            } catch (error) {
                console.log('Key not found or error loading:', error);
            } finally {
                setIsLoading(false);
            }
        };
        loadValue();
    }, [key]);

    useEffect(() => {
        if (!isLoading) {
            const saveValue = async () => {
                try {
                    localStorage.setItem(key, JSON.stringify(value));
                } catch (error) {
                    console.error('Error saving:', error);
                }
            };
            saveValue();
        }
    }, [key, value, isLoading]);

    return [value, setValue, isLoading] as const;
}