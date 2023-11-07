import { useRef, useCallback, useState } from 'react'
import { saveAs } from 'file-saver'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import UploadIcon from '@mui/icons-material/Upload'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import HelpIcon from '@mui/icons-material/Help'
import GitHubIcon from '@mui/icons-material/GitHub'

import { useFileStore, useShapeStore } from '/src/stores'
import AsyncFileReader from '/src/modules/AsyncFileReader.js'
import imageSize from '/src/modules/ImageSize.js'
import is from '/src/utils/is.js'

import * as styles from './styles.module.css'

import HelpDialog from '../HelpDialog'
import { Factory as ShapeFactory } from '../../models/shapes/index.js'

function Header(props) {
  const importRef = useRef(null)
  const attachRef = useRef(null)
  const [showHelp, setShowHelp] = useState(false)
  const { lastAttachedAt } = useFileStore()

  const importFile = useCallback(() => importRef.current?.click(), [])
  const attachJSON = useCallback(() => attachRef.current?.click(), [])
  const openHelp = useCallback(() => setShowHelp(true), [setShowHelp])
  const closeHelp = useCallback(() => setShowHelp(false), [setShowHelp])

  const exportJSON = useCallback(
    () => {
      try {
        const { shapesMap } = useShapeStore.getState()
        const { files } = useFileStore.getState()

        const data = {}

        for (const [index, shapes] of Object.entries(shapesMap)) {
          const { name } = files[index]
          data[name] = shapes?.map((shape) => shape.serialize()) || []
        }

        saveAs(new Blob([JSON.stringify(data, null, 2)], { type: 'text/plain;charset=utf-8' }), 'collision.json')
      } catch (err) {
        //
      }
    },
    []
  )

  const onFileChange = useCallback(
    async (ev) => {
      try {
        const files = await Promise.all(
          Array
            .from(ev.target.files)
            .sort((a, b) => {
              /**
               * If there are numbers in the file name, sort by the last number,
               * otherwise sort by string
               */
              const [an] = a.name.match(/(\d+)(?!.*\d)/) || []
              const [bn] = b.name.match(/(\d+)(?!.*\d)/) || []
              if (an && bn) {
                return Number(an) - Number(bn)
              }
              return a > b ? 1 : -1
            })
            .map(async (file) => {
              const info = await imageSize(file)

              // ! Note: inject width / height
              file.width = info.width
              file.height = info.height

              return file
            })
        )

        if (!files.length) { return } // do nothing

        const { setFiles, setSelected } = useFileStore.getState()
        const { shapesMap, clear } = useShapeStore.getState()

        // destroy all previous shapes
        Object.values(shapesMap).forEach((shapes) => {
          shapes.forEach((shape) => shape.destroy(true))
        })
        clear()

        setFiles(files)
        setSelected(0)
      } catch (err) {
        //
      }
    },
    []
  )

  const onAttachChange = useCallback(
    async (ev) => {
      try {
        const [file] = ev.target.files

        if (!file) { return } // do nothing

        // parse json
        const json = await AsyncFileReader.readAsText(file)
        const parsed = JSON.parse(json)

        // gen filename -> index map
        const { files, setLastAttachedAt } = useFileStore.getState()
        const idxMap = {} // { [filename]: index }
        for (const [idx, file] of files.entries()) {
          idxMap[file.name] = idx
        }

        // add shapes
        const { add } = useShapeStore.getState()
        for (const [name, shapes] of Object.entries(parsed)) {
          for (const shape of shapes) {
            const index = idxMap[name]
            const s = ShapeFactory(shape)
            if (!s || !is.exist(index)) { continue }
            s.draw()
            add(idxMap[name], s)
          }
        }

        setLastAttachedAt(Date.now())
      } catch (err) {
        //
      }
    },
    []
  )

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Box>
          <Tooltip title="Import files">
            <IconButton
              aria-label="import"
              color="inherit"
              onClick={importFile}
            >
              <UploadIcon />
              <input
                type="file"
                ref={importRef}
                multiple
                accept="image/png,jpeg,jpg,bmp"
                style={{ display: 'none' }}
                onChange={onFileChange}
              />
            </IconButton>
          </Tooltip>
        </Box>
        <Box>
          <Tooltip title="Attach JSON">
            <IconButton
              aria-label="attach"
              color="inherit"
              onClick={attachJSON}
            >
              <AttachFileIcon />
              <input
                key={lastAttachedAt} // ! Note: always reset
                type="file"
                ref={attachRef}
                accept="application/json"
                style={{ display: 'none' }}
                onChange={onAttachChange}
              />
            </IconButton>
          </Tooltip>
        </Box>
        <Box>
          <Tooltip title="Export JSON">
            <IconButton
              aria-label="export"
              color="inherit"
              onClick={exportJSON}
            >
              <FileDownloadIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Box>
          <IconButton
            aria-label="help"
            color="inherit"
            onClick={openHelp}
          >
            <HelpIcon />
          </IconButton>
        </Box>
        <Box>
          <a href="https://github.com/noih/collision-painter" target="_blank" rel="noreferrer">
            <IconButton
              aria-label="github"
              color="inherit"
            >
              <GitHubIcon />
            </IconButton>
          </a>
        </Box>
      </Toolbar>

      <HelpDialog
        isOpen={showHelp}
        onClose={closeHelp}
      />
    </AppBar>
  )
}

export default Header
