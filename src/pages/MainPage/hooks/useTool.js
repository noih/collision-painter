import { useState, useEffect, useMemo } from 'react'

import { useAppStore, useSceneStore, useShapeStore, useFileStore } from '/src/stores'

import { Select } from '../models/tools'

export default function useTool() {
  const [tool, setTool] = useState(Select)

  const { scene } = useSceneStore()
  const [selectedFile] = useFileStore((state) => [state.selected])
  const [
    selectedShape,
    setSelectedShape,
    addShape,
    removeShape,
    updateShape
  ] = useShapeStore((state) => [
    state.selected,
    state.setSelected,
    state.add,
    state.remove,
    state.update
  ])

  const { precision } = useAppStore()

  useEffect(
    () => {
      tool.activate({
        state: {
          scene,
          shape: selectedShape,
          precision
        },
        actions: {
          setTool,
          addShape: (shape) => addShape(selectedFile, shape),
          removeShape: (shape) => removeShape(selectedFile, shape),
          updateShape,
          setShape: setSelectedShape
        }
      })

      return () => {
        tool.deActivate()
      }
    },
    [
      tool,
      scene,
      setTool,
      selectedFile,
      selectedShape,
      setSelectedShape,
      addShape,
      removeShape,
      precision
    ]
  )

  return useMemo(() => [tool, setTool], [tool, setTool])
}
