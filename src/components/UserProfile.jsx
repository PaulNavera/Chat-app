import React from 'react'

const UserProfile = () => {
  return (
    <div>
       <img src={profile.pic} alt='' />
       <p>{profile.name}</p>
       <p>{profile.email}</p>
       <p>Manila, Philippines</p>

    </div>
  )
}

export default UserProfile
