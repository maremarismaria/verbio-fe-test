/**
 * Parses the given date and returns the hour in "HH:MM (AM|PM)" format
 * @param {Date} date
 * @param {(string|Array)} locales
 * @returns {string}
 */
export const getHour: (date: Date, locales?: string | string[]) => string = (
    date,
    locales = "en"
) => {
    const parser = new Intl.DateTimeFormat(locales, {
        timeStyle: "short",
    })
    return parser.format(date)
}
