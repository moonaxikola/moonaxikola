import {
  formatFiles,
  generateFiles,
  names,
  Tree,
  getProjects,
  joinPathFragments,
  logger,
  applyChangesToString,
  StringChange,
  ChangeType,
  moveFilesToNewDirectory,
} from '@nrwl/devkit';
import ts from 'typescript';
import { findNodes } from '@nrwl/workspace/src/utilities/typescript/find-nodes';

import { Schema } from './schema';

interface NormalizedSchema extends Schema {
  projectRoot: string;
  fileName: string;
}

async function normalizeOptions(host: Tree, options: Schema): Promise<NormalizedSchema> {
  assertValidOptions(options);

  const { className: fileName } = names(options.name);
  const project = getProjects(host).get(options.project);

  if (!project) {
    logger.error(`Cannot find the ${options.project} project. Please double check the project name.`);
    throw new Error();
  }

  const { sourceRoot: projectRoot } = project;

  const directory = await getDirectory(host, options);

  return { ...options, directory, fileName, projectRoot };
}

function createComponentFiles(host: Tree, options: NormalizedSchema) {
  const componentDir = joinPathFragments(options.projectRoot, 'components', options.directory);

  generateFiles(host, joinPathFragments(__dirname, './files'), componentDir, {
    ...options,
    template: '',
  });

  moveFilesToNewDirectory(host, joinPathFragments(componentDir, './src'), componentDir);
}

function addImport(source: ts.SourceFile, statement: string): StringChange[] {
  const allImports = findNodes(source, ts.SyntaxKind.ImportDeclaration);
  if (allImports.length > 0) {
    const lastImport = allImports[allImports.length - 1];
    return [
      {
        type: ChangeType.Insert,
        index: lastImport.end + 1,
        text: `\n${statement}\n`,
      },
    ];
  } else {
    return [
      {
        type: ChangeType.Insert,
        index: 0,
        text: `\n${statement}\n`,
      },
    ];
  }
}

function addExportsToBarrel(host: Tree, options: NormalizedSchema) {
  const workspace = getProjects(host);
  const isApp = workspace.get(options.project).projectType === 'application';

  if (!isApp) {
    const indexFilePath = joinPathFragments(
      options.projectRoot,
      'components',
      options.directory.replace(options.fileName, ''),
      'index.ts',
    );
    const indexSource = host.read(indexFilePath, 'utf-8');
    if (indexSource !== null) {
      const indexSourceFile = ts.createSourceFile(indexFilePath, indexSource, ts.ScriptTarget.Latest, true);
      const changes = applyChangesToString(
        indexSource,
        addImport(indexSourceFile, `export * from './${options.fileName}';`),
      );
      host.write(indexFilePath, changes);
    }
  }
}

async function getDirectory(host: Tree, options: Schema) {
  const { className: fileName } = names(options.name);
  const workspace = getProjects(host);
  let baseDir: string;
  if (options.directory) {
    baseDir = options.directory;
  } else {
    baseDir = workspace.get(options.project).projectType === 'application' ? 'app' : 'lib';
  }
  return joinPathFragments(baseDir, fileName);
}

function assertValidOptions(options: Schema) {
  const slashes = ['/', '\\'];
  slashes.forEach(s => {
    if (options.name.indexOf(s) !== -1) {
      const [name, ...rest] = options.name.split(s).reverse();
      let suggestion = rest.map(x => x.toLowerCase()).join(s);
      if (options.directory) {
        suggestion = `${options.directory}${s}${suggestion}`;
      }
      throw new Error(
        `Found "${s}" in the component name. Did you mean to use the --directory option (e.g. \`nx g @moona/react:component ${name} --directory ${suggestion}\`)?`,
      );
    }
  });
}

export default async function componentGenerator(host: Tree, schema: Schema) {
  const options = await normalizeOptions(host, schema);
  createComponentFiles(host, options);

  addExportsToBarrel(host, options);

  await formatFiles(host);
}
