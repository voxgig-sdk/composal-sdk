import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { DomainDnsIntegration, DomainDnsIntegrationListMatch, DomainDnsIntegrationCreateData } from '../ComposalTypes';
declare class DomainDnsIntegrationEntity extends ComposalEntityBase<DomainDnsIntegration> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: DomainDnsIntegrationEntity): DomainDnsIntegrationEntity;
    list(this: any, reqmatch?: DomainDnsIntegrationListMatch, ctrl?: Control): Promise<DomainDnsIntegrationEntity[]>;
    create(this: any, reqdata?: DomainDnsIntegrationCreateData, ctrl?: Control): Promise<DomainDnsIntegrationEntity>;
}
export { DomainDnsIntegrationEntity };
