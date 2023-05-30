

const baseURL = 'https://chat-app-server-fed8.onrender.com/api/user'

export const saveUserRequest = (userId, displayName, email, photoURL) => fetch(`${baseURL}/save`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId: userId,
      name: displayName,
      email: email,
      pic: photoURL
    })
})

export const searchUsersRequest = (userId, keyword) => fetch(`${baseURL}/`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId: userId,
      search: keyword
      
    })
})

export const getUserRequest = (recipientId) => fetch(`${baseURL}/${recipientId}`)


  
