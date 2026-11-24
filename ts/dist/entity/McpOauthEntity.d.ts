import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { McpOauth, McpOauthLoadMatch, McpOauthCreateData } from '../ComposalTypes';
declare class McpOauthEntity extends ComposalEntityBase<McpOauth> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: McpOauthEntity): McpOauthEntity;
    load(this: any, reqmatch?: McpOauthLoadMatch, ctrl?: Control): Promise<McpOauthEntity>;
    create(this: any, reqdata?: McpOauthCreateData, ctrl?: Control): Promise<McpOauthEntity>;
}
export { McpOauthEntity };
