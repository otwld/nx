import { RunCommandsExecutorSchema } from './schema';
import executor from './executor';
import { ExecutorContext } from '@nx/devkit';
import runCommands from 'nx/src/executors/run-commands/run-commands.impl';

jest.mock('nx/src/executors/run-commands/run-commands.impl');

process.env.TEST_KEY_001 = 'Hello World';

describe('RunCommands Executor', () => {
  it('should interpolate commands from environment', async () => {
    const options: RunCommandsExecutorSchema = {
      commands: ['echo Hello World ${TEST_KEY_001}'],
      parallel: false,
      __unparsed__: [],
    };

    const context: Partial<ExecutorContext> = {
      root: '.',
    };
    await executor(options, context as ExecutorContext);
    expect(runCommands).toHaveBeenCalledWith(
      expect.objectContaining({
        commands: expect.arrayContaining(['echo Hello World Hello World']),
      }),
      context
    );
  });
  it('should interpolate projectName', async () => {
    const options: RunCommandsExecutorSchema = {
      commands: ['echo Hello World ${PROJECT_NAME}'],
      parallel: false,
      __unparsed__: [],
    };

    const context: Partial<ExecutorContext> = {
      root: '.',
      projectName: 'projectExample',
    };
    await executor(options, context as ExecutorContext);
    expect(runCommands).toHaveBeenCalledWith(
      expect.objectContaining({
        commands: expect.arrayContaining(['echo Hello World projectExample']),
      }),
      context
    );
  });
});
