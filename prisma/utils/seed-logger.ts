import chalk from "chalk";

export const seedLogger = {
  info: (msg: string) => console.log(chalk.blue("[INFO]"), msg),
  success: (msg: string) => console.log(chalk.green("[SUCCESS]"), msg),
  warn: (msg: string) => console.log(chalk.yellow("[WARN]"), msg),
  error: (msg: string) => console.log(chalk.red("[ERROR]"), msg),
  step: (step: number, total: number, msg: string) =>
    console.log(chalk.cyan(`[${step}/${total}]`), msg),
  table: (name: string, count: number) =>
    console.log(chalk.gray("  →"), `${name}:`, chalk.white(count), "records"),
  divider: () => console.log(chalk.gray("─".repeat(50))),
  header: (title: string) => {
    console.log();
    console.log(chalk.bgBlue.white(` 🌱 ${title} `));
    console.log();
  },
  section: (name: string) => {
    console.log();
    console.log(chalk.cyan.bold(`▶ ${name}`));
    console.log(chalk.gray("─".repeat(40)));
  },
  start: (name: string) => {
    console.log();
    console.log(chalk.bgBlue.white(` 🌱 ${name} `));
    console.log();
  },
  done: (duration: number) => {
    console.log();
    console.log(chalk.bgGreen.black(` ✓ Seed completed in ${duration}ms `));
    console.log();
  },
};

export default seedLogger;
