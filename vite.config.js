import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  env: {
    VITE_APP_APIKEY: "1a41e8d70acdb5409233b12ffd034306",
    VITE_APP_BASEURL: "https://api.themoviedb.org/3",
    VITE_APP_TOKEN:
      "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYTQxZThkNzBhY2RiNTQwOTIzM2IxMmZmZDAzNDMwNiIsInN1YiI6IjY0MTU2YmU4MGQ1ZDg1MDA5YmExNmYzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IPQlJPPf7zlrHRdXWsm5YrR4gDr1Bax1mkXq4h1szLI",
  },
});
