export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss"],
  css: ["@/assets/css/tailwind.css"],

  typescript: {
    strict: true,
  },

  compatibilityDate: "2024-10-01",
});
