//@ts-ignore
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://ealdbhbrluokeccuohum.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVhbGRiaGJybHVva2VjY3VvaHVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgxNzYzNDgsImV4cCI6MjAyMzc1MjM0OH0.GvL-VyEi8NgSBrkvCk1ZDZW0viys19pjKg1aGjhKRyU'
)
export { supabase }
