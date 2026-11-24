import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { SlackChannel, SlackChannelListMatch } from '../ComposalTypes';
declare class SlackChannelEntity extends ComposalEntityBase<SlackChannel> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: SlackChannelEntity): SlackChannelEntity;
    list(this: any, reqmatch?: SlackChannelListMatch, ctrl?: Control): Promise<SlackChannelEntity[]>;
}
export { SlackChannelEntity };
