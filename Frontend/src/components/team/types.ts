export interface Member {
  id: string
  person_id: string
  committee: string
  order: number
  name: string
  official_name: string
  position: string
  group: string
  department: string
  faculty: string
  session: string
  bio: string
  bio_status: string
  image: string
  social_links: Record<string, string | null>
}
