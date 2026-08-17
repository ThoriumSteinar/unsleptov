import { useEffect, useRef } from 'react'

export function FxLayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let frame = 0
    let raf = 0
    const bars = 48
    const phases = Array.from({ length: bars }, (_, i) => Math.random() * Math.PI * 2 + i * 0.15)

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(140 * dpr)
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = '140px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = () => {
      const w = window.innerWidth
      const h = 140
      ctx.clearRect(0, 0, w, h)
      const gap = 4
      const barW = Math.max(3, w / bars - gap)
      for (let i = 0; i < bars; i += 1) {
        const wave =
          0.35 +
          0.35 * Math.sin(frame * 0.045 + phases[i]) +
          0.2 * Math.sin(frame * 0.09 + i * 0.4)
        const bh = Math.max(8, wave * (h - 16))
        const x = i * (barW + gap)
        const y = h - bh
        const g = ctx.createLinearGradient(x, y, x, h)
        g.addColorStop(0, '#d6ff3a')
        g.addColorStop(0.45, '#00e5ff')
        g.addColorStop(1, '#ff2d95')
        ctx.fillStyle = g
        ctx.globalAlpha = 0.55
        ctx.fillRect(x, y, barW, bh)
      }
      ctx.globalAlpha = 1
      frame += 1
      raf = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className="fx" aria-hidden="true">
      <div className="fx-grid" />
      <div className="fx-vignette" />
      <div className="fx-scan" />
      <canvas ref={canvasRef} className="fx-eq" />
    </div>
  )
}
