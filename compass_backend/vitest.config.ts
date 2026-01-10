import { defineConfig } from "vitest/config";
import path from "path";
import { config } from "dotenv";

// Load .env.test file
config({ path: ".env.test" });

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.test.ts"],
    testTimeout: 10000,
    hookTimeout: 300000,
    fileParallelism: false,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "dist/",
        "src/test/",
        "**/*.d.ts",
        "**/*.config.*",
        "**/seed/**"
      ]
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
});
