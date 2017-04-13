/// <reference types="mocha" />
/// <reference types="webdriverio" />

import * as assert from "power-assert";

import {playEvent} from "../src/playEvent";

describe("basic", () => {
  it("ok", () => {
    browser.timeoutsImplicitWait(300);
    browser.url("/");
    playEvent(browser, [
      {method: "pause", args: [1000]},
      {method: "keys", args: [["Control", "a"]]},
      {method: "pause", args: [1000]},
      {method: "moveTo", args: ["html", 150, 150], element: [0]},
      {method: "pause", args: [100]},
      {method: "buttonDown", args: [0]},
      {method: "pause", args: [80]},
      {method: "buttonUp", args: [0]},
      {method: "pause", args: [2000]},
      {method: "moveTo", args: ["html", 15, 15], element: [0]},
      {method: "pause", args: [1000]},
      {method: "buttonDown", args: [0]},
      {method: "pause", args: [80]},
      {method: "buttonUp", args: [0]},
      {method: "pause", args: [3000]},
    ]);
    assert(1);
  });
});
