import clsx from 'clsx'

import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import UploadIcon from '@mui/icons-material/Upload'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import RectangleOutlinedIcon from '@mui/icons-material/RectangleOutlined'
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined'
import MouseArrowIcom from 'jsx:/src/assets/mouse-arrow.svg'
import EllipseIcon from 'jsx:/src/assets/ellipse.svg'
import CustomizedIcon from 'jsx:/src/assets/line-segment.svg'
import DecimalArrowRight from 'jsx:/src/assets/decimal-arrow-right.svg'

import * as styles from './styles.module.css'

const ActionBar = [
  {
    icon: <UploadIcon sx={{ color: 'white' }} />,
    description: 'Import a file or multiple files. The files will be sorted by the number in the file name.'
  },
  {
    icon: <AttachFileIcon sx={{ color: 'white' }} />,
    description: 'Attach a previously exported JSON file. You can attach multiple times, where the comparison is based on filename, and data that cannot be matched will be ignored.'
  },
  {
    icon: <FileDownloadIcon sx={{ color: 'white' }} />,
    description: 'Export a JSON file.'
  }
]

const ToolBar = [
  {
    icon: <MouseArrowIcom className={clsx(styles.icon, styles.white)} />,
    description: 'Select the shape on the canvas.'
  },
  {
    icon: <RectangleOutlinedIcon fontSize="medium" color="action" />,
    description: 'Draw a rectangle.'
  },
  {
    icon: <CircleOutlinedIcon fontSize="medium" color="action" />,
    description: 'Draw a circle.'
  },
  {
    icon: <EllipseIcon className={clsx(styles.icon, styles.white)} />,
    description: 'Draw an ellipse.'
  },
  {
    icon: <CustomizedIcon className={clsx(styles.icon, styles.white)} />,
    description: 'Draw a custom shape, which can be a point, many lines, or a polygon. You can use the Alt (Win) or Cmd (⌘) key to quickly add a point.'
  }
]

const HelpDialog = (props) => {
  const { isOpen, onClose } = props

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      scroll="paper"
    >
      <DialogTitle>
        Help
      </DialogTitle>

      <DialogContent>
        <DialogContentText sx={{ marginBottom: 1, fontWeight: 'bold' }}>Action Bar</DialogContentText>

        {
          ActionBar.map((item, index) => {
            const margin = index === 0 || index === (ActionBar.length - 1) ? 0 : '10px 0'
            return (
              <Box key={index} sx={{ display: 'flex', margin, alignItems: 'center' }}>
                <Avatar sx={{ marginRight: 1 }}>{item.icon}</Avatar>
                <DialogContentText>{item.description}</DialogContentText>
              </Box>
            )
          })
        }

        <Divider sx={{ margin: '10px 0' }} />
        <DialogContentText sx={{ marginBottom: 1, fontWeight: 'bold' }}>Tools</DialogContentText>

        {
          ToolBar.map((item, index) => {
            const margin = index === 0 || index === (ToolBar.length - 1) ? 0 : '10px 0'
            return (
              <Box key={index} sx={{ display: 'flex', margin, alignItems: 'center' }}>
                <Avatar sx={{ marginRight: 1 }}>{item.icon}</Avatar>
                <DialogContentText>{item.description}</DialogContentText>
              </Box>
            )
          })
        }

        <Divider sx={{ margin: '10px 0' }} />
        <DialogContentText sx={{ marginBottom: '8px', fontWeight: 'bold' }}>Settings</DialogContentText>

        <Box sx={{ display: 'flex', margin: 0, alignItems: 'center' }}>
          <Avatar sx={{ marginRight: 1 }}>
            <DecimalArrowRight className={clsx(styles.icon, styles.white)} />
          </Avatar>
          <DialogContentText>Set the precision of coordinates.</DialogContentText>
        </Box>

        <div className={styles.txtItem}>
          <DialogContentText sx={{ margin: '15px 0 5px 0' }}>Tags</DialogContentText>
          <DialogContentText sx={{ marginLeft: '15px' }}>
            Global tag management, where tags are used to classify each shape. If a used tag is deleted, no automatic action will be taken; manual deletion is required for each individual case.
          </DialogContentText>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default HelpDialog
