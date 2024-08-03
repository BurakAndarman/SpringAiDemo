'use client'
import { useState, useEffect, useRef } from 'react'
import ReactMarkdown from "react-markdown"

const Chat = () => {
  const [currentText, setCurrentText] = useState('')
  const [error, setError] = useState('')
  const [messages, setMessages] = useState([])
  const messagesRef = useRef(null)

  useEffect(() => {
    messagesRef.current?.lastElementChild?.scrollIntoView()
  }, [messages])

  const handleCurrentTextChange = (event) => {
    setCurrentText(event.target.value)
  }

  const sendCurrentText = async (event) => {
      try{
          event.preventDefault()

          if(currentText === '') {
            return
          }

          setMessages(prevMessages => [...prevMessages, {
            text : currentText,
            belongsTo : 'user'
          }, {
            belongsTo : 'ai'
          }])

          const textToSend = currentText
          setCurrentText('')

          const response = await fetch('http://localhost:8080/api/v1/chat/text',{
              method : "POST",
              headers: {
                'Content-Type': 'text/plain'
              },
              body : textToSend
          })

          if(response.status !== 200) {
            throw new Error("There is a problem. Please try again later.")
          }

          const incomingText = await response.text()

          setMessages(prevMessages => [...prevMessages.slice(0, -1), {
              text : incomingText,
              belongsTo : 'ai'
          }])

      } catch(e) {
          
      }
  }

  return (
    <div className="container mx-auto flex flex-col gap-5 items-center h-full py-5">
        <div className="md:w-4/6 w-11/12 flex-auto overflow-y-auto h-0" 
             style={{scrollbarWidth : 'thin'}}
             ref={messagesRef}
        >
            { 
              messages.map((message, index) => 
                <div className={`chat ${message.belongsTo === 'user' ? 'chat-end' : 'chat-start'} py-3`}
                    key={index}
                >
                  <div className={`chat-bubble`}>
                      {message.text ? 
                        <ReactMarkdown>{message.text}</ReactMarkdown> 
                        : 
                        <span>Thinking<span className="loading loading-spinner ml-1 loading-sm align-text-bottom"></span></span>
                      }
                  </div>
                </div>
              )
            }
        </div>
        <form onSubmit={sendCurrentText} 
              className="input input-bordered rounded-full flex items-center gap-2 pr-0 bg-base-200 md:w-4/6 w-11/12"
        >
            <input type="text"
                   value={currentText}
                   onChange={handleCurrentTextChange}
                   className="grow"
                   placeholder="Send a message"
            />
            <input type="submit"
                   value="Send"
                   className='btn rounded-full min-h-10 h-10'
            />
        </form>
        <dialog id="error-modal" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Error</h3>
            <p className="py-4">Press ESC key or click the button below to close</p>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
    </div>
  )
}

export default Chat
