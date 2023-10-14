  import { createClient } from '@supabase/supabase-js'

  // export const supabase = createClient('https://yjhsrffxabacqsjjpbtj.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqaHNyZmZ4YWJhY3FzampwYnRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI0MTMwODAsImV4cCI6MjAwNzk4OTA4MH0.kVTxTkuAyt0vMvYNEkc8v4D0lcTBBusgWVRbRT4cPA0')
  

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
  
  export const supabase = createClient(supabaseUrl, supabaseAnonKey)