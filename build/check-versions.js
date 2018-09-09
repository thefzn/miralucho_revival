const chalk = require('chalk');
const semver = require('semver');
const shell = require('shelljs');
const exec = require('child_process');

const packageConfig = require('../package.json');

function execW(cmd) {
    return exec.execSync(cmd).toString().trim();
}

const versionRequirements = [
    {
        name: 'node',
        currentVersion: semver.clean(process.version),
        versionRequirement: packageConfig.engines.node,
    },
];

if (shell.which('npm')) {
    versionRequirements.push({
        name: 'npm',
        currentVersion: execW('npm --version'),
        versionRequirement: packageConfig.engines.npm,
    });
}

const warnings = [];
for (let i = 0; i < versionRequirements.length; i + 1) {
    const mod = versionRequirements[i];
    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
        warnings.push(`${mod.name}: ${chalk.red(mod.currentVersion)} should be ${chalk.green(mod.versionRequirement)}`);
    }
}

if (warnings.length) {
    console.log('');
    console.log(chalk.yellow('To use this template, you must update following to modules:'));
    console.log();
    for (let i = 0, warning; i < warnings.length; i + 1) {
        warning = warnings[i];
        console.log(` ${warning}`);
    }
    console.log();
    process.exit(1);
}
