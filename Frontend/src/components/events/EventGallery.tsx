import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Reveal } from './ArchiveComponents'

function EventLightbox({ images, title, initial, onClose }: { images: string[]; title: string; initial: number; onClose: () => void }) {
  const [index, setIndex] = useState(initial)
  const dialog = useRef<HTMLDialogElement>(null)
  const touch = useRef<number | null>(null)
  const move = (direction: number) => setIndex(value => (value + direction + images.length) % images.length)
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    const overflow = document.body.style.overflow
    const node = dialog.current
    node?.showModal()
    document.body.style.overflow = 'hidden'
    return () => { node?.close(); document.body.style.overflow = overflow; previous?.focus() }
  }, [])
  return createPortal(<dialog ref={dialog} className="ea-lightbox" aria-label={`${title} photo gallery`} onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose() }} onKeyDown={event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1) }
    if (event.key === 'ArrowRight') { event.preventDefault(); move(1) }
  }}><div className="ea-lightbox-bar"><span aria-live="polite">{index + 1} / {images.length}</span><button autoFocus onClick={onClose} aria-label="Close gallery"><X /></button></div><div className="ea-lightbox-stage" onTouchStart={event => { touch.current = event.touches[0].clientX }} onTouchEnd={event => {
    if (touch.current !== null && Math.abs(event.changedTouches[0].clientX - touch.current) > 50) move(event.changedTouches[0].clientX < touch.current ? 1 : -1)
    touch.current = null
  }}><img src={images[index]} alt={`${title} — photo ${index + 1}`} /></div><div className="ea-lightbox-controls"><button onClick={() => move(-1)} aria-label="Previous photo"><ChevronLeft /> Previous</button><button onClick={() => move(1)} aria-label="Next photo">Next <ChevronRight /></button></div></dialog>, document.body)
}

export default function EventGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState<number | null>(null)
  if (!images.length) return null
  return <section className="ea-gallery-section"><div className="ea-section-title"><div><span className="ea-eyebrow">Through the lens</span><h2>Photo gallery</h2></div><span>{images.length} photographs</span></div><div className="ea-gallery">{images.map((src, index) => <Reveal key={src} delay={(index % 3) * 70}><button onClick={() => setActive(index)} aria-label={`Open photo ${index + 1} of ${images.length}: ${title}`}><img src={src} alt={`${title} — archive photograph ${index + 1}`} loading="lazy" decoding="async" /><span>View photo ↗</span></button></Reveal>)}</div>{active !== null && <EventLightbox images={images} title={title} initial={active} onClose={() => setActive(null)} />}</section>
}
