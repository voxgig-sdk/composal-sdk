import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { ServiceEndpoint, ServiceEndpointLoadMatch, ServiceEndpointCreateData, ServiceEndpointUpdateData, ServiceEndpointPatchData, ServiceEndpointRemoveMatch } from '../ComposalTypes';
declare class ServiceEndpointEntity extends ComposalEntityBase<ServiceEndpoint> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: ServiceEndpointEntity): ServiceEndpointEntity;
    load(this: any, reqmatch?: ServiceEndpointLoadMatch, ctrl?: Control): Promise<ServiceEndpointEntity>;
    create(this: any, reqdata?: ServiceEndpointCreateData, ctrl?: Control): Promise<ServiceEndpointEntity>;
    update(this: any, reqdata?: ServiceEndpointUpdateData, ctrl?: Control): Promise<ServiceEndpointEntity>;
    patch(this: any, reqdata?: ServiceEndpointPatchData, ctrl?: Control): Promise<ServiceEndpointEntity>;
    remove(this: any, reqmatch?: ServiceEndpointRemoveMatch, ctrl?: Control): Promise<ServiceEndpointEntity>;
}
export { ServiceEndpointEntity };
