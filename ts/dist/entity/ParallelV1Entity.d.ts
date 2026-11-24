import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ParallelV1, ParallelV1CreateData } from '../ComposalTypes';
declare class ParallelV1Entity extends ComposalEntityBase<ParallelV1> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ParallelV1Entity): ParallelV1Entity;
    create(this: any, reqdata?: ParallelV1CreateData, ctrl?: Control): Promise<ParallelV1Entity>;
}
export { ParallelV1Entity };
