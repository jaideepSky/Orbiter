#!/usr/bin/env node

import dotenv from "dotenv";
import chalk from "chalk"
import figlet from "figlet"

import {Command} from "commander";
import { login, logout, whoami } from "./commands/auth/login.ts";
// import { wakeUp } from "./commands/ai/wakeUp.js";

import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});

async function main() {
    //Display Banner
    console.log(
        chalk.cyan(
            figlet.textSync("Orbital CLI" , {
                font:"Standard",
                horizontalLayout:"default"
            })
        )
    ) 

    console.log(chalk.red("A cli based AI Tool \n"))

    const program = new Command("orbiter");

    program.version("0.0.1")
    .description("Orbital CLI - A Cli Based AI Tool")
    .addCommand(login)
    .addCommand(logout)
    .addCommand(whoami)
    // .addCommand(wakeUp)
      // Default action shows help
  program.action(() => {
    program.help();
  });


  program.parse()
}

main().catch((err)=>{
    console.log(chalk.red("Error running orbital CLI:") , err)
    process.exit(1)
})