import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { SwarmTask, SwarmTaskLoadMatch, SwarmTaskListMatch } from '../ComposalTypes';
declare class SwarmTaskEntity extends ComposalEntityBase<SwarmTask> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: SwarmTaskEntity): SwarmTaskEntity;
    load(this: any, reqmatch?: SwarmTaskLoadMatch, ctrl?: Control): Promise<SwarmTaskEntity>;
    list(this: any, reqmatch?: SwarmTaskListMatch, ctrl?: Control): Promise<SwarmTaskEntity[]>;
}
export { SwarmTaskEntity };
