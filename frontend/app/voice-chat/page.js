'use client'
import { useState, useRef } from 'react'
import Icon from '@mdi/react'
import { mdiMicrophone, mdiAccountVoice} from '@mdi/js'

const VoiceChat = () => {
  const mediaRecorder = useRef(null)
  const [recording, setRecording] = useState(false)
  const chunks = useRef([])
  const [playing, setPlaying] = useState(false)

  const onMicrophoneClicked = () => {
    try {
      if(mediaRecorder.current?.state !== 'recording') {
        startRecording()
      } else {
        stopRecording()
      }
      
    } catch(e) {
      alert(e.message)
    }
  }

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

    mediaRecorder.current = new MediaRecorder(stream)
    mediaRecorder.current.start()

    setRecording(true)

    mediaRecorder.current.ondataavailable = (e) => {
      if (!e.data?.size) {
        return
      }
      chunks.current.push(e.data)
    }
  }

  const stopRecording = () => {
    mediaRecorder.current.stop()

    setRecording(false)
    
    mediaRecorder.current.onstop = () => {
      const recordedBlob = new Blob(chunks.current, { type: 'audio/webm' })
      sendAudioRecord(recordedBlob)
    }
  }

  const sendAudioRecord = async (recordedBlob) => {
    const formData = new FormData()

    formData.append("promptAudio", recordedBlob)

    const response = await fetch('http://localhost:8080/api/v1/chat/audio',{
        method : "POST",
        body: formData
    })

    if(response.status !== 200) {
      throw new Error("There is a problem. Please try again later.")
    }

    const successResponse = await response.json()

    const audio = new Audio(successResponse.audioResponseFile)

    audio.addEventListener("play", () => {
      setPlaying(true)
    })

    audio.addEventListener("ended", () => {
      setPlaying(false)
    })

    audio.play()
  }

  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col items-center justify-between gap-2">
          { playing ?
              <Icon path={mdiAccountVoice}
                    size={6}
                    color="white"
              />
              :
              <>
                <div onClick={onMicrophoneClicked}
                  className="cursor-pointer"
                >
                  <Icon path={mdiMicrophone}
                        size={6}
                        color="white"
                  />
                </div>
                <div className="text-lg">
                  {recording ? 'Recording Your Voice' : 'Click Microphone to Start!'}
                </div>
              </>              
          }
      </div>
    </div>
  )
}

export default VoiceChat
