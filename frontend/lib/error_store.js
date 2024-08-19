"use client"
import { create } from 'zustand'

export const useErrorStore = create((set) => ({
  error: "",
  setError: (newError) => set(() => ({
    error: newError
  })),
  clearError: () => set(() => ({
    error: ""
  }))
}))