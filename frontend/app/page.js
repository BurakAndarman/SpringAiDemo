'use client'
import { useState, useEffect, useRef } from 'react'
import { useChatMessagesStore } from '@/lib/chat_messages_store'
import { useErrorStore } from '@/lib/error_store'
import ReactMarkdown from "react-markdown"
import Icon from '@mdi/react'
import { mdiArrowUp } from '@mdi/js'

const Chat = () => {
  const messagesContainerRef = useRef(null)
  const [currentText, setCurrentText] = useState('')
  const messages = useChatMessagesStore((state) => state.chatMessages)
  const addMessages = useChatMessagesStore((state) => state.addMessages)
  const changeLastMessage = useChatMessagesStore((state) => state.changeLastMessage)
  const removeLastMessages = useChatMessagesStore((state) => state.removeLastMessages)
  const setError = useErrorStore((state) => state.setError)
  
  useEffect(() => {
    messagesContainerRef.current?.lastElementChild?.scrollIntoView({behavior: 'smooth'})
  }, [messages])

  const sendCurrentText = async (event) => {
      try{
          event.preventDefault()

          if(currentText === '') {
            return
          }

          addMessages([{
            text : currentText,
            belongsTo : 'user'
          }, {
            belongsTo : 'ai'
          }])

          const textToSend = currentText
          setCurrentText('')

          const response = await fetch('http://localhost:8080/api/v1/chat/text',{
              method : "POST",
              body : textToSend
          })

          if(response.status !== 200) {
            const errorResponse = await response.json()
            
            throw new Error(errorResponse.message)
          }

          const incomingText = await response.text()

          changeLastMessage({
            text : incomingText,
            belongsTo : 'ai'
          })

      } catch(e) {
          removeLastMessages(2)
          setError(e.message)
      }
  }

  return (
    <div className="container mx-auto flex flex-col gap-5 items-center h-full py-5">
        <div className="md:w-4/6 w-11/12 flex-auto overflow-y-auto h-0" 
             style={{scrollbarWidth : 'thin'}}
             ref={messagesContainerRef}
        >
            { 
              messages.map((message, index) => 
                <div className={`chat ${message.belongsTo === 'user' ? 'chat-end' : 'chat-start'} py-3`}
                    key={index}
                >
                  <div className="chat-bubble">
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
              className="input input-bordered rounded-full flex items-center gap-2 pr-1 bg-base-200 md:w-4/6 w-11/12"
        >
            <input type="text"
                   value={currentText}
                   onChange={(event) => setCurrentText(event.target.value)}
                   className="grow"
                   placeholder="Send a message"
            />
            <button type="submit"
                    className='btn btn-primary rounded-full min-h-10 h-10'
            >
              <Icon path={mdiArrowUp}
                    size={1}
                    color="white"
              />
            </button>
        </form>
    </div>
  )
}

export default Chat
