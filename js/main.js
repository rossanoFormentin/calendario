import { fullCalendarUI } from './ui/fullCalendarUI.js';
import { calendarManager } from './managers/calendarManager.js';

// --- Supabase ---
const SUPABASE_URL ="https://jreqfjmjfjlolrafmlqv.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpyZXFmam1qZmpsb2xyYWZtbHF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4OTkyMDQsImV4cCI6MjA1ODQ3NTIwNH0.VdPNIQPHl9r3Uy3s8OhsWM54DsKkiCOmDx1B5P2KipU";
window.supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// --- Colori per status ---
export const statusColors = {
    presenza: { bg: "#d1e7dd", text: "#198754" },
    smart: { bg: "#cfe2ff", text: "#0d6efd" },
    ferie: { bg: "#fff3cd", text: "#ffc107" },
    festivita: { bg: "#e2e3e5", text: "#6c757d" },
    scoperto: { bg: "#f8d7da", text: "#dc3545" },
    supplementare: { bg: "#e5dbff", text: "#6610f2" }
};

// --- Modal per modifiche ---
window.openModal = async function(date){
    const event = calendarManager.days.find(d => d.date === date) || {};

    const { value: formValues } = await Swal.fire({
        title: `Giorno ${date}`,
        html: `
            <select id="status" class="swal2-input">
                <option value="presenza">Presenza</option>
                <option value="smart">Smart Working</option>
                <option value="ferie">Ferie</option>
                <option value="festivita">Festività</option>
                <option value="scoperto">Scoperto</option>
                <option value="supplementare">Supplementare</option>
            </select>
            <input id="note" class="swal2-input" placeholder="Note" value="${event.note || ''}">
            <label><input type="checkbox" id="giustificativo" ${event.giustificativo ? 'checked' : ''}> Giustificativo</label>
        `,
        focusConfirm: false,
        preConfirm: () => ({
            status: document.getElementById('status').value,
            note: document.getElementById('note').value,
            giustificativo: document.getElementById('giustificativo').checked
        })
    });

    if(formValues){
        calendarManager.updateDay(date, formValues);
    }
};

// --- Avvio ---
fullCalendarUI.init(document.getElementById("calendar"));
calendarManager.init();
