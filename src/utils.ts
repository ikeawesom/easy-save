import type { SavingsType, MonthlySavings } from "./financeTypes";

export function formatMoney(n: number): string {
    return n.toLocaleString('en-US');
}

export function groupSavingsByMonth(savings: SavingsType[]): MonthlySavings {
    return savings.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    ).reduce((acc, saving) => {
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

export function getCurrentMonth(): string {
    const now = new Date();
    return now.toLocaleString('en-US', { month: 'long', year: 'numeric' });
}

export function getPrevMonth(): string {
    const now = new Date();
    now.setMonth(now.getMonth() - 1);
    return now.toLocaleString('en-US', { month: 'long', year: 'numeric' });
}

export function calculateMonthlySavings(current_savings: SavingsType[]) {
    const monthly_savings = groupSavingsByMonth(current_savings);
    const current_month = getCurrentMonth();
    const prev_month = getPrevMonth();

    const current_month_savings = Object.keys(monthly_savings).includes(
        current_month
    )
        ? monthly_savings[current_month].reduce((acc, curr) => acc + curr.amount, 0)
        : 0;

    const prev_month_savings = Object.keys(monthly_savings).includes(prev_month)
        ? monthly_savings[prev_month].reduce((acc, curr) => acc + curr.amount, 0)
        : 0;

    const diff_monthly_savings = (
        ((current_month_savings - prev_month_savings) / current_month_savings) *
        100
    );

    const diff_monthly_savings_str = diff_monthly_savings.toFixed(2);

    return {
        current_month_savings, prev_month_savings, diff_monthly_savings, monthly_savings, diff_monthly_savings_str
    }
}