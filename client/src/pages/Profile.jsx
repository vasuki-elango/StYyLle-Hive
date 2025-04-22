import React, { useEffect, useState } from 'react'

export const Profile = () => {
  const [userName,setUsername] = useState(null)

  useEffect(() => {
    const userdata = localStorage.getItem('user')
    if (userdata) {
      const user = JSON.parse(userdata)
      setUsername(user)
    }
  }, [])

  return (
    <div className='container h-screen'>
      {userName ? (
        <h2 className='text-3xl font-semibold'>Welcome, {userName.name}</h2>
      ) : (
        <p>Loading user info...</p>
      )}

    </div>
  )
}
