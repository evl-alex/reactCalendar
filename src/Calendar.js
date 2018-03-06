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

      this.currentDate = props.date;
      const dateData = this.generateDaysMatrix(this.currentDate);

      this.state = {
         dateData: dateData
      };
   }

   generateDaysMatrix(date) {
      const selectedDate = new Date(date);
      const dateData = {
         month: '',
         days: []
      };

      dateData.month = selectedDate.getMonth();
      dateData.month = `${names[this.language].monthNames[dateData.month]} ${selectedDate.getFullYear()}`;

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

      return dateData;
   }

   componentWillReceiveProps(nextProps) {
      if (nextProps.date === this.props.date) return;

      this.currentDate = nextProps.date;
      const newDateData = this.generateDaysMatrix(this.currentDate);

      this.setState({
         dateData: newDateData
      });
   }

   render() {
      return (
         <div className="calendar">
            <table>
               <caption>
                  <button type="button" className="btn btn-light btn-sm prevBtn"
                          onClick={() => this.props.onMonthChange("prev", true)}>&larr;</button>
                  <span>{this.state.dateData.month}</span>
                  <button type="button" className="btn btn-light btn-sm nextBtn"
                          onClick={() => this.props.onMonthChange("next", true)}>&rarr;</button>
               </caption>
               <thead>
               <tr>{names[this.language].weekDaysNames.map((dayName, index) => {
                  return <th key={index}>{dayName}</th>
               })}</tr>
               </thead>
               <tbody>
               {this.state.dateData.days.map((week, index) => {
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