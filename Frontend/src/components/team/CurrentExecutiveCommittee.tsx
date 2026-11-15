import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import profiles from '../../data/committees.json'
import MemberProfileModal from './MemberProfileModal'
import type { Member } from './types'
import './team.css'
import './current-executives.css'

const currentMembers: Member[] = profiles.filter(member => member.committee === '6th').sort((a, b) => a.order - b.order)

export default function CurrentExecutiveCommittee() {
  const section = useRef<HTMLElement>(null)
  const [revealed, setRevealed] = useState(false)
  const [loadedPhotos, setLoadedPhotos] = useState<Set<number>>(() => new Set([0, 1, 2, 3]))
  const [activeMember, setActiveMember] = useState<Member | null>(null)

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      setRevealed(true)
      setLoadedPhotos(new Set(currentMembers.map((_, index) => index)))
      return
    }
    const entrance = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        setRevealed(true)
        entrance.disconnect()
      }
    }, { threshold: 0.01 })
    if (section.current) entrance.observe(section.current)
    const photos = new IntersectionObserver(entries => {
      const indices = entries.filter(entry => entry.isIntersecting).map(entry => Number((entry.target as HTMLElement).dataset.memberIndex))
      if (indices.length) {
        setLoadedPhotos(previous => new Set([...previous, ...indices]))
        entries.filter(entry => entry.isIntersecting).forEach(entry => photos.unobserve(entry.target))
      }
    }, { rootMargin: '240px 0px' })
    section.current?.querySelectorAll('[data-member-index]').forEach(card => photos.observe(card))
    return () => { entrance.disconnect(); photos.disconnect() }
  }, [])

  return <section ref={section} id="current-leadership" className="current-executives" data-navbar-theme="light" data-revealed={revealed} aria-labelledby="current-leadership-heading" onFocusCapture={() => setRevealed(true)}>
    <div className="current-executives-shell">
      <header className="current-executives-header">
        <div className="current-executives-intro"><p className="current-executives-eyebrow"><span aria-hidden="true" />The people moving us forward</p>
          <h2 id="current-leadership-heading">Meet Our <em>Current Leadership</em></h2>
          <p>The 6th Executive Committee of JKKNIU Research Society, working to advance research, collaboration, and academic opportunities.</p>
        </div>
        <span className="current-executives-edition">6th Executive Committee<span>18 current executives</span></span>
      </header>
      <div id="current-executives-gallery" className="current-executives-gallery" role="list" aria-label="All 18 current executive committee members">
        {currentMembers.map((member, index) => <div className="current-executive-item" key={member.id} data-member-index={index} role="listitem" style={{ '--reveal-delay': `${index % 6 * 80}ms` } as CSSProperties}>
          <button type="button" className="current-executive-card" onClick={() => setActiveMember(member)} aria-label={`View profile of ${member.name}, ${member.position}`}>
            <div className="current-executive-portrait">
              {member.image && loadedPhotos.has(index) && <img className={member.id === '6th-01' ? 'current-executive-cutout' : undefined} src={member.id === '6th-01' ? '/media/team/6th_committee/01-md-mehedi-hasan-naeem-home-cutout.webp' : member.image} alt={member.name} width={480} height={600} loading="lazy" decoding="async" />}
              <span className="current-executive-number">{String(member.order).padStart(2, '0')}</span>
              {index === 0 && <span className="current-executive-lead">President</span>}
              <div className="current-executive-identity"><span>{member.position}</span><h3>{member.name}</h3></div>
            </div>
            <div className="current-executive-details">{member.department && <p>{member.department}</p>}<span className="current-executive-profile">View Profile <ArrowUpRight size={17} aria-hidden="true" /></span></div>
          </button>
        </div>)}
      </div>
      <footer className="current-executives-footer"><p>Discover the people who have shaped JKKNIU Research Society across six generations of leadership.</p><Link to="/team">Explore All Executive Committees <ArrowRight size={18} aria-hidden="true" /></Link></footer>
    </div>
    {activeMember && <MemberProfileModal member={activeMember} onClose={() => setActiveMember(null)} />}
  </section>
}
