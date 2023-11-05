import { create } from 'zustand'

const useAppStore = create((set) => ({
  precision: 16,
  setPrecision: (v) => set(() => ({ precision: v }))
}))

export default useAppStore
