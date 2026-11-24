import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { WorkspaceActivityNotification, WorkspaceActivityNotificationUpdateData } from '../ComposalTypes';
declare class WorkspaceActivityNotificationEntity extends ComposalEntityBase<WorkspaceActivityNotification> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: WorkspaceActivityNotificationEntity): WorkspaceActivityNotificationEntity;
    update(this: any, reqdata?: WorkspaceActivityNotificationUpdateData, ctrl?: Control): Promise<WorkspaceActivityNotificationEntity>;
}
export { WorkspaceActivityNotificationEntity };
