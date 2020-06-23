export interface Credit {
  cast_id: number
  character: string
  credit_id: string
  gender: number | null
  id: number
  name: string
  order: number
  profile_path: string | null
}

export interface Credits {
  id: number
  cast: Credit[]
  crew: Credit[]
}
