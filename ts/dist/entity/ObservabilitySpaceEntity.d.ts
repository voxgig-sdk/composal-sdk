import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ObservabilitySpace, ObservabilitySpaceLoadMatch, ObservabilitySpaceCreateData, ObservabilitySpaceUpdateData, ObservabilitySpacePatchData, ObservabilitySpaceRemoveMatch } from '../ComposalTypes';
declare class ObservabilitySpaceEntity extends ComposalEntityBase<ObservabilitySpace> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ObservabilitySpaceEntity): ObservabilitySpaceEntity;
    load(this: any, reqmatch?: ObservabilitySpaceLoadMatch, ctrl?: Control): Promise<ObservabilitySpaceEntity>;
    create(this: any, reqdata?: ObservabilitySpaceCreateData, ctrl?: Control): Promise<ObservabilitySpaceEntity>;
    update(this: any, reqdata?: ObservabilitySpaceUpdateData, ctrl?: Control): Promise<ObservabilitySpaceEntity>;
    patch(this: any, reqdata?: ObservabilitySpacePatchData, ctrl?: Control): Promise<ObservabilitySpaceEntity>;
    remove(this: any, reqmatch?: ObservabilitySpaceRemoveMatch, ctrl?: Control): Promise<ObservabilitySpaceEntity>;
}
export { ObservabilitySpaceEntity };
