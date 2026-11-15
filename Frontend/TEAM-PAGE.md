# Team page

The existing React `/team` route contains **Executive Committee**, followed by **Advisor Committee**, with section navigation in the hero. Run `npm run dev` and append `/team` to the printed local URL. No backend changes, external member-data requests or publication are involved.

## Current design

The page uses the existing forest green and ivory team palette, serif member names and headings, numbered section headings, subtle divider lines, compact session badges and restrained hover elevation. The former decorative orbit is replaced by useful executive/advisor section navigation. Portraits remain flush with card edges. Within each grid row cards stretch consistently and profile links align; the President retains the previously requested modest emphasis on desktop. Mobile uses two columns, or one below 360px.

All six selectors, search, member biographies, public social links and portrait updates remain available. Modal dialogs support explicit keyboard focus containment/restoration, Escape, outside dismissal, internal scrolling and body scroll locking. Motion respects reduced-motion preferences.

Advisor Committee remains **Coming Soon**, as explicitly confirmed by the user. The old advisor route remains unchanged. Commented sample advisor identities and unassociated photographs are not published. `src/data/advisors.json` intentionally contains no profiles until approved records exist.

## Data and missing records

Authoritative member records: `JKKNIURS_All_Committees_Final_Verified_Package_2/data/committee-profiles-public.json`; photo associations: `data/photo-manifest.json`; provenance and review statuses: the package's `CROSS_CHECK_REPORT.md`.

| Committee | Named profiles | Displayed seats |
| --- | ---: | ---: |
| 1st | 13 | 18 |
| 2nd | 18 | 18 |
| 3rd | 18 | 18 |
| 4th | 18 | 18 |
| 5th | 18 | 18 |
| 6th, current/default | 18 | 18 |

First-committee positions 6, 11, 12, 15 and 16 retain noninteractive cards with blank portrait areas, no placeholder people/icons, and no invented details. The first committee is displayed in original serial order. Other committees retain the leadership/committee grouping; the 5th leadership follows the requested President, Vice-President (Research), Vice-President (Administration), General Secretary order. Archived serials remain unchanged.

Missing details are hidden. Sixth-committee cards display department names and session badges; complete supplied academic details, biographies and social links are in the dialogs. Sixth biographies retain `draft` status; historical biographies retain `pending_member_review`.

User-approved source overrides:

- Md Mehedi Hasan Naeem: `/home/mehedinaeem/Downloads/md mehedi hasan naeem.webp` replaces the 5th Vice-President and 6th President portraits. The supplied PNG data was encoded as WebP at quality 92, full 987 × 1044 frame retained. Display framing is zoomed to 140%.
- Ratul Rahman, 5th President: `/home/mehedinaeem/01.webp` replaces the portrait. Supplied JPEG data was encoded as WebP at quality 92, full 2036 × 2048 frame retained.
- Naeem's 5th department omits the university suffix as requested.

All other source public fields are preserved. Private email/phone/recruitment records and audit files remain outside public assets. The local package is ignored by Git. Public empty-slot metadata contains only committee, order and official position.

## Files

- Updated: `src/pages/Team.tsx`, `index.html` (existing society logo favicon), `.gitignore` (private source archive exclusion).
- Team components: `src/components/team/CommitteeHero.tsx`, `CommitteeSelector.tsx`, `ExecutiveCard.tsx`, `MemberProfileModal.tsx`, `AdvisorCommittee.tsx`, `types.ts`, `team.css`.
- Local data: `src/data/committees.json`, `committee-empty-seats.json`, `advisors.json`.
- Photos: 103 mapped files under `public/media/team/committees/` and `public/media/team/6th_committee/`.
- Validation: `scripts/validate-committees.mjs`.

## Verification

- `npm run build`: passes, including TypeScript.
- `node scripts/validate-committees.mjs`: passes counts, identities, current leadership, source ordering, WebP headers, HTTPS links, review status, private-field/export exclusions and all 18 first-committee slots.
- Automated local Chrome checks: section order and coming-soon state; six selectors and 18 cards each; all named photos load; blank first-committee images contain no photo/icon; original first-committee serial order and requested 5th leadership order; search and no-result reset; profile open, Escape, close button, outside dismissal and focus restoration/containment; no horizontal document or dialog overflow at 1440, 1024, 768, 390 and 320px; reduced-motion animation suppression; section navigation anchors; no JavaScript errors.
- Desktop and mobile screenshots inspected locally after decoding supplied photos.
- Build advisories remain for outdated Browserslist data and a main JavaScript chunk above Vite's 500 kB threshold.
- Social URLs remain the approved source snapshot (2026-09-21); live profile ownership was not independently reverified.

Institutional directory references consulted for content hierarchy and people-first navigation: [Oxford Mathematics people directory](https://www.maths.ox.ac.uk/people/find/list) and [Oxford Martin School researchers](https://www.oxfordmartin.ox.ac.uk/people/researchers). The implementation and visual treatment are original.

Latest revision: removed the Advisor Committee section and hero navigation at the user’s request, restored the prior executive-only hero and heading/card treatment, and retained all committee data, search, original slots and dialog accessibility fixes. The separate Advisory Board route is unchanged.

## Homepage current-leadership gallery

`src/components/team/CurrentExecutiveCommittee.tsx` and `current-executives.css` add a current-committee carousel to `src/pages/Home.tsx`, immediately after Research Areas. It filters the same public `committees.json` for the 18 sixth-committee members, retains official order, uses the current conference portrait and reuses `MemberProfileModal`. It does not change `/team` or existing homepage sections.

Manual native scrolling uses CSS snap points, previous/next controls, Left/Right and Home/End keys, visible focus, a progress indicator, and a link to `/team`. Portrait names and positions use a subtle bottom overlay; department and View Profile sit below. IntersectionObserver triggers the section entrance and defers offscreen photo sources. Entrance takes 550–600 ms with 80 ms stagger; hover elevation, border highlight, image zoom and arrows use 250–350 ms transitions. Reduced-motion mode suppresses animation and smooth scrolling. There is no automatic sliding and no new dependency.

Homepage verification: production build and source validator pass; automated Chrome checks cover 18 members in correct order, all 18 dialogs and image decoding, next/previous and keyboard controls, focus containment/restoration, horizontal scrolling, reduced motion, `/team` navigation and no JavaScript errors. At 1440, 1024, 768, 390 and 320px there is no page or modal horizontal overflow; visible gallery proportions are approximately 4, 3, 2.3, 1.2 and 1.1 cards. Only five image sources are assigned initially in the desktop browser check. Desktop and mobile section screenshots were reviewed locally.
Additional homepage interaction checks passed: computed hover elevation and portrait zoom, horizontal mouse-wheel/trackpad input, and simulated mobile touch swipes through Chrome's touch event interface.

Homepage layout revision: replaced the horizontal carousel with a full grid of all 18 current executives, with smaller homepage-only cards. Columns adapt through 6/4/3/2/1 for desktop to narrow mobile. Carousel controls/progress and scroll-key handlers are removed; profile dialogs, source ordering, hover/entrance animations, deferred photos and the `/team` link remain. `/team` card dimensions are unaffected. Entrance observation uses a low threshold so even the tall single-column grid reveals on short mobile viewports.


Homepage President background removal: the built-in image-generation editor produced a transparent cutout, saved to `public/media/team/6th_committee/01-md-mehedi-hasan-naeem-home-cutout.webp`. It is referenced only by the homepage President card, with framing adjusted for the extracted portrait. The source dataset, `/team` portraits and shared biography portrait remain unchanged. Alpha-channel extremes were verified as 0 and 255. The generated original remains in the Codex generated-images directory.

Final image-edit prompt (built-in tool, transparent-background mode):

> Use case: background-extraction. Edit target: the supplied professional conference photograph of Md Mehedi Hasan Naeem. Create a clean photographic cutout of ONLY the same man, removing the entire conference backdrop, all background lettering and logos. Actual transparent alpha background. Preserve the person's face, facial features, identity, hairstyle, beard, skin tone, expression, pose, suit, shirt, lanyard, watch, hands, proportions and photographic texture as closely as possible to the original. Do not beautify, redraw, restyle, change clothing or add objects. Preserve full original subject framing and natural fine hair/edge detail, no opaque background, no checkerboard baked in, no halo. Asset is for his existing university society landing-page card.
