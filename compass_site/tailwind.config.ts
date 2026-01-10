import type { Config } from "tailwindcss";

const preset = require("../packages/ui/tailwind.preset");

const config: Config = {
  presets: [preset],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
    "../packages/ui/src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {}
  },
  plugins: []
};

export default config;
