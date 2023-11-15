import { useFileStore } from '/src/stores'

import ErrorBoundary from '/src/components/ErrorBoundary'

import Header from './components/Header'
import Explorer from './components/Explorer'
import Painter from './components/Painter'
import TopToolBar from './components/TopToolBar'
import BottomToolBar from './components/BottomToolBar'
import ShapeList from './components/ShapeList'
import InfoPanel from './components/InfoPanel'
import * as styles from './styles.module.css'

export default function MainPage() {
  const selected = useFileStore((state) => state.selected)

  return (
    <div className={styles.page}>
      <Header />

      <div className={styles.content}>
        <Explorer />

        <div className={styles.rightSide}>
          <ErrorBoundary fallback={<p>Something went wrong</p>}>
            <Painter className="z0" />

            {
              selected !== null && (
                <>
                  <TopToolBar className="z1" />
                  <BottomToolBar className="z1" />
                  <ShapeList className="z1" />
                  <InfoPanel className="z1" />
                </>
              )
            }
          </ErrorBoundary>
        </div>
      </div>
    </div>
  )
}
