export interface EventItem {
  id: number
  slug: string
  title: string
  eventType: string
  description: string
  speaker: string
  speakerDesignation: string
  eventDate: string
  startDateTime: string
  endDateTime: string
  statusChangeDateTime: string
  location: string
  bannerImage: string
  registrationUrl: string
  embeddedRegistrationUrl: string
  registrationCountUrl: string
}

export const events: EventItem[] = [
  {
    id: 1,
    slug: 'basics-of-research-2026',
    title: 'Basics of Research',
    eventType: 'Research Session',
    description:
      'An introductory research session designed to help students understand the fundamentals of research and begin their research journey with proper guidance.',
    speaker: 'Dr. Sheikh Mehedi Hasan',
    speakerDesignation: 'Moderator, JKKNIU Research Society',
    eventDate: '22 July 2026',
    startDateTime: '2026-07-22T14:00:00+06:00',
    endDateTime: '2026-07-22T16:00:00+06:00',
    statusChangeDateTime: '2026-07-21T12:00:00+06:00',
    location: 'Conference Room, 5th Floor, Dean Office, New Arts Building, JKKNIU',
    bannerImage: '/media/basics_research.png',
    registrationUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLSf2NTC6OS5w8wFOLZMD0T52IGg2GxpVO9r3bHHDE1632Ynmpw/viewform',
    embeddedRegistrationUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLSf2NTC6OS5w8wFOLZMD0T52IGg2GxpVO9r3bHHDE1632Ynmpw/viewform?embedded=true',
    registrationCountUrl: import.meta.env.VITE_RESEARCH_EVENT_COUNT_URL || ''
  }
]

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Dhaka',
  day: 'numeric',
  month: 'long',
  year: 'numeric'
})

const timeFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Asia/Dhaka',
  hour: 'numeric',
  minute: '2-digit',
  hour12: true
})

export const formatEventDate = (dateTime: string) => dateFormatter.format(new Date(dateTime))

export const formatEventTimeRange = (startDateTime: string, endDateTime: string) => {
  return `${timeFormatter.format(new Date(startDateTime))} to ${timeFormatter.format(new Date(endDateTime))}`
}

export const formatStudentsRegistered = (count: number) => {
  if (count === 1) {
    return '1 student registered'
  }

  return `${count} students registered`
}
