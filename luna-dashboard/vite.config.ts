import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// @ts-ignore
import viteJsconfigPaths from "vite-jsconfig-paths";
import svgrPlugin from "vite-plugin-svgr";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteJsconfigPaths(), svgrPlugin(), nodePolyfills()],
});