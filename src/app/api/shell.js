const execSync = require('child_process').execSync;

export function runShellCommand(command){
  const output = execSync(command, { encoding: 'utf-8' });
  return output
}