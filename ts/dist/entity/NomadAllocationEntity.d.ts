import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { NomadAllocation, NomadAllocationLoadMatch } from '../ComposalTypes';
declare class NomadAllocationEntity extends ComposalEntityBase<NomadAllocation> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: NomadAllocationEntity): NomadAllocationEntity;
    load(this: any, reqmatch?: NomadAllocationLoadMatch, ctrl?: Control): Promise<NomadAllocationEntity>;
}
export { NomadAllocationEntity };
