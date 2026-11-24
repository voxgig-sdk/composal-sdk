import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { RuntimeInstanceHealthSnapshot, RuntimeInstanceHealthSnapshotListMatch, RuntimeInstanceHealthSnapshotCreateData } from '../ComposalTypes';
declare class RuntimeInstanceHealthSnapshotEntity extends ComposalEntityBase<RuntimeInstanceHealthSnapshot> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: RuntimeInstanceHealthSnapshotEntity): RuntimeInstanceHealthSnapshotEntity;
    list(this: any, reqmatch?: RuntimeInstanceHealthSnapshotListMatch, ctrl?: Control): Promise<RuntimeInstanceHealthSnapshotEntity[]>;
    create(this: any, reqdata?: RuntimeInstanceHealthSnapshotCreateData, ctrl?: Control): Promise<RuntimeInstanceHealthSnapshotEntity>;
}
export { RuntimeInstanceHealthSnapshotEntity };
