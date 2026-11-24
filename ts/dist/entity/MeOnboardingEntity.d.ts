import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { MeOnboarding, MeOnboardingCreateData } from '../ComposalTypes';
declare class MeOnboardingEntity extends ComposalEntityBase<MeOnboarding> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: MeOnboardingEntity): MeOnboardingEntity;
    create(this: any, reqdata?: MeOnboardingCreateData, ctrl?: Control): Promise<MeOnboardingEntity>;
}
export { MeOnboardingEntity };
