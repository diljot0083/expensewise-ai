import api from "../api/axios";

export interface Expense {
    _id: string,
    amount: number,
    currency: string,
    date: string,
    category: string,
    merchant: string,
    notes: string,
}

export const getExpenses = async (params?: any) => {
    const res = await api.get("/expenses", { params });
    return res.data;
};

export const createExpense = async (data: Partial<Expense>) => {
    const res = await api.post("/expenses", data);
    return res.data;
};

export const updateExpense = async (id: string, data: Partial<Expense>) => {
    const res = await api.put(`/expenses/${id}`, data);
    return res.data;
};

export const deleteExpense = async (id: string) => {
    const res = await api.delete(`/expenses/${id}`);
    return res.data;
};