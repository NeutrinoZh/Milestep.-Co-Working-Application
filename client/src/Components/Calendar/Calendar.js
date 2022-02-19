import { useEffect, useState } from 'react'
import { loc } from "../../Settings/localization.js";

import './Calendar.css'

function Calendar() {
    const [ days, setDaysState ] = useState([])
    const [ current, setCurrentState ] = useState(new Date())

    function setDays(date) {
        let month = new Date(date.getFullYear(), date.getMonth() + 1, 0); 
        let prev_month = new Date(date.getFullYear(), date.getMonth(), 0);
        let _days = month.getDate() + prev_month.getDay()
        let first_el = prev_month.getDate() - prev_month.getDay();

        let array = [];
        for (let i = 0; i < _days; ++i) {
            if (i < prev_month.getDay())
                array.push(first_el + i + 1)
            else
                array.push(i - prev_month.getDay() + 1)
        }

        setDaysState(array)
    }

    function moveDate(direction) {
        return () => {
            let new_date = new Date(
                current.getFullYear(),
                current.getMonth() + direction,
                current.getDate()
            )

            setCurrentState(new_date)
            setDays(new_date)
        }
    }

    function select(i) {
        return (event) => {
            let new_date = new Date(
                current.getFullYear(),
                current.getMonth(),
                i 
            )

            setCurrentState(new_date)
            setDays(new_date)
        }
    }

    useEffect(() => {
        setDays(current)
    }, [])

    return (
        <div className="card calendar">
            <div className="month">      
                <ul>
                    <li className="prev" onClick={moveDate(-1)}>❮</li>
                    <li className="next" onClick={moveDate(1)}>❯</li>
                    <li id="date">{
                        current.toLocaleString(loc.loc, {
                            month: 'long'
                        }) + " " + current.getFullYear()
                    }</li>
                </ul>
            </div>

            <ul className="weekdays">
                <li>Mo</li>
                <li>Tu</li>
                <li>We</li>
                <li>Th</li>
                <li>Fr</li>
                <li>Sa</li>
                <li>Su</li>
            </ul>

            <ul className="days" id="days">{
                days.map((i, k) =>
                    (i == current.getDate() &&
                    current.getMonth() == new Date().getMonth() && 
                    current.getFullYear() == new Date().getFullYear()) ?
                        <li key={k} onClick={select} className="day active">{i}</li> :
                        <li key={k} onClick={select} className="day">{i}</li>
                )
            }</ul>
        </div>
    )
}

export default Calendar;