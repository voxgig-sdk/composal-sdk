import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { RunArtifact, RunArtifactListMatch, RunArtifactCreateData } from '../ComposalTypes';
declare class RunArtifactEntity extends ComposalEntityBase<RunArtifact> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: RunArtifactEntity): RunArtifactEntity;
    list(this: any, reqmatch?: RunArtifactListMatch, ctrl?: Control): Promise<RunArtifactEntity[]>;
    create(this: any, reqdata?: RunArtifactCreateData, ctrl?: Control): Promise<RunArtifactEntity>;
}
export { RunArtifactEntity };
