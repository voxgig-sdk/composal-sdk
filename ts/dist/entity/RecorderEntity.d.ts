import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { Recorder, RecorderLoadMatch } from '../ComposalTypes';
declare class RecorderEntity extends ComposalEntityBase<Recorder> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: RecorderEntity): RecorderEntity;
    load(this: any, reqmatch?: RecorderLoadMatch, ctrl?: Control): Promise<RecorderEntity>;
}
export { RecorderEntity };
