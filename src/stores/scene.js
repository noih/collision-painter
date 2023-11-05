import { create } from 'zustand'

const useSceneStore = create((set) => ({
  // pixi container
  scene: null,
  setScene: (scene) => set(() => ({ scene })),

  // zoom (0.1x ~ 20x)
  scale: 1,
  setScale: (scale = 1) => set(() => ({ scale: Math.max(0.1, Math.min(20, scale)) })),
  addScale: (delta = 0) => set((state) => ({ scale: Math.max(0.1, Math.min(20, state.scale + delta)) }))
}))

export default useSceneStore
