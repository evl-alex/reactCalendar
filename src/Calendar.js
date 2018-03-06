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
         dateData: dateData,
      };

      this.handleDateClick = this.handleDateClick.bind(this);
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

      //Setting current date to Monday
      selectedDate.setDate(1);
      while (selectedDate.getDay() !== 1) {
         selectedDate.setDate(selectedDate.getDate() - 1);
      }

      while (dateData.days.length < numberOfWeeks) {
         let week = [];

         while (week.length < 7) {
            week.push(selectedDate.getDate());
            selectedDate.setDate(selectedDate.getDate() + 1);
         }

         dateData.days.push(week);
      }

      return dateData;
   }

   handleDateClick(event) {
      let target = event.target;

      while (target !== this) {
         if (target.tagName === 'TD') {
            const date = target.innerHTML;

            if (target.classList.contains("otherMonth")) {
               if (date > 21) {
                  this.props.onDatePick(date);
                  this.props.onMonthChange("prev", true);
               } else if (date < 7) {
                  this.props.onDatePick(date);
                  this.props.onMonthChange("next", true);
               }
            }

            if (target.classList.contains("selected")) {
               this.props.onDatePick(null);
               return;
            }

            this.props.onDatePick(date);
            return;
         }
         target = target.parentNode;
      }
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
      const dateData = this.state.dateData;
      const lastWeekIndex = dateData.days.length - 1;

      const daysName = names[this.language].weekDaysNames.map((dayName, index) => {
         return <th key={index}>{dayName}</th>
      });

      const daysTR = dateData.days.map((week, weekIndex) => {
            return (
               <tr key={weekIndex}>{
                  week.map((day, dayIndex) => {
                     if (weekIndex === 0 && day > 7) {
                        return <td key={dayIndex} className={"otherMonth"}>{day}</td>;
                     } else if (weekIndex === lastWeekIndex && day < 21) {
                        return <td key={dayIndex} className={"otherMonth"}>{day}</td>;
                     } else if (day === +this.props.selectedDate) {
                        return <td key={dayIndex} className={"selected"}>{day}</td>;
                     } else {
                        return <td key={dayIndex}>{day}</td>;
                     }
                  })
               }
               </tr>)
         }
      );

      return (
         <div className="calendar">
            <table>
               <caption>
                  <button type="button" className="btn btn-light btn-sm prevBtn"
                          onClick={() => this.props.onMonthChange("prev", true)}>&larr;</button>
                  <span>{dateData.month}</span>
                  <button type="button" className="btn btn-light btn-sm nextBtn"
                          onClick={() => this.props.onMonthChange("next", true)}>&rarr;</button>
               </caption>
               <thead>
               <tr>{daysName}</tr>
               </thead>
               <tbody onClick={this.handleDateClick}>{daysTR}</tbody>
            </table>
         </div>
      )
   }
}

export default Calendar;