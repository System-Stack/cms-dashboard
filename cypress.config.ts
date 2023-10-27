import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "cypress-ct-qwik" as any,
      bundler: "vite",
    },
  },

  e2e: {
    baseUrl: 'http://localhost:5173',
    setupNodeEvents(on) { //(on, config)
      on('task', {
        log(message) {
          console.log(message)

          return null
        },
      })
    },
  },
});
