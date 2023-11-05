import * as PIXI from 'pixi.js'

PIXI.BaseTexture.defaultOptions.scaleMode = PIXI.SCALE_MODES.NEAREST

const App = new PIXI.Application({
  view: document.getElementById('canvas'),
  backgroundColor: 0x3c3c3c,
  resolution: window.devicePixelRatio || 1,
  autoDensity: true,
  antialias: true
})

// events for tools
App.stage.eventMode = 'static'
App.stage.hitArea = App.screen

export default App
