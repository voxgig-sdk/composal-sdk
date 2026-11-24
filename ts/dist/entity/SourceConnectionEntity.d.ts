import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { SourceConnection, SourceConnectionCreateData } from '../ComposalTypes';
declare class SourceConnectionEntity extends ComposalEntityBase<SourceConnection> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: SourceConnectionEntity): SourceConnectionEntity;
    create(this: any, reqdata?: SourceConnectionCreateData, ctrl?: Control): Promise<SourceConnectionEntity>;
}
export { SourceConnectionEntity };
