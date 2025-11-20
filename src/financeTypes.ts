export interface ExpensesType {
    id: string;
    date: Date;
    amount: number;
    category: string;
    description?: string;
}

export interface SavingsType {
    id: string;
    date: string;
    amount: number;
}

export interface MonthlySavings {
    [month: string]: SavingsType[];
}