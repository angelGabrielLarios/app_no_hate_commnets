export function formatDateTimeForPost(date) {
    // Date format options
    const dateFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' }
    // Time format options
    const timeFormatOptions = { hour: 'numeric', minute: 'numeric' }

    // Get formatted date
    const formattedDate = date.toLocaleDateString('es-ES', dateFormatOptions)

    // Get formatted time
    const formattedTime = date.toLocaleTimeString('es-ES', timeFormatOptions)

    // Build the final string
    const result = `${formattedDate}, ${formattedTime}`;

    return result;
}

