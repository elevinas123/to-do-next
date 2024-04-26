import { useState, useEffect } from "react";

export default function Calendar() {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [monthDays, setMonthDays] = useState<JSX.Element[]>([]);
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const generateDates = (year: number, month: number) => {
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
        const lastDayOfLastMonth = new Date(year, month, 0).getDate();
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let dates: JSX.Element[] = [];

        // Add buttons for the remaining days of the previous month
        for (let i = lastDayOfLastMonth - firstDayOfMonth + 1; i <= lastDayOfLastMonth; i++) {
            dates.push(
                <button className="flex items-center justify-center w-9 h-9 rounded-md font-semibold text-gray-400 border-transparent border focus:outline-none focus:text-black focus:border-blue-200">
                    {i}
                </button>
            );
        }

        // Add buttons for the current month's days
        for (let i = 1; i <= lastDayOfMonth; i++) {
            dates.push(
                <button className="flex items-center justify-center w-9 h-9 rounded-md font-semibold text-black border-transparent border focus:outline-none focus:text-black focus:border-blue-200">
                    {i}
                </button>
            );
        }

        // Calculate how many days are needed to fill the last row
        const totalButtons = 6 * 7; // 6 rows and 7 days per row
        const remainingDays = totalButtons - (dates.length % totalButtons);

        // Add buttons for the next month's days to fill the last row
        for (let i = 1; i <= remainingDays; i++) {
            dates.push(
                <button className="flex items-center justify-center w-9 h-9 rounded-md font-semibold text-gray-400 border-transparent border focus:outline-none focus:text-neutral focus:border-blue-200">
                    {i}
                </button>
            );
        }

        return dates;
    };

    useEffect(() => {
        let dates = generateDates(selectedYear, selectedMonth);
        setMonthDays(dates);
    }, [selectedYear, selectedMonth]);

    const handleMonthChangeClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        const target = e.target as HTMLButtonElement;

        if (!target.id) throw new Error("Id must exist");

        let year = selectedYear;
        let month = selectedMonth;

        if (target.id === "monthUp") {
            month = (month + 1) % 12; // Increment the month and wrap around at December (12)
            if (month === 0) {
                year++;
            }
        } else {
            month = (month - 1 + 12) % 12; // Decrement the month and wrap around at January (1)
            if (month === 11) {
                year--;
            }
        }

        setSelectedYear(year);
        setSelectedMonth(month);
    };


    return (
        <div className="flex flex-col items-center justify-center w-80 bg-gray-100 rounded-lg shadow-lg p-4">
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={handleMonthChangeClick}
                    id="monthDown"
                    className="p-1 px-2 bg-gray-200  rounded-full shadow hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                    &lt;
                </button>
                <div className=" mx-2 text-md font-semibold text-gray-800 w-32 text-center">{`${months[selectedMonth]} ${selectedYear}`}</div>
                <button
                    onClick={handleMonthChangeClick}
                    id="monthUp"
                    className="p-1 px-2 bg-gray-200 rounded-full shadow hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                    &gt;
                </button>
            </div>
            <div className="grid grid-cols-7 gap-1">
                {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
                    <div key={day} className="text-center text-sm text-gray-500 font-medium">
                        {day}
                    </div>
                ))}
                {monthDays.map((day, index) => (
                    <button
                        key={index}
                        className="flex items-center justify-center w-8 h-8 text-sm font-medium text-gray-700 bg-transparent rounded-full hover:bg-gray-200 focus:bg-gray-300"
                    >
                        {day}
                    </button>
                ))}
            </div>
        </div>
    );
}
