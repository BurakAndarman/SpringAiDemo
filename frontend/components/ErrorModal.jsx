"use client"
import { useRef, useEffect } from 'react'
import Icon from '@mdi/react'
import { mdiAlertCircleOutline } from '@mdi/js'
import { useErrorStore } from '@/lib/error_store'

const ErrorModal = () => {
  const errorModalRef = useRef(null)
  const error = useErrorStore((state) => state.error)
  const clearError = useErrorStore((state) => state.clearError)

  useEffect(() => {
    if(error) {
      errorModalRef.current?.showModal()
    } else {
      errorModalRef.current?.close()
    }
  }, [error])

  return (
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
                    onClick={() => clearError()}
            >
                Close
            </button>
        </div>
        </div>
    </dialog>
  )
}

export default ErrorModal
