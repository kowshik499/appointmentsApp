// Write your code here

import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, onClickStarBtn} = props
  const {id, title, date, isStarred} = appointmentDetails

  const onClickStarButton = () => {
    onClickStarBtn(id)
  }

  const starImg = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="appointment-cont">
      <div className="appointment-details">
        <h1 className="appointment-title">{title}</h1>
        <p className="appointment-date">{date}</p>
      </div>
      <div>
        <button
          className="star-btn"
          type="button"
          onClick={onClickStarButton}
          testid="star"
        >
          <img src={starImg} className="star-img" alt="star-img" />
        </button>
      </div>
    </li>
  )
}

export default AppointmentItem
