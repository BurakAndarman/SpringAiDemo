'use client'
import { useState, useRef } from 'react'
import Icon from '@mdi/react'
import { mdiMicrophone } from '@mdi/js'

const VoiceChat = () => {
  const mediaRecorder = useRef(null)
  const chunks = useRef([])

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
    mediaRecorder.current.ondataavailable = (e) => {
      if (!e.data?.size) {
        return
      }
      chunks.current.push(e.data)
    }
  }

  const stopRecording = () => {
    mediaRecorder.current.stop()
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

    const audio = new Audio()
    audio.src = new File(successResponse.audioResponseUrl)
    audio.play()
  }

  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col items-center justify-between gap-2">
          <div onClick={onMicrophoneClicked}
               className="cursor-pointer"
          >
            <Icon path={mdiMicrophone}
                  size={6}
                  color="white"
            />
          </div>
          <div className="text-lg">
            {mediaRecorder.current?.state !== 'recording' ? 'Click Microphone to Start!' : 'Recording Your Voice'}
          </div>
      </div>
    </div>
  )
}

export default VoiceChat
