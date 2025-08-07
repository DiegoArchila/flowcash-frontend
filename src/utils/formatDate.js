import { DateTime } from 'luxon';

export const formatDate = {
    /**
     * return the date in format timezone, or iso to format
     * DD/MM/AAAA hh:mm:ss A
     */
    getDateFormatedLarge: (date) => {
        return DateTime.fromISO(date).toFormat("dd/MM/yyyy hh:mm:ss a");
    },

    /**
     * return the date in short format
     * DD/MM/AAAA
     */
    getDateFormatedShort: (date) => {
        return DateTime.fromISO(date).toFormat("dd/MM/yyyy");
    },

    /**
     * return the date in ISO 8601 format
     * YYYY-MM-DDTHH:mm:ssZ
     */
    getISODateFormated: (date) => {
        return DateTime.fromISO(date).toISO();
    },

    /**
     * return the date with a custom format for a specific locale
     * Ej. Miércoles, 4 de Agosto de 2025
     */
    getDateFormatedWithLocale: (date, locale = 'es') => {
        return DateTime.fromISO(date).setLocale(locale).toFormat("cccc, d 'de' LLLL 'de' yyyy");
    },

    /**
     * return the time in 12-hour format with AM/PM
     * hh:mm A
     */
    getTimeFormated: (date) => {
        return DateTime.fromISO(date).toFormat("hh:mm a");
    },

    /**
     * return the date with the day of the week and a short date
     * E.j. Lunes, 04 de Agosto
     */
    getDateFormatedDayOfWeek: (date) => {
        return DateTime.fromISO(date).setLocale('es').toFormat("cccc, dd 'de' LLLL");
    },

    /**
     * return the date with the day of the week and a short date and time
     * E.j. Lunes, 04 de Agosto a las 03:00 PM
     */
    getDateFormatedDayOfWeekWithTime: (date) => {
        return DateTime.fromISO(date).setLocale('es').toFormat("cccc, dd 'de' LLLL 'a las' hh:mm a");
    },

    /**
     * return the duration between two dates in hours, minutes, and seconds
     * E.g., "5 horas, 30 minutos y 15 segundos"
     */
    getDuration: (start_date, end_date) => {
        const start = DateTime.fromISO(start_date);
        const end = DateTime.fromISO(end_date);

        const diff = end.diff(start, ['years', 'months', 'days', 'hours', 'minutes', 'seconds']).toObject();

        const parts = [];

        if (diff.years >= 1) parts.push(`${Math.floor(diff.years)} año${Math.floor(diff.years) !== 1 ? 's' : ''}`);
        if (diff.months >= 1) parts.push(`${Math.floor(diff.months)} mes${Math.floor(diff.months) !== 1 ? 'es' : ''}`);
        if (diff.days >= 1) parts.push(`${Math.floor(diff.days)} día${Math.floor(diff.days) !== 1 ? 's' : ''}`);
        if (diff.hours >= 1) parts.push(`${Math.floor(diff.hours)} hora${Math.floor(diff.hours) !== 1 ? 's' : ''}`);
        if (diff.minutes >= 1) parts.push(`${Math.floor(diff.minutes)} minuto${Math.floor(diff.minutes) !== 1 ? 's' : ''}`);
        if (diff.seconds >= 1) parts.push(`${Math.floor(diff.seconds)} segundo${Math.floor(diff.seconds) !== 1 ? 's' : ''}`);

        if (parts.length > 1) {
            const last = parts.pop();
            return parts.join(', ') + ' y ' + last;
        }

        return parts[0] || "0 segundos";
    }
};
