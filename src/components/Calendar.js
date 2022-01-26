import React, { useState, useEffect } from "react";
import { useDispatch, useSelector} from 'react-redux'
import { getSchedules } from '../store/reducers/schedule'
export default function Calendar(props) {
  const { 
    setSchedule, 
    setScheduleOpen, 
    weekNumber, 
    isAdmin 
  } = props
  const [weekData, setWeekData] = useState([])
  const data = useSelector((state) => state.schedule.data || {});
  const dispatch = useDispatch()

  useEffect(() => {
    getAllScehdules()
    organizeDays()
    // console.log("weekData", weekData)
    // console.log("data", data)
    // console.log("Is Admin --> ", isAdmin)
  },[weekNumber, data.length])

  const compareSchedules = dateToCheck => {
    let returnData = { is_taken: false, name: '', email: ''}
    let _dateToCheck = new Date(dateToCheck.getTime())
    _dateToCheck.setSeconds(0,0)
    if(data.length) {
      data.map(d => {
        let dateParsed = new Date(Date.parse(d.schedule))
        dateParsed.setSeconds(0,0)
        if(_dateToCheck.toString() === dateParsed.toString()) {
          returnData = {
            is_taken: true,
            name: d.name,
            email: d.email
          }
        }
      })
    }
    return returnData
  }
  
  const getAllScehdules = async () => {
    try {
      await dispatch(getSchedules())
    } catch (err) { console.log(err) }
  }

  const setScheduleDay = (date, num) => {
    const n = num ? num : 0
    let sections = []
    let newDate = new Date(date.getTime())
    newDate.setDate(newDate.getDate() + n)
    newDate.setHours(10)
    newDate.setMinutes(0)

    for(let i=0 ; i<18 ; i++){
      let _newDate = new Date(newDate.getTime())
      const { is_taken, name, email } = compareSchedules(_newDate)
      sections.push(
        { 
          hour: `${(_newDate.getHours()<10?'0':'') + _newDate.getHours()}:${(_newDate.getMinutes()<10?'0':'') + _newDate.getMinutes()}`, 
          is_taken,
          date: _newDate,
          name,
          email
        }
        )
      newDate.setMinutes(newDate.getMinutes() + 30)
    }
    return sections
  }

  const organizeDays = () => {
    let nowDate = new Date
    if(weekNumber !== 0){
      nowDate.setDate(nowDate.getDate() + (weekNumber * 7))
    }
    const now = nowDate.toString()
    const today = now.split(' ')[0]

    let tempData = []
    if(today === 'Sun'){
      tempData[0] = { day: `Domingo ${nowDate.getDate()}`, sections: setScheduleDay(nowDate) }
      tempData[1] = { day: `Lunes ${processDay(nowDate, +1)}`, sections: setScheduleDay(nowDate,1) }
      tempData[2] = { day: `Martes ${processDay(nowDate, +2)}`, sections: setScheduleDay(nowDate,2) }
      tempData[3] = { day: `Miércoles ${processDay(nowDate, +3)}`, sections: setScheduleDay(nowDate,3) }
      tempData[4] = { day: `Jueves ${processDay(nowDate, +4)}`, sections: setScheduleDay(nowDate,4) }
      tempData[5] = { day: `Viernes ${processDay(nowDate, +5)}`, sections: setScheduleDay(nowDate,5) }
      tempData[6] = { day: `Sábado ${processDay(nowDate, +6)}`, sections: setScheduleDay(nowDate,6) }
    }
    if(today === 'Mon'){
      tempData[0] = { day: `Domingo ${processDay(nowDate, -1)}`, sections: setScheduleDay(nowDate,-1) }
      tempData[1] = { day: `Lunes ${nowDate.getDate()}`, sections: setScheduleDay(nowDate) }
      tempData[2] = { day: `Martes ${processDay(nowDate, +1)}`, sections: setScheduleDay(nowDate,1) }
      tempData[3] = { day: `Miércoles ${processDay(nowDate, +2)}`, sections: setScheduleDay(nowDate,2) }
      tempData[4] = { day: `Jueves ${processDay(nowDate, +3)}`, sections: setScheduleDay(nowDate,3) }
      tempData[5] = { day: `Viernes ${processDay(nowDate, +4)}`, sections: setScheduleDay(nowDate,4) }
      tempData[6] = { day: `Sábado ${processDay(nowDate, +5)}`, sections: setScheduleDay(nowDate,5) }
    }
    if(today === 'Tue'){
      tempData[0] = { day: `Domingo ${processDay(nowDate, -2)}`, sections: setScheduleDay(nowDate,-2) }
      tempData[1] = { day: `Lunes ${processDay(nowDate, -1)}`, sections: setScheduleDay(nowDate,-1) }
      tempData[2] = { day: `Martes ${nowDate.getDate()}`, sections: setScheduleDay(nowDate) }
      tempData[3] = { day: `Miércoles ${processDay(nowDate, +1)}`, sections: setScheduleDay(nowDate,1) }
      tempData[4] = { day: `Jueves ${processDay(nowDate, +2)}`, sections: setScheduleDay(nowDate,2) }
      tempData[5] = { day: `Viernes ${processDay(nowDate, +3)}`, sections: setScheduleDay(nowDate,3) }
      tempData[6] = { day: `Sábado ${processDay(nowDate, +4)}`, sections: setScheduleDay(nowDate,4) }
    }
    if(today === 'Wed'){
      tempData[0] = { day: `Domingo ${processDay(nowDate, -3)}`, sections: setScheduleDay(nowDate,-3) }
      tempData[1] = { day: `Lunes ${processDay(nowDate, -2)}`, sections: setScheduleDay(nowDate,-2) }
      tempData[2] = { day: `Martes ${processDay(nowDate, -1)}`, sections: setScheduleDay(nowDate,-1) }
      tempData[3] = { day: `Miércoles ${nowDate.getDate()}`, sections: setScheduleDay(nowDate) }
      tempData[4] = { day: `Jueves ${processDay(nowDate, +1)}`, sections: setScheduleDay(nowDate,1) }
      tempData[5] = { day: `Viernes ${processDay(nowDate, +2)}`, sections: setScheduleDay(nowDate,2) }
      tempData[6] = { day: `Sábado ${processDay(nowDate, +3)}`, sections: setScheduleDay(nowDate,3) }
    }
    if(today === 'Thu'){
      tempData[0] = { day: `Domingo ${processDay(nowDate, -4)}`, sections: setScheduleDay(nowDate,-4) }
      tempData[1] = { day: `Lunes ${processDay(nowDate, -3)}`, sections: setScheduleDay(nowDate,-3) }
      tempData[2] = { day: `Martes ${processDay(nowDate, -2)}`, sections: setScheduleDay(nowDate,-2) }
      tempData[3] = { day: `Miércoles ${processDay(nowDate, -1)}`, sections: setScheduleDay(nowDate,-1) }
      tempData[4] = { day: `Jueves ${nowDate.getDate()}`, sections: setScheduleDay(nowDate) }
      tempData[5] = { day: `Viernes ${processDay(nowDate, +1)}`, sections: setScheduleDay(nowDate,1) }
      tempData[6] = { day: `Sábado ${processDay(nowDate, +2)}`, sections: setScheduleDay(nowDate,2) }
    }
    if(today === 'Fri'){
      tempData[0] = { day: `Domingo ${processDay(nowDate, -5)}`, sections: setScheduleDay(nowDate,-5) }
      tempData[1] = { day: `Lunes ${processDay(nowDate, -4)}`, sections: setScheduleDay(nowDate,-4) }
      tempData[2] = { day: `Martes ${processDay(nowDate, -3)}`, sections: setScheduleDay(nowDate,-3) }
      tempData[3] = { day: `Miércoles ${processDay(nowDate, -2)}`, sections: setScheduleDay(nowDate,-2) }
      tempData[4] = { day: `Jueves ${processDay(nowDate, -1)}`, sections: setScheduleDay(nowDate,-1) }
      tempData[5] = { day: `Viernes ${nowDate.getDate()}`, sections: setScheduleDay(nowDate) }
      tempData[6] = { day: `Sábado ${processDay(nowDate, +1)}`, sections: setScheduleDay(nowDate,1) }
    }
    if(today === 'Sat'){
      tempData[0] = { day: `Domingo ${processDay(nowDate, -6)}`, sections: setScheduleDay(nowDate,-6) }
      tempData[1] = { day: `Lunes ${processDay(nowDate, -5)}`, sections: setScheduleDay(nowDate,-5) }
      tempData[2] = { day: `Martes ${processDay(nowDate, -4)}`, sections: setScheduleDay(nowDate,-4) }
      tempData[3] = { day: `Miércoles ${processDay(nowDate, -3)}`, sections: setScheduleDay(nowDate,-3) }
      tempData[4] = { day: `Jueves ${processDay(nowDate, -2)}`, sections: setScheduleDay(nowDate,-2) }
      tempData[5] = { day: `Viernes ${processDay(nowDate, -1)}`, sections: setScheduleDay(nowDate,-1) }
      tempData[6] = { day: `Sábado ${nowDate.getDate()}`, sections: setScheduleDay(nowDate) }
    }
    setWeekData(tempData)
  }
  
  const processDay = (date, n) => {
    let _date = new Date(date.getTime())
    _date.setDate(_date.getDate() + n)
    return _date.getDate()
  }

  const handleClick = (day, section) => {
    if(!section.is_taken){
      setSchedule(section.date)
      setScheduleOpen(true)
    }
  };

  const month = weekData.length && weekData[3].sections[0].date.toLocaleString('default', { month: 'long'}).toUpperCase()
  const year = weekData.length && weekData[3].sections[0].date.getFullYear()

  return (
    <div className="calendar-container">
      <div className="calendar">
        <div className="div-month">
          <h3 className="month-title">{month} {year}</h3>
        </div>
        <div className="week">
          {weekData.map(({day}, i) => (
            i > 0 &&
            <div key={i} className={
              weekData[i].sections[0].date.getDate() === new Date().getDate() 
              && weekData[i].sections[0].date.getDay() === new Date().getDay() ? 'day-today' 
              : weekData[i].sections[0].date < new Date() ? 'day-before' : 'day'}>
              <h4 className="day-title">{day}</h4>
              {weekData[i].sections && 
                weekData[i].sections.map((section, j) => (
                section.hour === '13:00' || section.hour === '13:30' || section.hour === '14:00' || section.hour === '14:30' ? 
                <div key={j} style={{ height: 3 }}></div>
                :
                section.date < new Date() ?
                <div key={j}>
                  <button
                    disabled
                    className="section-btn-taken"
                    key={j}
                  >
                    <div className="section">
                      <h4
                        style={{
                          backgroundColor: section.is_taken
                            ? "rgb(205, 205, 205)"
                            : "rgb(227, 255, 226)",
                            fontSize: isAdmin && section.is_taken && 9
                        }}
                        className="section-text-before"
                      >
                        {isAdmin && section.is_taken ? section.hour+' '+section.name : section.hour} {section.is_taken ? "" : "Libre"}
                      </h4>
                    </div>
                  </button>
                </div>
                :
                <div>
                  <button
                    className={
                      section.is_taken ? "section-btn-taken" : "section-btn"
                    }
                    onClick={() => handleClick(day, section)}
                    key={j}
                  >
                    <div className="section">
                      <h4
                        style={{
                          backgroundColor: section.is_taken
                            ? "rgb(205, 205, 205)"
                            : "rgb(227, 255, 226)",
                            fontSize: isAdmin && section.is_taken && 9
                        }}
                        className="section-text"
                      >
                        {isAdmin && section.is_taken ? section.hour+' '+section.name : section.hour} {section.is_taken ? "" : "Libre"}
                      </h4>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
