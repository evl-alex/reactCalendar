import React, {Component} from 'react';
import './App.css';

const names = {
   ru: {
      weekDaysNames: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
      monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
         "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]
   }
};

class Calendar extends Component {
   constructor(props) {
      super(props);
      this.language = props.language || "ru";
      this.state = {
         date: new Date(),
      };
   }

   generateDaysMatrix(date) {
      const selectedDate = new Date(date);
      const dateData = {
         month: '',
         days: []
      };

      // Getting first's day of the month position
      selectedDate.setDate(1);
      let firstDay = selectedDate.getDay();
      firstDay = firstDay ? firstDay - 1 : 6;

      // Getting total number of days in selected month
      selectedDate.setMonth(selectedDate.getMonth() + 1);
      selectedDate.setDate(selectedDate.getDate() - 1);
      const numberOfDays = selectedDate.getDate();

      // Getting number of weeks in selected month
      const numberOfWeeks = Math.ceil((numberOfDays + firstDay) / 7);

      let dayCounter = 1;

      while (dateData.days.length < numberOfWeeks) {
         let week = [];

         while (week.length < 7) {
            // Filling with "0" days of the month before 1st date
            while (firstDay) {
               week.push(0);
               firstDay--;
            }

            if (dayCounter <= numberOfDays) {
               week.push(dayCounter);
               dayCounter++;
            } else {
               week.push(0);
            }
         }

         dateData.days.push(week);
      }

      dateData.month = selectedDate.getMonth();
      dateData.month = `${names[this.language].monthNames[dateData.month]} ${selectedDate.getFullYear()}`;

      return dateData;
   }

   changeMonth(arg) {
      const newDate = new Date(this.state.date);
      newDate.setDate(1);

      if (arg === "prev") {
         newDate.setMonth(newDate.getMonth() - 1);
      } else if (arg === "next") {
         newDate.setMonth(newDate.getMonth() + 1);
      } else {
         return;
      }

      this.setState({
         date: newDate
      });
   }

   render() {
      const dateData = this.generateDaysMatrix(this.state.date);

      return (
         <div className="App">
            <table>
               <caption>
                  <button type="button" className="btn btn-light btn-sm prevBtn" onClick={() => this.changeMonth("prev")}>&larr;</button>
                  <span>{dateData.month}</span>
                  <button type="button" className="btn btn-light btn-sm nextBtn" onClick={() => this.changeMonth("next")}>&rarr;</button>
               </caption>
               <thead>
               <tr>{names[this.language].weekDaysNames.map((dayName, index) => {
                  return <th key={index}>{dayName}</th>
               })}</tr>
               </thead>
               <tbody>
               {dateData.days.map((week, index) => {
                  return <tr key={index}>{week.map((day, index) => {
                     return <td key={index}>{day ? day : ''}</td>
                  })}</tr>
               })}
               </tbody>
            </table>
         </div>
      )
   }
}

export default Calendar;