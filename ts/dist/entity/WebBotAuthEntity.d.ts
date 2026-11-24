import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { WebBotAuth, WebBotAuthCreateData } from '../ComposalTypes';
declare class WebBotAuthEntity extends ComposalEntityBase<WebBotAuth> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: WebBotAuthEntity): WebBotAuthEntity;
    create(this: any, reqdata?: WebBotAuthCreateData, ctrl?: Control): Promise<WebBotAuthEntity>;
}
export { WebBotAuthEntity };
