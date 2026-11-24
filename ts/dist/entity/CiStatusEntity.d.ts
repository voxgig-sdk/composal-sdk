import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { CiStatus, CiStatusLoadMatch } from '../ComposalTypes';
declare class CiStatusEntity extends ComposalEntityBase<CiStatus> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: CiStatusEntity): CiStatusEntity;
    load(this: any, reqmatch?: CiStatusLoadMatch, ctrl?: Control): Promise<CiStatusEntity>;
}
export { CiStatusEntity };
