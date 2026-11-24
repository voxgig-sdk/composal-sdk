import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { WorkspaceSpacePreference, WorkspaceSpacePreferenceUpdateData } from '../ComposalTypes';
declare class WorkspaceSpacePreferenceEntity extends ComposalEntityBase<WorkspaceSpacePreference> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: WorkspaceSpacePreferenceEntity): WorkspaceSpacePreferenceEntity;
    update(this: any, reqdata?: WorkspaceSpacePreferenceUpdateData, ctrl?: Control): Promise<WorkspaceSpacePreferenceEntity>;
}
export { WorkspaceSpacePreferenceEntity };
