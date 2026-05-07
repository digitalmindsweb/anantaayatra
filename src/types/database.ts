export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          name: string | null
          role: 'admin' | 'user'
          created_at: string
        }
        Insert: {
          id: string
          name?: string | null
          role?: 'admin' | 'user'
          created_at?: string
        }
        Update: {
          id?: string
          name?: string | null
          role?: 'admin' | 'user'
          created_at?: string
        }
      }
    }
  }
}
