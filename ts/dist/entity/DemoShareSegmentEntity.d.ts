import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { DemoShareSegment, DemoShareSegmentLoadMatch } from '../ComposalTypes';
declare class DemoShareSegmentEntity extends ComposalEntityBase<DemoShareSegment> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: DemoShareSegmentEntity): DemoShareSegmentEntity;
    load(this: any, reqmatch?: DemoShareSegmentLoadMatch, ctrl?: Control): Promise<DemoShareSegmentEntity>;
}
export { DemoShareSegmentEntity };
