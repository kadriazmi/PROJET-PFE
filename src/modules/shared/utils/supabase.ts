//@ts-ignore
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://ubjozfideufsivqozjqy.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InViam96ZmlkZXVmc2l2cW96anF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyOTIwNzUsImV4cCI6MjA1OTg2ODA3NX0.qaqXILwEDBAL_Uv3etwm0ENrjFUku8U3Uve0RPCmh5I'
)
export { supabase }
