import { ComposalEntityBase } from '../ComposalEntityBase';
import type { ComposalSDK } from '../ComposalSDK';
import type { Control } from '../types';
import type { LeaseVerifyDiagnostic, LeaseVerifyDiagnosticCreateData } from '../ComposalTypes';
declare class LeaseVerifyDiagnosticEntity extends ComposalEntityBase<LeaseVerifyDiagnostic> {
    constructor(client: ComposalSDK, entopts: any);
    make(this: LeaseVerifyDiagnosticEntity): LeaseVerifyDiagnosticEntity;
    create(this: any, reqdata?: LeaseVerifyDiagnosticCreateData, ctrl?: Control): Promise<LeaseVerifyDiagnosticEntity>;
}
export { LeaseVerifyDiagnosticEntity };
