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
          first_name: string | null
          last_name: string | null
          country: string | null
          language: string | null
          plan: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          first_name?: string | null
          last_name?: string | null
          country?: string | null
          language?: string | null
          plan?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          first_name?: string | null
          last_name?: string | null
          country?: string | null
          language?: string | null
          plan?: string
          created_at?: string
          updated_at?: string
        }
      }
      email_templates: {
        Row: {
          id: string
          language: string
          type: string
          subject: string
          content: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          language: string
          type: string
          subject: string
          content: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          language?: string
          type?: string
          subject?: string
          content?: string
          created_at?: string
          updated_at?: string
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
</boltArtifact>

The implementation is now ready. When a user signs up:

1. The language selection from the form is stored in the user's metadata
2. The appropriate email template is fetched based on the selected language
3. Supabase will use the correct template to send the verification email

Would you like me to:

1. Add more language templates?
2. Add additional email types (password reset, welcome, etc.)?
3. Add a language preference toggle in the user settings?

Let me know what aspects you'd like me