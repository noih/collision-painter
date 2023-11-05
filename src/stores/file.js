import { create } from 'zustand'

const useFileStore = create((set) => ({
  // current selected file
  selected: null,
  setSelected: (index) => set(() => ({ selected: index })),

  // all files
  files: [],
  setFiles: (files) => set(() => ({ files })),
  removeAll: () => set({ files: [] }),

  // last attached file time
  lastAttachedAt: null,
  setLastAttachedAt: (time) => set(() => ({ lastAttachedAt: time }))
}))

export default useFileStore
