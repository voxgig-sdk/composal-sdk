import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { EnvironmentDiscoveryRun, EnvironmentDiscoveryRunLoadMatch, EnvironmentDiscoveryRunCreateData } from '../ComposalTypes';
declare class EnvironmentDiscoveryRunEntity extends ComposalEntityBase<EnvironmentDiscoveryRun> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: EnvironmentDiscoveryRunEntity): EnvironmentDiscoveryRunEntity;
    load(this: any, reqmatch?: EnvironmentDiscoveryRunLoadMatch, ctrl?: Control): Promise<EnvironmentDiscoveryRunEntity>;
    create(this: any, reqdata?: EnvironmentDiscoveryRunCreateData, ctrl?: Control): Promise<EnvironmentDiscoveryRunEntity>;
}
export { EnvironmentDiscoveryRunEntity };
