import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { RuntimeInstanceHealthSnapshot, RuntimeInstanceHealthSnapshotLoadMatch, RuntimeInstanceHealthSnapshotCreateData } from '../ComposalTypes';
declare class RuntimeInstanceHealthSnapshotEntity extends ComposalEntityBase<RuntimeInstanceHealthSnapshot> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: RuntimeInstanceHealthSnapshotEntity): RuntimeInstanceHealthSnapshotEntity;
    load(this: any, reqmatch?: RuntimeInstanceHealthSnapshotLoadMatch, ctrl?: Control): Promise<RuntimeInstanceHealthSnapshotEntity>;
    create(this: any, reqdata?: RuntimeInstanceHealthSnapshotCreateData, ctrl?: Control): Promise<RuntimeInstanceHealthSnapshotEntity>;
}
export { RuntimeInstanceHealthSnapshotEntity };
