const shell = process.env.SHELL || process.env.ComSpec || '';
const isGitBash = shell.includes('bash.exe') && shell.includes('Git');

if (!isGitBash) {
  console.error('❌ This script must be run in Git Bash.');
  process.exit(1);
}