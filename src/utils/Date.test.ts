import { getHour } from "./Date"

it("Should return the hour in 'HH:MM (AM|PM)' format", () => {
    const date = new Date("2000-01-01 01:30 AM")
    const hour = date.getHours()
    const minutes = date.getMinutes()
    const expected = `${hour}:${minutes} AM`
    const given = getHour(date)
    expect(given).toEqual(expected)
})
