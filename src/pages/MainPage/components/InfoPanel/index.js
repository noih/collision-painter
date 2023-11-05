import clsx from 'clsx'

import Panel from './Panel'
import * as styles from './styles.module.css'

const InfoPanel = (props) => {
  return (
    <div className={clsx(styles.panel, props.className)}>
      <Panel />
    </div>
  )
}

export default InfoPanel
