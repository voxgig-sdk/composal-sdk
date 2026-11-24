import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ArtefactViewToken, ArtefactViewTokenCreateData } from '../ComposalTypes';
declare class ArtefactViewTokenEntity extends ComposalEntityBase<ArtefactViewToken> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ArtefactViewTokenEntity): ArtefactViewTokenEntity;
    create(this: any, reqdata?: ArtefactViewTokenCreateData, ctrl?: Control): Promise<ArtefactViewTokenEntity>;
}
export { ArtefactViewTokenEntity };
