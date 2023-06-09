import commandLineArgs from "command-line-args";
import fs from "fs-extra";
import postcss from "postcss";
import glob from "glob";
import path from "path";
import ora from "ora";

const DEFAULT_OPTIONS = {
  elements: "src/**/*.lite.tsx",
  dest: "packages",
  options: {},
  target: "",
  extension: "",
  state: "",
  api: "",
  styles: "",
  customReplace: (outFile, isFirstCompilation) => null,
};

const optionDefinitions = [
  { name: "elements", alias: "e", type: String, multiple: true },
  { name: "dev", type: Boolean },
];

async function compile(defaultOptions) {
  const options = {
    ...DEFAULT_OPTIONS,
    ...defaultOptions,
  };

  const cliConfig = commandLineArgs(optionDefinitions);
  options.elements = cliConfig.elements
    ? cliConfig.elements
        .map((file) => glob.sync(`src/**/${file}/${file}.lite.tsx`))
        .flat()
    : options.elements;

  options.isDev = !!cliConfig.dev;

  const spinner = ora("Compiling").start();
  const files = cliConfig.elements
    ? options.elements
    : glob.sync(options.elements);
  const outPath = `${options.dest}/${options.target}`;

  async function compileCssFiles() {
    const postcssConfig = (await import("../postcss.config.cjs")).default;
    // Copy all css files from the src folder to the output folder
    const cssFiles = glob.sync("src/**/*.css");

    for (const file of cssFiles) {
      const fileParsed = path.parse(file);
      const name = `${outPath}/${fileParsed.dir}/${fileParsed.base}`;

      const data = fs.readFileSync(file, "utf8");
      const result = await postcss(postcssConfig.plugins).process(data, {
        from: name,
        to: name,
      });
      console.log("copying file: ", file, "to: ", name);
      fs.writeFileSync(name, result.css, () => true);
    }
  }

  for (const fileName of files) {
    spinner.text = fileName;

    await compileCssFiles();

    spinner.stop();
  }
}

export default {
  compile,
};
