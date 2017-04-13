/// <reference types="webdriverio" />
import { Client } from "webdriverio";
import { WebdriverIOCommand } from "./eventLogger";
export declare function playEvent(browser: Client<void>, commands: WebdriverIOCommand[]): void;
