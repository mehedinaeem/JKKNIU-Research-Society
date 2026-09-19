# Events archive implementation

The Events experience uses the 73 supplied records from 2019–2026. The original source folder was removed at the user’s request after verifying that all 73 records and 438 WebP assets were independently copied into the frontend.

## Files and routes

- Replaced `src/pages/Events.tsx` and `src/pages/EventDetails.tsx`.
- Added `src/data/events.json` (the supplied master JSON, unchanged) and `src/data/eventArchive.ts` (types, sorting, dates, categories, years).
- Added `src/components/events/ArchiveComponents.tsx`, `EventGallery.tsx`, and scoped `events.css`.
- Copied 438 supplied WebP files into `public/events/2019` through `public/events/2026`, preserving their relative paths. Download intermediates, JPG source copies, and per-event JSON duplicates are not deployed.
- Renamed the old `src/data/events.ts` to `src/data/eventRegistration.ts` and updated its sole remaining consumer, `EventRegistration.tsx`. This preserves the existing registration form and its configuration; historical cards and details use only the supplied archive.
- Removed the old hardcoded historical list and old Events/detail UI by replacing their page files. No shared components or unrelated assets were deleted.
- Existing `/events` and `/events/:slug` routes now render the new archive. No App route changes were necessary. Existing registration/recruitment routes, navbar, footer, and Home “Upcoming Events” links are preserved.
- Added `scripts/validate-events.mjs` and `npm run check:events`.

## Behavior

Featured selections come from `featured: true` (three most recent). Category and year filters come from the data and persist in query parameters. Year sections are newest first. Responsive `<picture>` sources select mobile cards at widths up to 768px. Only the first featured image is eager; other cards and galleries load lazily. Details use actual cover images, conditional metadata/posters/source links, and chronological previous/next navigation.

CSS entrance/hover transitions and IntersectionObserver reveals use a 70ms card stagger. Statistics use requestAnimationFrame count-up. Reduced-motion settings disable these effects. The native dialog lightbox provides focus containment/restoration, Escape, arrow keys, explicit controls, a photo counter, and touch swipes. Gallery files are already optimized WebPs; no original JPGs are requested.

## Source gaps (preserved)

No cover/gallery photographs: event-2019-008, event-2019-011, event-2019-012, event-2020-001, event-2020-003, event-2020-005, event-2020-006, event-2022-002, event-2022-006, event-2022-008, event-2023-002. These retain the archive's supplied neutral cards and display a no-photo message on details.

No Facebook URL: event-2019-008, event-2020-001, event-2020-006.

No venue: event-2020-002, event-2022-002, event-2022-004, event-2025-001.

All 73 records have no poster or news links. Speakers are blank in 66 records, guests in 71, participants in 72, awards in 71, and partners in 69. Empty optional sections are omitted.

## Verification

- Production build and ESLint pass.
- Data validation passes: 73 unique IDs/slugs, all eight years, 438 valid asset references.
- All copied image bytes match the source; all individual event JSON records match the master.
- Headless Chrome checks at 1440, 1024, 768, and 390px: 73 main archive cards, correct responsive image source, no horizontal page overflow.
- Year filter and combined category/year filter pass.
- Detail/cover/gallery checks for 2019, 2020, 2022, 2024, 2026; lightbox arrow navigation/Escape and adjacent event navigation pass.
- Missing-photo and reduced-motion states pass; no browser JavaScript errors observed.
- Facebook destinations are preserved and validated as Facebook URLs; remote Facebook availability/authentication was not tested.
