import {Client} from "webdriverio";
import {WebdriverIOCommand} from "./eventLogger";

export function playEvent(browser: Client<void>, commands: WebdriverIOCommand[]) {
  for (const command of commands) {
    let args;
    if (command.element) {
      args = [];
      for (const arg of command.args) args.push(arg);
      for (const i of command.element) {
        args[i] = browser.element(args[i]);
      }
    } else {
      args = command.args;
    }
    (browser[command.method] as () => void).apply(browser, args);
  }
}
