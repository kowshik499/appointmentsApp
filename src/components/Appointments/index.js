// Write your code here
import {v4} from 'uuid'
import {Component} from 'react'
import {format} from 'date-fns'

import './index.css'

import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appointmentsList: [],
    isFilterActive: false,
  }

  onClickAdd = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: formattedDate,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeDate = event => {
    this.setState({dateInput: event.target.value})
  }

  onClickStarBtn = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onClickFilter = () => {
    const {isFilterActive} = this.state

    this.setState({isFilterActive: !isFilterActive})
  }

  displayList = () => {
    const {appointmentsList, isFilterActive} = this.state
    if (isFilterActive === true) {
      const filteredList = appointmentsList.filter(
        eachAppointment => eachAppointment.isStarred === true,
      )
      return filteredList
    }
    return appointmentsList
  }

  render() {
    const filteredAppointmentsList = this.displayList()
    return (
      <div className="app-container">
        <div className="appointments-main-cont">
          <div className="add-appointments-cont">
            <form className="add-appointment-cont" onSubmit={this.onClickAdd}>
              <h1 className="add-appointment-head">Add Appointment</h1>
              <label htmlFor="title" className="appointment-title-label">
                TITLE
              </label>
              <input
                type="text"
                className="appointment-title-input"
                placeholder="Title"
                id="Title"
                onChange={this.onChangeTitle}
              />
              <label htmlFor="date" className="appointment-title-label">
                DATE
              </label>
              <input
                type="date"
                id="date"
                className="appointment-title-input"
                onChange={this.onChangeDate}
              />
              <button className="add-appointments-btn" type="submit">
                Add
              </button>
            </form>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="add-appointments-img"
              />
            </div>
          </div>
          <hr className="line" />
          <div className="display-appointments-head-cont">
            <h1 className="display-appointments-head add-appointment-head">
              Appointments
            </h1>
            <button
              className="display-starred-appointments-btn"
              type="button"
              onClick={this.onClickFilter}
            >
              starred
            </button>
          </div>
          <ul className="appointments-list">
            {filteredAppointmentsList.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                appointmentDetails={eachAppointment}
                onClickStarBtn={this.onClickStarBtn}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
