export interface ArtistSignup {
  id?: string
  created_at?: string
  name: string
  phone: string
  instagram: string
  city: string
  genre: string
  will_share: 'yes' | 'maybe' | 'unsure'
}
