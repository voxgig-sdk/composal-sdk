import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { Integration, IntegrationLoadMatch } from '../ComposalTypes';
declare class IntegrationEntity extends ComposalEntityBase<Integration> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: IntegrationEntity): IntegrationEntity;
    load(this: any, reqmatch?: IntegrationLoadMatch, ctrl?: Control): Promise<IntegrationEntity>;
}
export { IntegrationEntity };
