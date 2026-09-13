import { useEffect, useState } from 'react'

export function StatusBar() {
  const [clock, setClock] = useState(() => stamp())

  useEffect(() => {
    const id = window.setInterval(() => setClock(stamp()), 1000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="status">
      <span>BPM 132</span>
      <span>CH · DISCORD</span>
      <span className="status-live">● LIVE</span>
      <span>{clock}</span>
    </div>
  )
}

function stamp() {
  return new Date().toLocaleTimeString('en-GB', { hour12: false })
}
