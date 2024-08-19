"use client"
import { create } from 'zustand'

export const useChatMessagesStore = create((set) => ({
  chatMessages: [],
  addMessages: (newMessages) => set((state) => ({
    chatMessages: [...state.chatMessages, ...newMessages]
  })),
  changeLastMessage: (newLastMessage) => set((state) => ({
    chatMessages: [...state.chatMessages.slice(0, -1), newLastMessage]
  })),
  removeLastMessages: (count) => set((state) => ({
    chatMessages: [...state.chatMessages.slice(0, -count)]
  }))
}))