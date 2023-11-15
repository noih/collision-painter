import { create } from 'zustand'
import { produce } from 'immer'

const useAppStore = create((set) => ({
  precision: 16,
  setPrecision: (v) => set(() => ({ precision: Math.min(Math.max(v, 0), 16) })),

  tags: [],
  setTags: (v) => set(() => ({ tags: v })),
  addTag: (v) => set(produce((state) => {
    state.tags.push(v)
    state.tags = [...new Set(state.tags)] // unique
  })),
  removeTag: (v) => set(produce((state) => {
    state.tags = state.tags.filter((t) => t !== v)
  }))
}))

export default useAppStore
