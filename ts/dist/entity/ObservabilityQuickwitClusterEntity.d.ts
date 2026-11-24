import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ObservabilityQuickwitCluster, ObservabilityQuickwitClusterLoadMatch, ObservabilityQuickwitClusterCreateData, ObservabilityQuickwitClusterUpdateData, ObservabilityQuickwitClusterPatchData, ObservabilityQuickwitClusterRemoveMatch } from '../ComposalTypes';
declare class ObservabilityQuickwitClusterEntity extends ComposalEntityBase<ObservabilityQuickwitCluster> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ObservabilityQuickwitClusterEntity): ObservabilityQuickwitClusterEntity;
    load(this: any, reqmatch?: ObservabilityQuickwitClusterLoadMatch, ctrl?: Control): Promise<ObservabilityQuickwitClusterEntity>;
    create(this: any, reqdata?: ObservabilityQuickwitClusterCreateData, ctrl?: Control): Promise<ObservabilityQuickwitClusterEntity>;
    update(this: any, reqdata?: ObservabilityQuickwitClusterUpdateData, ctrl?: Control): Promise<ObservabilityQuickwitClusterEntity>;
    patch(this: any, reqdata?: ObservabilityQuickwitClusterPatchData, ctrl?: Control): Promise<ObservabilityQuickwitClusterEntity>;
    remove(this: any, reqmatch?: ObservabilityQuickwitClusterRemoveMatch, ctrl?: Control): Promise<ObservabilityQuickwitClusterEntity>;
}
export { ObservabilityQuickwitClusterEntity };
