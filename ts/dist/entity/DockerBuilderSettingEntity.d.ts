import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { DockerBuilderSetting, DockerBuilderSettingListMatch, DockerBuilderSettingUpdateData, DockerBuilderSettingPatchData } from '../ComposalTypes';
declare class DockerBuilderSettingEntity extends ComposalEntityBase<DockerBuilderSetting> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: DockerBuilderSettingEntity): DockerBuilderSettingEntity;
    list(this: any, reqmatch?: DockerBuilderSettingListMatch, ctrl?: Control): Promise<DockerBuilderSettingEntity[]>;
    update(this: any, reqdata?: DockerBuilderSettingUpdateData, ctrl?: Control): Promise<DockerBuilderSettingEntity>;
    patch(this: any, reqdata?: DockerBuilderSettingPatchData, ctrl?: Control): Promise<DockerBuilderSettingEntity>;
}
export { DockerBuilderSettingEntity };
