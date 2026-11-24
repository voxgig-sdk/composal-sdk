import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { CloudWorkspaceBackupObject, CloudWorkspaceBackupObjectLoadMatch } from '../ComposalTypes';
declare class CloudWorkspaceBackupObjectEntity extends ComposalEntityBase<CloudWorkspaceBackupObject> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: CloudWorkspaceBackupObjectEntity): CloudWorkspaceBackupObjectEntity;
    load(this: any, reqmatch?: CloudWorkspaceBackupObjectLoadMatch, ctrl?: Control): Promise<CloudWorkspaceBackupObjectEntity>;
}
export { CloudWorkspaceBackupObjectEntity };
