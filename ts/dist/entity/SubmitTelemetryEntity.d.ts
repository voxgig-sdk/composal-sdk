import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { SubmitTelemetry, SubmitTelemetryCreateData } from '../ComposalTypes';
declare class SubmitTelemetryEntity extends ComposalEntityBase<SubmitTelemetry> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: SubmitTelemetryEntity): SubmitTelemetryEntity;
    create(this: any, reqdata?: SubmitTelemetryCreateData, ctrl?: Control): Promise<SubmitTelemetryEntity>;
}
export { SubmitTelemetryEntity };
