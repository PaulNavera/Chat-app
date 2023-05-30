
const baseURL = 'https://chat-app-server-fed8.onrender.com/api/message'

export const sendMessageRequest = (chatId,senderId, message ) => 

                  fetch(`${baseURL}/`,{
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                        chatId: chatId,
                        senderId: senderId,
                        message: message
                      })
     
     });



export const getMessageRequest = (chatId) => fetch(`${baseURL}/${chatId}`)
