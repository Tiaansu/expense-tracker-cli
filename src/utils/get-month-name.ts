const months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

export default function getMonthName(month: number): string {
    if (month < 1 || month > 12) {
        return 'Invalid month';
    }
    return months[month];
}
