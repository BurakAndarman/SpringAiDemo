'use client'
import { useState, useRef } from 'react'
import { useChatMessagesStore } from '@/lib/chat_messages_store'
import { useErrorStore } from '@/lib/error_store'
import Icon from '@mdi/react'
import { mdiMicrophone, mdiAccountVoice, mdiEarHearing } from '@mdi/js'

const VoiceChat = () => {
  const mediaRecorder = useRef(null)
  const audio = useRef(null)
  const [recording, setRecording] = useState(false)
  const [loading, setLoading] = useState(false)
  const [playing, setPlaying] = useState(false)
  const addMessages = useChatMessagesStore((state) => state.addMessages)
  const setError = useErrorStore((state) => state.setError)

  const onMicrophoneClicked = () => {
    if(mediaRecorder.current?.state !== 'recording') {
      startRecording()
    } else {
      stopRecording()
    }
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorder.current = new MediaRecorder(stream)

      mediaRecorder.current.addEventListener("start", () => {
        setRecording(true)
      })
      mediaRecorder.current.addEventListener("stop", () => {
        setRecording(false)
      })

      mediaRecorder.current.ondataavailable = (e) => {
        mediaRecorder.current.stream.getTracks().forEach(track => track.stop())

        if (!e.data?.size) {
          return
        }
        
        const recordedBlob = new Blob([e.data], { type: 'audio/webm' })
        sendAudioRecord(recordedBlob)
      }

      mediaRecorder.current.start()

    } catch(e) {
      setError(e.message)
    }
  }

  const stopRecording = () => {
    mediaRecorder.current.stop()
  }

  const sendAudioRecord = async (recordedBlob) => {
    try{
      const formData = new FormData()
      formData.append("promptAudio", recordedBlob)
  
      setLoading(true)
  
      const response = await fetch('http://localhost:8080/api/v1/chat/audio',{
          method : "POST",
          body: formData
      })
  
      const parsedResponse = await response.json()
  
      if(response.status !== 200) {
        throw new Error(parsedResponse.message)
      }
  
      setLoading(false)

      addMessages([{
        text : parsedResponse.promptString,
        belongsTo : "user"
      }, {
        text : parsedResponse.textResponse,
        belongsTo : "ai"
      }])
  
      if(!audio.current) {
        audio.current = new Audio()
  
        audio.current.addEventListener("play", () => {
          setPlaying(true)
        })
        audio.current.addEventListener("pause", () => {
          setPlaying(false)
        })
      }
  
      audio.current.src = parsedResponse.audioResponseFile
      audio.current.play()
      
    } catch(e) {
      setLoading(false)
      setError(e.message)
    }
  }

  const onAssistantClick = () => {
    audio.current.pause()
    audio.current.currentTime = 0
  }

  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col items-center justify-between gap-2">
          { playing ?
              <>
                <div onClick={onAssistantClick}
                    className='cursor-pointer'    
                >
                  <Icon path={mdiAccountVoice}
                        size={6}
                        color="white"
                  />
                </div>
                <div className='text-lg text-gray-500 italic'>Click to Cancel</div>
              </>
              :
              (loading ? 
                  <>
                    <div className="loading loading-dots w-20 text-white"></div>
                    <div className='text-lg'>Thinking...</div>
                  </>
                  :
                  <>
                    <div onClick={onMicrophoneClicked}
                         className="cursor-pointer"
                    >
                      {
                        recording ?
                          <Icon path={mdiEarHearing}
                                size={6}
                                color="white"
                          />
                          :
                          <Icon path={mdiMicrophone}
                                size={6}
                                color="white"
                          />
                      }
                    </div>
                    <div className="text-lg">
                      {recording ? 'Listening...' : 'Click Microphone to Speak'}
                    </div>
                  </>
              )
          }
      </div>
    </div>
  )
}

export default VoiceChat
