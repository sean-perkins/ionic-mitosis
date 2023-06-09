import compileCommand from "@builder.io/mitosis-cli/dist/commands/compile.js";
import commandLineArgs from "command-line-args";
import fs from "fs-extra";
import postcss from "postcss";
import glob from "glob";
import path from "path";
import ora from "ora";
import filesystemTools from "gluegun/filesystem.js";
import printTools from "gluegun/print.js";
import stringTools from "gluegun/strings.js";

const DEFAULT_OPTIONS = {
  elements: "src/**/*.lite.tsx",
  dest: "packages",
  target: "",
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

  options.isDev = true; // !!cliConfig.dev;

  const spinner = ora("Compiling").start();
  const files = cliConfig.elements
    ? options.elements
    : glob.sync(options.elements);
  const outPath = `${options.dest}/${options.target}`;

  function copyBasicFilesOnFirstCompilation(isFirstCompilation) {
    if (!isFirstCompilation) {
      return;
    }

    // Move src to all the package folder
    fs.copySync("src", `${outPath}/src`);

    // Remove unnecessary files moved
    const unnecessaryFiles = glob.sync(`${outPath}/src/**/*.{mdx,lite.tsx}`);
    unnecessaryFiles.forEach((element) => fs.removeSync(element));
  }

  async function compileCssFileForOutputSrc(outFile) {
    const postcssConfig = (await import("../postcss.config.cjs")).default;

    const name = outFile.replace(/\..*/, ".css");
    const data = fs.readFileSync(name, "utf8");
    const result = await postcss(postcssConfig.plugins).process(data, {
      from: name,
      to: name,
    });
    fs.writeFileSync(name, result.css, () => true);
  }

  async function compileMitosisComponent(filepath) {
    const file = path.parse(filepath);
    const outFile = `${outPath}/${file.dir}/${file.name.replace(".lite", "")}.${
      options.extension
    }`;

    let to =
      options.target === "webcomponents" ? "webcomponent" : options.target;
    to = to === "vue" ? "vue3" : to;

    await compileCommand.run({
      parameters: {
        options: {
          from: "mitosis",
          to,
          out: outFile,
          force: true,
          api: options.api,
          state: options.state,
          styles: options.styles,
        },
        array: [filepath],
      },
      strings: stringTools.strings,
      filesystem: filesystemTools.filesystem,
      print: { ...printTools.print, info: () => null },
    });

    return {
      outFile,
    };
  }

  for (const fileName of files) {
    // const file = path.parse(fileName);
    const isFirstCompilation =
      !fs.existsSync(`${outPath}/src`) || options.isDev;
    // const name = file.name.replace(".lite", "");
    // const namePascal = pascalName(name);

    spinner.text = fileName;

    copyBasicFilesOnFirstCompilation(isFirstCompilation, fileName);
    const { outFile } = await compileMitosisComponent(fileName);
    // replacePropertiesFromCompiledFiles(outFile);
    // options.customReplace({ name, pascalName: namePascal, file, outFile, outPath, isFirstCompilation });
    await compileCssFileForOutputSrc(outFile);

    spinner.stop();
  }
}

export default {
  compile,
};
