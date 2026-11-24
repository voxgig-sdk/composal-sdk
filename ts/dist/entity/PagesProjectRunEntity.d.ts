import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { PagesProjectRun, PagesProjectRunListMatch } from '../ComposalTypes';
declare class PagesProjectRunEntity extends ComposalEntityBase<PagesProjectRun> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: PagesProjectRunEntity): PagesProjectRunEntity;
    list(this: any, reqmatch?: PagesProjectRunListMatch, ctrl?: Control): Promise<PagesProjectRunEntity[]>;
}
export { PagesProjectRunEntity };
