import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { banUser } from '../../redux/actions/users'
import { stateProps } from '../../redux/reducers/userReducer'
import { AppDispatch, RootState } from '../../redux/store'
import { Footer } from '../Footer/Footer'
import Navbar from '../NavBar/NavBar'
import './Style/ban.scss'

const Ban = () => {
  //   const [selectedUsers, setSelectedUsers] = useState<number[]>([])
  const dispatch = useDispatch<AppDispatch>()
  const { users } = useSelector((state: RootState): stateProps => state.users)

  const handleToggleUser = (userId: number) => {
    dispatch(banUser(userId))
  }

  return (
    <div className="container__banner">
      {/* <div className="nav__container">
        <Navbar className="appBar" />
      </div> */}
      <div className="content__banner">
        <div>
          <h1>BAN USERS</h1>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>First Name</th>
                <th>Select</th>
              </tr>
            </thead>
            <tbody>
              {users.data.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.firstName}</td>
                  <td>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={user.status === 'BANNED'}
                        onChange={() => handleToggleUser(user.id)}
                      />
                      <span className="slider round"></span>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* <div className="footer__container">
        <Footer />
      </div> */}
    </div>
  )
}

export default Ban
