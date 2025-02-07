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
      projects: {
        Row: {
          id: number
          title: string
          description: string
          image_url: string
          tags: string[]
          link: string | null
          created_at: string
        }
        Insert: {
          id?: number
          title: string
          description: string
          image_url: string
          tags?: string[]
          link?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          title?: string
          description?: string
          image_url?: string
          tags?: string[]
          link?: string | null
          created_at?: string
        }
      }
      experiences: {
        Row: {
          id: number
          company: string
          position: string
          period: string
          description: string
          technologies: string[]
          created_at: string
        }
        Insert: {
          id?: number
          company: string
          position: string
          period: string
          description: string
          technologies?: string[]
          created_at?: string
        }
        Update: {
          id?: number
          company?: string
          position?: string
          period?: string
          description?: string
          technologies?: string[]
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}