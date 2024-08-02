'use client'
import { useState } from 'react'
import ReactMarkdown from "react-markdown"

const Chat = () => {
  const [messages, setMessages] = useState([])
  const [currentMessage, setCurrentMessage] = useState('')

  const handleCurrentMessageChange = (event) => {
      setCurrentMessage(event.target.value)
  }

  const sendCurrentMessage = async (event) => {
      try{
          event.preventDefault()

          if(currentMessage === '') {
            return
          }

          setMessages(prevMessages => [...prevMessages, {
            text : currentMessage,
            belongsTo : 'user'
          }])

          const messageToSend = currentMessage
          setCurrentMessage('')

          const response = await fetch('http://localhost:8080/api/v1/chat/text',{
              method : "POST",
              headers: {
                'Content-Type': 'text/plain'
              },
              body : messageToSend
          })

          if(response.status !== 200) {
            // To Do : implement here
          }

          const incomingMessage = await response.text()

          setMessages(prevMessages => [...prevMessages, {
            text : incomingMessage,
            belongsTo : 'ai'
          }])

      } catch(e) {
          // To Do : implement here
      }
  }

  return (
    <div className="container mx-auto flex flex-col gap-5 items-center h-full py-5">
        <div className="md:w-1/2 w-11/12 flex-auto overflow-y-auto h-0">
            { 
              messages.map((message, index) => 
                <div className={`chat chat-${message.belongsTo === 'user' ? 'end' : 'start'}`}
                    key={index}
                >
                  <div className={`chat-bubble chat-bubble-${message.belongsTo === 'user' ? 'accent' : 'primary'}`}>
                    <ReactMarkdown children={message.text}/>  
                  </div>
                </div>
              ) 
            }
        </div>
        <form onSubmit={sendCurrentMessage} 
              className="input input-bordered rounded-full flex items-center gap-2 pr-0 bg-base-200 md:w-1/2 w-11/12"
        >
            <input type="text"
                   value={currentMessage}
                   onChange={handleCurrentMessageChange}
                   className="grow"
                   placeholder="Send a message"
            />
            <input type="submit"
                   value="Send"
                   className='btn rounded-full min-h-10 h-10'
            />
        </form>
    </div>
  )
}

export default Chat
