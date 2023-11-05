import { create } from 'zustand'
import { produce } from 'immer'

const useShapeStore = create((set) => ({
  selected: null,
  setSelected: (shape) => set({ selected: shape }),

  shapesMap: {},
  add: (key, shape) => set(
    produce((state) => {
      const shapes = state.shapesMap[key] || []
      shapes.push(shape)
      state.shapesMap[key] = shapes
    })
  ),
  remove: (key, shape) => set(
    produce((state) => {
      const shapes = state.shapesMap[key] || []
      state.shapesMap[key] = shapes.filter((s) => s.id !== shape.id)
    })
  ),
  update: (fn) => set(produce(fn)),
  clear: () => set({ shapesMap: {}, selected: null })
}))

export default useShapeStore
