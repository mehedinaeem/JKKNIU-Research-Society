import { useState } from 'react'
import { Search, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import profiles from '../data/committees.json'
import emptySeats from '../data/committee-empty-seats.json'
import CommitteeHero from '../components/team/CommitteeHero'
import CommitteeSelector from '../components/team/CommitteeSelector'
import ExecutiveCard from '../components/team/ExecutiveCard'
import MemberProfileModal from '../components/team/MemberProfileModal'
import type { Member } from '../components/team/types'
import '../components/team/team.css'

const members: Member[] = profiles
const placeholders: Member[] = emptySeats.map(seat => ({
  ...seat, id: `${seat.committee}-${String(seat.order).padStart(2, '0')}`,
  person_id: '', name: '', official_name: '', group: '', department: '',
  faculty: '', session: '', bio: '', bio_status: '', image: '', social_links: {},
}))
const isSenior = (member: Member) => /^(president|vice[ -]?president(?:\b|\s*\()|general secretary$)/i.test(member.position)
const firstCommitteeRoleRank = (member: Member) => {
  if (/^president$/i.test(member.position)) return 0
  if (/^vice[ -]?president/i.test(member.position)) return 1
  if (/^general secretary$/i.test(member.position)) return 2
  if (/^joint secretary$/i.test(member.position)) return 3
  if (/^organizing secretary$/i.test(member.position)) return 4
  if (/^treasurer$/i.test(member.position)) return 5
  return 6
}

export default function Team() {
  const [committee, setCommittee] = useState('6th')
  const [search, setSearch] = useState('')
  const [activeMember, setActiveMember] = useState<Member | null>(null)
  const selected = [...members, ...placeholders].filter(member => member.committee === committee).sort((a, b) => (committee === '1st' ? firstCommitteeRoleRank(a) - firstCommitteeRoleRank(b) : 0) || a.order - b.order)
  const filtered = selected.filter(member => `${member.name} ${member.position}`.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase()))
  const namedCount = selected.filter(member => member.name).length
  const featured = filtered.filter(isSenior)
  // Keep archive serials intact while grouping fifth-committee Vice-Presidents before the General Secretary.
  if (committee === '5th') {
    const leadershipRank = (member: Member) => member.position === 'President' ? 0 : member.position === 'General Secretary' ? 2 : 1
    featured.sort((a, b) => leadershipRank(a) - leadershipRank(b) || a.order - b.order)
  }
  const remaining = filtered.filter(member => !isSenior(member))
  const selectCommittee = (term: string) => { setCommittee(term); setSearch('') }

  return <div className="committee-page">
    <CommitteeHero />
    <section id="committee-directory" className="committee-directory committee-shell" aria-labelledby="executive-heading" data-navbar-theme="light">
      <div className="committee-section-intro"><p className="committee-eyebrow">A legacy of leadership</p><h2 id="executive-heading">Six chapters. One shared purpose.</h2><p>Discover the people who have shaped our research community.</p></div>
      <CommitteeSelector selected={committee} onSelect={selectCommittee} />
      <div className="committee-heading"><div><p className="committee-eyebrow">{committee === '6th' ? 'Leading the way today' : 'From our committee archive'}</p><h2>{committee} Executive Committee</h2></div><span className="committee-member-count">{namedCount} named members <span aria-hidden="true">/</span> {committee === '6th' ? 'Current committee' : 'Historical committee'}</span></div>
      {committee === '1st' && <p className="committee-archive-note">13 confirmed members across 18 historical positions. Five unresolved identities retain their recorded roles as blank cards in the committee hierarchy.</p>}
      <div className="committee-tools"><label className="committee-search"><Search size={19} aria-hidden="true" /><span className="sr-only">Search this committee by name or position</span><input type="search" placeholder="Search by name or position…" value={search} onChange={event => setSearch(event.target.value)} /></label>
      </div>
      <p className="committee-results-count" role="status" aria-live="polite">Showing {filtered.filter(member => member.name).length} of {namedCount} members{committee === '1st' && !search.trim() ? ' · 18 historical positions' : ''}</p>
      <div id="committee-directory-results" key={`${committee}-${search}`}>
        {featured.length > 0 && <section className="committee-leadership" aria-labelledby="leadership-heading"><div className="committee-subheading"><h3 id="leadership-heading">Meet the leadership</h3><span>Guiding our shared vision</span></div><div className="committee-featured-grid">{featured.map((member, index) => <ExecutiveCard key={member.id} member={member} featured index={index} onOpen={setActiveMember} />)}</div></section>}
        {remaining.length > 0 && <section aria-labelledby="members-heading"><div className="committee-subheading"><h3 id="members-heading">The committee</h3><span>Working together. Moving forward.</span></div><div className="committee-member-grid">{remaining.map((member, index) => <ExecutiveCard key={member.id} member={member} index={index} onOpen={setActiveMember} />)}</div></section>}
        {filtered.length === 0 && <div className="committee-empty"><h3>No matching members</h3><p>Try another name or position.</p><button type="button" onClick={() => { setSearch('') }}>Clear search</button></div>}
      </div>
    </section>
    <section className="committee-invitation"><div className="committee-shell"><div><p className="committee-eyebrow">Your curiosity belongs here</p><h2>Be part of what comes next.</h2><p>Connect with a community built around research and collaboration.</p></div><Link to="/contact">Get in touch <ArrowRight size={19} aria-hidden="true" /></Link></div></section>
    {activeMember && <MemberProfileModal member={activeMember} onClose={() => setActiveMember(null)} />}
  </div>
}
