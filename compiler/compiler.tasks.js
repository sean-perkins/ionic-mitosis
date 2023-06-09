import commandLineArgs from "command-line-args";
import { Listr } from "listr2";
import { execaCommand } from "execa";

const optionDefinitions = [
  {
    name: "platforms",
    alias: "p",
    type: String,
    multiple: true,
    defaultValue: ["angular", "react", "vue"],
  },
  { name: "dev", type: Boolean },
];

(async () => {
  const cliConfig = commandLineArgs(optionDefinitions);
  cliConfig.lint = cliConfig.lint && !cliConfig["no-lint"];

  const tasks = new Listr([
    {
      title: "Pretasks",
      task: () => {},
    },
    {
      title: "Compile Mitosis Elements",
      task: () => {
        return new Listr([
          {
            task: () =>
              execaCommand("npm run build").catch((error) => {
                throw new Error(
                  `Error compiling Mitosis Elements: ${error.message}`
                );
              }),
          },
          ...cliConfig.platforms.map((platform) => ({
            title: `Compile ${platform} Elements`,
            task: () =>
              execaCommand(
                `node ./compiler/platforms/${platform} ${
                  cliConfig.elements
                    ? `--elements ${cliConfig.elements.join(" ")}`
                    : ""
                }`
              ).catch((error) => {
                throw new Error(`Error compiling ${platform} ${error.message}`);
              }),
          })),
        ]);
      },
    },
    {
      title: "Compile Framework Components",
      task: () => {
        return new Listr(
          cliConfig.platforms.map((platform) => ({
            title: `Compile @ionic/${platform}`,
            task: () =>
              execaCommand(
                `npx turbo run build --filter=@ionic/${platform} --force`
              ).catch((error) => {
                throw new Error(`Error compiling ${platform} ${error.message}`);
              }),
          })),
          { concurrent: true }
        );
      },
    },
  ]);

  tasks.run().catch((err) => {
    console.error(err);
  });
})();
