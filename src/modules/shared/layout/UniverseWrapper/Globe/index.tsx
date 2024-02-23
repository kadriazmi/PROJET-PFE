import { useEffect } from 'react'
import { gitHubGlobe } from './script'

export default function GlobeCanvas() {
  useEffect(() => {
    gitHubGlobe()
  }, [])
  return <div id="globeCanvas"></div>
}
