import React, {Component} from 'react';
import Calendar from './Calendar';
import './App.css';

class Page extends Component {
   constructor(props) {
      super(props);
      this.state = {
         date: new Date(),
         timerIsOn: false
      };

      this.toggleTimer = this.toggleTimer.bind(this);
      this.changeMonth = this.changeMonth.bind(this);
   }

   toggleTimer() {
      if (this.state.timerIsOn) {
         clearTimeout(this.timerID);
      } else {
         this.timerID = setInterval(() => this.changeMonth("next"), 1000);
      }

      this.setState(prevState => ({
         timerIsOn: !prevState.timerIsOn
      }));
   }

   changeMonth(arg, stopTimer) {
      const currentDate = new Date(this.state.date);

      if (stopTimer === true && this.state.timerIsOn) this.toggleTimer();

      if (arg === "next") {
         this.setState({
            date: currentDate.setMonth(currentDate.getMonth() + 1)
         });
      } else if (arg === "prev") {
         this.setState({
            date: currentDate.setMonth(currentDate.getMonth() - 1)
         });
      }
   }

   render() {
      return (
         <div className={"page"}>
            <h1>Welcome to Reactive Datepicker</h1>
            <Calendar date={this.state.date} language={"ru"} onMonthChange={this.changeMonth} />
            <button type="button" className="btn btn-secondary btn-sm" onClick={this.toggleTimer}>
               {this.state.timerIsOn ? 'stop' : 'start'}
            </button>
         </div>
      )
   }
}

export default Page;