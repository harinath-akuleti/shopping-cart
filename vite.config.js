// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   base: "/", // Make sure this is correct
// });
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/", // Ensure this is correct for your deployment
  build: {
    outDir: "dist", // Directory for built files
  },
  server: {
    open: true, // Automatically open the app in the browser
  },
  resolve: {
    alias: {
      // Add aliases if needed
    },
  },
});
