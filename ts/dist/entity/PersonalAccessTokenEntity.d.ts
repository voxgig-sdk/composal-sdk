import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { PersonalAccessToken, PersonalAccessTokenListMatch, PersonalAccessTokenCreateData, PersonalAccessTokenRemoveMatch } from '../ComposalTypes';
declare class PersonalAccessTokenEntity extends ComposalEntityBase<PersonalAccessToken> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: PersonalAccessTokenEntity): PersonalAccessTokenEntity;
    list(this: any, reqmatch?: PersonalAccessTokenListMatch, ctrl?: Control): Promise<PersonalAccessTokenEntity[]>;
    create(this: any, reqdata?: PersonalAccessTokenCreateData, ctrl?: Control): Promise<PersonalAccessTokenEntity>;
    remove(this: any, reqmatch?: PersonalAccessTokenRemoveMatch, ctrl?: Control): Promise<PersonalAccessTokenEntity>;
}
export { PersonalAccessTokenEntity };
