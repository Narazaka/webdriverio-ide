import {Client} from "webdriverio";

const eventNames = [
  "click",
  "dblclick",
  "keydown",
  "keypress",
  "keyup",
  "mousedown",
  "mousemove",
  "mouseup",
  "resize",
  "scroll",
  "wheel",
];

let stopEventLogger = false;
const eventLogs: Event[] = [];

function logEvent(event: Event) {
  if (stopEventLogger) return;
  eventLogs.push(event);
}

eventNames.forEach((eventName) => window.addEventListener(eventName, logEvent));

window.addEventListener("load", () => {
  const input = document.createElement("input");
  input.type = "button";
  input.value = "stop logging";
  input.addEventListener("click", endLogging);
  input.style.position = "absolute";
  input.style.right = "0";
  input.style.bottom = "0";
  input.style.zIndex = "9999";
  document.body.appendChild(input);
});

export function endLogging() {
  stopEventLogger = true;
  const commands = makeCommands();
  const textarea = document.createElement("textarea");
  const commandsJson = "[\n" + commands.map((command) => "  " + JSON.stringify(command)).join(",\n") + "\n]";
  textarea.value = commandsJson;
  textarea.style.position = "absolute";
  textarea.style.zIndex = "9999";
  textarea.style.width = "90%";
  textarea.style.height = "90%";
  textarea.style.left = "0";
  textarea.style.top = "0";
  document.body.appendChild(textarea);
}

export interface WebdriverIOCommand {
  method: keyof Client<void>;
  args: any[];
  timeStamp?: number;
  element?: number[];
}

function makeCommands() {
  const commands: WebdriverIOCommand[] = [];
  let lastTimeStamp = 0;
  for (const event of eventLogs) {
    commands.push({method: "pause", args: [event.timeStamp - lastTimeStamp]});
    lastTimeStamp = event.timeStamp;
    if (event instanceof MouseEvent) {
      if (event.type === "mousedown") {
        commands.push({timeStamp: event.timeStamp, method: "buttonDown", args: [event.button]});
      } else if (event.type === "mouseup") {
        commands.push({timeStamp: event.timeStamp, method: "buttonUp", args: [event.button]});
      } else if (event.type === "mousemove") {
        commands.push({timeStamp: event.timeStamp, method: "moveTo", args: ["html", event.x, event.y], element: [0]});
      }
    } else if (event instanceof KeyboardEvent && event.type === "keypress") {
      const keys = [];
      if (event.altKey) keys.push("Alt");
      if (event.ctrlKey) keys.push("Control");
      if (event.metaKey) keys.push("Meta");
      if (event.shiftKey) keys.push("Shift");
      keys.push(event.key);
      commands.push({timeStamp: event.timeStamp, method: "keys", args: [keys]});
    }
  }
  return commands;
}
