export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// Legacy / AI-receptionist types
export type AppRole = 'SUPER_ADMIN' | 'ADMIN' | 'AGENCY_OWNER' | 'ACCOUNT_OWNER' | 'TEAM_MEMBER' | 'BILLING_ONLY' | 'READ_ONLY' | 'API_ACCESS'
export type SubscriptionTier = 'free' | 'basic' | 'pro' | 'business' | 'enterprise'
export type SubscriptionStatus = 'active' | 'past_due' | 'canceled' | 'incomplete' | 'trialing'
export type CallUrgency = 'routine' | 'urgent' | 'emergency'
export type SentimentLabel = 'positive' | 'neutral' | 'negative' | 'urgent'
export type BookingStatus = 'confirmed' | 'completed' | 'cancelled' | 'no_show' | 'rescheduled'
export type TwoFactorMethod = 'app' | 'sms' | 'email'
export type CallSentiment = 'positive' | 'neutral' | 'negative' | 'frustrated' | 'urgent'
export type LeadStatus = 'hot' | 'warm' | 'cold' | 'converted' | 'disqualified'
export type JobStatus = 'scheduled' | 'dispatched' | 'arrived' | 'in_progress' | 'completed' | 'cancelled'

// WealthPath types
export type AdminRole = 'super_admin' | 'admin' | 'editor' | 'viewer'
export type ContentType = 'blog' | 'guide' | 'strategy' | 'compare' | 'state'
export type ContentStatus = 'draft' | 'published' | 'archived'
export type CalcCategory = 'retirement' | 'mortgage' | 'investment' | 'tax' | 'savings' | 'debt' | 'insurance' | 'budgeting' | 'other'
export type AffiliateStatus = 'active' | 'paused' | 'inactive'
export type CommissionType = 'cpa' | 'cpl' | 'cps' | 'flat'
export type ContactStatus = 'new' | 'read' | 'replied' | 'spam'

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          role: AppRole[]
          email: string | null
          phone: string | null
          full_name: string | null
          avatar_url: string | null
          bio: string | null
          date_of_birth: string | null
          email_verified: boolean | null
          phone_verified: boolean | null
          identity_verified: boolean | null
          verification_level: string | null
          two_factor_enabled: boolean | null
          two_factor_method: TwoFactorMethod | null
          two_factor_secret: string | null
          backup_codes: string[] | null
          last_login_at: string | null
          last_login_ip: string | null
          login_count: number | null
          failed_login_attempts: number | null
          locked_until: string | null
          password_changed_at: string | null
          preferred_language: string | null
          timezone: string | null
          date_format: string | null
          time_format: string | null
          theme: string | null
          notification_preferences: Json | null
          created_at: string
          updated_at: string
          deleted_at: string | null
        }
        Insert: {
          id: string
          role?: AppRole[]
          email?: string | null
          phone?: string | null
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          date_of_birth?: string | null
          email_verified?: boolean | null
          phone_verified?: boolean | null
          identity_verified?: boolean | null
          verification_level?: string | null
          two_factor_enabled?: boolean | null
          two_factor_method?: TwoFactorMethod | null
          two_factor_secret?: string | null
          backup_codes?: string[] | null
          last_login_at?: string | null
          last_login_ip?: string | null
          login_count?: number | null
          failed_login_attempts?: number | null
          locked_until?: string | null
          password_changed_at?: string | null
          preferred_language?: string | null
          timezone?: string | null
          date_format?: string | null
          time_format?: string | null
          theme?: string | null
          notification_preferences?: Json | null
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
        Update: {
          id?: string
          role?: AppRole[]
          email?: string | null
          phone?: string | null
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          date_of_birth?: string | null
          email_verified?: boolean | null
          phone_verified?: boolean | null
          identity_verified?: boolean | null
          verification_level?: string | null
          two_factor_enabled?: boolean | null
          two_factor_method?: TwoFactorMethod | null
          two_factor_secret?: string | null
          backup_codes?: string[] | null
          last_login_at?: string | null
          last_login_ip?: string | null
          login_count?: number | null
          failed_login_attempts?: number | null
          locked_until?: string | null
          password_changed_at?: string | null
          preferred_language?: string | null
          timezone?: string | null
          date_format?: string | null
          time_format?: string | null
          theme?: string | null
          notification_preferences?: Json | null
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_roles: {
        Row: {
          user_id: string
          role: AppRole
          created_at: string
        }
        Insert: {
          user_id: string
          role: AppRole
          created_at?: string
        }
        Update: {
          user_id?: string
          role?: AppRole
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_sessions: {
        Row: {
          id: string
          user_id: string | null
          session_token: string
          device_info: Json | null
          ip_address: string | null
          user_agent: string | null
          location: string | null
          is_current: boolean | null
          last_active_at: string | null
          expires_at: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          session_token: string
          device_info?: Json | null
          ip_address?: string | null
          user_agent?: string | null
          location?: string | null
          is_current?: boolean | null
          last_active_at?: string | null
          expires_at: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          session_token?: string
          device_info?: Json | null
          ip_address?: string | null
          user_agent?: string | null
          location?: string | null
          is_current?: boolean | null
          last_active_at?: string | null
          expires_at?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_sessions_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      clients: {
        Row: {
          id: string
          user_id: string | null
          business_name: string
          business_type: string | null
          business_size: string | null
          industry: string | null
          website: string | null
          description: string | null
          logo_url: string | null
          contact_name: string | null
          contact_email: string | null
          contact_phone: string | null
          emergency_contact: string | null
          emergency_sms: string[] | null
          address_line1: string | null
          address_line2: string | null
          city: string | null
          state: string | null
          postal_code: string | null
          country: string | null
          timezone: string | null
          business_hours: Json | null
          holiday_hours: Json[] | null
          system_prompt: string | null
          voice_id: string | null
          voice_provider: string | null
          model_preferences: Json | null
          greeting_message: string | null
          emergency_keywords: string[] | null
          blocked_numbers: string[] | null
          allowed_callers: string[] | null
          calendar_provider: string | null
          calendar_id: string | null
          calendar_settings: Json | null
          settings: Json | null
          tags: string[] | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          business_name: string
          business_type?: string | null
          business_size?: string | null
          industry?: string | null
          website?: string | null
          description?: string | null
          logo_url?: string | null
          contact_name?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          emergency_contact?: string | null
          emergency_sms?: string[] | null
          address_line1?: string | null
          address_line2?: string | null
          city?: string | null
          state?: string | null
          postal_code?: string | null
          country?: string | null
          timezone?: string | null
          business_hours?: Json | null
          holiday_hours?: Json[] | null
          system_prompt?: string | null
          voice_id?: string | null
          voice_provider?: string | null
          model_preferences?: Json | null
          greeting_message?: string | null
          emergency_keywords?: string[] | null
          blocked_numbers?: string[] | null
          allowed_callers?: string[] | null
          calendar_provider?: string | null
          calendar_id?: string | null
          calendar_settings?: Json | null
          settings?: Json | null
          tags?: string[] | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          business_name?: string
          business_type?: string | null
          business_size?: string | null
          industry?: string | null
          website?: string | null
          description?: string | null
          logo_url?: string | null
          contact_name?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          emergency_contact?: string | null
          emergency_sms?: string[] | null
          address_line1?: string | null
          address_line2?: string | null
          city?: string | null
          state?: string | null
          postal_code?: string | null
          country?: string | null
          timezone?: string | null
          business_hours?: Json | null
          holiday_hours?: Json[] | null
          system_prompt?: string | null
          voice_id?: string | null
          voice_provider?: string | null
          model_preferences?: Json | null
          greeting_message?: string | null
          emergency_keywords?: string[] | null
          blocked_numbers?: string[] | null
          allowed_callers?: string[] | null
          calendar_provider?: string | null
          calendar_id?: string | null
          calendar_settings?: Json | null
          settings?: Json | null
          tags?: string[] | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "clients_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string | null
          client_id: string | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          stripe_price_id: string | null
          tier: SubscriptionTier | null
          status: SubscriptionStatus | null
          call_limit: number | null
          calls_used: number | null
          sms_limit: number | null
          sms_used: number | null
          team_member_limit: number | null
          storage_limit_mb: number | null
          features: Json | null
          price_amount: number | null
          currency: string | null
          interval: string | null
          trial_start: string | null
          trial_end: string | null
          current_period_start: string | null
          current_period_end: string | null
          cancel_at_period_end: boolean | null
          cancelled_at: string | null
          payment_methods: Json[] | null
          default_payment_method: string | null
          last_invoice_id: string | null
          last_invoice_url: string | null
          upcoming_invoice: Json | null
          metadata: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          client_id?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          stripe_price_id?: string | null
          tier?: SubscriptionTier | null
          status?: SubscriptionStatus | null
          call_limit?: number | null
          calls_used?: number | null
          sms_limit?: number | null
          sms_used?: number | null
          team_member_limit?: number | null
          storage_limit_mb?: number | null
          features?: Json | null
          price_amount?: number | null
          currency?: string | null
          interval?: string | null
          trial_start?: string | null
          trial_end?: string | null
          current_period_start?: string | null
          current_period_end?: string | null
          cancel_at_period_end?: boolean | null
          cancelled_at?: string | null
          payment_methods?: Json[] | null
          default_payment_method?: string | null
          last_invoice_id?: string | null
          last_invoice_url?: string | null
          upcoming_invoice?: Json | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          client_id?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          stripe_price_id?: string | null
          tier?: SubscriptionTier | null
          status?: SubscriptionStatus | null
          call_limit?: number | null
          calls_used?: number | null
          sms_limit?: number | null
          sms_used?: number | null
          team_member_limit?: number | null
          storage_limit_mb?: number | null
          features?: Json | null
          price_amount?: number | null
          currency?: string | null
          interval?: string | null
          trial_start?: string | null
          trial_end?: string | null
          current_period_start?: string | null
          current_period_end?: string | null
          cancel_at_period_end?: boolean | null
          cancelled_at?: string | null
          payment_methods?: Json[] | null
          default_payment_method?: string | null
          last_invoice_id?: string | null
          last_invoice_url?: string | null
          upcoming_invoice?: Json | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_client_id_fkey"
            columns: ["client_id"]
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      calls: {
        Row: {
          id: string
          client_id: string | null
          caller_name: string | null
          caller_phone: string | null
          caller_email: string | null
          service_needed: string | null
          urgency: CallUrgency | null
          address: string | null
          notes: string | null
          transcript: string | null
          summary: string | null
          sentiment_score: number | null
          sentiment_label: SentimentLabel | null
          emotion: Json | null
          confidence_score: number | null
          booking_id: string | null
          estimated_value: number | null
          converted: boolean | null
          conversion_value: number | null
          duration_seconds: number | null
          recording_url: string | null
          recording_size: number | null
          twilio_call_sid: string | null
          vapi_call_id: string | null
          is_emergency: boolean | null
          requires_human: boolean | null
          human_handoff_id: string | null
          metadata: Json | null
          tags: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          client_id?: string | null
          caller_name?: string | null
          caller_phone?: string | null
          caller_email?: string | null
          service_needed?: string | null
          urgency?: CallUrgency | null
          address?: string | null
          notes?: string | null
          transcript?: string | null
          summary?: string | null
          sentiment_score?: number | null
          sentiment_label?: SentimentLabel | null
          emotion?: Json | null
          confidence_score?: number | null
          booking_id?: string | null
          estimated_value?: number | null
          converted?: boolean | null
          conversion_value?: number | null
          duration_seconds?: number | null
          recording_url?: string | null
          recording_size?: number | null
          twilio_call_sid?: string | null
          vapi_call_id?: string | null
          is_emergency?: boolean | null
          requires_human?: boolean | null
          human_handoff_id?: string | null
          metadata?: Json | null
          tags?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          client_id?: string | null
          caller_name?: string | null
          caller_phone?: string | null
          caller_email?: string | null
          service_needed?: string | null
          urgency?: CallUrgency | null
          address?: string | null
          notes?: string | null
          transcript?: string | null
          summary?: string | null
          sentiment_score?: number | null
          sentiment_label?: SentimentLabel | null
          emotion?: Json | null
          confidence_score?: number | null
          booking_id?: string | null
          estimated_value?: number | null
          converted?: boolean | null
          conversion_value?: number | null
          duration_seconds?: number | null
          recording_url?: string | null
          recording_size?: number | null
          twilio_call_sid?: string | null
          vapi_call_id?: string | null
          is_emergency?: boolean | null
          requires_human?: boolean | null
          human_handoff_id?: string | null
          metadata?: Json | null
          tags?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "calls_client_id_fkey"
            columns: ["client_id"]
            referencedRelation: "clients"
            referencedColumns: ["id"]
          }
        ]
      }
      bookings: {
        Row: {
          id: string
          call_id: string | null
          client_id: string | null
          customer_name: string
          customer_phone: string | null
          customer_email: string | null
          service: string
          description: string | null
          duration_minutes: number | null
          price: number | null
          deposit_amount: number | null
          deposit_collected: boolean | null
          deposit_payment_id: string | null
          scheduled_time: string
          end_time: string | null
          timezone: string | null
          technician: string | null
          technician_id: string | null
          location_type: string | null
          address: string | null
          virtual_meeting_link: string | null
          status: BookingStatus | null
          cancellation_reason: string | null
          no_show_fee: number | null
          reminders_sent: Json[] | null
          last_reminder_sent: string | null
          google_event_id: string | null
          calendar_synced: boolean | null
          notes: string | null
          metadata: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          call_id?: string | null
          client_id?: string | null
          customer_name: string
          customer_phone?: string | null
          customer_email?: string | null
          service: string
          description?: string | null
          duration_minutes?: number | null
          price?: number | null
          deposit_amount?: number | null
          deposit_collected?: boolean | null
          deposit_payment_id?: string | null
          scheduled_time: string
          end_time?: string | null
          timezone?: string | null
          technician?: string | null
          technician_id?: string | null
          location_type?: string | null
          address?: string | null
          virtual_meeting_link?: string | null
          status?: BookingStatus | null
          cancellation_reason?: string | null
          no_show_fee?: number | null
          reminders_sent?: Json[] | null
          last_reminder_sent?: string | null
          google_event_id?: string | null
          calendar_synced?: boolean | null
          notes?: string | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          call_id?: string | null
          client_id?: string | null
          customer_name?: string
          customer_phone?: string | null
          customer_email?: string | null
          service?: string
          description?: string | null
          duration_minutes?: number | null
          price?: number | null
          deposit_amount?: number | null
          deposit_collected?: boolean | null
          deposit_payment_id?: string | null
          scheduled_time?: string
          end_time?: string | null
          timezone?: string | null
          technician?: string | null
          technician_id?: string | null
          location_type?: string | null
          address?: string | null
          virtual_meeting_link?: string | null
          status?: BookingStatus | null
          cancellation_reason?: string | null
          no_show_fee?: number | null
          reminders_sent?: Json[] | null
          last_reminder_sent?: string | null
          google_event_id?: string | null
          calendar_synced?: boolean | null
          notes?: string | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_call_id_fkey"
            columns: ["call_id"]
            referencedRelation: "calls"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_client_id_fkey"
            columns: ["client_id"]
            referencedRelation: "clients"
            referencedColumns: ["id"]
          }
        ]
      }
      leads: {
        Row: {
          id: string
          profile_id: string | null
          call_id: string | null
          customer_name: string | null
          phone: string | null
          email: string | null
          status: LeadStatus | null
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          profile_id?: string | null
          call_id?: string | null
          customer_name?: string | null
          phone?: string | null
          email?: string | null
          status?: LeadStatus | null
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          profile_id?: string | null
          call_id?: string | null
          customer_name?: string | null
          phone?: string | null
          email?: string | null
          status?: LeadStatus | null
          notes?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "leads_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_call_id_fkey"
            columns: ["call_id"]
            referencedRelation: "calls"
            referencedColumns: ["id"]
          }
        ]
      }
      messages: {
        Row: {
          id: string
          profile_id: string | null
          channel: string
          direction: string | null
          content: string | null
          sender: string | null
          receiver: string | null
          metadata: Json | null
          is_read: boolean | null
          created_at: string
        }
        Insert: {
          id?: string
          profile_id?: string | null
          channel: string
          direction?: string | null
          content?: string | null
          sender?: string | null
          receiver?: string | null
          metadata?: Json | null
          is_read?: boolean | null
          created_at?: string
        }
        Update: {
          id?: string
          profile_id?: string | null
          channel?: string
          direction?: string | null
          content?: string | null
          sender?: string | null
          receiver?: string | null
          metadata?: Json | null
          is_read?: boolean | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      jobs: {
        Row: {
          id: string
          profile_id: string | null
          lead_id: string | null
          title: string
          description: string | null
          start_time: string
          end_time: string
          status: JobStatus | null
          technician_id: string | null
          location: string | null
          created_at: string
        }
        Insert: {
          id?: string
          profile_id?: string | null
          lead_id?: string | null
          title: string
          description?: string | null
          start_time: string
          end_time: string
          status?: JobStatus | null
          technician_id?: string | null
          location?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          profile_id?: string | null
          lead_id?: string | null
          title?: string
          description?: string | null
          start_time?: string
          end_time?: string
          status?: JobStatus | null
          technician_id?: string | null
          location?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "jobs_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jobs_lead_id_fkey"
            columns: ["lead_id"]
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jobs_technician_id_fkey"
            columns: ["technician_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      invoices: {
        Row: {
          id: string
          profile_id: string | null
          job_id: string | null
          amount: number
          status: string | null
          stripe_id: string | null
          due_date: string | null
          created_at: string
        }
        Insert: {
          id?: string
          profile_id?: string | null
          job_id?: string | null
          amount: number
          status?: string | null
          stripe_id?: string | null
          due_date?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          profile_id?: string | null
          job_id?: string | null
          amount?: number
          status?: string | null
          stripe_id?: string | null
          due_date?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoices_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_job_id_fkey"
            columns: ["job_id"]
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          }
        ]
      }
      quotations: {
        Row: {
          id: string
          profile_id: string | null
          lead_id: string | null
          title: string
          items: Json | null
          total_amount: number | null
          status: string | null
          ai_generated: boolean | null
          expiry_date: string | null
          created_at: string
        }
        Insert: {
          id?: string
          profile_id?: string | null
          lead_id?: string | null
          title: string
          items?: Json | null
          total_amount?: number | null
          status?: string | null
          ai_generated?: boolean | null
          expiry_date?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          profile_id?: string | null
          lead_id?: string | null
          title?: string
          items?: Json | null
          total_amount?: number | null
          status?: string | null
          ai_generated?: boolean | null
          expiry_date?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "quotations_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quotations_lead_id_fkey"
            columns: ["lead_id"]
            referencedRelation: "leads"
            referencedColumns: ["id"]
          }
        ]
      }
      // ── WealthPath tables ──────────────────────────────────────────
      admin_users: {
        Row: {
          id: string
          role: AdminRole
          full_name: string | null
          email: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          role?: AdminRole
          full_name?: string | null
          email?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          role?: AdminRole
          full_name?: string | null
          email?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          { foreignKeyName: 'admin_users_id_fkey'; columns: ['id']; referencedRelation: 'users'; referencedColumns: ['id'] }
        ]
      }
      calculators: {
        Row: {
          id: string
          title: string
          slug: string
          description: string | null
          category: CalcCategory
          status: ContentStatus
          config: Json
          seo_title: string | null
          seo_description: string | null
          og_image_url: string | null
          canonical_url: string | null
          embeddable: boolean
          embed_color: string | null
          views_count: number
          uses_count: number
          author_id: string | null
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description?: string | null
          category?: CalcCategory
          status?: ContentStatus
          config?: Json
          seo_title?: string | null
          seo_description?: string | null
          og_image_url?: string | null
          canonical_url?: string | null
          embeddable?: boolean
          embed_color?: string | null
          views_count?: number
          uses_count?: number
          author_id?: string | null
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string | null
          category?: CalcCategory
          status?: ContentStatus
          config?: Json
          seo_title?: string | null
          seo_description?: string | null
          og_image_url?: string | null
          canonical_url?: string | null
          embeddable?: boolean
          embed_color?: string | null
          views_count?: number
          uses_count?: number
          author_id?: string | null
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          { foreignKeyName: 'calculators_author_id_fkey'; columns: ['author_id']; referencedRelation: 'users'; referencedColumns: ['id'] }
        ]
      }
      calculator_tags: {
        Row: { calculator_id: string; tag: string }
        Insert: { calculator_id: string; tag: string }
        Update: { calculator_id?: string; tag?: string }
        Relationships: [
          { foreignKeyName: 'calculator_tags_calculator_id_fkey'; columns: ['calculator_id']; referencedRelation: 'calculators'; referencedColumns: ['id'] }
        ]
      }
      content: {
        Row: {
          id: string
          title: string
          slug: string
          type: ContentType
          status: ContentStatus
          excerpt: string | null
          body: string | null
          reading_time: number | null
          cover_image_url: string | null
          seo_title: string | null
          seo_description: string | null
          og_image_url: string | null
          canonical_url: string | null
          tags: string[]
          related_calc_slugs: string[]
          state_code: string | null
          views_count: number
          shares_count: number
          author_id: string | null
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          type: ContentType
          status?: ContentStatus
          excerpt?: string | null
          body?: string | null
          reading_time?: number | null
          cover_image_url?: string | null
          seo_title?: string | null
          seo_description?: string | null
          og_image_url?: string | null
          canonical_url?: string | null
          tags?: string[]
          related_calc_slugs?: string[]
          state_code?: string | null
          views_count?: number
          shares_count?: number
          author_id?: string | null
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          type?: ContentType
          status?: ContentStatus
          excerpt?: string | null
          body?: string | null
          reading_time?: number | null
          cover_image_url?: string | null
          seo_title?: string | null
          seo_description?: string | null
          og_image_url?: string | null
          canonical_url?: string | null
          tags?: string[]
          related_calc_slugs?: string[]
          state_code?: string | null
          views_count?: number
          shares_count?: number
          author_id?: string | null
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          { foreignKeyName: 'content_author_id_fkey'; columns: ['author_id']; referencedRelation: 'users'; referencedColumns: ['id'] }
        ]
      }
      affiliate_links: {
        Row: {
          id: string
          name: string
          partner: string
          logo_url: string | null
          calculator_slug: string | null
          content_slug: string | null
          destination_url: string
          tracking_url: string | null
          status: AffiliateStatus
          commission_type: CommissionType
          commission_value: number
          clicks_count: number
          conversions_count: number
          estimated_revenue: number
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          partner: string
          logo_url?: string | null
          calculator_slug?: string | null
          content_slug?: string | null
          destination_url: string
          tracking_url?: string | null
          status?: AffiliateStatus
          commission_type?: CommissionType
          commission_value?: number
          clicks_count?: number
          conversions_count?: number
          estimated_revenue?: number
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          partner?: string
          logo_url?: string | null
          calculator_slug?: string | null
          content_slug?: string | null
          destination_url?: string
          tracking_url?: string | null
          status?: AffiliateStatus
          commission_type?: CommissionType
          commission_value?: number
          clicks_count?: number
          conversions_count?: number
          estimated_revenue?: number
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      analytics_events: {
        Row: {
          id: string
          event_type: string
          page: string | null
          calculator_slug: string | null
          content_slug: string | null
          affiliate_id: string | null
          user_id: string | null
          session_id: string | null
          ip_address: string | null
          user_agent: string | null
          referrer: string | null
          country_code: string | null
          utm_source: string | null
          utm_medium: string | null
          utm_campaign: string | null
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          event_type: string
          page?: string | null
          calculator_slug?: string | null
          content_slug?: string | null
          affiliate_id?: string | null
          user_id?: string | null
          session_id?: string | null
          ip_address?: string | null
          user_agent?: string | null
          referrer?: string | null
          country_code?: string | null
          utm_source?: string | null
          utm_medium?: string | null
          utm_campaign?: string | null
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          event_type?: string
          page?: string | null
          calculator_slug?: string | null
          content_slug?: string | null
          affiliate_id?: string | null
          user_id?: string | null
          session_id?: string | null
          ip_address?: string | null
          user_agent?: string | null
          referrer?: string | null
          country_code?: string | null
          utm_source?: string | null
          utm_medium?: string | null
          utm_campaign?: string | null
          metadata?: Json | null
          created_at?: string
        }
        Relationships: [
          { foreignKeyName: 'analytics_events_affiliate_id_fkey'; columns: ['affiliate_id']; referencedRelation: 'affiliate_links'; referencedColumns: ['id'] }
        ]
      }
      contact_submissions: {
        Row: {
          id: string
          name: string
          email: string
          subject: string | null
          message: string
          phone: string | null
          company: string | null
          status: ContactStatus
          replied_by: string | null
          replied_at: string | null
          admin_notes: string | null
          ip_address: string | null
          user_agent: string | null
          utm_source: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          subject?: string | null
          message: string
          phone?: string | null
          company?: string | null
          status?: ContactStatus
          replied_by?: string | null
          replied_at?: string | null
          admin_notes?: string | null
          ip_address?: string | null
          user_agent?: string | null
          utm_source?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          subject?: string | null
          message?: string
          phone?: string | null
          company?: string | null
          status?: ContactStatus
          replied_by?: string | null
          replied_at?: string | null
          admin_notes?: string | null
          ip_address?: string | null
          user_agent?: string | null
          utm_source?: string | null
          created_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          key: string
          value: Json
          description: string | null
          updated_by: string | null
          updated_at: string
        }
        Insert: {
          key: string
          value: Json
          description?: string | null
          updated_by?: string | null
          updated_at?: string
        }
        Update: {
          key?: string
          value?: Json
          description?: string | null
          updated_by?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      app_role: AppRole
      subscription_tier: SubscriptionTier
      subscription_status: SubscriptionStatus
      call_urgency: CallUrgency
      sentiment_label: SentimentLabel
      booking_status: BookingStatus
      two_factor_method: TwoFactorMethod
    }
  }
}
