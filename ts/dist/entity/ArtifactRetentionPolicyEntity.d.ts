import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ArtifactRetentionPolicy, ArtifactRetentionPolicyLoadMatch, ArtifactRetentionPolicyListMatch, ArtifactRetentionPolicyCreateData, ArtifactRetentionPolicyUpdateData, ArtifactRetentionPolicyPatchData, ArtifactRetentionPolicyRemoveMatch } from '../ComposalTypes';
declare class ArtifactRetentionPolicyEntity extends ComposalEntityBase<ArtifactRetentionPolicy> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ArtifactRetentionPolicyEntity): ArtifactRetentionPolicyEntity;
    load(this: any, reqmatch?: ArtifactRetentionPolicyLoadMatch, ctrl?: Control): Promise<ArtifactRetentionPolicyEntity>;
    list(this: any, reqmatch?: ArtifactRetentionPolicyListMatch, ctrl?: Control): Promise<ArtifactRetentionPolicyEntity[]>;
    create(this: any, reqdata?: ArtifactRetentionPolicyCreateData, ctrl?: Control): Promise<ArtifactRetentionPolicyEntity>;
    update(this: any, reqdata?: ArtifactRetentionPolicyUpdateData, ctrl?: Control): Promise<ArtifactRetentionPolicyEntity>;
    patch(this: any, reqdata?: ArtifactRetentionPolicyPatchData, ctrl?: Control): Promise<ArtifactRetentionPolicyEntity>;
    remove(this: any, reqmatch?: ArtifactRetentionPolicyRemoveMatch, ctrl?: Control): Promise<ArtifactRetentionPolicyEntity>;
}
export { ArtifactRetentionPolicyEntity };
