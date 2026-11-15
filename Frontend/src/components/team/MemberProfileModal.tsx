import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowUpRight, X } from 'lucide-react'
import type { Member } from './types'

const socialLabels: Record<string, string> = { facebook: 'Facebook', linkedin: 'LinkedIn', google_scholar: 'Google Scholar', instagram: 'Instagram', github: 'GitHub', researchgate: 'ResearchGate', portfolio: 'Portfolio' }

export default function MemberProfileModal({ member, onClose }: { member: Member; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const [closing, setClosing] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>()
  const requestClose = () => {
    if (closing) return
    setClosing(true)
    timer.current = setTimeout(onClose, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 180)
  }
  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const element = dialog.current
    element?.showModal()
    element?.querySelector<HTMLButtonElement>('button')?.focus()
    return () => {
      clearTimeout(timer.current)
      element?.close()
      document.body.style.overflow = previousOverflow
      previousFocus?.focus({ preventScroll: true })
    }
  }, [])
  const links = Object.entries(member.social_links).filter(([key, url]) => socialLabels[key] && url && /^https:\/\//.test(url))
  return createPortal(<dialog ref={dialog} className={`member-dialog ${closing ? 'member-dialog-closing' : ''}`} aria-labelledby="member-profile-name"
    onKeyDown={event => {
      if (event.key !== 'Tab') return
      const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], [tabindex="0"]'))
      const first = controls[0]
      const last = controls[controls.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first?.focus()
      }
    }}
    onCancel={event => { event.preventDefault(); requestClose() }} onClick={event => { if (event.target === event.currentTarget) requestClose() }}>
    <div className="member-dialog-layout">
      <button className="member-dialog-close" type="button" aria-label="Close member profile" onClick={requestClose}><X size={22} /></button>
      <div className="member-dialog-portrait">{member.image && <img className={member.id === '5th-04' || member.id === '6th-01' ? 'member-portrait-closeup' : undefined} src={member.image} alt={member.name} width="480" height="600" decoding="async" />}</div>
      <div className="member-dialog-content"><p className="committee-eyebrow">{member.committee === 'advisors' ? 'Advisor Committee' : `${member.committee} Executive Committee`} {member.committee === '6th' ? ' / Current' : ''}</p>
        <p className="executive-position">{member.position}</p><h2 id="member-profile-name">{member.name}</h2>
        {(member.department || member.faculty || member.session) && <dl className="member-academics">{[['Department', member.department], ['Faculty', member.faculty], ['Academic session', member.session]].map(([label, value]) => value && <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>}
        {member.bio && <section className="member-about"><h3>About</h3><p>{member.bio}</p>{member.bio_status === 'draft' && <span className="member-review-note">Biography · Editorial draft</span>}</section>}
        {links.length > 0 && <section className="member-connect"><h3>Connect</h3><div>{links.map(([key, url]) => <a key={key} href={url!} target="_blank" rel="noopener noreferrer">{socialLabels[key]}<ArrowUpRight size={15} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>)}</div></section>}
      </div>
    </div>
  </dialog>, document.body)
}
