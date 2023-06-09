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

  async function copyScssThemeFiles() {
    const scssFiles = glob.sync("src/**/*.scss");

    scssFiles.forEach((file) => {
      const fileParsed = path.parse(file);
      const dir = `${outPath}/${fileParsed.dir}`;
      const name = `${dir}/${fileParsed.base}`;

      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      fs.copyFileSync(file, name);
    });
  }

  async function compileScssFiles() {
    const postcssConfig = (await import("../postcss.config.cjs")).default;
    const cssFiles = glob.sync("src/elements/**/*.scss");

    for (const file of cssFiles) {
      const fileParsed = path.parse(file);
      const name = `${outPath}/${fileParsed.dir}/${fileParsed.base}`;

      fs.copyFileSync(file, name);

      const data = fs.readFileSync(name, "utf8");

      console.log("reading file: ", name);

      const result = await postcss(postcssConfig.plugins).process(data, {
        from: name,
        to: name,
        parser: postcssConfig.parser,
      });

      console.log("attempting to write to", name);
      fs.writeFileSync(name, result.css, () => true);
    }
  }

  for (const fileName of files) {
    spinner.text = fileName;

    await copyScssThemeFiles();

    await compileScssFiles();

    spinner.stop();
  }
}

export default {
  compile,
};
