import { calendarService } from '../services/calendarService.js';
import { fullCalendarUI } from '../ui/fullCalendarUI.js';

export const calendarManager = {
    days: [],
    ui: fullCalendarUI,

    async init() {
        this.days = await calendarService.getAllDays();
        this.ui.render(this.days);

        calendarService.subscribeRealtime(payload => {
            if(payload.new) this.ui.updateSingle(payload.new);
        });
    },

    async updateDay(date, data) {
        const saved = await calendarService.saveDay({ date, ...data });
        this.ui.updateSingle(saved);
    }
};
