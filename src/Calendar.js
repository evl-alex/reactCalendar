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
      this.state = {
         date: new Date(),
         language: 'ru'
      };
   }

   render() {
      let selectedDate = {
         month: '',
         days: []
      };

      this.state.date.setDate(1);
      let firstDay = this.state.date.getDay();
      firstDay = firstDay ? firstDay - 1 : 6;
      this.state.date.setMonth(this.state.date.getMonth() + 1);
      this.state.date.setDate(this.state.date.getDate() - 1);
      let numberOfDays = this.state.date.getDate();
      let numberOfWeeks = Math.ceil((numberOfDays + firstDay) / 7);
      let dayCounter = 1;

      while (selectedDate.days.length < numberOfWeeks) {
         let week = [];

         while (week.length < 7) {
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

         selectedDate.days.push(week);
      }

      selectedDate.month = this.state.date.getMonth();
      selectedDate.month = `${names[this.state.language].monthNames[selectedDate.month]} ${this.state.date.getFullYear()}`;


      return (
         <div className="App">
            <table>
               <caption>
                  <button type="button" className="btn btn-light btn-sm prevBtn">&larr;</button>
                  <span>{selectedDate.month}</span>
                  <button type="button" className="btn btn-light btn-sm nextBtn">&rarr;</button>
               </caption>
               <thead>
               <tr>{names[this.state.language].weekDaysNames.map((dayName, index) => {
                  return <th key={index}>{dayName}</th>
               })}</tr>
               </thead>
               <tbody>
               {selectedDate.days.map((week, index) => {
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