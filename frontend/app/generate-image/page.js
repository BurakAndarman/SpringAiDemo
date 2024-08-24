'use client'
import { useState } from 'react'
import { useErrorStore } from '@/lib/error_store'
import Image from 'next/image'
import Icon from '@mdi/react'
import { mdiArrowRight, mdiArrowUp } from '@mdi/js'

const GenerateImage = () => {
  const [currentText, setCurrentText] = useState('')
  const [loading, setLoading] = useState(false)
  const [image , setImage] = useState('')
  const setError = useErrorStore((state) => state.setError)
  
  const sendCurrentText = async () => {
      try {
          if(currentText === '') {
            return
          }

          setImage('')
          
          setLoading(true)

          const response = await fetch('http://localhost:8080/api/v1/chat/image',{
              method : "POST",
              body : currentText
          })

          if(response.status !== 200) {
            const errorResponse = await response.json()
            
            throw new Error(errorResponse.message)
          }

          setLoading(false)

          const imageUrl = await response.text()

          setImage(imageUrl)

      } catch(e) {
        setLoading(false)
        setError(e.message)
      }
  }

  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col-reverse lg:flex-row items-center gap-8">
        <textarea value={currentText}
                  onChange={(event) => setCurrentText(event.target.value)}
                  className="textarea textarea-bordered textarea-md resize-none bg-base-200 w-80 h-auto"
                  style={{scrollbarWidth : 'thin'}}
                  rows={3}
                  spellCheck="false"
                  placeholder="Write a prompt"
        />
        <button onClick={sendCurrentText}
                className="btn btn-primary btn-circle"
        >
          <Icon path={mdiArrowRight}
                size={1}
                className='hidden lg:block'
                color="white"
          />
          <Icon path={mdiArrowUp}
                size={1}
                className='lg:hidden'
                color="white"
          />
        </button>
        <div className={`card bg-base-200 h-96 w-96 shadow-xl ${image ? "" : "flex items-center justify-center"}`}>
            {
              loading ? 
                <div>
                  <span>Generating<span className="loading loading-spinner ml-2 loading-lg align-text-bottom"></span></span>
                </div>
                :
                image ?
                  <Image
                    src={image}
                    alt="ai generated image"
                    fill
                    className='rounded-2xl'
                  />
                  :
                  <div>
                    Image will appear here
                  </div>
            }
        </div>
      </div>
    </div>
  )
}

export default GenerateImage
