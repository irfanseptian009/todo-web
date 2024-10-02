export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss"],
  runtimeConfig: {
    public: {
      apiBaseUrl: "http://localhost:5000/api",
    },
  },
  css: ["@/assets/css/tailwind.css"],

  typescript: {
    strict: true,
  },

  compatibilityDate: "2024-10-01",
});
