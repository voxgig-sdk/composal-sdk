import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { Integration, IntegrationListMatch } from '../ComposalTypes';
declare class IntegrationEntity extends ComposalEntityBase<Integration> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: IntegrationEntity): IntegrationEntity;
    list(this: any, reqmatch?: IntegrationListMatch, ctrl?: Control): Promise<IntegrationEntity[]>;
}
export { IntegrationEntity };
