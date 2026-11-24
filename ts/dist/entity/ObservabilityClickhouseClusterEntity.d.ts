import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ObservabilityClickhouseCluster, ObservabilityClickhouseClusterLoadMatch, ObservabilityClickhouseClusterCreateData, ObservabilityClickhouseClusterUpdateData, ObservabilityClickhouseClusterPatchData, ObservabilityClickhouseClusterRemoveMatch } from '../ComposalTypes';
declare class ObservabilityClickhouseClusterEntity extends ComposalEntityBase<ObservabilityClickhouseCluster> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ObservabilityClickhouseClusterEntity): ObservabilityClickhouseClusterEntity;
    load(this: any, reqmatch?: ObservabilityClickhouseClusterLoadMatch, ctrl?: Control): Promise<ObservabilityClickhouseClusterEntity>;
    create(this: any, reqdata?: ObservabilityClickhouseClusterCreateData, ctrl?: Control): Promise<ObservabilityClickhouseClusterEntity>;
    update(this: any, reqdata?: ObservabilityClickhouseClusterUpdateData, ctrl?: Control): Promise<ObservabilityClickhouseClusterEntity>;
    patch(this: any, reqdata?: ObservabilityClickhouseClusterPatchData, ctrl?: Control): Promise<ObservabilityClickhouseClusterEntity>;
    remove(this: any, reqmatch?: ObservabilityClickhouseClusterRemoveMatch, ctrl?: Control): Promise<ObservabilityClickhouseClusterEntity>;
}
export { ObservabilityClickhouseClusterEntity };
