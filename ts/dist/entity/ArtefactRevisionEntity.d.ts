import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ArtefactRevision, ArtefactRevisionCreateData } from '../ComposalTypes';
declare class ArtefactRevisionEntity extends ComposalEntityBase<ArtefactRevision> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ArtefactRevisionEntity): ArtefactRevisionEntity;
    create(this: any, reqdata?: ArtefactRevisionCreateData, ctrl?: Control): Promise<ArtefactRevisionEntity>;
}
export { ArtefactRevisionEntity };
