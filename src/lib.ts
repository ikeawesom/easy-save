export const pages = [
    { id: "home", name: "Home" },
    // { id: "expenses", name: "Expenses" },
    { id: "settings", name: "Settings" }
] as PageType[];

export interface PageType {
    id: string;
    name: string;
}