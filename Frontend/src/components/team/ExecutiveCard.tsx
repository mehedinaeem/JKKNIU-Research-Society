import { ArrowUpRight, Users } from 'lucide-react'
import type { CSSProperties } from 'react'
import type { Member } from './types'

export default function ExecutiveCard({ member, onOpen, featured = false, index = 0 }: {
  member: Member; onOpen: (member: Member) => void; featured?: boolean; index?: number
}) {
  if (!member.name) return <div className={`executive-card executive-card-placeholder ${featured ? 'executive-card-featured' : ''}`} aria-label={`Position ${member.order}, ${member.position}; profile unavailable`}>
    <div className="executive-portrait" aria-hidden="true"><Users className="executive-placeholder-icon" strokeWidth={1.25} /><span className="executive-number">{String(member.order).padStart(2, '0')}</span></div>
    <div className="executive-card-copy"><p className="executive-position">{member.position}</p><span className="executive-placeholder-space" aria-hidden="true" /></div>
  </div>

  return <button type="button" className={`executive-card ${featured ? 'executive-card-featured' : ''} ${member.committee === '6th' ? 'executive-card-current' : ''} ${member.position === 'President' ? 'executive-card-president' : ''}`}
    style={{ '--card-delay': `${Math.min(index, 7) * 35}ms` } as CSSProperties}
    onClick={() => onOpen(member)} aria-label={`View profile of ${member.name}, ${member.position}`}>
    <div className="executive-portrait">
      {member.image && <img className={member.id === '5th-04' || member.id === '6th-01' ? 'member-portrait-closeup' : undefined} src={member.image} alt={member.name} width="480" height="600" loading={featured && index === 0 ? 'eager' : 'lazy'} decoding="async" />}{!member.image && <Users className="executive-placeholder-icon" strokeWidth={1.25} aria-hidden="true" />}
      <span className="executive-number">{String(member.order).padStart(2, '0')}</span>
      <span className="executive-profile-hint">View profile <ArrowUpRight size={17} aria-hidden="true" /></span>
    </div>
    <div className="executive-card-copy"><p className="executive-position">{member.position}</p><h3>{member.name}</h3>
      {member.committee === '6th' ? <div className="executive-academics">
        {member.department && <span>{member.department}</span>}
        {member.session && <span className="executive-session"><span className="executive-session-label">Session</span>{member.session}</span>}
      </div> : member.department && <p className="executive-department">{member.department}</p>}
      <span className="executive-card-link">View Profile <ArrowUpRight size={16} aria-hidden="true" /></span>
    </div>
  </button>
}
