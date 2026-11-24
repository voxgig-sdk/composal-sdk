import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { BrowserSessionScreenshot, BrowserSessionScreenshotCreateData } from '../ComposalTypes';
declare class BrowserSessionScreenshotEntity extends ComposalEntityBase<BrowserSessionScreenshot> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: BrowserSessionScreenshotEntity): BrowserSessionScreenshotEntity;
    create(this: any, reqdata?: BrowserSessionScreenshotCreateData, ctrl?: Control): Promise<BrowserSessionScreenshotEntity>;
}
export { BrowserSessionScreenshotEntity };
