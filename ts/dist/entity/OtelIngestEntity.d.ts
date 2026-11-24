import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { OtelIngest, OtelIngestCreateData } from '../ComposalTypes';
declare class OtelIngestEntity extends ComposalEntityBase<OtelIngest> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: OtelIngestEntity): OtelIngestEntity;
    create(this: any, reqdata?: OtelIngestCreateData, ctrl?: Control): Promise<OtelIngestEntity>;
}
export { OtelIngestEntity };
