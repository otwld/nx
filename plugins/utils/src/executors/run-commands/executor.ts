import { RunCommandsExecutorSchema } from './schema';
import { ExecutorContext } from '@nx/devkit';
import runCommands from 'nx/src/executors/run-commands/run-commands.impl';
import { interpolateObject } from '@otwld/nx-devkit';

export default async function runExecutor(
  options: RunCommandsExecutorSchema,
  context?: ExecutorContext
) {
  if (!options.__unparsed__) {
    options.__unparsed__ = [];
  }
  process.env.PROJECT_NAME = context.projectName;
  options = interpolateObject(options);
  try {
    return await runCommands(options, context);
  } catch (e) {
    console.error(e);
    return {
      success: false,
    };
  }
}
