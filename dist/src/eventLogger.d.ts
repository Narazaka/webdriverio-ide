/// <reference types="webdriverio" />
import { Client } from "webdriverio";
export declare function endLogging(): void;
export interface WebdriverIOCommand {
    method: keyof Client<void>;
    args: any[];
    timeStamp?: number;
    element?: number[];
}
