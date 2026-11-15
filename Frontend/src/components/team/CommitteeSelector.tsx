export const committeeTerms = ['6th', '5th', '4th', '3rd', '2nd', '1st']
export default function CommitteeSelector({ selected, onSelect }: { selected: string; onSelect: (term: string) => void }) {
  return <nav className="committee-selector" aria-label="Executive committees">{committeeTerms.map(term =>
    <button type="button" key={term} aria-pressed={selected === term} aria-controls="committee-directory-results" onClick={() => onSelect(term)}>
      {term} Committee {term === '6th' && <span className="committee-current-dot">Current</span>}
    </button>)}</nav>
}
