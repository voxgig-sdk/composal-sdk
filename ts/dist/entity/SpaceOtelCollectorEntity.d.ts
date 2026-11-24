import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { SpaceOtelCollector, SpaceOtelCollectorLoadMatch, SpaceOtelCollectorCreateData, SpaceOtelCollectorUpdateData, SpaceOtelCollectorPatchData, SpaceOtelCollectorRemoveMatch } from '../ComposalTypes';
declare class SpaceOtelCollectorEntity extends ComposalEntityBase<SpaceOtelCollector> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: SpaceOtelCollectorEntity): SpaceOtelCollectorEntity;
    load(this: any, reqmatch?: SpaceOtelCollectorLoadMatch, ctrl?: Control): Promise<SpaceOtelCollectorEntity>;
    create(this: any, reqdata?: SpaceOtelCollectorCreateData, ctrl?: Control): Promise<SpaceOtelCollectorEntity>;
    update(this: any, reqdata?: SpaceOtelCollectorUpdateData, ctrl?: Control): Promise<SpaceOtelCollectorEntity>;
    patch(this: any, reqdata?: SpaceOtelCollectorPatchData, ctrl?: Control): Promise<SpaceOtelCollectorEntity>;
    remove(this: any, reqmatch?: SpaceOtelCollectorRemoveMatch, ctrl?: Control): Promise<SpaceOtelCollectorEntity>;
}
export { SpaceOtelCollectorEntity };
