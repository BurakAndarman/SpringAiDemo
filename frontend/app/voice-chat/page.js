'use client'
import { useState } from 'react'
import Icon from '@mdi/react';
import { mdiMicrophone } from '@mdi/js'

const VoiceChat = () => {
  let audioChunks = []
  let audioRecorder = null

  const onMicrophoneClicked = async () => {
    try {
      audioRecorder?.stop()

      console.log(audioChunks)

      if(audioChunks[0]) {
        console.log(audioChunks)

        const blobObj = new Blob(audioChunks, { type: 'audio/webm' })
        const audioUrl = URL.createObjectURL(blobObj)
        const audio = new Audio(audioUrl)
        audio.play()

        audioRecorder = null
        audioChunks = []

        return
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio : true })

      audioRecorder = new MediaRecorder(stream)
      audioRecorder.addEventListener('dataavailable', e => {
        audioChunks.push(e.data)
      })
      audioRecorder.start()

    } catch(e) {
      alert(e)
    }
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
          <div className="text-lg">Click Microphone to Start!</div>
      </div>
    </div>
  )
}

export default VoiceChat
