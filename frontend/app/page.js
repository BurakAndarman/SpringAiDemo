'use client'
import { useState, useEffect, useRef } from 'react'
import ReactMarkdown from "react-markdown"
import Icon from '@mdi/react';
import { mdiAlertCircleOutline } from '@mdi/js'

const Chat = () => {
  const [currentText, setCurrentText] = useState('')
  const [error, setError] = useState('')
  const errorModalRef = useRef(null)
  const [messages, setMessages] = useState([])
  const messagesRef = useRef(null)
  
  useEffect(() => {
    messagesRef.current?.lastElementChild?.scrollIntoView({behavior: 'smooth'})
  }, [messages])

  useEffect(() => {
    if(error) {
      errorModalRef.current?.showModal()
    } else {
      errorModalRef.current?.close()
    }
  }, [error])

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
          setError(e.message)
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
                   onChange={(event) => setCurrentText(event.target.value)}
                   className="grow"
                   placeholder="Send a message"
            />
            <input type="submit"
                   value="Send"
                   className='btn rounded-full min-h-10 h-10'
            />
        </form>
        <dialog ref={errorModalRef} className="modal">
          <div className="modal-box">
            <div className="flex items-center gap-2">
              <Icon path={mdiAlertCircleOutline}
                    color="red"
                    size={1.2}
              />
              <h3 className="font-bold text-lg">Error</h3>
            </div>
            <p className="py-4">{ error }</p>
            <div className="modal-action">
                <button className="btn"
                        onClick={() => setError('')}
                >
                  Close
                </button>
            </div>
          </div>
        </dialog>
    </div>
  )
}

export default Chat
