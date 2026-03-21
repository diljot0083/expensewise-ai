import api from "../api/axios";

export const getAIInsights = async (expenses: any[]) => {
    const res = await api.post("/ai/insights", { expenses });
    return res.data;
};