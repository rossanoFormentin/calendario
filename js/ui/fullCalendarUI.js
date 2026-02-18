import { statusColors } from '../main.js'; // import colori dal main

export const fullCalendarUI = {
    calendar: null,

    init(container) {
        this.calendar = new FullCalendar.Calendar(container, {
            initialView: 'dayGridMonth',
            dateClick: info => openModal(info.dateStr),
            eventDidMount: info => {
                const status = info.event.title;
                const color = statusColors[status] || { bg: "#fff", text: "#000" };
                info.el.style.backgroundColor = color.bg;
                info.el.style.color = color.text;
                info.el.style.border = "none";

                let tooltip = info.event.extendedProps.giustificativo ? "✅ Giustificativo" : "";
                if(info.event.extendedProps.note){
                    tooltip += tooltip ? " - " + info.event.extendedProps.note : info.event.extendedProps.note;
                }
                if(tooltip) info.el.setAttribute("title", tooltip);
            }
        });
        this.calendar.render();
    },

    render(days) {
        this.calendar.removeAllEvents();
        days.forEach(d => this.addOrUpdateEvent(d));
    },

    addOrUpdateEvent(day) {
        let ev = this.calendar.getEventById(day.date);
        if(ev){
            ev.setProp("title", day.status);
            ev.setExtendedProp("note", day.note);
            ev.setExtendedProp("giustificativo", day.giustificativo);
        } else {
            this.calendar.addEvent({
                id: day.date,
                title: day.status,
                start: day.date,
                extendedProps: { note: day.note, giustificativo: day.giustificativo }
            });
        }
    },

    updateSingle(day){
        this.addOrUpdateEvent(day);
    }
};
