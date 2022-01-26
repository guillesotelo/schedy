import axios from 'axios';

const loginUser = async user => {
  try {
    const res = await axios.post(`/api/admin`, user)
    const finalUser = res.data
    localStorage.setItem('user', JSON.stringify(finalUser))
    return finalUser
  } catch (error) { console.log(error) }
}

 const setUserVoid = async () => {
    try {
        await axios.get(`/api/auth/logout`)
        localStorage.removeItem('user')
        return {}
    } catch (err) { console.log(err) }
}

const getAllScehdules = async () => {
    try {
        const schedules = await axios.get(`/api/schedule`)
        return schedules
    } catch (err) { console.log(err) }
}

const createSchedule = async data => {
    try {
        const schedule = await axios.post(`/api/schedule`, data)
        return schedule
    } catch (err) { console.log(err) }
}

export { 
  loginUser, 
  setUserVoid,
  getAllScehdules,
  createSchedule
 }
