import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
const supabase = createClient(
  "https://zglbfzrucwtobuqvlhpi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpnbGJmenJ1Y3d0b2J1cXZsaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMzMDM0MTcsImV4cCI6MjAzODg3OTQxN30.IHqZOxX2C-0tg1BgNMcuNbAHx0H2y3GPeM6SEp1bHD0"
);
export default supabase;
