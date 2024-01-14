import { useState, useEffect } from "react"



export default function Calendar(props) {

    const [projectDates, setProjectDates] = useState({})
    const [selectedYear, setSelectedYear] = useState((new Date().getFullYear()))
    const [selectedMonth, setSelectedMonth] = useState((new Date().getMonth()))
    const [monthDays, setMonthDays] = useState([])
    const months = {
        0: "January",
        1: "February",
        2: "March",
        3: "April",
        4: "May",
        5: "June",
        6: "July",
        7: "August",
        8: "September",
        9: "October",
        10: "November",
        11: "December"
    };
    
    const generateDates = (year, month) => {
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
        const lastDayOfLastMonth = new Date(year, month, 0).getDate();
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
        let dates = [];
    
        // Add buttons for the remaining days of the previous month
        for (let i = lastDayOfLastMonth - firstDayOfMonth + 1; i <= lastDayOfLastMonth; i++) {
            dates.push(
                <button className="flex items-center justify-center w-9 h-9 rounded-md font-semibold text-gray-400 border-transparent border focus:outline-none focus:text-neutral focus:border-blue-200">
                    {i}
                </button>
            );
        }
    
        // Add buttons for the current month's days
        for (let i = 1; i <= lastDayOfMonth; i++) {
            dates.push(
                <button className="flex items-center justify-center w-9 h-9 rounded-md font-semibold text-black border-transparent border focus:outline-none focus:text-neutral focus:border-blue-200">
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
        let dates = generateDates(selectedYear, selectedMonth)
        console.log(dates)
        setMonthDays(dates)
    }, [props])

    const handleMonthChangeClick = (e) => {
        e.preventDefault();
        let year = selectedYear;
        let month = selectedMonth;
    
        if (e.target.id === "monthUp") {
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
        <div className="flex flex-col items-center justify-center w-80  ml-4 font-sans text-gray-800">
            <div className=" bg-accent rounded-xl shadow-md p-4">
                <div className="mb-4">
                
                <div className="flex justify-between items-center">
                    <button onClick={handleMonthChangeClick} id="monthDown" className="font-bold flex items-center justify-center bg-secondary rounded-full p-1 pl-2 pr-2 shadow-lg">
                    &lt;
                    </button>
                    <span className="font-bold">{`${months[selectedMonth]} ${selectedYear}`}</span>
                    <button onClick={handleMonthChangeClick} id="monthUp" className="font-bold flex items-center justify-center bg-secondary rounded-full p-1 pl-2 pr-2 shadow-lg">
                        &gt;
                    </button>
                </div>
                </div>
                <div className="grid grid-cols-7 gap-2">
                    <span className="w-9 text-center text-gray-400 font-medium">Mo</span>
                    <span className="w-9 text-center text-gray-400 font-medium">Tu</span>
                    <span className="w-9 text-center text-gray-400 font-medium">W</span>
                    <span className="w-9 text-center text-gray-400 font-medium">Th</span>
                    <span className="w-9 text-center text-gray-400 font-medium">Fr</span>
                    <span className="w-9 text-center text-gray-400 font-medium">Sa</span>
                    <span className="w-9 text-center text-gray-400 font-medium">Su</span>
                    {monthDays} 
                </div>
            </div>
        </div>
    )
}