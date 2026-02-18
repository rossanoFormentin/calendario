export const calendarService = {
    async getAllDays() {
        const { data, error } = await supabaseClient
            .from("work_days")
            .select("*")
            .order("date");
        if (error) console.error(error);
        return data || [];
    },

    async saveDay(day) {
        const { data, error } = await supabaseClient
            .from("work_days")
            .upsert(day, { onConflict: "date" })
            .select()
            .single();
        if(error) console.error(error);
        return data;
    },

    subscribeRealtime(callback) {
        return supabaseClient
            .channel("work-days")
            .on("postgres_changes", { event: "*", schema: "public", table: "work_days" }, payload => callback(payload))
            .subscribe();
    }
};
