import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { RelayAgentConnection, RelayAgentConnectionLoadMatch, RelayAgentConnectionListMatch, RelayAgentConnectionCreateData, RelayAgentConnectionUpdateData, RelayAgentConnectionRemoveMatch } from '../ComposalTypes';
declare class RelayAgentConnectionEntity extends ComposalEntityBase<RelayAgentConnection> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: RelayAgentConnectionEntity): RelayAgentConnectionEntity;
    load(this: any, reqmatch?: RelayAgentConnectionLoadMatch, ctrl?: Control): Promise<RelayAgentConnectionEntity>;
    list(this: any, reqmatch?: RelayAgentConnectionListMatch, ctrl?: Control): Promise<RelayAgentConnectionEntity[]>;
    create(this: any, reqdata?: RelayAgentConnectionCreateData, ctrl?: Control): Promise<RelayAgentConnectionEntity>;
    update(this: any, reqdata?: RelayAgentConnectionUpdateData, ctrl?: Control): Promise<RelayAgentConnectionEntity>;
    remove(this: any, reqmatch?: RelayAgentConnectionRemoveMatch, ctrl?: Control): Promise<RelayAgentConnectionEntity>;
}
export { RelayAgentConnectionEntity };
