import type { SavingsType, MonthlySavings } from "./financeTypes";

export function formatMoney(n: number): string {
    return n.toLocaleString('en-US');
}

export function groupSavingsByMonth(savings: SavingsType[]): MonthlySavings {
    return savings.reduce((acc, saving) => {
        // Parse the date and get the month name
        const date = new Date(saving.date);
        const month = date.toLocaleString('en-US', { month: 'long', year: 'numeric' });

        // Initialize the array for this month if it doesn't exist
        if (!acc[month]) {
            acc[month] = [];
        }

        // Add the saving to the appropriate month
        acc[month].push(saving);

        return acc;
    }, {} as MonthlySavings);
}