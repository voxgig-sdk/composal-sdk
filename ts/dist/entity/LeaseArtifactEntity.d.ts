import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { LeaseArtifact, LeaseArtifactCreateData } from '../ComposalTypes';
declare class LeaseArtifactEntity extends ComposalEntityBase<LeaseArtifact> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: LeaseArtifactEntity): LeaseArtifactEntity;
    create(this: any, reqdata?: LeaseArtifactCreateData, ctrl?: Control): Promise<LeaseArtifactEntity>;
}
export { LeaseArtifactEntity };
