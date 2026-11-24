import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { BrowserSessionRecording, BrowserSessionRecordingCreateData } from '../ComposalTypes';
declare class BrowserSessionRecordingEntity extends ComposalEntityBase<BrowserSessionRecording> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: BrowserSessionRecordingEntity): BrowserSessionRecordingEntity;
    create(this: any, reqdata?: BrowserSessionRecordingCreateData, ctrl?: Control): Promise<BrowserSessionRecordingEntity>;
}
export { BrowserSessionRecordingEntity };
