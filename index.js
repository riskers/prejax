#!/usr/bin/env node

const path = require('path')
const shell = require('shelljs')
const colors = require('colors')
const packageJson = path.resolve(process.cwd(), 'package.json')
const jaxBranches = require(packageJson).jaxBranches || ['master']

// check git
if (!shell.which('git')) {
  shell.echo(colors.red('==========='))
  shell.echo(colors.red('Sorry, this script requires git'));
  shell.echo(colors.red('==========='))
  shell.exit(1);
}

shell.exec(`git branch | grep -e "^*" | cut -d' ' -f 2`, {silent: true, async: true}, (code, stdout, stderr) => {
  let localBranch = stdout.trim()

  // check branch name
  let checkName = jaxBranches.some(branch => {
    return branch === localBranch
  })
  if(!checkName) {
    shell.echo(colors.red('==========='))
    shell.echo(colors.red('branch is not allowed'))
    shell.echo(colors.red('please check again'))
    shell.echo(colors.red('==========='))
    shell.exit(1)
  }

  // check diff local branch and origin branch
  shell.exec(`git diff --name-status ${localBranch} origin/${localBranch}`, {silent: true, async: true}, (code, stdout, stderr) => {
    /**
     * stdout !== null: have diffences
     * stderr == null: origin branch may be inexist
     */
    // console.log(stderr)
    // console.log(stdout)
    if(stderr) {
      shell.echo(colors.red('==========='))
      shell.echo(colors.red('branch error!'))
      shell.echo(colors.red(`please check origin/${localBranch}!`))
      shell.echo(colors.red('==========='))
      shell.exit(1)
    }
    if(stdout) {
      shell.echo(colors.red('==========='))
      shell.echo(colors.red('local branch is not latest code'))
      shell.echo(colors.red(`please update your code from origin/${localBranch}!`))
      shell.echo(colors.red('==========='))
      shell.exit(1)
    }
  })

});
