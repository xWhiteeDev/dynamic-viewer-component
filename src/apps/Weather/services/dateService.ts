
export function getActualDate() {
    const today = new Date()
    return `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, "0")}`
}

export function getDayName(date: string, locale: string) {
    const correctDate = date.split('-')
    return new Date(`${correctDate[0]}/${correctDate[1]}/${correctDate[2]}`).toLocaleDateString(locale, { weekday: 'long' })
}
