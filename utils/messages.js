const chalk = require("chalk");

const messages = {
  success(str) {
    console.log(chalk.greenBright(`[✔️] ${str}`) + "\n");
  },

  error(str, err = null) {
    console.log(chalk.redBright(`[❌] ${str}`) + "\n");
    err && console.log(chalk.redBright(`[❌] Error message: ${err}`) + "\n");
  },

  warn(str) {
    console.log(chalk.yellowBright(`[⚠️] ${str}`) + "\n");
  },
};

module.exports = messages;
