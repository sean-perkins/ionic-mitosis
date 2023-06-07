/** @type {import('@builder.io/mitosis').MitosisConfig} */
module.exports = {
  files: "src/**",
  targets: ["vue3", "angular", "svelte", "react"],
  dest: "packages",
  options: {
    react: {
      typescript: true,
    },
    angular: {
      typescript: true,
    },
    vue3: {
      typescript: true,
    },
  },
};
