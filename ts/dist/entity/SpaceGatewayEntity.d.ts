import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { SpaceGateway, SpaceGatewayLoadMatch, SpaceGatewayCreateData, SpaceGatewayUpdateData, SpaceGatewayPatchData, SpaceGatewayRemoveMatch } from '../ComposalTypes';
declare class SpaceGatewayEntity extends ComposalEntityBase<SpaceGateway> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: SpaceGatewayEntity): SpaceGatewayEntity;
    load(this: any, reqmatch?: SpaceGatewayLoadMatch, ctrl?: Control): Promise<SpaceGatewayEntity>;
    create(this: any, reqdata?: SpaceGatewayCreateData, ctrl?: Control): Promise<SpaceGatewayEntity>;
    update(this: any, reqdata?: SpaceGatewayUpdateData, ctrl?: Control): Promise<SpaceGatewayEntity>;
    patch(this: any, reqdata?: SpaceGatewayPatchData, ctrl?: Control): Promise<SpaceGatewayEntity>;
    remove(this: any, reqmatch?: SpaceGatewayRemoveMatch, ctrl?: Control): Promise<SpaceGatewayEntity>;
}
export { SpaceGatewayEntity };
