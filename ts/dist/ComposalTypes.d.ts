export interface A2aWellKnown {
}
export interface A2aWellKnownLoadMatch {
    a2a_id: string;
    $action?: string;
    [action: string]: any;
}
export interface AdminOrg {
    billing_email: string | null;
    billing_reason?: string;
    customize_onboarding_packages?: boolean;
    deployment_usage_visibility: string;
    deployment_usage_visible: boolean;
    id: string;
    monthly_price_dollars?: string | number;
    monthly_price_override_cents: number | null;
    name: string;
    onboarding_custom_pricing?: boolean;
    onboarding_package_keys?: any[] | null;
    owner_email: string;
    package_id: string | null;
    skip_payment?: boolean;
    slug: string;
}
export interface AdminOrgLoadMatch {
    id: string;
}
export interface AdminOrgCreateData {
    billing_reason?: string;
    customize_onboarding_packages?: boolean;
    monthly_price_dollars?: string | number;
    name: string;
    onboarding_custom_pricing?: boolean;
    onboarding_package_keys?: any[] | null;
    owner_email: string;
    package_id?: string | null;
    skip_payment?: boolean;
    slug: string;
    $action?: string;
    [action: string]: any;
}
export interface AdminOrgUpdateData {
    id: string;
    billing_email?: string | null;
    monthly_price_dollars?: string | number;
    package_id?: string | null;
    reason?: any;
    $action?: string;
    [action: string]: any;
}
export interface Agent {
    attention: string | null;
    avatar?: string | null;
    can_delete?: boolean;
    can_edit_configuration: boolean;
    can_manage: boolean;
    can_manage_sharing?: boolean;
    can_name_managers?: boolean;
    can_queue_input?: boolean;
    can_reconcile_save: boolean;
    configuration: any;
    configuration_revision: number;
    configuration_version: string | null;
    control_connections_available?: boolean;
    controlling_user_id: string;
    coordination_available?: boolean;
    created_at: string;
    direct_chat_available?: boolean;
    has_unread_updates: boolean;
    id: string;
    last_reply_at: string | null;
    lifecycle_actions: any[];
    lifecycle_version: string | null;
    local_agent_control_available?: boolean;
    managers?: any[];
    model_change_action?: string | null;
    name: string;
    organization_id: string;
    persona?: any;
    preview?: any;
    preview_received_at?: string | null;
    provisioning?: any;
    reply_triage: Record<string, any> | null;
    runtime_version?: string;
    setup_pending: boolean;
    sharing_fixed?: boolean;
    sharing_version?: number;
    slug: string;
    status: string;
    team_role?: string;
    updated_at: string;
    url_slug?: string;
    visibility?: string;
}
export interface AgentLoadMatch {
    id: string;
    organization_id: string;
    $action?: string;
    [action: string]: any;
}
export interface AgentListMatch {
    organization_id: string;
    cursor?: string;
    limit?: number;
    q?: string;
    runtime_version?: string;
    status?: string;
}
export interface AgentCreateData {
    organization_id: string;
    viewer_time_zone?: string;
    configuration?: any;
    name: string;
    runtime_version?: string;
    slug?: string;
    visibility?: string;
    $action?: string;
    [action: string]: any;
}
export interface AgentUpdateData {
    id: string;
    organization_id: string;
    name?: string;
    team_role?: string;
    visibility?: string;
    acknowledge_reset?: any;
    after_id?: any;
    before_id?: any;
    conversation_id?: any;
    expected_generation?: any;
    expected_version?: any;
    github_access?: any;
    integration_id?: any;
    keep_connections?: any;
    memory_mb?: any;
    model?: any;
    profile?: any;
    provider?: any;
    reasoning?: any;
    revoke_access?: any;
    setup_only?: any;
    value?: any;
    $action?: string;
    [action: string]: any;
}
export interface AgentRemoveMatch {
    id: string;
    organization_id: string;
}
export interface AgentApp {
    author: Record<string, any>;
    can_message: boolean;
    deployments_count: number;
    description: string;
    hidden_install_count: number;
    id: string;
    install_count: number;
    installed_by: any[];
    installed_target_ids: any[];
    mcp_url: string | null;
    owner: Record<string, any>;
    thread: any;
    title: string;
    url: string;
    visibility: string;
}
export interface AgentAppLoadMatch {
    id: string;
    organization_id: string;
}
export interface AgentAppListMatch {
    organization_id: string;
    cursor?: string;
}
export interface AgentAppCreateData {
    id: string;
    organization_id: string;
    surface?: any;
    view?: any;
    $action?: string;
    [action: string]: any;
}
export interface AgentAppInstall {
    id?: string;
    installed: boolean;
}
export interface AgentAppInstallUpdateData {
    agent_app_id: string;
    id: string;
    organization_id: string;
}
export interface AgentAppInstallRemoveMatch {
    agent_app_id: string;
    id: string;
    organization_id: string;
}
export interface AgentAttachment {
    byte_size: number;
    content_type: string;
    file_name: string;
    id?: string;
}
export interface AgentAttachmentCreateData {
    agent_id: string;
    organization_id: string;
    byte_size: number;
    content_type: string;
    file_name: string;
    $action?: string;
    [action: string]: any;
}
export interface AgentAutomation {
    can_manage: boolean;
    can_manage_events: boolean;
    can_run: boolean;
    can_schedule: boolean;
    definition: Record<string, any>;
    event_subscriptions: any[];
    event_triggers: any[];
    expected_revision: number;
    id: string;
    key: string;
    name: string;
    revision: number;
    schedule: any;
    schedules: any[];
    version: Record<string, any>;
}
export interface AgentAutomationLoadMatch {
    agent_id: string;
    id: string;
    organization_id: string;
}
export interface AgentAutomationListMatch {
    agent_id: string;
    organization_id: string;
    cursor?: string;
    limit?: number;
}
export interface AgentAutomationUpdateData {
    agent_id: string;
    id: string;
    organization_id: string;
    definition?: Record<string, any>;
    expected_revision?: number;
    $action?: string;
    [action: string]: any;
}
export interface AgentAvatar {
}
export interface AgentAvatarLoadMatch {
    agent_id: string;
    organization_id: string;
    style_catalog?: number;
    $action?: string;
    [action: string]: any;
}
export interface AgentAvatarCreateData {
    agent_id: string;
    organization_id: string;
    style_catalog?: number;
    description?: any;
    expected_generation?: any;
    mode?: any;
    pixel?: any;
    style?: any;
    $action?: string;
    [action: string]: any;
}
export interface AgentCommand {
    description: string;
    display_name: string;
    name: string;
    skill_model_visible: boolean;
    source: string;
}
export interface AgentCommandListMatch {
    agent_id: string;
    organization_id: string;
    conversation_id?: string;
}
export interface AgentComputer {
}
export interface AgentComputerLoadMatch {
    agent_id: string;
    organization_id: string;
    $action?: string;
    [action: string]: any;
}
export interface AgentComputerCreateData {
    agent_id: string;
    organization_id: string;
    prepare?: any;
    $action?: string;
    [action: string]: any;
}
export interface AgentConnection {
    actions: any[];
    activity: any[];
    admin_disabled_at?: string | null;
    agent_tools?: boolean;
    authentication: string;
    authorized_at: string | null;
    can_create_account?: boolean;
    capabilities: Record<string, any>;
    catalog_section?: string;
    category?: string;
    certification: string;
    checked_at: string | null;
    connection: Record<string, any>;
    consent: Record<string, any> | null;
    created_at: string;
    creation_key?: string;
    custodian_id: string | null;
    description?: string;
    disabled_reason?: string | null;
    failure_code: string | null;
    generation: number;
    grants: any[];
    grants_pagination: Record<string, any>;
    id: string;
    limits: Record<string, any>;
    name: string;
    organization_id: string;
    owner_name?: string;
    ownership_kind: string;
    pagination: Record<string, any>;
    policy_digest: string;
    provider: Record<string, any>;
    provider_disabled_reason?: string | null;
    provider_identity: Record<string, any>;
    revoked_at: string | null;
    schema_version: number;
    status: string;
    toolkit: string;
    triggers: any[];
    updated_at: string;
    user_id: string;
    version: string;
}
export interface AgentConnectionLoadMatch {
    id: string;
    organization_id: string;
    cursor?: string;
    grants_cursor?: string;
    grants_limit?: number;
    limit?: number;
    $action?: string;
    [action: string]: any;
}
export interface AgentConnectionListMatch {
    organization_id: string;
    cursor?: string;
    limit?: number;
}
export interface AgentConnectionCreateData {
    organization_id: string;
    creation_key?: string;
    name: string;
    toolkit: string;
    $action?: string;
    [action: string]: any;
}
export interface AgentConnectionUpdateData {
    id: string;
    organization_id: string;
    name?: string;
}
export interface AgentConnectionPatchData {
    id: string;
    organization_id: string;
    name?: string;
}
export interface AgentConnectionRemoveMatch {
    id: string;
    organization_id: string;
}
export interface AgentConnectionDelegation {
    authorized_by_id: string;
    automation_connection_grant_id: string;
    created_at: string;
    id: string;
    member_name: string;
    revoked_at: string | null;
    roles: any[];
    usable: boolean;
    user_id: string;
}
export interface AgentConnectionDelegationListMatch {
    agent_connection_id: string;
    organization_id: string;
}
export interface AgentConnectionGrant {
    actions: any[];
    agent_connection_id: string;
    automation_id: string;
    connection_generation: number;
    created_at: string;
    id: string;
    organization_id: string;
    revision: number;
    revoked_at: string | null;
    status: string;
    usable: boolean;
    user_id: string;
}
export interface AgentConnectionGrantListMatch {
    agent_connection_id: string;
    organization_id: string;
}
export interface AgentConnectionResource {
    cursor?: string | null;
    next_cursor: string | null;
    query?: string;
    resources: any[];
}
export interface AgentConnectionResourceCreateData {
    agent_connection_id: string;
    organization_id: string;
    cursor?: string | null;
    query?: string;
}
export interface AgentConnectionSafetyControl {
    admin_disabled_at?: string | null;
    authorized_at: string | null;
    checked_at: string | null;
    created_at: string;
    custodian_id: string | null;
    failure_code: string | null;
    generation: number;
    id: string;
    name: string;
    organization_id: string;
    owner_name?: string;
    ownership_kind: string;
    provider_disabled_reason?: string | null;
    provider_identity: Record<string, any>;
    revoked_at: string | null;
    status: string;
    toolkit: string;
    updated_at: string;
    user_id: string;
}
export interface AgentConnectionSafetyControlListMatch {
    organization_id: string;
    cursor?: string;
    limit?: number;
}
export interface AgentConnectionTriggerSubscription {
    agent_connection_id: string;
    configuration: Record<string, any>;
    created_at: string;
    defaults: Record<string, any>;
    delivery: string;
    enabled: boolean;
    failure_code: string | null;
    failure_request_id: string | null;
    id: string;
    latency: string;
    name: string;
    reconcile_at: string;
    reconciliation_uncertain: boolean;
    remote_enabled: boolean | null;
    replacement_id: string | null;
    retired_at: string | null;
    retirement_completed_at: string | null;
    schema: Record<string, any>;
    slug: string;
    status: string;
    toolkit: string;
    toolkit_version: string;
    trigger_slug: string;
    updated_at: string;
    version: string;
    waiting_for_retirement: boolean;
}
export interface AgentConnectionTriggerSubscriptionListMatch {
    agent_connection_id: string;
    organization_id: string;
    cursor?: string;
    limit?: number;
}
export interface AgentConnectionTriggerSubscriptionCreateData {
    agent_connection_id: string;
    organization_id: string;
    configuration: Record<string, any>;
    trigger_slug: string;
    $action?: string;
    [action: string]: any;
}
export interface AgentConnectionTriggerSubscriptionUpdateData {
    agent_connection_id: string;
    id: string;
    organization_id: string;
    enabled?: boolean;
}
export interface AgentConnectionTriggerSubscriptionPatchData {
    agent_connection_id: string;
    id: string;
    organization_id: string;
    enabled?: boolean;
}
export interface AgentConnectionTriggerSubscriptionRemoveMatch {
    agent_connection_id: string;
    id: string;
    organization_id: string;
}
export interface AgentContextCheckpoint {
    id?: string;
}
export interface AgentContextCheckpointLoadMatch {
    change_id: string;
    id: string;
    organization_id: string;
    repo_id: string;
    expected_commit_id: string;
    max_byte?: number;
    $action?: string;
    [action: string]: any;
}
export interface AgentControlFlow {
    can_cancel: boolean;
    cancellation_requested: boolean;
    device_name: string;
    flow_id: string;
    id?: string;
    providers: any[];
    repair_of_flow_id?: string;
    status_label: string;
    step_count: number;
    title: string | null;
}
export interface AgentControlFlowLoadMatch {
    agent_id: string;
    id: string;
    organization_id: string;
}
export interface AgentControlFlowListMatch {
    agent_id: string;
    organization_id: string;
}
export interface AgentControlFlowCreateData {
    agent_id: string;
    id: string;
    organization_id: string;
    $action?: string;
    [action: string]: any;
}
export interface AgentCoordination {
    id?: string;
}
export interface AgentCoordinationCreateData {
    agent_id: string;
    id: string;
    organization_id: string;
    include_source?: any;
    $action?: string;
    [action: string]: any;
}
export interface AgentEmail {
    delivery: string | null;
    direction: string;
    from: string;
    id: string;
    preview?: string;
    received_at: string;
    recipient_tag: string | null;
    spam: boolean;
    subject: string | null;
    text: string;
    to: any[];
}
export interface AgentEmailLoadMatch {
    agent_id: string;
    id: string;
    organization_id: string;
}
export interface AgentEvent {
}
export interface AgentEventLoadMatch {
    agent_id: string;
    organization_id: string;
    conversation_id?: string;
    device_activity_provider?: string;
}
export interface AgentFile {
    content_type: string;
    download_url: string;
    filename: string;
    id: string;
    size_bytes: number;
}
export interface AgentFileLoadMatch {
    agent_id: string;
    id: string;
    organization_id: string;
}
export interface AgentInput {
    attachment_ids?: any[];
    attachments?: any[];
    browser_context: Record<string, any>;
    client_time: Record<string, any>;
    conversation_id: string;
    model_policy?: any;
    requester_membership_id?: string;
    speed?: string;
    text: string;
}
export interface AgentInputCreateData {
    agent_id: string;
    organization_id: string;
    attachment_ids?: any[];
    attachments?: any[];
    browser_context: Record<string, any>;
    client_time: Record<string, any>;
    conversation_id: string;
    model_policy?: any;
    requester_membership_id?: string;
    speed?: string;
    text: string;
}
export interface AgentIntegration {
    account_counts: Record<string, any>;
    can_cancel_sign_in?: boolean;
    can_delete: boolean;
    can_disconnect: boolean;
    can_enable: boolean;
    can_manage: boolean;
    can_manage_sharing: boolean;
    can_reconnect: boolean;
    can_sync: boolean;
    catalog: any[];
    connected_by: string | null;
    connected_by_you: boolean;
    connected_counts: Record<string, any>;
    connections: any[];
    creation_key?: string;
    creation_key_digest?: string | null;
    generation: number;
    id: string;
    name: string;
    pagination: Record<string, any>;
    pending_counts: Record<string, any>;
    provider_disabled_reason: string | null;
    provider_identity: Record<string, any>;
    provider_name: string | null;
    reference: string;
    sharing_status?: string;
    status: string;
    team_sharing_enabled: boolean;
    team_sharing_version: number;
    toolkit: string;
}
export interface AgentIntegrationLoadMatch {
    id?: string;
    organization_id: string;
    cursor?: string;
    enableable?: boolean;
    limit?: number;
    q?: string;
    toolkit?: string;
    $action?: string;
    [action: string]: any;
}
export interface AgentIntegrationCreateData {
    organization_id: string;
    creation_key?: string;
    name: string;
    toolkit: string;
    $action?: string;
    [action: string]: any;
}
export interface AgentIntegrationRemoveMatch {
    id: string;
    organization_id: string;
}
export interface AgentIntegrationAccount {
    can_cancel_sign_in?: boolean;
    can_delete: boolean;
    can_disconnect: boolean;
    can_enable: boolean;
    can_manage_sharing: boolean;
    can_reconnect: boolean;
    can_sync: boolean;
    connected_by: string | null;
    connected_by_you: boolean;
    creation_key_digest?: string | null;
    generation: number;
    id: string;
    name: string;
    provider_disabled_reason: string | null;
    provider_identity: Record<string, any>;
    reference: string;
    sharing_status?: string;
    status: string;
    team_sharing_enabled: boolean;
    team_sharing_version: number;
    toolkit: string;
}
export interface AgentIntegrationAccountListMatch {
    organization_id: string;
    cursor?: string;
    enableable?: boolean;
    limit?: number;
    q?: string;
    toolkit?: string;
}
export interface AgentIntegrationCallback {
}
export interface AgentIntegrationCallbackLoadMatch {
    code?: string;
    connection_id: string;
    state: string;
}
export interface AgentInteraction {
    id?: string;
    interactions: any[];
}
export interface AgentInteractionLoadMatch {
    agent_id: string;
    id: string;
    organization_id: string;
    conversation_id: string;
}
export interface AgentInteractionListMatch {
    agent_id: string;
    organization_id: string;
    conversation_id: string;
    ids?: any[];
}
export interface AgentInteractionCreateData {
    agent_id: string;
    id: string;
    organization_id: string;
    conversation_id?: any;
    expected_revision?: any;
    $action?: string;
    [action: string]: any;
}
export interface AgentLibrary {
    id?: string;
}
export interface AgentLibraryLoadMatch {
    agent_id: string;
    id: string;
    organization_id: string;
    $action?: string;
    [action: string]: any;
}
export interface AgentManager {
    attention: string | null;
    avatar?: string | null;
    can_delete?: boolean;
    can_edit_configuration: boolean;
    can_manage: boolean;
    can_manage_sharing?: boolean;
    can_name_managers?: boolean;
    can_queue_input?: boolean;
    can_reconcile_save: boolean;
    configuration: any;
    configuration_revision: number;
    configuration_version: string | null;
    control_connections_available?: boolean;
    controlling_user_id: string;
    coordination_available?: boolean;
    created_at: string;
    direct_chat_available?: boolean;
    has_unread_updates: boolean;
    id: string;
    last_reply_at: string | null;
    lifecycle_actions: any[];
    lifecycle_version: string | null;
    local_agent_control_available?: boolean;
    managers?: any[];
    model_change_action?: string | null;
    name: string;
    organization_id: string;
    persona?: any;
    preview?: any;
    preview_received_at?: string | null;
    provisioning?: any;
    reply_triage: Record<string, any> | null;
    runtime_version?: string;
    setup_pending: boolean;
    sharing_fixed?: boolean;
    sharing_version?: number;
    slug: string;
    status: string;
    team_role?: string;
    updated_at: string;
    url_slug?: string;
    user_id: string;
    visibility?: string;
}
export interface AgentManagerCreateData {
    agent_id: string;
    organization_id: string;
    user_id: string;
}
export interface AgentManagerRemoveMatch {
    agent_id: string;
    id: string;
    organization_id: string;
}
export interface AgentManagerChoice {
    id: string;
    name: string;
}
export interface AgentManagerChoiceListMatch {
    agent_id: string;
    organization_id: string;
    q?: string;
}
export interface AgentMarketplace {
    bundle: Record<string, any>;
    can_manage: boolean;
    catalog_key: string | null;
    categories: any[];
    category: string;
    counts: Record<string, any>;
    created_at: string;
    expected_version: number;
    explainer: string | null;
    featured: boolean;
    from_composal: boolean;
    id: string;
    installs_count: number;
    instructions: string;
    integration_toolkits: any[];
    integrations: any[];
    listing: any;
    listings: any[];
    memories: any[];
    name: string;
    next_page: number | null;
    organization_name: string;
    page_apps: any[];
    publisher_avatar_url: string | null;
    publisher_name: string;
    sections: any[];
    share_token: string | null;
    skills: any[];
    slug: string;
    source_agent_id?: string;
    summary: string;
    updated_at: string;
    version: number;
    viewer: Record<string, any>;
    visibility: string;
}
export interface AgentMarketplaceLoadMatch {
    id: string;
    $action?: string;
    [action: string]: any;
}
export interface AgentMarketplaceCreateData {
    organization_id: string;
    bundle: Record<string, any>;
    category: string;
    explainer?: string | null;
    name: string;
    source_agent_id?: string;
    summary: string;
    visibility?: string;
    $action?: string;
    [action: string]: any;
}
export interface AgentMarketplaceUpdateData {
    id: string;
    organization_id: string;
}
export interface AgentMarketplacePatchData {
    id: string;
    organization_id: string;
    bundle?: Record<string, any>;
    category?: string;
    expected_version?: number;
    explainer?: string | null;
    name?: string;
    summary?: string;
    visibility?: string;
}
export interface AgentMarketplaceRemoveMatch {
    id: string;
    organization_id: string;
}
export interface AgentMarketplaceShared {
    can_manage: boolean;
    catalog_key: string | null;
    category: string;
    counts: Record<string, any>;
    created_at: string;
    explainer: string | null;
    featured: boolean;
    from_composal: boolean;
    id: string;
    installs_count: number;
    instructions: string;
    integration_toolkits: any[];
    integrations: any[];
    listing: any;
    memories: any[];
    name: string;
    organization_name: string;
    page_apps: any[];
    publisher_avatar_url: string | null;
    publisher_name: string;
    share_token: string | null;
    skills: any[];
    slug: string;
    summary: string;
    updated_at: string;
    version: number;
    viewer: Record<string, any>;
    visibility: string;
}
export interface AgentMarketplaceSharedLoadMatch {
    id: string;
    organization_id?: string;
}
export interface AgentMarketplaceSharedCreateData {
    id: string;
    organization_id: string;
    $action?: string;
    [action: string]: any;
}
export interface AgentMissionControl {
}
export interface AgentMissionControlCreateData {
    organization_id: string;
    action?: any;
    agent_id?: any;
    agent_ids?: any;
    at?: any;
    $action?: string;
    [action: string]: any;
}
export interface AgentOperation {
    arguments: Record<string, any>;
    id?: string;
    key: string;
    name: string;
    operation: Record<string, any>;
    participant: string;
    requester_id: string;
    scope_key: string;
}
export interface AgentOperationLoadMatch {
    agent_id: string;
    id: string;
    organization_id: string;
}
export interface AgentOperationCreateData {
    agent_id: string;
    organization_id: string;
    arguments: Record<string, any>;
    key: string;
    name: string;
    requester_id: string;
}
export interface AgentProvisioning {
}
export interface AgentProvisioningCreateData {
    agent_id: string;
    organization_id: string;
    expected_version?: any;
    $action?: string;
    [action: string]: any;
}
export interface AgentPullRequest {
    id: string;
    number: number;
    owners: any[];
    repository: string;
    status: string;
    title: string;
    url: string;
}
export interface AgentPullRequestListMatch {
    agent_id: string;
    organization_id: string;
    cursor?: string;
    scope?: string;
}
export interface AgentQuestion {
    id?: string;
}
export interface AgentQuestionCreateData {
    agent_id: string;
    id: string;
    organization_id: string;
    answers?: any;
    conversation_id?: any;
    $action?: string;
    [action: string]: any;
}
export interface AgentRelayFileGrant {
    access_mode: string;
    connection_generation: number;
    connection_id: string;
    connection_name: string;
    created_at: string;
    expected_generation: number;
    id: string;
    key: string;
    provider: string;
    resource_id: string;
    resource_kind: string;
    revoked: boolean;
    revoked_at: string | null;
    snapshot_supported?: boolean;
    source_operation_id: string;
}
export interface AgentRelayFileGrantLoadMatch {
    id: string;
    organization_id: string;
}
export interface AgentRelayFileGrantListMatch {
    organization_id: string;
    cursor?: string;
    limit?: number;
    request_key?: string;
    source_operation_id?: string;
}
export interface AgentRelayFileGrantCreateData {
    organization_id: string;
    access_mode: string;
    connection_id: string;
    expected_generation: number;
    key: string;
    resource_id: string;
    resource_kind: string;
    source_operation_id: string;
}
export interface AgentRelayFileGrantRemoveMatch {
    id: string;
    organization_id: string;
}
export interface AgentRelayFileGrantAccount {
    access_modes?: any[];
    generation: number;
    id: string;
    name: string;
    provider: string;
    resource_kind: string;
}
export interface AgentRelayFileGrantAccountListMatch {
    organization_id: string;
    cursor?: string;
    source_operation_id: string;
}
export interface AgentRepository {
    can_manage: boolean;
    environments: Record<string, any>;
    expected_version: number;
    id?: string;
    repository_choices: any[];
    repository_choices_error?: string | null;
    repository_choices_truncated: boolean;
    version: number;
    work_repositories: any[];
}
export interface AgentRepositoryLoadMatch {
    agent_id: string;
    organization_id: string;
    q?: string;
}
export interface AgentRepositoryUpdateData {
    agent_id: string;
    organization_id: string;
    expected_version?: number;
    work_repositories?: any[];
    $action?: string;
    [action: string]: any;
}
export interface AgentResource {
    name: string;
    uri: string;
}
export interface AgentResourceListMatch {
    agent_id: string;
    organization_id: string;
}
export interface AgentRoder {
}
export interface AgentRoderLoadMatch {
    organization_id: string;
    $action?: string;
    [action: string]: any;
}
export interface AgentRoderCreateData {
    checkpoint_handoff?: any;
    github_repository?: any;
    organization_id?: any;
    repository_slug?: any;
    session_purpose?: any;
    $action?: string;
    [action: string]: any;
}
export interface AgentRoutine {
    can_manage: boolean;
    consecutive_errors: number;
    credit_wait: Record<string, any>;
    description: string | null;
    enabled: boolean;
    id: string;
    kind: string;
    last_error: string | null;
    last_run_at: string | null;
    last_status: string | null;
    managed: boolean;
    name: string;
    next_run_at: string | null;
    routine: Record<string, any>;
    schedule: Record<string, any>;
    schedule_label: string;
    utility_model: Record<string, any>;
}
export interface AgentRoutineListMatch {
    agent_id: string;
    organization_id: string;
    cursor?: string;
}
export interface AgentRoutineUpdateData {
    agent_id: string;
    id: string;
    organization_id: string;
    enabled?: boolean;
    utility_model?: Record<string, any>;
}
export interface AgentRun {
    error?: string | null;
    id?: string;
    run_id: string;
    status: string;
}
export interface AgentRunLoadMatch {
    agent_id: string;
    id: string;
    organization_id: string;
    conversation_id?: string;
}
export interface AgentRuntime {
    available_profiles?: any[];
    can_manage: boolean;
    can_reset?: boolean;
    image: string;
    memory_mb: number | null;
    platform?: string;
    profile: string;
    provider?: string;
    state: string;
    version: string;
    volume: Record<string, any> | null;
}
export interface AgentRuntimeCreateData {
    agent_id: string;
    organization_id: string;
    acknowledge_data_loss?: any;
    expected_version?: any;
    $action?: string;
    [action: string]: any;
}
export interface AgentSession {
    id?: string;
}
export interface AgentSessionLoadMatch {
    id: string;
    around_event?: number;
    checkpoint?: string;
    cursor?: string;
    event_digest?: string;
    include_tool?: boolean;
    limit?: number;
    max_byte?: number;
    source_ref?: string;
    $action?: string;
    [action: string]: any;
}
export interface AgentSessionCheckpoint {
    id?: string;
}
export interface AgentSessionCheckpointLoadMatch {
    agent_session_id: string;
    id?: string;
    organization_id: string;
    repo_id: string;
    $action?: string;
    [action: string]: any;
}
export interface AgentSessionCheckpointCreateData {
    agent_session_id: string;
    organization_id: string;
    repo_id: string;
    $action?: string;
    [action: string]: any;
}
export interface AgentSessionRoderHandoff {
    checkpoint_id?: string;
    purpose?: string;
}
export interface AgentSessionRoderHandoffCreateData {
    agent_session_id: string;
    organization_id: string;
    repo_id: string;
    checkpoint_id?: string;
    purpose?: string;
}
export interface AgentSetting {
    can_manage: boolean;
    expected_version: string;
    instructions: string;
    version: string;
}
export interface AgentSettingLoadMatch {
    agent_id: string;
    organization_id: string;
}
export interface AgentSettingUpdateData {
    agent_id: string;
    organization_id: string;
    expected_version?: string;
    instructions?: string;
}
export interface AgentSharing {
}
export interface AgentSharingLoadMatch {
    agent_id: string;
    organization_id: string;
    $action?: string;
    [action: string]: any;
}
export interface AgentSite {
    author: Record<string, any>;
    can_message: boolean;
    deployments_count: number;
    description: string | null;
    icon_url: string | null;
    id: string;
    name: string;
    owner: Record<string, any>;
    thread: any;
    title: string;
    url: string;
    visibility: string;
}
export interface AgentSiteLoadMatch {
    id: string;
    organization_id: string;
    $action?: string;
    [action: string]: any;
}
export interface AgentSiteListMatch {
    organization_id: string;
    cursor?: string;
}
export interface AgentSiteCreateData {
    id: string;
    organization_id: string;
    surface?: any;
    view?: any;
    $action?: string;
    [action: string]: any;
}
export interface AgentSkill {
    agents: any[];
    audience: Record<string, any>;
    can_manage_library: boolean;
    content: string;
    files: any[];
    id?: string;
    marketplace?: string;
    pending: boolean;
    plugin?: string;
    revision: string;
    skill: Record<string, any>;
    skills: any[];
    source?: string;
}
export interface AgentSkillLoadMatch {
    id?: string;
    organization_id: string;
    $action?: string;
    [action: string]: any;
}
export interface AgentSkillCreateData {
    organization_id: string;
    audience: Record<string, any>;
    marketplace?: string;
    plugin?: string;
    revision: string;
    skills: any[];
    source?: string;
    $action?: string;
    [action: string]: any;
}
export interface AgentSkillUpdateData {
    id: string;
    organization_id: string;
    agent_ids?: any;
    mode?: any;
    new_agents?: any;
    $action?: string;
    [action: string]: any;
}
export interface AgentSkillRemoveMatch {
    id: string;
    organization_id: string;
}
export interface AgentSlack {
}
export interface AgentSlackCreateData {
    agent_id: string;
    organization_id: string;
    action?: any;
    bot_token?: any;
    callback?: any;
    confirm_before_sending?: any;
    expected_version?: any;
    mode?: any;
    show_sent_using?: any;
    signing_secret?: any;
    $action?: string;
    [action: string]: any;
}
export interface AgentSubagent {
    active: boolean;
    attention: Record<string, any> | null;
    ended_at: string | null;
    id: string;
    model: string | null;
    parent_id: string;
    preview: string | null;
    started_at: string | null;
    state: string | null;
    status: string;
    title: string;
    updated_at: string | null;
}
export interface AgentSubagentListMatch {
    agent_id: string;
    organization_id: string;
    conversation_id?: string;
    cursor?: string;
}
export interface AgentSubscription {
}
export interface AgentSubscriptionLoadMatch {
    agent_id: string;
    organization_id: string;
    refresh_provider?: string;
}
export interface AgentSubscriptionCreateData {
    agent_id: string;
    organization_id: string;
    action_name?: any;
    label?: any;
    login_id?: any;
    method?: any;
    model?: any;
    profile_id?: any;
    provider?: any;
    reasoning?: any;
    step_id?: any;
    token?: any;
    value?: any;
    version?: any;
}
export interface AgentSwarm {
    base_bookmark: string | null;
    base_ref: string | null;
    base_revision: string | null;
    budget: Record<string, any>;
    canceled_at: string | null;
    canceled_count: number;
    concurrency_key: string | null;
    created_at: string;
    created_at_label: string | null;
    creator_user_id: string | null;
    deadline_at: string | null;
    display_id: number;
    done_count: number;
    environment: Record<string, any>;
    failed_count: number;
    finished_at: string | null;
    finished_at_label: string | null;
    github: Record<string, any>;
    goal: string | null;
    id: string;
    model: string | null;
    model_provider: string | null;
    number: number;
    organization_id: string;
    organization_slug: string | null;
    outcome: string | null;
    phase: string | null;
    policy: Record<string, any>;
    queued_at: string | null;
    queued_at_label: string | null;
    repository?: string;
    repository_id: string | null;
    repository_slug: string | null;
    reserved: Record<string, any>;
    scheduler_generation: number;
    skipped_count: number;
    slug: string;
    started_at: string | null;
    started_at_label: string | null;
    status: string;
    summary: Record<string, any>;
    target: Record<string, any>;
    task_count: number;
    task_template_json: string | null;
    tasks: any[];
    updated_at: string;
    updated_at_label: string | null;
    usage: Record<string, any>;
}
export interface AgentSwarmLoadMatch {
    id: string;
    $action?: string;
    [action: string]: any;
}
export interface AgentSwarmListMatch {
    org: string;
    page?: number;
    per_page?: number;
}
export interface AgentSwarmCreateData {
    base_bookmark?: string | null;
    base_ref?: string | null;
    base_revision?: string | null;
    budget?: Record<string, any>;
    concurrency_key?: string | null;
    environment?: Record<string, any>;
    goal?: string | null;
    model?: string | null;
    model_provider?: string | null;
    organization_slug: string | null;
    policy?: Record<string, any>;
    queued_at?: string | null;
    repository?: string;
    slug?: string;
    target: Record<string, any>;
    task_template_json?: string | null;
    tasks?: any[];
    $action?: string;
    [action: string]: any;
}
export interface AgentSwarmUpdateData {
    id: string;
    policy?: Record<string, any>;
    $action?: string;
    [action: string]: any;
}
export interface AgentTeammate {
    avatar: string | null;
    id: string;
    name: string;
    persona?: any;
    slug: string;
}
export interface AgentTeammateListMatch {
    agent_id: string;
    organization_id: string;
    q?: string;
}
export interface AgentTerminal {
}
export interface AgentTerminalCreateData {
    agent_id: string;
    organization_id: string;
    $action?: string;
    [action: string]: any;
}
export interface AgentThread {
    id?: string;
}
export interface AgentThreadLoadMatch {
    id: string;
}
export interface AgentThreadCreateData {
    $action?: string;
    [action: string]: any;
}
export interface AgentTool {
    description?: string;
    inputSchema: Record<string, any>;
    name: string;
}
export interface AgentToolListMatch {
    agent_id: string;
    organization_id: string;
}
export interface AgentUsage {
    days: any[];
    ended_at: string;
    pricing_version: string;
    source: string;
    started_at: string;
    user_days: any[];
    users: any[];
    window: string;
}
export interface AgentUsageLoadMatch {
    organization_id: string;
    window?: string;
}
export interface AgentVerifyProject {
    available: boolean;
    can_manage: boolean;
    expected_version: number;
    id: string;
    name: string;
    project_choices: any[];
    project_choices_truncated: boolean;
    slug: string;
    verify_projects: any[];
    version: number;
}
export interface AgentVerifyProjectListMatch {
    agent_id: string;
    organization_id: string;
}
export interface AgentVerifyProjectUpdateData {
    agent_id: string;
    organization_id: string;
    expected_version?: number;
    verify_projects?: any[];
}
export interface AgentWait {
    id?: string;
}
export interface AgentWaitCreateData {
    agent_id: string;
    id: string;
    organization_id: string;
    $action?: string;
    [action: string]: any;
}
export interface AgentWebPreview {
    description: string | null;
    icon_url: string | null;
    image_url: string | null;
    title: string | null;
}
export interface AgentWebPreviewLoadMatch {
    asset?: string;
    token: string;
}
export interface AgentWebhook {
    action: string;
    connection: Record<string, any>;
    deliveries: any[];
    event_types: any[];
    expected_generation: number;
    id?: string;
    max_events_per_day: number;
    name: string;
    purpose: string;
    signing_key: string | null;
}
export interface AgentWebhookLoadMatch {
    agent_id: string;
    id: string;
    organization_id: string;
}
export interface AgentWebhookCreateData {
    agent_id: string;
    organization_id: string;
    event_types: any[];
    max_events_per_day: number;
    name: string;
    purpose: string;
}
export interface AgentWebhookUpdateData {
    agent_id: string;
    id: string;
    organization_id: string;
    action?: string;
    expected_generation?: number;
}
export interface AgentWork {
    id?: string;
}
export interface AgentWorkCreateData {
    agent_id: string;
    id: string;
    organization_id: string;
    revision?: any;
    $action?: string;
    [action: string]: any;
}
export interface AgentWorkflow {
    can_manage: boolean;
    expected_digest: string;
    path: string;
    source: string;
    template: string;
    templates: any[];
    truncated: boolean;
    workflows: any[];
}
export interface AgentWorkflowLoadMatch {
    agent_id: string;
    organization_id: string;
    view?: string;
    workflow_path?: string;
}
export interface AgentWorkflowCreateData {
    agent_id: string;
    organization_id: string;
    path: string;
    template: string;
}
export interface AgentWorkflowUpdateData {
    agent_id: string;
    organization_id: string;
    expected_digest?: string;
    path?: string;
    source?: string;
}
export interface AgentWorkflowProposal {
    agent_steps: Record<string, any>;
    base_digest: string | null;
    can_manage: boolean;
    can_revise: boolean;
    can_save: boolean;
    can_set_trigger: boolean;
    created_at: string;
    definition: Record<string, any> | null;
    digest: string;
    error: string | null;
    id: string;
    model_choices?: any[];
    name: string;
    native_rows?: any[];
    path: string;
    pipeline_checkpoints: Record<string, any>;
    pipeline_commands: Record<string, any>;
    reasoning_choices?: any[];
    runs_on_earlier_version: number | null;
    saved: Record<string, any> | null;
    stale: boolean;
    starts: Record<string, any> | null;
    trigger_error: string | null;
}
export interface AgentWorkflowProposalLoadMatch {
    agent_id: string;
    id: string;
    organization_id: string;
}
export interface AgentWorkflowProposalCreateData {
    agent_id: string;
    id: string;
    organization_id: string;
    digest: string;
    model?: any;
    reasoning?: any;
    $action?: string;
    [action: string]: any;
}
export interface AgentWorkflowRun {
    action: string;
    automation: Record<string, any> | null;
    budget_seconds: number | null;
    budget_usd: number | null;
    can_answer: boolean;
    can_approve: boolean;
    can_dismiss: boolean;
    checkpoint: Record<string, any> | null;
    conversation_id: string | null;
    decision_history: Record<string, any>;
    error: string | null;
    finished_at: string | null;
    flow_steps: any[] | null;
    id: string;
    needs_you: boolean;
    note: string | null;
    nothing_to_do_reason: string | null;
    resume_count: number;
    retry_step_id: string | null;
    running_seconds: number;
    source: string;
    spent_tokens: number;
    spent_usd: number;
    stalled: boolean;
    started_at: string;
    started_by: Record<string, any> | null;
    status: string;
    step_count: number;
    steps: any[];
    trigger_id: string | null;
    wake_at: string | null;
    workflow_digest: string | null;
    workflow_path: string | null;
}
export interface AgentWorkflowRunLoadMatch {
    agent_id: string;
    id: string;
    organization_id: string;
    decision_cursor?: string;
    $action?: string;
    [action: string]: any;
}
export interface AgentWorkflowRunListMatch {
    agent_id: string;
    organization_id: string;
    automation_key?: string;
    cursor?: string;
    limit?: number;
    view?: string;
    workflow_path?: string;
}
export interface AgentWorkflowRunCreateData {
    agent_id: string;
    id: string;
    organization_id: string;
    checkpoint: Record<string, any> | null;
    resume_count: number;
    answer?: any;
    approved?: any;
    question_at?: any;
    $action?: string;
    [action: string]: any;
}
export interface AgentWorkflowTrigger {
    budget: Record<string, any> | null;
    can_manage: boolean;
    can_pause: boolean;
    can_resume: boolean;
    can_review: boolean;
    daily_limit: number | null;
    day_resets_at: string | null;
    id: string;
    kind: string;
    next_due_at: string | null;
    pause_cause: string | null;
    paused: boolean;
    read_at: string | null;
    run_budget_usd: number | null;
    schedule: Record<string, any> | null;
    settings_changed_at: string | null;
    skipped_today: number;
    stale_at: string | null;
    stale_reason: string | null;
    starts: Record<string, any> | null;
    subscription_id: string | null;
    time_zone: string;
    today_count: number | null;
    trigger: Record<string, any>;
    workflow_path: string;
}
export interface AgentWorkflowTriggerLoadMatch {
    agent_id: string;
    id: string;
    organization_id: string;
    $action?: string;
    [action: string]: any;
}
export interface AgentWorkflowTriggerListMatch {
    agent_id: string;
    organization_id: string;
}
export interface AgentWorkflowTriggerUpdateData {
    agent_id: string;
    id: string;
    organization_id: string;
    daily_limit?: number | null;
    read_at?: string | null;
    run_budget_usd?: number | null;
    $action?: string;
    [action: string]: any;
}
export interface AgentWorkflowTriggerRemoveMatch {
    agent_id: string;
    id: string;
    organization_id: string;
}
export interface AgentWorkspace {
    action: string;
    can_delete: boolean;
    can_keep: boolean;
    cleanup_after: string | null;
    created_at: string;
    id: string;
    name: string;
    reason: string;
    state: string;
}
export interface AgentWorkspaceListMatch {
    agent_id: string;
    organization_id: string;
    cursor?: string;
}
export interface AgentWorkspaceUpdateData {
    agent_id: string;
    id: string;
    organization_id: string;
    action?: string;
}
export interface AgentWritePermission {
    account: string;
    granted_at: string;
    granted_by: string | null;
    id: string;
    in_effect: boolean;
    last_used_at: string | null;
    tool: string;
}
export interface AgentWritePermissionListMatch {
    agent_id: string;
    organization_id: string;
}
export interface AgentWritePermissionRemoveMatch {
    agent_id: string;
    id: string;
    organization_id: string;
}
export interface Agreement {
    body: string | null;
    effective_on_label: string;
    key: string;
    summary: string;
    title: string;
    version: string;
}
export interface AgreementListMatch {
    organization_id: string;
}
export interface AgreementAccessRequest {
}
export interface AgreementAccessRequestCreateData {
    organization_id: string;
}
export interface AlertRuleEvent {
    id?: string;
}
export interface AlertRuleEventLoadMatch {
    alert_rule_id: string;
    id?: string;
    space_id: string;
}
export interface AlertRuleEventCreateData {
    alert_rule_id: string;
    space_id: string;
    $action?: string;
    [action: string]: any;
}
export interface AlertRuleEventRemoveMatch {
    alert_rule_id: string;
    id: string;
    space_id: string;
}
export interface AllocationLog {
    allocation_id: string;
    environment?: string;
    fetched_at: string;
    location?: string | null;
    logs: string;
    namespace: string;
    offset: number;
    origin: string;
    service?: string;
    task: string;
    type: string;
}
export interface AllocationLogLoadMatch {
    allocation_id: string;
    app_id: string;
    offset?: number;
    origin?: string;
    task?: string;
    type?: string;
}
export interface App {
    created_at: string;
    created_at_label: string | null;
    description: string | null;
    framework: string | null;
    id: string;
    name: string;
    organization_id: string;
    repository_id: string;
    repository_kind: string | null;
    root_path: string;
    root_path_display: string;
    slug: string;
    status: string;
    updated_at: string;
    updated_at_label: string | null;
}
export interface AppLoadMatch {
    id: string;
    $action?: string;
    [action: string]: any;
}
export interface AppListMatch {
    organization_id?: string;
}
export interface AppCreateData {
    description?: string | null;
    framework?: string | null;
    name: string;
    organization_id: string;
    repository_id: string;
    root_path: string;
    slug: string;
    status?: string;
    $action?: string;
    [action: string]: any;
}
export interface AppUpdateData {
    id: string;
    description?: string | null;
    framework?: string | null;
    name?: string;
    organization_id?: string;
    repository_id?: string;
    root_path?: string;
    slug?: string;
    status?: string;
}
export interface AppPatchData {
    id: string;
    description?: string | null;
    framework?: string | null;
    name?: string;
    organization_id?: string;
    repository_id?: string;
    root_path?: string;
    slug?: string;
    status?: string;
}
export interface AppRemoveMatch {
    id: string;
}
export interface AppAccess {
}
export interface AppAccessLoadMatch {
    $action?: string;
    [action: string]: any;
}
export interface AppAccessJwk {
}
export interface AppAccessJwkLoadMatch {
}
export interface AppCdn {
    app_environment_id: string | null;
    app_service_id: string | null;
    cache_path_prefix?: string | null;
    cache_settings_json: string | null;
    created_at: string;
    created_at_label: string | null;
    distribution_kind: string;
    edge_hostname: string | null;
    failure_message: string | null;
    hosted_app_id: string;
    hostnames: any[];
    id: string;
    last_deployed_at: string | null;
    last_deployed_at_label: string | null;
    last_purged_at: string | null;
    last_purged_at_label: string | null;
    last_synced_at: string | null;
    last_synced_at_label: string | null;
    name: string;
    origin_url: string;
    provisioned: boolean;
    routing_settings_json: string | null;
    security_settings_json: string | null;
    slug: string;
    status: string;
    updated_at: string;
    updated_at_label: string | null;
}
export interface AppCdnLoadMatch {
    app_id: string;
    id?: string;
}
export interface AppCdnCreateData {
    app_id: string;
    app_environment_id?: string | null;
    app_service_id?: string | null;
    cache_path_prefix?: string | null;
    cache_settings_json?: string | null;
    distribution_kind?: string;
    name: string;
    origin_url: string;
    routing_settings_json?: string | null;
    security_settings_json?: string | null;
    slug: string;
    status?: string;
    $action?: string;
    [action: string]: any;
}
export interface AppCdnUpdateData {
    app_id: string;
    id: string;
    app_environment_id?: string | null;
    app_service_id?: string | null;
    cache_path_prefix?: string | null;
    cache_settings_json?: string | null;
    distribution_kind?: string;
    name?: string;
    origin_url?: string;
    routing_settings_json?: string | null;
    security_settings_json?: string | null;
    slug?: string;
    status?: string;
}
export interface AppCdnPatchData {
    app_id: string;
    id: string;
    app_environment_id?: string | null;
    app_service_id?: string | null;
    cache_path_prefix?: string | null;
    cache_settings_json?: string | null;
    distribution_kind?: string;
    name?: string;
    origin_url?: string;
    routing_settings_json?: string | null;
    security_settings_json?: string | null;
    slug?: string;
    status?: string;
}
export interface AppCdnRemoveMatch {
    app_id: string;
    id: string;
}
export interface AppConfigVariable {
    app_environment_id: string | null;
    app_service_id: string | null;
    created_at: string;
    description: string | null;
    exposed_to_build: boolean;
    has_value: boolean;
    hosted_app_id: string;
    id: string;
    key: string;
    scope_kind: string;
    updated_at: string;
    value: string | null;
    value_kind: string;
}
export interface AppConfigVariableLoadMatch {
    app_id: string;
    id?: string;
    app_environment_id?: string;
}
export interface AppConfigVariableCreateData {
    app_id: string;
    app_environment_id?: string | null;
    app_service_id?: string | null;
    description?: string | null;
    exposed_to_build: boolean;
    key: string;
    scope_kind: string;
    value?: string | null;
    value_kind: string;
    $action?: string;
    [action: string]: any;
}
export interface AppConfigVariableUpdateData {
    app_id: string;
    id: string;
}
export interface AppConfigVariablePatchData {
    app_id: string;
    id: string;
}
export interface AppConfigVariableRemoveMatch {
    app_id: string;
    id: string;
}
export interface AppDataResource {
    app_environment_id: string | null;
    created_at: string;
    engine: string;
    failure_message: string | null;
    high_availability: boolean;
    hosted_app_id: string;
    id: string;
    kind: string;
    name: string;
    plan: string | null;
    provider_metadata: Record<string, any>;
    region: string | null;
    slug: string;
    status: string;
    storage_gb: number | null;
    storage_label: string | null;
    updated_at: string;
    version: string | null;
}
export interface AppDataResourceLoadMatch {
    app_id: string;
    id?: string;
}
export interface AppDataResourceCreateData {
    app_id: string;
    app_environment_id?: string | null;
    engine: string;
    high_availability?: boolean;
    kind: string;
    name: string;
    plan?: string | null;
    region?: string | null;
    slug: string;
    storage_gb?: number | null;
    version?: string | null;
    $action?: string;
    [action: string]: any;
}
export interface AppDataResourceUpdateData {
    app_id: string;
    id: string;
}
export interface AppDataResourcePatchData {
    app_id: string;
    id: string;
}
export interface AppDataResourceRemoveMatch {
    app_id: string;
    id: string;
}
export interface AppDeploy {
    app_environment_id?: string;
    app_service_id?: string;
    channel?: string;
    command?: string;
    commit_sha?: string;
    desired_instances?: number;
    environment?: string;
    image: string;
    region?: string;
    rollout_predecessor?: string;
    service?: string;
    source_ref?: string;
}
export interface AppDeployCreateData {
    app_id: string;
    app_environment_id?: string;
    app_service_id?: string;
    channel?: string;
    command?: string;
    commit_sha?: string;
    desired_instances?: number;
    environment?: string;
    image: string;
    region?: string;
    rollout_predecessor?: string;
    service?: string;
    source_ref?: string;
}
export interface AppDeployment {
    app_environment_id: string;
    app_service_id: string;
    app_service_placement_id?: string;
    artifact_locator: string | null;
    build_role: string | null;
    commit_sha: string | null;
    created_at: string;
    created_at_label: string | null;
    creator_user_id: string | null;
    deployed_url: string | null;
    display_id: number;
    failure_message: string | null;
    finished_at: string | null;
    finished_at_label: string | null;
    hosted_app_id: string;
    id: string;
    idempotency_key: string | null;
    is_rollback: boolean;
    location: any;
    location_id: string;
    number: number;
    operation_key: string | null;
    organization_id: string;
    rollback_reason: string | null;
    rollback_source_deployment_id: string | null;
    rollback_source_release_id: string | null;
    rollback_target_release_id: string | null;
    source_ref: string | null;
    started_at: string | null;
    started_at_label: string | null;
    status: string;
    trigger_kind: string;
    updated_at: string;
    updated_at_label: string | null;
}
export interface AppDeploymentLoadMatch {
    app_id: string;
    id?: string;
    $action?: string;
    [action: string]: any;
}
export interface AppDeploymentCreateData {
    app_id: string;
    app_environment_id?: string;
    app_service_id?: string;
    app_service_placement_id?: string;
    artifact_locator?: string | null;
    commit_sha?: string | null;
    deployed_url?: string | null;
    failure_message?: string | null;
    finished_at?: string | null;
    location_id?: string;
    source_ref?: string | null;
    started_at?: string | null;
    status?: string;
    trigger_kind?: string;
    $action?: string;
    [action: string]: any;
}
export interface AppDeploymentUpdateData {
    app_id: string;
    id: string;
}
export interface AppDeploymentPatchData {
    app_id: string;
    id: string;
}
export interface AppDeploymentRemoveMatch {
    app_id: string;
    id: string;
}
export interface AppDeploymentOperation {
    app: Record<string, any>;
    app_environment_id?: string;
    app_service_id?: string;
    app_service_placement_id?: string;
    artifact_locator: string | null;
    build_duration_seconds: number | null;
    build_source: Record<string, any> | null;
    build_status: string;
    children: any[];
    ci_pipeline_id: string | null;
    ci_pipeline_run_id: string | null;
    commit_sha: string | null;
    created_at: string;
    creator: Record<string, any> | null;
    deployed_url: string | null;
    duration_seconds: number | null;
    environment: Record<string, any>;
    failure_message?: string;
    finished_at?: string;
    history_kind: string;
    history_reason: string | null;
    id: string;
    is_live: boolean;
    is_rollback: boolean;
    live_region_count: number;
    location_id?: string;
    number: number;
    placement: Record<string, any> | null;
    region_count: number;
    replicas_per_region: number;
    rollback_reason: string | null;
    rollback_source_release_id: string | null;
    rollback_target_release_id: string | null;
    rollout_predecessor_id: string | null;
    rollout_status: string;
    rollout_strategy: string;
    service: Record<string, any>;
    source_ref: string | null;
    started_at?: string;
    status: string;
    total_replicas: number;
    trigger_kind: string;
    updated_at: string;
}
export interface AppDeploymentOperationLoadMatch {
    app_id: string;
    id: string;
    $action?: string;
    [action: string]: any;
}
export interface AppDeploymentOperationListMatch {
    app_id: string;
    limit?: number;
    page?: number;
}
export interface AppDeploymentOperationCreateData {
    app_id: string;
    app_environment_id?: string;
    app_service_id?: string;
    app_service_placement_id?: string;
    artifact_locator?: string | null;
    commit_sha?: string | null;
    deployed_url?: string | null;
    failure_message?: string;
    finished_at?: string;
    location_id?: string;
    source_ref?: string | null;
    started_at?: string;
    status?: string;
    trigger_kind?: string;
    $action?: string;
    [action: string]: any;
}
export interface AppDeploymentRollback {
    app_environment_id?: string;
    app_id: string;
    app_service_id?: string;
    blockers: any[];
    candidate_releases: any[];
    confirmation_text: string;
    current_deployment: any;
    current_release: any;
    deployment: any;
    desired_state: any;
    environment: any;
    execution_allowed: boolean;
    force: boolean;
    idempotency_key?: string;
    idempotent_reuse: boolean;
    location: any;
    operation: any;
    reason: string | null;
    rollback_release: any;
    rollout: any;
    service: any;
    target_artifact_locator: string | null;
    target_release: any;
    to?: string;
    warnings: any[];
}
export interface AppDeploymentRollbackCreateData {
    app_id: string;
    app_environment_id?: string;
    app_service_id?: string;
    deployment?: any;
    environment?: any;
    force?: boolean;
    idempotency_key?: string;
    reason?: string | null;
    service?: any;
    to?: string;
    $action?: string;
    [action: string]: any;
}
export interface AppEnvironment {
    auto_deploy: boolean;
    base_domain: string | null;
    branch_pattern: string | null;
    created_at: string;
    created_at_label: string | null;
    hosted_app_id: string;
    id: string;
    kind: string;
    location: any;
    location_id: string;
    name: string;
    slug: string;
    status: string;
    updated_at: string;
    updated_at_label: string | null;
}
export interface AppEnvironmentLoadMatch {
    app_id: string;
    id?: string;
}
export interface AppEnvironmentCreateData {
    app_id: string;
    auto_deploy: boolean;
    base_domain?: string | null;
    branch_pattern?: string | null;
    kind: string;
    location_id: string;
    name: string;
    slug: string;
    status: string;
    $action?: string;
    [action: string]: any;
}
export interface AppEnvironmentUpdateData {
    app_id: string;
    id: string;
    auto_deploy?: boolean;
    base_domain?: string | null;
    branch_pattern?: string | null;
    kind?: string;
    location_id?: string;
    name?: string;
    slug?: string;
    status?: string;
}
export interface AppEnvironmentPatchData {
    app_id: string;
    id: string;
    auto_deploy?: boolean;
    base_domain?: string | null;
    branch_pattern?: string | null;
    kind?: string;
    location_id?: string;
    name?: string;
    slug?: string;
    status?: string;
}
export interface AppEnvironmentRemoveMatch {
    app_id: string;
    id: string;
}
export interface AppLocation {
    code: string;
    created_at: string;
    id: string;
    location_id: string;
    name: string;
    nomad_datacenter: string;
    updated_at: string;
}
export interface AppLocationListMatch {
    app_id: string;
}
export interface AppLocationCreateData {
    app_id: string;
    location_id: string;
}
export interface AppLocationRemoveMatch {
    app_id: string;
    id: string;
}
export interface AppMetric {
}
export interface AppMetricLoadMatch {
    app_id: string;
    $action?: string;
    [action: string]: any;
}
export interface AppPreview {
    access?: string;
    app_preview_profile_id: string;
    change_number?: string;
    expected_generation?: number;
    expected_patchset?: number;
    expires_at?: string;
    id?: string;
    name: string;
    resource_overrides?: Record<string, any>;
    retained?: boolean;
    shared_data_binding_ids?: any[];
    shared_service_binding_ids?: any[];
    slug: string;
    source_ref?: string;
    storage_binding_resources?: Record<string, any>;
}
export interface AppPreviewLoadMatch {
    app_id: string;
    id?: string;
    $action?: string;
    [action: string]: any;
}
export interface AppPreviewCreateData {
    app_id: string;
    app_preview_profile_id: string;
    change_number?: string;
    expected_patchset?: number;
    name: string;
    slug: string;
    source_ref?: string;
    $action?: string;
    [action: string]: any;
}
export interface AppPreviewUpdateData {
    app_id: string;
    id: string;
}
export interface AppPreviewPatchData {
    app_id: string;
    id: string;
    access?: string;
    expected_generation?: number;
    expires_at?: string;
    resource_overrides?: Record<string, any>;
    retained?: boolean;
    shared_data_binding_ids?: any[];
    shared_service_binding_ids?: any[];
    storage_binding_resources?: Record<string, any>;
}
export interface AppPreviewRemoveMatch {
    app_id: string;
    id: string;
}
export interface AppPreviewProfile {
    automatic?: boolean;
    configuration?: Record<string, any>;
    created_at?: string;
    hosted_app_id: string;
    id: string;
    name: string;
    slug: string;
    source_environment_id: string;
    ttl_days?: number;
    updated_at?: string;
}
export interface AppPreviewProfileLoadMatch {
    app_id: string;
    id?: string;
}
export interface AppPreviewProfileCreateData {
    app_id: string;
    automatic?: boolean;
    configuration?: Record<string, any>;
    name: string;
    slug: string;
    source_environment_id: string;
    ttl_days?: number;
}
export interface AppPreviewProfileUpdateData {
    app_id: string;
    id: string;
}
export interface AppPreviewProfilePatchData {
    app_id: string;
    id: string;
    automatic?: boolean;
    configuration?: Record<string, any>;
    name?: string;
    slug?: string;
    source_environment_id?: string;
    ttl_days?: number;
}
export interface AppPreviewProfileRemoveMatch {
    app_id: string;
    id: string;
}
export interface AppRun {
    id?: string;
    image?: string;
}
export interface AppRunLoadMatch {
    id: string;
}
export interface AppRunCreateData {
    image?: string;
    $action?: string;
    [action: string]: any;
}
export interface AppSecret {
    created_at?: string;
    description?: string | null;
    env_key?: string | null;
    expose_to_build?: boolean;
    has_value?: boolean;
    hosted_app_id: string;
    id: string;
    latest_version_number?: number | null;
    name: string;
    organization_id: string;
    rotation_policy?: string | null;
    scope_kind: string;
    slug: string;
    status: string;
    updated_at?: string;
    value?: string;
    value_digest?: string | null;
    value_kind?: string | null;
}
export interface AppSecretLoadMatch {
    app_id: string;
    id: string;
    $action?: string;
    [action: string]: any;
}
export interface AppSecretListMatch {
    app_id: string;
}
export interface AppSecretCreateData {
    app_id: string;
    description?: string | null;
    env_key?: string | null;
    expose_to_build?: boolean;
    name: string;
    rotation_policy?: string | null;
    slug: string;
    value?: string;
    value_kind?: string | null;
    $action?: string;
    [action: string]: any;
}
export interface AppSecretUpdateData {
    app_id: string;
    id: string;
    description?: string | null;
    env_key?: string | null;
    expose_to_build?: boolean;
    name?: string;
    rotation_policy?: string | null;
}
export interface AppSecretPatchData {
    app_id: string;
    id: string;
    description?: string | null;
    env_key?: string | null;
    expose_to_build?: boolean;
    name?: string;
    rotation_policy?: string | null;
}
export interface AppSecretRemoveMatch {
    app_id: string;
    id: string;
}
export interface AppService {
    auto_deploy: boolean;
    bindings: any[];
    build_command: string | null;
    cpu_label: string | null;
    cpu_mhz: number | null;
    created_at: string;
    created_at_label: string | null;
    deploy_paths: any[];
    desired_instances: number;
    disk_label: string | null;
    disk_mb: number | null;
    effective_deploy_paths: any[];
    healthcheck_path: string | null;
    hosted_app_id: string;
    id: string;
    internal_port: number | null;
    kind: string;
    memory_label: string | null;
    memory_max_label: string | null;
    memory_max_mb: number | null;
    memory_mb: number | null;
    name: string;
    nomad_constraints_json: string | null;
    nomad_kill_timeout_seconds: number | null;
    nomad_namespace: string | null;
    nomad_region: string | null;
    nomad_shutdown_delay_seconds: number | null;
    nomad_ulimits_json: string | null;
    nomad_update_strategy_json: string | null;
    prestart_command: string | null;
    publicly_accessible: boolean;
    release_command: string | null;
    repo_source_path: string;
    runtime: string;
    runtime_adapter_kind: string;
    runtime_adapter_settings_json: string | null;
    schedule: string | null;
    slug: string;
    source_path: string;
    start_command: string | null;
    updated_at: string;
    updated_at_label: string | null;
}
export interface AppServiceLoadMatch {
    app_id: string;
    id?: string;
}
export interface AppServiceCreateData {
    app_id: string;
    auto_deploy: boolean;
    build_command?: string | null;
    cpu_mhz?: number | null;
    deploy_paths?: any[];
    desired_instances: number;
    disk_mb?: number | null;
    healthcheck_path?: string | null;
    internal_port?: number | null;
    kind: string;
    memory_max_mb?: number | null;
    memory_mb?: number | null;
    name: string;
    nomad_constraints_json?: string | null;
    nomad_kill_timeout_seconds?: number | null;
    nomad_namespace?: string | null;
    nomad_region?: string | null;
    nomad_shutdown_delay_seconds?: number | null;
    nomad_ulimits_json?: string | null;
    nomad_update_strategy_json?: string | null;
    prestart_command?: string | null;
    publicly_accessible: boolean;
    release_command?: string | null;
    runtime: string;
    runtime_adapter_kind: string;
    runtime_adapter_settings_json?: string | null;
    schedule?: string | null;
    slug: string;
    source_path: string;
    start_command: string | null;
    $action?: string;
    [action: string]: any;
}
export interface AppServiceUpdateData {
    app_id: string;
    id: string;
    auto_deploy?: boolean;
    build_command?: string | null;
    cpu_mhz?: number | null;
    deploy_paths?: any[];
    desired_instances?: number;
    disk_mb?: number | null;
    healthcheck_path?: string | null;
    internal_port?: number | null;
    kind?: string;
    memory_max_mb?: number | null;
    memory_mb?: number | null;
    name?: string;
    nomad_constraints_json?: string | null;
    nomad_kill_timeout_seconds?: number | null;
    nomad_namespace?: string | null;
    nomad_region?: string | null;
    nomad_shutdown_delay_seconds?: number | null;
    nomad_ulimits_json?: string | null;
    nomad_update_strategy_json?: string | null;
    prestart_command?: string | null;
    publicly_accessible?: boolean;
    release_command?: string | null;
    runtime?: string;
    runtime_adapter_kind?: string;
    runtime_adapter_settings_json?: string | null;
    schedule?: string | null;
    slug?: string;
    source_path?: string;
    start_command?: string | null;
}
export interface AppServicePatchData {
    app_id: string;
    id: string;
    auto_deploy?: boolean;
    build_command?: string | null;
    cpu_mhz?: number | null;
    deploy_paths?: any[];
    desired_instances?: number;
    disk_mb?: number | null;
    healthcheck_path?: string | null;
    internal_port?: number | null;
    kind?: string;
    memory_max_mb?: number | null;
    memory_mb?: number | null;
    name?: string;
    nomad_constraints_json?: string | null;
    nomad_kill_timeout_seconds?: number | null;
    nomad_namespace?: string | null;
    nomad_region?: string | null;
    nomad_shutdown_delay_seconds?: number | null;
    nomad_ulimits_json?: string | null;
    nomad_update_strategy_json?: string | null;
    prestart_command?: string | null;
    publicly_accessible?: boolean;
    release_command?: string | null;
    runtime?: string;
    runtime_adapter_kind?: string;
    runtime_adapter_settings_json?: string | null;
    schedule?: string | null;
    slug?: string;
    source_path?: string;
    start_command?: string | null;
}
export interface AppServiceRemoveMatch {
    app_id: string;
    id: string;
}
export interface AppServiceBinding {
    id?: string;
}
export interface AppServiceBindingLoadMatch {
    app_id: string;
    id?: string;
}
export interface AppServiceBindingCreateData {
    app_id: string;
    $action?: string;
    [action: string]: any;
}
export interface AppServiceBindingUpdateData {
    app_id: string;
    id: string;
}
export interface AppServiceBindingPatchData {
    app_id: string;
    id: string;
}
export interface AppServiceBindingRemoveMatch {
    app_id: string;
    id: string;
}
export interface AppServicePlacement {
    app_environment_id: string;
    app_service_id: string;
    created_at: string;
    deployment_channel: string | null;
    hosted_app_id: string;
    id: string;
    mode: string;
    organization_id: string;
    region_count: number;
    replicas_per_region: number;
    rollout_strategy: string;
    targets: any[];
    total_replicas: number;
    updated_at: string;
}
export interface AppServicePlacementLoadMatch {
    app_id: string;
    id: string;
}
export interface AppServicePlacementListMatch {
    app_id: string;
    existing?: boolean;
    service?: string;
}
export interface AppServicePlacementUpdateData {
    app_id: string;
    app_environment_id?: string;
    app_service_id?: string;
    deployment_channel?: string | null;
    mode?: string;
    replicas_per_region?: number;
    rollout_strategy?: string;
    targets?: any[];
    expected_generation?: any;
    $action?: string;
    [action: string]: any;
}
export interface AppStorageResource {
    access_mode: string;
    app_environment_id: string | null;
    attachment: Record<string, any> | null;
    capacity_gb: number | null;
    capacity_label: string | null;
    created_at: string;
    ephemeral: boolean;
    external_volume_id: string | null;
    hosted_app_id: string;
    id: string;
    kind: string;
    location_code: string | null;
    location_id: string | null;
    mount_path: string | null;
    name: string;
    provider: string;
    provider_error: string | null;
    region: string | null;
    slug: string;
    status: string;
    updated_at: string;
}
export interface AppStorageResourceLoadMatch {
    app_id: string;
    id?: string;
}
export interface AppStorageResourceCreateData {
    app_id: string;
    access_mode: string;
    app_environment_id?: string | null;
    capacity_gb?: number | null;
    kind: string;
    location_id?: string | null;
    mount_path?: string | null;
    name: string;
    provider: string;
    region?: string | null;
    slug: string;
    status: string;
    $action?: string;
    [action: string]: any;
}
export interface AppStorageResourceUpdateData {
    app_id: string;
    id: string;
}
export interface AppStorageResourcePatchData {
    app_id: string;
    id: string;
}
export interface AppStorageResourceRemoveMatch {
    app_id: string;
    id: string;
}
export interface Artefact {
    automation_invocation_id?: string | null;
    byte_size: number;
    checksum_sha256: string;
    content_type: string;
    created_at?: string | null;
    created_by_user_id?: string | null;
    description?: string | null;
    document_key?: string;
    entrypoint?: string;
    expires_at?: string | null;
    filename: string;
    files?: any[];
    harness?: string | null;
    harness_version?: string | null;
    id: string;
    kind: string;
    model?: string | null;
    organization_id: string;
    published_at?: string | null;
    repository_id?: string | null;
    slug: string;
    source: string;
    status: string;
    title: string;
    vcs_agent_checkpoint_id?: string | null;
    vcs_agent_session_id?: string | null;
    version: number;
    view_url: string;
    web_url: string;
}
export interface ArtefactLoadMatch {
    id: string;
    organization_id: string;
    $action?: string;
    [action: string]: any;
}
export interface ArtefactListMatch {
    organization_id: string;
    author?: string;
    created_by_agent?: string;
    cursor?: string;
    editable?: string;
    harness?: string;
    kind?: string;
    limit?: number;
    model?: string;
    q?: string;
    repo?: string;
    slug?: string;
    source?: string;
}
export interface ArtefactCreateData {
    organization_id: string;
}
export interface ArtefactUpdateData {
    id: string;
    organization_id: string;
    $action?: string;
    [action: string]: any;
}
export interface ArtefactPatchData {
    id: string;
    organization_id: string;
    description?: string | null;
    kind?: string;
    title?: string;
}
export interface ArtefactRemoveMatch {
    id: string;
    organization_id: string;
}
export interface ArtefactCommentThread {
    anchor: string;
    body: string;
    comments: any[];
    id: string;
    quote?: string;
    resolved: boolean;
}
export interface ArtefactCommentThreadListMatch {
    artefact_id: string;
    organization_id: string;
}
export interface ArtefactCommentThreadCreateData {
    artefact_id: string;
    organization_id: string;
    anchor: string;
    body: string;
    quote?: string;
}
export interface ArtefactCommentThreadUpdateData {
    artefact_id: string;
    id: string;
    organization_id: string;
    resolved?: boolean;
}
export interface ArtefactRevision {
    base_version: number;
    content: string;
}
export interface ArtefactRevisionCreateData {
    artefact_id: string;
    organization_id: string;
    base_version: number;
    content: string;
}
export interface ArtefactViewToken {
    expires_in: number;
    file?: string;
    organization_slug?: string;
    version?: number;
    viewer_url: string;
}
export interface ArtefactViewTokenCreateData {
    artefact_id: string;
    organization_id: string;
    file?: string;
    organization_slug?: string;
    version?: number;
}
export interface Artifact {
    id?: string;
}
export interface ArtifactLoadMatch {
    id: string;
}
export interface ArtifactCreateData {
    $action?: string;
    [action: string]: any;
}
export interface ArtifactUpdateData {
    id: string;
}
export interface ArtifactPatchData {
    id: string;
}
export interface ArtifactRemoveMatch {
    id: string;
}
export interface ArtifactCacheNamespace {
    id?: string;
}
export interface ArtifactCacheNamespaceLoadMatch {
    id: string;
}
export interface ArtifactCacheNamespaceCreateData {
    $action?: string;
    [action: string]: any;
}
export interface ArtifactCacheNamespaceUpdateData {
    id: string;
}
export interface ArtifactCacheNamespacePatchData {
    id: string;
}
export interface ArtifactCacheNamespaceRemoveMatch {
    id: string;
}
export interface ArtifactImageRepository {
    id?: string;
}
export interface ArtifactImageRepositoryLoadMatch {
    id: string;
}
export interface ArtifactImageRepositoryCreateData {
    $action?: string;
    [action: string]: any;
}
export interface ArtifactImageRepositoryUpdateData {
    id: string;
}
export interface ArtifactImageRepositoryPatchData {
    id: string;
}
export interface ArtifactImageRepositoryRemoveMatch {
    id: string;
}
export interface ArtifactPackageMirror {
    id?: string;
}
export interface ArtifactPackageMirrorLoadMatch {
    id: string;
}
export interface ArtifactPackageMirrorCreateData {
    $action?: string;
    [action: string]: any;
}
export interface ArtifactPackageMirrorUpdateData {
    id: string;
}
export interface ArtifactPackageMirrorPatchData {
    id: string;
}
export interface ArtifactPackageMirrorRemoveMatch {
    id: string;
}
export interface ArtifactRetentionPolicy {
    id?: string;
}
export interface ArtifactRetentionPolicyLoadMatch {
    id: string;
}
export interface ArtifactRetentionPolicyCreateData {
}
export interface ArtifactRetentionPolicyUpdateData {
    id: string;
}
export interface ArtifactRetentionPolicyPatchData {
    id: string;
}
export interface ArtifactRetentionPolicyRemoveMatch {
    id: string;
}
export interface AttachmentPart {
    id?: string;
}
export interface AttachmentPartUpdateData {
    agent_id: string;
    attachment_id: string;
    id: string;
    organization_id: string;
}
export interface AuditEvent {
    action: string;
    actor_kind: string;
    actor_user_id: string | null;
    created_at: string;
    created_at_label: string | null;
    id: string;
    observability_space_id: string | null;
    organization_id: string;
    payload: any;
    request_id: string | null;
    severity: string;
    subject_id: string;
    subject_kind: string;
    subject_name: string | null;
    updated_at: string;
    updated_at_label: string | null;
}
export interface AuditEventListMatch {
    organization_id: string;
}
export interface Auth {
}
export interface AuthLoadMatch {
    $action?: string;
    [action: string]: any;
}
export interface AuthCreateData {
    cli_login_id?: any;
    code?: any;
    email?: any;
    invite_code?: any;
    login_id?: any;
    name?: any;
    organization_invitation_token?: any;
    password?: any;
    polling_token?: any;
    redirect_uri?: any;
    state?: any;
    turnstile_token?: any;
    $action?: string;
    [action: string]: any;
}
export interface AuthRemoveMatch {
    $action?: string;
    [action: string]: any;
}
export interface AuthCli {
}
export interface AuthCliCreateData {
    client_kind?: any;
    intent?: any;
    login_id?: any;
    name?: any;
    organization_id?: any;
    organization_slug?: any;
    $action?: string;
    [action: string]: any;
}
export interface AuthGithub {
}
export interface AuthGithubLoadMatch {
    redirect_uri: string;
    $action?: string;
    [action: string]: any;
}
export interface AuthGoogle {
}
export interface AuthGoogleLoadMatch {
    redirect_uri: string;
    $action?: string;
    [action: string]: any;
}
export interface AuthOpenai {
}
export interface AuthOpenaiLoadMatch {
    code?: string;
    error?: string;
    state: string;
    $action?: string;
    [action: string]: any;
}
export interface AuthPasswordReset {
    email: string;
    message: string;
    password: string;
    token: string;
}
export interface AuthPasswordResetCreateData {
    email: string;
}
export interface AuthPasswordResetUpdateData {
    password?: string;
    token?: string;
}
export interface AuthRegistrationOption {
    email_password_signup_enabled: boolean;
    openai_sign_in_enabled?: boolean;
    turnstile_site_key: string | null;
    waitlist_enabled: boolean;
}
export interface AuthRegistrationOptionLoadMatch {
    email_password_signup_enabled?: boolean;
    openai_sign_in_enabled?: boolean;
    turnstile_site_key?: string | null;
    waitlist_enabled?: boolean;
}
export interface AutomationEvent {
    action: string;
    can_manage: boolean;
    can_manage_events: boolean;
    can_run: boolean;
    can_schedule: boolean;
    event_subscriptions: any[];
    event_triggers: any[];
    expected_revision: string | null;
    id: string;
    key: string;
    name: string;
    revision: number;
    schedule: any;
    schedules: any[];
    settings?: Record<string, any>;
    subscription_key: string;
    version: Record<string, any>;
}
export interface AutomationEventUpdateData {
    agent_id: string;
    automation_id: string;
    organization_id: string;
    action?: string;
    expected_revision?: string | null;
    settings?: Record<string, any>;
    subscription_key?: string;
}
export interface AutomationRun {
    action: string;
    automation: Record<string, any> | null;
    budget_seconds: number | null;
    budget_usd: number | null;
    can_answer: boolean;
    can_approve: boolean;
    can_dismiss: boolean;
    checkpoint: Record<string, any> | null;
    conversation_id: string | null;
    decision_history: Record<string, any>;
    error: string | null;
    finished_at: string | null;
    flow_steps: any[] | null;
    id: string;
    input: Record<string, any>;
    needs_you: boolean;
    note: string | null;
    nothing_to_do_reason: string | null;
    request_id: string;
    resume_count: number;
    retry_step_id: string | null;
    running_seconds: number;
    source: string;
    spent_tokens: number;
    spent_usd: number;
    stalled: boolean;
    started_at: string;
    started_by: Record<string, any> | null;
    status: string;
    step_count: number;
    steps: any[];
    trigger_id: string | null;
    version_id: string;
    wake_at: string | null;
    workflow_digest: string | null;
    workflow_path: string | null;
}
export interface AutomationRunCreateData {
    agent_id: string;
    automation_id: string;
    organization_id: string;
    input: Record<string, any>;
    request_id: string;
    version_id: string;
}
export interface BackendRunnerPool {
    id?: string;
}
export interface BackendRunnerPoolLoadMatch {
    backend_id: string;
}
export interface BackendRunnerPoolCreateData {
    backend_id: string;
}
export interface BackendRunnerPoolRemoveMatch {
    backend_id: string;
    id: string;
}
export interface Bazel {
}
export interface BazelCreateData {
    $action?: string;
    [action: string]: any;
}
export interface BazelActionResult {
    id?: string;
}
export interface BazelActionResultLoadMatch {
    action_result_id: string;
    id: string;
}
export interface BazelActionResultUpdateData {
    action_result_id: string;
    id: string;
}
export interface BazelBackend {
    id?: string;
}
export interface BazelBackendLoadMatch {
    id: string;
}
export interface BazelBackendCreateData {
    $action?: string;
    [action: string]: any;
}
export interface BazelBackendUpdateData {
    id: string;
}
export interface BazelBackendPatchData {
    id: string;
}
export interface BazelBackendRemoveMatch {
    id: string;
}
export interface BazelBlob {
    id?: string;
}
export interface BazelBlobLoadMatch {
    blob_id: string;
    hash: string;
    id: string;
}
export interface BazelBlobUpdateData {
    blob_id: string;
    hash: string;
    id: string;
}
export interface BazelExecution {
    id?: string;
}
export interface BazelExecutionLoadMatch {
    id: string;
    $action?: string;
    [action: string]: any;
}
export interface BazelExecutionCreateData {
    $action?: string;
    [action: string]: any;
}
export interface BazelFindMissingBlob {
}
export interface BazelFindMissingBlobCreateData {
}
export interface Billing {
    addons: any[];
    breakdown: any;
    budget: any;
    can_manage_contact: boolean;
    can_manage_extra_spend: boolean;
    can_manage_local_subscription: boolean;
    can_manage_payment_method: boolean;
    can_set_up_billing: boolean;
    customer: any;
    deployment_usage_visible: boolean;
    entitlements: Record<string, any>;
    extra_spend_enabled: boolean;
    feature_enabled: boolean;
    organization_id: string;
    package: any;
    prepaid: any;
    preview: any;
    storage_usage: Record<string, any>;
    stripe: Record<string, any>;
    subscription: any;
    token_account: Record<string, any>;
}
export interface BillingLoadMatch {
    organization_id: string;
    $action?: string;
    [action: string]: any;
}
export interface BillingAddon {
    addons: any[];
    breakdown: any;
    budget: any;
    can_manage_contact: boolean;
    can_manage_extra_spend: boolean;
    can_manage_local_subscription: boolean;
    can_manage_payment_method: boolean;
    can_set_up_billing: boolean;
    customer: any;
    deployment_usage_visible: boolean;
    entitlements: Record<string, any>;
    extra_spend_enabled: boolean;
    feature_enabled: boolean;
    id?: string;
    organization_id: string;
    package: any;
    prepaid: any;
    preview: any;
    quantity: number;
    storage_usage: Record<string, any>;
    stripe: Record<string, any>;
    subscription: any;
    token_account: Record<string, any>;
}
export interface BillingAddonUpdateData {
    id: string;
    organization_id: string;
    quantity?: number;
}
export interface BillingBudget {
    addons: any[];
    breakdown: any;
    budget: any;
    can_manage_contact: boolean;
    can_manage_extra_spend: boolean;
    can_manage_local_subscription: boolean;
    can_manage_payment_method: boolean;
    can_set_up_billing: boolean;
    customer: any;
    deployment_usage_visible: boolean;
    entitlements: Record<string, any>;
    extra_spend_enabled: boolean;
    feature_enabled: boolean;
    monthly_cap_cents?: number | null;
    organization_id: string;
    package: any;
    prepaid: any;
    preview: any;
    storage_usage: Record<string, any>;
    stripe: Record<string, any>;
    subscription: any;
    token_account: Record<string, any>;
}
export interface BillingBudgetUpdateData {
    organization_id: string;
    monthly_cap_cents?: number | null;
}
export interface BillingBudgetPatchData {
    organization_id: string;
}
export interface BillingCheckoutSession {
    cancel_url?: string;
    coupon_code?: string;
    entry_point?: string;
    package_key?: string;
    package_revision?: number;
    success_url?: string;
}
export interface BillingCheckoutSessionCreateData {
    organization_id: string;
    cancel_url?: string;
    coupon_code?: string;
    entry_point?: string;
    package_key?: string;
    package_revision?: number;
    success_url?: string;
}
export interface BillingContact {
    addons: any[];
    billing_email: string;
    breakdown: any;
    budget: any;
    can_manage_contact: boolean;
    can_manage_extra_spend: boolean;
    can_manage_local_subscription: boolean;
    can_manage_payment_method: boolean;
    can_set_up_billing: boolean;
    customer: any;
    deployment_usage_visible: boolean;
    entitlements: Record<string, any>;
    extra_spend_enabled: boolean;
    feature_enabled: boolean;
    organization_id: string;
    package: any;
    prepaid: any;
    preview: any;
    storage_usage: Record<string, any>;
    stripe: Record<string, any>;
    subscription: any;
    token_account: Record<string, any>;
}
export interface BillingContactUpdateData {
    organization_id: string;
}
export interface BillingContactPatchData {
    organization_id: string;
    billing_email?: string;
}
export interface BillingExtraSpend {
    addons: any[];
    breakdown: any;
    budget: any;
    can_manage_contact: boolean;
    can_manage_extra_spend: boolean;
    can_manage_local_subscription: boolean;
    can_manage_payment_method: boolean;
    can_set_up_billing: boolean;
    customer: any;
    deployment_usage_visible: boolean;
    enabled: boolean;
    entitlements: Record<string, any>;
    extra_spend_enabled: boolean;
    feature_enabled: boolean;
    monthly_cap_cents?: number | null;
    organization_id: string;
    package: any;
    prepaid: any;
    preview: any;
    storage_usage: Record<string, any>;
    stripe: Record<string, any>;
    subscription: any;
    token_account: Record<string, any>;
}
export interface BillingExtraSpendUpdateData {
    organization_id: string;
    enabled?: boolean;
    monthly_cap_cents?: number | null;
}
export interface BillingExtraSpendPatchData {
    organization_id: string;
    enabled?: boolean;
    monthly_cap_cents?: number | null;
}
export interface BillingInvoice {
    amount_due_cents: number;
    created_at: string;
    currency: string;
    hosted_invoice_url?: string | null;
    id: string;
    invoice_pdf?: string | null;
    metronome_invoice_id?: string | null;
    number?: string | null;
    period_ended_at?: string | null;
    period_started_at?: string | null;
    status: string;
    total_cents: number;
}
export interface BillingInvoiceListMatch {
    organization_id: string;
}
export interface BillingPackage {
    addons: any[];
    base_price_cents: number;
    billing_interval: string;
    billing_policy: string;
    ci_included_spend_cents?: number;
    currency: string;
    key: string;
    max_seats?: number | null;
    name: string;
    pay_as_you_go_enabled: boolean;
    rates: any[];
    revision: number;
    roder_daily_run_limit?: number;
    roder_run_concurrency_limit?: number;
    seat_price_cents: number;
    trial_days: number;
    visibility: string;
}
export interface BillingPackageListMatch {
    addons?: any[];
    base_price_cents?: number;
    billing_interval?: string;
    billing_policy?: string;
    ci_included_spend_cents?: number;
    currency?: string;
    key?: string;
    max_seats?: number | null;
    name?: string;
    pay_as_you_go_enabled?: boolean;
    rates?: any[];
    revision?: number;
    roder_daily_run_limit?: number;
    roder_run_concurrency_limit?: number;
    seat_price_cents?: number;
    trial_days?: number;
    visibility?: string;
}
export interface BillingPortalSession {
    return_url?: string;
}
export interface BillingPortalSessionCreateData {
    organization_id: string;
    return_url?: string;
}
export interface BillingPrepaidPeriod {
    activated_at: string | null;
    created_at: string;
    currency: string;
    id: string;
    last_error: string | null;
    minutes: number;
    net_amount_cents: number;
    paid_at: string | null;
    paid_total_cents: number | null;
    payment_action_url: string | null;
    period_ended_at: string;
    period_started_at: string;
    receipt_url: string | null;
    refunded_net_cents: number;
    state: string;
}
export interface BillingPrepaidPeriodLoadMatch {
    id: string;
    organization_id: string;
    $action?: string;
    [action: string]: any;
}
export interface BillingPrepaidPurchase {
    activated_at: string | null;
    created_at: string;
    currency: string;
    id: string;
    last_error: string | null;
    minutes: number;
    net_amount_cents: number;
    paid_at: string | null;
    paid_total_cents: number | null;
    payment_action_url: string | null;
    prepaid: Record<string, any>;
    purchase: Record<string, any>;
    receipt_url: string | null;
    refunded_net_cents: number;
    request_key: string;
    state: string;
}
export interface BillingPrepaidPurchaseLoadMatch {
    id: string;
    organization_id: string;
    $action?: string;
    [action: string]: any;
}
export interface BillingPrepaidPurchaseListMatch {
    organization_id: string;
}
export interface BillingPrepaidPurchaseCreateData {
    organization_id: string;
    minutes: number;
    request_key: string;
}
export interface BillingSubscription {
    addons: any[];
    breakdown: any;
    budget: any;
    can_manage_contact: boolean;
    can_manage_extra_spend: boolean;
    can_manage_local_subscription: boolean;
    can_manage_payment_method: boolean;
    can_set_up_billing: boolean;
    cancel_at_period_end: boolean;
    customer: any;
    deployment_usage_visible: boolean;
    entitlements: Record<string, any>;
    extra_spend_enabled: boolean;
    feature_enabled: boolean;
    organization_id: string;
    package: any;
    prepaid: any;
    preview: any;
    storage_usage: Record<string, any>;
    stripe: Record<string, any>;
    subscription: any;
    token_account: Record<string, any>;
}
export interface BillingSubscriptionUpdateData {
    organization_id: string;
}
export interface BillingSubscriptionPatchData {
    organization_id: string;
    cancel_at_period_end?: boolean;
}
export interface BillingTokenTopUp {
    amount_cents: number;
    request_key: string;
}
export interface BillingTokenTopUpCreateData {
    organization_id: string;
    amount_cents: number;
    request_key: string;
}
export interface BillingUsage {
}
export interface BillingUsageLoadMatch {
    organization_id: string;
    meter?: string;
    window?: string;
    $action?: string;
    [action: string]: any;
}
export interface Binary {
    accepts_versions: boolean;
    arch?: any;
    archived_at: string | null;
    binary: Record<string, any>;
    created_at: string;
    download_secret?: string;
    download_url: string;
    executable: string;
    format: any;
    id: string;
    idempotency_key: string;
    latest_version: any;
    launch_args?: any[];
    name: string;
    needs_refresh: boolean;
    operation: Record<string, any>;
    pagination: Record<string, any>;
    permissions: Record<string, any>;
    platform?: any;
    project_id: string;
    sha256?: string;
    slug: string;
    version: Record<string, any>;
    version_defaults?: any;
    versions: any[];
    window_title: string;
}
export interface BinaryLoadMatch {
    id: string;
    organization_id: string;
    page?: number;
    project_id: string;
}
export interface BinaryListMatch {
    organization_id: string;
    page?: number;
    project_id: string;
}
export interface BinaryCreateData {
    organization_id: string;
    project_id: string;
    arch?: any;
    download_secret?: string;
    download_url: string;
    executable: string;
    format: any;
    idempotency_key: string;
    launch_args?: any[];
    name: string;
    platform?: any;
    sha256?: string;
    slug: string;
    window_title: string;
    $action?: string;
    [action: string]: any;
}
export interface BinaryVersion {
    arch?: any;
    cancelable: boolean;
    configuration: Record<string, any>;
    configuration_digest: string;
    created_at: string;
    deletable: boolean;
    download_secret?: string;
    download_url: string;
    environment_uses: any[];
    executable?: string;
    format?: any;
    id: string;
    idempotency_key: string;
    launch_args?: any[];
    operation: Record<string, any>;
    package_sha256: string | null;
    package_size: number | null;
    permissions: Record<string, any>;
    platform?: any;
    preparations: any[];
    retryable: boolean;
    sha256?: string;
    status: string;
    version: Record<string, any>;
    window_title?: string;
}
export interface BinaryVersionLoadMatch {
    binary_id: string;
    id: string;
    organization_id: string;
    project_id: string;
}
export interface BinaryVersionListMatch {
    binary_id: string;
    organization_id: string;
    page?: number;
    project_id: string;
}
export interface BinaryVersionCreateData {
    binary_id: string;
    organization_id: string;
    project_id: string;
    arch?: any;
    download_secret?: string;
    download_url: string;
    executable?: string;
    format?: any;
    idempotency_key: string;
    launch_args?: any[];
    platform?: any;
    sha256?: string;
    window_title?: string;
    $action?: string;
    [action: string]: any;
}
export interface BinaryVersionRemoveMatch {
    binary_id: string;
    id: string;
    organization_id: string;
    project_id: string;
}
export interface BookmarkProtectionRefreshGithubRequiredCheck {
    exclusions: any[];
    fetched_at?: string | null;
    fetched_at_label?: string | null;
    github_branch: string;
    github_owner?: string | null;
    github_repository_name?: string | null;
    last_error?: string | null;
    proven: boolean;
    requirements: any[];
    stale: boolean;
}
export interface BookmarkProtectionRefreshGithubRequiredCheckCreateData {
    organization_id: string;
    repo_id: string;
    github_branch?: string;
}
export interface BrowserEgressCandidate {
    id: string;
}
export interface BrowserEgressCandidateListMatch {
    organization_id: string;
    cursor?: string;
    limit?: number;
}
export interface BrowserSession {
    active_task_id?: string | null;
    authentication_status: string;
    authentication_task_id?: string | null;
    cdp_url?: string | null;
    closed_at?: string | null;
    closure_basis?: string | null;
    control_generation: number;
    controller: string;
    credential_id?: string | null;
    environment_id?: string;
    environment_revision_id?: string | null;
    expires_at: string;
    failure_code?: string | null;
    id: string;
    idempotency_key?: string;
    initial_url: string;
    max_seconds?: number;
    pending_control_id?: string | null;
    project_id?: string | null;
    reconciled_at?: string | null;
    started_at?: string | null;
    status: string;
    url?: string;
    viewer?: Record<string, any> | null;
}
export interface BrowserSessionLoadMatch {
    id: string;
    organization_id: string;
    $action?: string;
    [action: string]: any;
}
export interface BrowserSessionCreateData {
    organization_id: string;
    controller?: string;
    credential_id?: string | null;
    environment_id?: string;
    idempotency_key?: string;
    max_seconds?: number;
    project_id?: string | null;
    url?: string;
    $action?: string;
    [action: string]: any;
}
export interface BrowserSessionRemoveMatch {
    id: string;
    organization_id: string;
}
export interface BrowserSessionConnection {
    generation: number;
    idempotency_key?: string;
}
export interface BrowserSessionConnectionCreateData {
    browser_session_id: string;
    organization_id: string;
    generation: number;
    idempotency_key?: string;
}
export interface BrowserSessionControl {
    browser_session_id: string;
    completed_at?: string | null;
    completed_generation?: number | null;
    connection?: Record<string, any> | null;
    failure_code?: string | null;
    id: string;
    requested_controller: string;
    requested_generation: number;
    status: string;
}
export interface BrowserSessionControlLoadMatch {
    browser_session_id: string;
    id: string;
    organization_id: string;
}
export interface BrowserSessionEvent {
    browser_task_id?: string | null;
    created_at: string;
    id: string;
    kind: string;
    payload: Record<string, any>;
    source_sequence?: number | null;
}
export interface BrowserSessionEventListMatch {
    browser_session_id: string;
    organization_id: string;
    after?: string;
}
export interface BrowserSessionMedia {
    browser_session_id: string;
    capture_omissions?: Record<string, any> | null;
    captured_at?: string | null;
    ended_at?: string | null;
    failure_code?: string | null;
    files: any[];
    frames?: number | null;
    id: string;
    kind: string;
    partial: boolean;
    retention_expires_at: string;
    source?: Record<string, any> | null;
    status: string;
    stop_requested_at?: string | null;
}
export interface BrowserSessionMediaLoadMatch {
    browser_session_id: string;
    id: string;
    organization_id: string;
}
export interface BrowserSessionRecording {
    id?: string;
    idempotency_key?: string;
    wait?: boolean;
}
export interface BrowserSessionRecordingCreateData {
    browser_session_id: string;
    organization_id: string;
    idempotency_key?: string;
    wait?: boolean;
    $action?: string;
    [action: string]: any;
}
export interface BrowserSessionScreenshot {
    idempotency_key?: string;
    wait?: boolean;
}
export interface BrowserSessionScreenshotCreateData {
    browser_session_id: string;
    organization_id: string;
    idempotency_key?: string;
    wait?: boolean;
}
export interface BrowserSessionTask {
    activity?: Record<string, any> | null;
    browser_session_id: string;
    cancel_requested_at?: string | null;
    completed_at?: string | null;
    control_generation?: number | null;
    deadline_at: string;
    effects_unknown: boolean;
    failure_code?: string | null;
    id: string;
    idempotency_key?: string;
    instruction: string;
    max_rounds: number;
    max_seconds?: number;
    model_selection: Record<string, any>;
    outcome?: string | null;
    result: Record<string, any>;
    started_at?: string | null;
    status: string;
}
export interface BrowserSessionTaskLoadMatch {
    browser_session_id: string;
    id: string;
    organization_id: string;
}
export interface BrowserSessionTaskCreateData {
    browser_session_id: string;
    organization_id: string;
    idempotency_key?: string;
    instruction: string;
    max_rounds?: number;
    max_seconds?: number;
    outcome?: string | null;
    $action?: string;
    [action: string]: any;
}
export interface CacheNamespaceEntry {
    id?: string;
}
export interface CacheNamespaceEntryLoadMatch {
    cache_namespace_id: string;
    id?: string;
}
export interface CacheNamespaceEntryCreateData {
    cache_namespace_id: string;
    $action?: string;
    [action: string]: any;
}
export interface CacheNamespaceEntryUpdateData {
    cache_namespace_id: string;
    id: string;
}
export interface CacheNamespaceEntryPatchData {
    cache_namespace_id: string;
    id: string;
}
export interface CacheNamespaceEntryRemoveMatch {
    cache_namespace_id: string;
    id: string;
}
export interface CatalogSelector {
    environments: any[];
    id: string;
    locations: any[];
    services: any[];
}
export interface CatalogSelectorLoadMatch {
    app_id: string;
}
export interface CdnDeployment {
    id?: string;
}
export interface CdnDeploymentLoadMatch {
    app_id: string;
    cdn_id: string;
    id?: string;
}
export interface CdnDeploymentCreateData {
    app_id: string;
    cdn_id: string;
}
export interface CdnHostname {
    app_cdn_distribution_id: string;
    created_at: string;
    dns_status: string;
    force_ssl: boolean;
    hostname: string;
    id: string;
    provider_hostname_id: string | null;
    tls_status: string;
    updated_at: string;
}
export interface CdnHostnameLoadMatch {
    app_id: string;
    cdn_id: string;
    id?: string;
}
export interface CdnHostnameCreateData {
    app_id: string;
    cdn_id: string;
    dns_status?: string;
    force_ssl?: boolean;
    hostname: string;
    tls_status?: string;
}
export interface CdnHostnameUpdateData {
    app_id: string;
    cdn_id: string;
    id: string;
}
export interface CdnHostnamePatchData {
    app_id: string;
    cdn_id: string;
    id: string;
}
export interface CdnHostnameRemoveMatch {
    app_id: string;
    cdn_id: string;
    id: string;
}
export interface CdnSpace {
    id?: string;
}
export interface CdnSpaceLoadMatch {
    id: string;
}
export interface CdnSpaceCreateData {
    organization_id: string;
    $action?: string;
    [action: string]: any;
}
export interface CdnSpaceUpdateData {
    id: string;
}
export interface CdnSpacePatchData {
    id: string;
}
export interface CdnSpaceRemoveMatch {
    id: string;
}
export interface CdnSpaceObject {
    id?: string;
}
export interface CdnSpaceObjectLoadMatch {
    cdn_space_id: string;
    id?: string;
}
export interface CdnSpaceObjectUpdateData {
    cdn_space_id: string;
}
export interface CdnSpaceObjectRemoveMatch {
    cdn_space_id: string;
    id: string;
}
export interface Change {
    counts: Record<string, any>;
    filters: Record<string, any>;
    github_sync: Record<string, any>;
    result: any;
}
export interface ChangeLoadMatch {
    organization_id: string;
    author?: string;
    awaiting_review?: boolean;
    direction?: string;
    group_page?: string;
    label?: string;
    mine?: boolean;
    number?: number;
    page?: number;
    q?: string;
    repo?: string;
    sort?: string;
    source?: string;
    stack?: string;
    state?: string;
    target?: string;
    tips_only?: boolean;
    view?: string;
}
export interface ChangeAsset {
    alias: string;
    byte_size: number;
    checksum_md5: string;
    checksum_sha256: string;
    content_type: string;
    filename: string;
    id?: string;
}
export interface ChangeAssetCreateData {
    organization_id: string;
    repo_id: string;
    alias: string;
    byte_size: number;
    checksum_md5: string;
    checksum_sha256: string;
    content_type: string;
    filename: string;
    $action?: string;
    [action: string]: any;
}
export interface ChangeComment {
    body: string;
    capabilities: Record<string, any>;
    change_id?: string | null;
    created_at?: string | null;
    created_at_label?: string | null;
    id: string;
    kind?: string | null;
    line?: number | null;
    outdated: boolean;
    parent_comment_id?: string | null;
    patchset_id?: string | null;
    patchset_number: number | null;
    path?: string | null;
    replies?: any[];
    resolved: boolean;
    resolved_at?: string | null;
    resolved_at_label?: string | null;
    resolved_by: Record<string, any>;
    side?: string | null;
    updated_at?: string | null;
    updated_at_label?: string | null;
    user: Record<string, any>;
}
export interface ChangeCommentListMatch {
    change_id: string;
    organization_id: string;
    repo_id: string;
    path?: string;
    resolved?: boolean;
}
export interface ChangeCommentCreateData {
    change_id: string;
    organization_id: string;
    repo_id: string;
    body: string;
    kind?: string | null;
    line?: number | null;
    parent_comment_id?: string | null;
    patchset_id?: string | null;
    path?: string | null;
    side?: string | null;
    $action?: string;
    [action: string]: any;
}
export interface ChangeFileReviewCheckpoint {
    patchset_id: string;
    path: string;
    request_id: string;
    review_action: string;
}
export interface ChangeFileReviewCheckpointCreateData {
    change_id: string;
    organization_id: string;
    repo_id: string;
    patchset_id: string;
    path: string;
    request_id: string;
    review_action: string;
}
export interface ChangeGitBranchSubmission {
}
export interface ChangeGitBranchSubmissionCreateData {
    organization_id: string;
    repo_id: string;
}
export interface ChangeGitCommitIdentity {
    change_id: string;
    change_number: number;
    git_commit_id: string;
    git_commit_ids: any[];
    id?: string;
    identities: any[];
    missing_git_commit_ids: any[];
    patchset_number: number;
}
export interface ChangeGitCommitIdentityLoadMatch {
    id: string;
    organization_id: string;
    repo_id: string;
}
export interface ChangeGitCommitIdentityCreateData {
    organization_id: string;
    repo_id: string;
    git_commit_ids: any[];
}
export interface ChangeGitPublication {
    expected_target_commit_id: string;
    id?: string;
    operation_key: string;
    publication_id: string;
    request: Record<string, any>;
    request_digest: string;
    revisions: any[];
    status: string;
    transfer_refs?: any[];
}
export interface ChangeGitPublicationLoadMatch {
    id: string;
    organization_id: string;
    repo_id: string;
}
export interface ChangeGitPublicationCreateData {
    organization_id: string;
    repo_id: string;
    operation_key: string;
    request: Record<string, any>;
}
export interface ChangeGroupMember {
    change_id: string;
    changes: any[];
    id?: string;
    name?: string;
    number?: number;
    status: string;
    title: string | null;
}
export interface ChangeGroupMemberCreateData {
    change_group_id: string;
    organization_id: string;
    repo_id: string;
    change_id: string;
}
export interface ChangeGroupMemberRemoveMatch {
    change_group_id: string;
    id: string;
    organization_id: string;
    repo_id: string;
}
export interface ChangeLabel {
    accepted?: boolean;
    add?: any[];
    approval: Record<string, any>;
    assets?: any[];
    author?: any;
    capabilities: Record<string, any>;
    change_key?: string;
    checks?: any[];
    checks_status?: string;
    comments?: any[];
    comments_count?: number;
    comments_count_label?: string;
    commit_message?: string | null;
    current_patchset: Record<string, any>;
    description?: string | null;
    draft?: boolean;
    folded_into_number?: number | null;
    github_projection_status?: string | null;
    github_pull_request: Record<string, any>;
    github_pull_requests?: any[];
    group?: Record<string, any> | null;
    has_description?: boolean;
    id: string;
    jj_change_id?: string | null;
    labels?: any[];
    landable?: boolean;
    landed_by: Record<string, any>;
    number: number;
    orphaned?: boolean;
    orphaned_at?: string;
    orphaned_at_label?: string;
    orphaned_reason?: string;
    parent_change_id?: string | null;
    parent_change_number?: number | null;
    patchset_number?: number | null;
    patchsets?: any[];
    primary_status?: string | null;
    public_id?: string;
    relation_chain?: any[];
    remove?: any[];
    requested_changes?: boolean;
    restack_state?: string;
    reviewer_candidates?: any[];
    reviewers?: any[];
    stable_change_id?: string;
    stack?: any;
    status: string;
    target_branch: string;
    title: string;
    unresolved_comments_count_label?: string;
    url?: string;
    votes?: any[];
}
export interface ChangeLabelUpdateData {
    change_id: string;
    organization_id: string;
    repo_id: string;
    add?: any[];
    labels?: any[];
    remove?: any[];
}
export interface ChangeLandingHold {
}
export interface ChangeLandingHoldCreateData {
    change_id: string;
    organization_id: string;
    repo_id: string;
    $action?: string;
    [action: string]: any;
}
export interface ChangeLandingRequest {
    change_ids?: any[];
    count: number;
    defer_until_ready?: boolean;
    expected_requirement_version?: string;
    expected_scope_version?: string;
    head_change_id?: string;
    id?: string | null;
    numbers: any[];
    override_acknowledged?: boolean;
    override_codes?: any[];
    position?: number;
    priority?: string;
    scope_version: string;
    state: string;
    version?: number;
}
export interface ChangeLandingRequestCreateData {
    change_id: string;
    organization_id: string;
    repo_id: string;
    defer_until_ready?: boolean;
    expected_requirement_version?: string;
    expected_scope_version?: string;
    override_acknowledged?: boolean;
    override_codes?: any[];
    priority?: string;
}
export interface ChangeLandingRequestRemoveMatch {
    change_id: string;
    id: string;
    organization_id: string;
    repo_id: string;
}
export interface ChangeRequestChange {
    message?: string | null;
}
export interface ChangeRequestChangeCreateData {
    change_id: string;
    organization_id: string;
    repo_id: string;
    message?: string | null;
}
export interface ChangeReviewer {
    add?: any[];
    email: string;
    name: string | null;
    remove?: any[];
    removed_reviewers: any[];
    requested_reviewers: any[];
    reviewers: any[];
}
export interface ChangeReviewerListMatch {
    change_id: string;
    organization_id: string;
    repo_id: string;
}
export interface ChangeReviewerUpdateData {
    change_id: string;
    organization_id: string;
    repo_id: string;
    add?: any[];
    remove?: any[];
}
export interface ChangeTranscript {
    capture_kind: string;
    captured_at: string;
    harness: Record<string, any>;
    id: string;
    original_resume?: any;
    patchset_commit_id: string;
    patchset_number: number;
    redaction_count: number;
    session_id?: string | null;
    session_title?: string | null;
    status: string;
    superseded: boolean;
    user: Record<string, any>;
}
export interface ChangeTranscriptListMatch {
    change_id: string;
    organization_id: string;
    repo_id: string;
}
export interface ChangeTranscriptSummary {
    estimated_cost: any;
    session_count: number;
    sessions: any[];
    tokens_partial: boolean;
    total_tokens: number | null;
}
export interface ChangeTranscriptSummaryLoadMatch {
    organization_id: string;
    ids: string;
}
export interface CheckpointPrepareChunk {
}
export interface CheckpointPrepareChunkCreateData {
    agent_session_id: string;
    organization_id: string;
    repo_id: string;
}
export interface CiNode {
    architecture: string | null;
    bazel_enabled: boolean;
    bazel_properties_json: string | null;
    ci_runner_pool_id: string;
    cordoned_at: string | null;
    cordoned_at_label: string | null;
    created_at: string;
    created_at_label: string | null;
    health_state: string;
    heartbeat_age_seconds: number | null;
    id: string;
    kind: string;
    labels_csv: string | null;
    last_seen_at: string | null;
    last_seen_at_label: string | null;
    name: string;
    network_peer_id: string | null;
    node_capabilities_csv: string | null;
    node_certificate_expires_at: string | null;
    node_certificate_expires_at_label: string | null;
    node_certificate_fingerprint_sha256: string | null;
    node_certificate_serial: string | null;
    offline_at: string | null;
    offline_at_label: string | null;
    online_at: string | null;
    online_at_label: string | null;
    organization_id: string;
    os: string | null;
    revoked_at: string | null;
    revoked_at_label: string | null;
    schedulable: boolean;
    slug: string;
    status: string;
    updated_at: string;
    updated_at_label: string | null;
    version: string | null;
}
export interface CiNodeLoadMatch {
    id: string;
}
export interface CiNodeCreateData {
    $action?: string;
    [action: string]: any;
}
export interface CiPipeline {
    ci_runner_pool_id: string | null;
    concurrency_key: string | null;
    created_at: string;
    default_branch: string | null;
    description: string | null;
    hosted_app_id: string | null;
    id: string;
    name: string;
    organization_id: string;
    repository_id: string | null;
    required_capabilities_csv: string | null;
    runner_pool: Record<string, any> | null;
    runs: any[];
    slug: string;
    source_kind: string;
    status: string;
    status_label: string;
    status_state: string;
    status_tone: string;
    trigger_on_pull_request: boolean;
    trigger_on_push: boolean;
    trigger_on_schedule: boolean;
    updated_at: string;
    workflow_path: string | null;
}
export interface CiPipelineLoadMatch {
    id: string;
}
export interface CiPipelineListMatch {
    ci_runner_pool_id?: string | null;
    concurrency_key?: string | null;
    created_at?: string;
    default_branch?: string | null;
    description?: string | null;
    hosted_app_id?: string | null;
    id?: string;
    name?: string;
    organization_id?: string;
    repository_id?: string | null;
    required_capabilities_csv?: string | null;
    runner_pool?: Record<string, any> | null;
    runs?: any[];
    slug?: string;
    source_kind?: string;
    status?: string;
    status_label?: string;
    status_state?: string;
    status_tone?: string;
    trigger_on_pull_request?: boolean;
    trigger_on_push?: boolean;
    trigger_on_schedule?: boolean;
    updated_at?: string;
    workflow_path?: string | null;
}
export interface CiPipelineCreateData {
}
export interface CiPipelineRun {
    active: boolean;
    canceled_at: string | null;
    ci_pipeline_id: string;
    ci_runner_pool_id: string | null;
    commit_sha: string | null;
    concurrency_key: string | null;
    created_at: string;
    creator_user_id: string | null;
    display_id: number;
    failed: boolean;
    finished_at: string | null;
    hosted_app_id: string | null;
    id: string;
    jobs: any[];
    message: string | null;
    number: number;
    organization_id: string;
    parameters_json: string | null;
    queued_at: string | null;
    ref_name: string | null;
    repository_id: string | null;
    required_capabilities_csv: string | null;
    retry_number: number;
    retryable: boolean;
    slug: string;
    source_url: string | null;
    started_at: string | null;
    status: string;
    status_label: string;
    status_state: string;
    status_tone: string;
    trigger_kind: string;
    updated_at: string;
}
export interface CiPipelineRunLoadMatch {
    id?: string;
    pipeline_id: string;
}
export interface CiPipelineRunCreateData {
    pipeline_id: string;
    $action?: string;
    [action: string]: any;
}
export interface CiRunnerPool {
    bazel_enabled: boolean;
    bazel_properties_json: string | null;
    created_at: string;
    description: string | null;
    elastic_config_json: string | null;
    elastic_provider_kind: string | null;
    id: string;
    isolation_mode: string;
    labels_csv: string | null;
    max_concurrency: number;
    modal_capacity: Record<string, any>;
    modal_runner_invocations: any[];
    name: string;
    network_space_id: string | null;
    node_capabilities_csv: string | null;
    organization_id: string;
    runner_count_label: string;
    runner_kind: string;
    runners: any[];
    slug: string;
    status: string;
    updated_at: string;
}
export interface CiRunnerPoolLoadMatch {
    id: string;
}
export interface CiRunnerPoolListMatch {
    organization_id?: string;
}
export interface CiRunnerPoolCreateData {
    $action?: string;
    [action: string]: any;
}
export interface CiRunnerPoolUpdateData {
    id: string;
}
export interface CiRunnerPoolPatchData {
    id: string;
    description?: string | null;
    elastic_config_json?: string | null;
    elastic_provider_kind?: string | null;
    isolation_mode?: string;
    labels_csv?: string | null;
    max_concurrency?: number;
    node_capabilities_csv?: string | null;
    runner_kind?: string;
    status?: string;
}
export interface CiStatus {
}
export interface CiStatusLoadMatch {
    organization_id: string;
    repo_id: string;
    ref?: string;
    $action?: string;
    [action: string]: any;
}
export interface CliEvent {
    event: string;
    properties: Record<string, any>;
}
export interface CliEventCreateData {
    event: string;
    properties: Record<string, any>;
}
export interface CliRelease {
}
export interface CliReleaseLoadMatch {
    $action?: string;
    [action: string]: any;
}
export interface CliReleaseCreateData {
}
export interface CloudWorkspaceBackupObject {
    id?: string;
}
export interface CloudWorkspaceBackupObjectLoadMatch {
    cloud_workspace_backup_id: string;
    id: string;
    organization_id: string;
    repo_id: string;
}
export interface CodeRuleEvaluation {
    advisory: boolean;
    coverage: Record<string, any>;
    diff: string;
    duration_ms: number;
    evaluator_version?: string;
    input_digest?: string | null;
    limits?: Record<string, any>;
    model?: string;
    requests: Record<string, any>;
    schema_version: number;
    snapshot_digest?: string | null;
    unchecked: any[];
    verdicts: any[];
}
export interface CodeRuleEvaluationCreateData {
    organization_id: string;
    repo_id: string;
    diff: string;
}
export interface ComSiteAccess {
}
export interface ComSiteAccessLoadMatch {
    host: string;
    return_to?: string;
    $action?: string;
    [action: string]: any;
}
export interface ComSiteAccessCreateData {
    host?: any;
    token?: any;
    $action?: string;
    [action: string]: any;
}
export interface ComSiteAccessSession {
    cookie_name: string;
    host: string;
    max_age: number;
    session_token: string;
}
export interface ComSiteAccessSessionCreateData {
    host: string;
}
export interface CommentThreadComment {
    body: string;
}
export interface CommentThreadCommentCreateData {
    artefact_id: string;
    comment_thread_id: string;
    organization_id: string;
    body: string;
}
export interface CommitDiff {
    files: any[];
    id?: string;
    parent_id: string | null;
}
export interface CommitDiffLoadMatch {
    commit_id: string;
    id: string;
    organization_id: string;
    repo_id: string;
    parent?: string;
}
export interface ConnectionRequest {
    agent_card_url: string;
    auth_scheme: string;
    can_configure: boolean;
    can_disconnect: boolean;
    can_setup: boolean;
    error_code: string | null;
    generation: number;
    id: string;
    name: string;
    remote_agent: string | null;
    retired_at: string | null;
    revoked_at: string | null;
    source_operation_id: string | null;
    state: string;
}
export interface ConnectionRequestLoadMatch {
    agent_id: string;
    id: string;
    organization_id: string;
}
export interface ConnectionSource {
    device_id: string;
    device_name: string;
    provider: string;
    source_operation_id: string;
    title: string;
}
export interface ConnectionSourceListMatch {
    agent_id: string;
    organization_id: string;
    cursor?: string;
    limit?: number;
}
export interface ContactSubmission {
    company?: string | null;
    email: string;
    message: string;
    name: string;
    website?: string | null;
}
export interface ContactSubmissionCreateData {
    company?: string | null;
    email: string;
    message: string;
    name: string;
    website?: string | null;
}
export interface ControlComputer {
    connection: Record<string, any>;
    consent: Record<string, any>;
    device: Record<string, any>;
    id?: string;
    provider_status?: any[];
}
export interface ControlComputerListMatch {
    organization_id: string;
    cursor?: string;
    observe_connection?: boolean;
    persistent_agent_id: string;
}
export interface ControlComputerUpdateData {
    id: string;
    organization_id: string;
    enabled?: any;
    expected_revision?: any;
    persistent_agent_id?: any;
    providers?: any;
    $action?: string;
    [action: string]: any;
}
export interface ControlComputerControlOperation {
    action: string;
    arguments: Record<string, any>;
    created_at: string;
    delivery: Record<string, any>;
    device_id: string;
    diagnostic_code?: string;
    end: Record<string, any>;
    expires_at: string;
    id: string;
    key: string;
    provider: string;
    references: Record<string, any>;
    result: any;
    result_expired: boolean;
    state: string;
}
export interface ControlComputerControlOperationLoadMatch {
    control_computer_id: string;
    id: string;
    organization_id: string;
    $action?: string;
    [action: string]: any;
}
export interface ControlComputerControlOperationCreateData {
    control_computer_id: string;
    organization_id: string;
    action: string;
    arguments: Record<string, any>;
    key: string;
}
export interface CoordinationWait {
    can_stop: boolean;
    expires_at: string;
    id: string;
    status: string;
    stop_state: string | null;
    wake_outcome: string | null;
}
export interface CoordinationWaitListMatch {
    agent_id: string;
    coordination_id: string;
    organization_id: string;
    cursor?: string;
}
export interface CredentialSignInCheck {
    agent_filters: Record<string, any>;
    agents: any[];
    can_continue?: boolean;
    chat_messages?: any[];
    concurrency: number;
    covered_areas: any[];
    created_at: string;
    deadline_at: string;
    demo_project: Record<string, any> | null;
    ended_early: boolean;
    environment_id: string;
    environment_name: string;
    explorer_activity: Record<string, any>;
    finding_count: number;
    findings: any[];
    findings_fix_prompt: string | null;
    finished_at?: string | null;
    goal: string;
    huntable_flows: any[];
    id: string;
    max_seconds: number;
    max_testers: number;
    mode?: string;
    next_scan_improvements: any[];
    observed_at?: string;
    onboarding: boolean;
    paywalled: boolean;
    permissions: Record<string, any>;
    priority_counts: Record<string, any>;
    project_id?: string | null;
    related_explorations: any[];
    report: Record<string, any>;
    reproduction_of: Record<string, any> | null;
    reproductions: any[];
    saves_scenarios: boolean;
    scannable_flows: any[];
    scenario_generation: Record<string, any>;
    sign_in_needs_answer: boolean;
    sign_in_outcome: string;
    sign_in_question?: string | null;
    startup_retryable?: boolean;
    status: string;
    time_limit_reached: boolean;
    title?: string;
    unlock: any;
    web_url: string;
}
export interface CredentialSignInCheckCreateData {
    credential_id: string;
    organization_id: string;
    project_id: string;
    environment_id: string;
    $action?: string;
    [action: string]: any;
}
export interface DataResourceRotateCredential {
    app_environment_id: string | null;
    created_at: string;
    engine: string;
    failure_message: string | null;
    high_availability: boolean;
    hosted_app_id: string;
    id: string;
    kind: string;
    name: string;
    plan: string | null;
    provider_metadata: Record<string, any>;
    region: string | null;
    slug: string;
    status: string;
    storage_gb: number | null;
    storage_label: string | null;
    updated_at: string;
    version: string | null;
}
export interface DataResourceRotateCredentialCreateData {
    app_id: string;
    data_resource_id: string;
}
export interface DeepScan {
    account_id?: string | null;
    active: any[];
    agent_filters: Record<string, any>;
    agents: any[];
    can_continue?: boolean;
    chat_messages?: any[];
    concurrency: number;
    covered_areas: any[];
    created_at: string;
    deadline_at: string;
    demo_project: Record<string, any> | null;
    ended_early: boolean;
    environment_id: string;
    environment_name: string;
    explorations: any[];
    explorer_activity: Record<string, any>;
    finding_count: number;
    findings: any[];
    findings_fix_prompt: string | null;
    finished_at?: string | null;
    goal: string;
    huntable_flows: any[];
    id: string;
    idempotency_key?: string;
    launch_options: Record<string, any>;
    max_seconds: number;
    max_testers: number;
    mode?: string;
    next_scan_improvements: any[];
    observed_at?: string;
    onboarding: boolean;
    pagination: Record<string, any>;
    paywalled: boolean;
    permissions: Record<string, any>;
    priority_counts: Record<string, any>;
    project_id?: string | null;
    related_explorations: any[];
    report: Record<string, any>;
    reproduction_of: Record<string, any> | null;
    reproductions: any[];
    saves_scenarios: boolean;
    scannable_flows: any[];
    scenario_generation: Record<string, any>;
    sign_in_needs_answer: boolean;
    sign_in_outcome: string;
    sign_in_question?: string | null;
    startup_retryable?: boolean;
    status: string;
    time_limit_reached: boolean;
    title?: string;
    unlock: any;
    web_url: string;
}
export interface DeepScanLoadMatch {
    id?: string;
    organization_id: string;
    agent_id?: string;
    evidence?: string;
    finding_id?: string;
    project_id?: string;
    finding?: string;
    page?: number;
    query?: string;
    status?: string;
    $action?: string;
    [action: string]: any;
}
export interface DeepScanCreateData {
    organization_id: string;
    project_id?: string;
    account_id?: string | null;
    concurrency?: number;
    environment_id: string;
    goal: string;
    idempotency_key?: string;
    max_seconds?: number;
    max_testers?: number;
    $action?: string;
    [action: string]: any;
}
export interface DeepScanFinding {
    actual: string;
    agent_id: string;
    agent_title: string;
    area?: string | null;
    checks: any[];
    confidence: string;
    confirmed?: boolean;
    evidence_step_ids?: any[];
    evidence_timestamp_ms: number | null;
    expected: string;
    fix_prompt: string;
    has_recording?: boolean;
    id: string;
    locked: boolean;
    reproduction_steps: any[];
    severity: string;
    title: string;
    tracked: Record<string, any> | null;
    url: string;
}
export interface DeepScanFindingListMatch {
    deep_scan_id: string;
    organization_id: string;
    priority?: string;
    project_id?: string;
}
export interface DeepScanFlow {
    account_id?: string | null;
    concurrency?: number;
    environment_id?: string;
    exploration_id?: string;
    flow_names: any[];
    idempotency_key?: string;
    max_seconds?: number;
    max_testers?: number;
    note?: string | null;
}
export interface DeepScanFlowCreateData {
    organization_id: string;
    project_id?: string;
    account_id?: string | null;
    concurrency?: number;
    environment_id?: string;
    exploration_id?: string;
    flow_names: any[];
    idempotency_key?: string;
    max_seconds?: number;
    max_testers?: number;
    note?: string | null;
}
export interface DeepScanMappedFlow {
    account_id: string | null;
    environment_id: string;
    flow_map: Record<string, any> | null;
    revision_id: string | null;
}
export interface DeepScanMappedFlowLoadMatch {
    organization_id: string;
    account_id?: string;
    environment_id: string;
    project_id?: string;
}
export interface DeepScanOption {
    accounts: any[];
    deep_scan_defaults?: any;
    flow_map: Record<string, any> | null;
    id: string;
    name: string;
    personas?: any[];
    preview?: boolean;
    target_url: string | null;
}
export interface DeepScanOptionListMatch {
    organization_id: string;
    environment_query?: string;
    project_id?: string;
}
export interface DemoShare {
    head_sha: string;
    id?: string;
    recording: Record<string, any>;
    summary: string;
}
export interface DemoShareLoadMatch {
    id: string;
    $action?: string;
    [action: string]: any;
}
export interface DemoShareSegment {
    id?: string;
}
export interface DemoShareSegmentLoadMatch {
    demo_share_id: string;
    id: string;
}
export interface Deployment {
    app: Record<string, any>;
    artifact_locator: string | null;
    build_duration_seconds: number | null;
    build_source: Record<string, any> | null;
    build_status: string;
    children: any[];
    ci_pipeline_id: string | null;
    ci_pipeline_run_id: string | null;
    commit_sha: string | null;
    created_at: string;
    creator: Record<string, any> | null;
    deployed_url: string | null;
    duration_seconds: number | null;
    environment: Record<string, any>;
    history_kind: string;
    history_reason: string | null;
    id: string;
    is_live: boolean;
    is_rollback: boolean;
    live_region_count: number;
    number: number;
    placement: Record<string, any> | null;
    region_count: number;
    replicas_per_region: number;
    rollback_reason: string | null;
    rollback_source_release_id: string | null;
    rollback_target_release_id: string | null;
    rollout_predecessor_id: string | null;
    rollout_status: string;
    rollout_strategy: string;
    service: Record<string, any>;
    source_ref: string | null;
    status: string;
    total_replicas: number;
    trigger_kind: string;
    updated_at: string;
}
export interface DeploymentLoadMatch {
    id: string;
    organization_id: string;
    $action?: string;
    [action: string]: any;
}
export interface DeploymentDashboardNomad {
}
export interface DeploymentDashboardNomadLoadMatch {
    app_id: string;
    environment?: string;
    location?: string;
    service?: string;
    $action?: string;
    [action: string]: any;
}
export interface DeploymentDetail {
    activity: any[];
    app: any;
    app_id: string | null;
    audit_events: any[];
    capacity: Record<string, any>;
    data_resources: any[];
    deploy_targets: any[];
    deployments: any[];
    desired_states: any[];
    environments: any[];
    filters: Record<string, any>;
    health: Record<string, any>;
    nomad: Record<string, any>;
    operations: any[];
    placements: any[];
    reconciler_ticks: any[];
    releases: any[];
    runtime_instances: any[];
    service_bindings: any[];
    service_views: any[];
    storage_resources: any[];
}
export interface DeploymentDetailLoadMatch {
    organization_id: string;
    app?: string;
    environment?: string;
    service?: string;
}
export interface DeploymentFile {
}
export interface DeploymentFileUpdateData {
    deployment_id: string;
    static_site_id: string;
}
export interface DeploymentLog {
    allocation_id: string;
    app_environment_id: string | null;
    app_release_id: string | null;
    app_service_id: string | null;
    details: any;
    environment_name: string;
    release_version: string | null;
    service_name: string;
    status: string;
    task: string | null;
    unreachable_reason: string | null;
}
export interface DeploymentLogListMatch {
    organization_id: string;
    app?: string;
    environment?: string;
    limit?: number;
    log_location?: string;
    log_service?: string;
    service?: string;
}
export interface DeploymentMetric {
    auto_deploy: boolean;
    environment_id: string;
    environment_name: string;
    placement_id: string;
    redeploy: boolean;
    region_count: number;
    replicas_per_region: number;
    rollout_strategy: string;
    service_id: string;
    service_name: string;
    source_ref: string | null;
}
export interface DeploymentMetricListMatch {
    organization_id: string;
    app?: string;
    environment?: string;
    metrics_range?: string;
    service?: string;
}
export interface DeploymentPreview {
    access: string;
    app_environment_id: string;
    app_name: string;
    app_preview_profile_id: string;
    app_slug: string;
    change_number: number | null;
    created_at?: string;
    created_by_user_id?: string;
    expires_at: string;
    generation: number;
    health: string;
    hosted_app_id: string;
    id: string;
    latest_operation_status: string | null;
    name: string;
    owner_name: string | null;
    profile_name: string;
    resource_overrides?: Record<string, any>;
    retained: boolean;
    slug: string;
    snapshot_version: number;
    source_revision: string;
    status: string;
    updated_at?: string;
    urls: any[];
    vcs_change_id?: string | null;
}
export interface DeploymentPreviewListMatch {
    organization_id: string;
    app?: string;
    change?: string;
    expiry?: string;
    health?: string;
    owner?: string;
    page?: number;
}
export interface DeploymentSetting {
    code: string;
    created_at: string;
    id: string;
    name: string;
    nomad_datacenter: string;
    updated_at: string;
}
export interface DeploymentSettingListMatch {
    organization_id: string;
    app?: string;
    environment?: string;
    service?: string;
}
export interface DesktopLocalAgentModel {
    id: string;
    name: string;
}
export interface DesktopLocalAgentModelListMatch {
    organization_id: string;
}
export interface DesktopLocalAgentResponse {
    input: any[];
    max_output_tokens?: number;
    model: string;
    store: boolean;
    stream: boolean;
}
export interface DesktopLocalAgentResponseCreateData {
    organization_id: string;
    input: any[];
    max_output_tokens?: number;
    model: string;
    store: boolean;
    stream: boolean;
}
export interface Device {
    architecture: string;
    channel: string;
    coding_connection: Record<string, any> | null;
    connection_checked_at: string | null;
    connection_status: string;
    control_delivery_policy: Record<string, any>;
    control_spawn_policy: Record<string, any>;
    created_at: string;
    device: Record<string, any>;
    environment: string;
    execution_available: boolean;
    id: string;
    name: string;
    native_device_id: string;
    paired_at: string;
    pairing_generation: number;
    platform: string;
    project_visibility: Record<string, any>;
    provider_status?: any[];
    revoked_at: string | null;
    scheduled_check_ins?: boolean;
    user_browser_access: string;
}
export interface DeviceLoadMatch {
    id: string;
    organization_id: string;
    $action?: string;
    [action: string]: any;
}
export interface DeviceListMatch {
    organization_id: string;
    cursor?: string;
    include_revoked?: boolean;
}
export interface DeviceCreateData {
    id: string;
    organization_id: string;
    architecture: string;
    channel: string;
    name: string;
    pairing_generation: number;
    platform: string;
    access?: any;
    folders?: any;
    max_agents?: any;
    mode?: any;
    public_key?: any;
    repositories?: any;
    restricted?: any;
    transport?: any;
    version?: any;
    $action?: string;
    [action: string]: any;
}
export interface DeviceBrowserOperation {
    command: string;
    created_at: string;
    id: string;
}
export interface DeviceBrowserOperationListMatch {
    device_id: string;
    organization_id: string;
}
export interface DeviceBrowserOperationCreateData {
    device_id: string;
    id: string;
    organization_id: string;
    claim_token?: any;
    response?: any;
    $action?: string;
    [action: string]: any;
}
export interface DeviceControlMessage {
    agent_id: string;
    agent_name: string;
    expires_at: string;
    id: string;
    sender: string | null;
    text: string | null;
    text_omitted: boolean;
    thread: Record<string, any>;
}
export interface DeviceControlMessageListMatch {
    device_id: string;
    organization_id: string;
    cursor?: string;
}
export interface DeviceControlOperation {
    action: string;
    arguments: Record<string, any>;
    created_at: string;
    delivery: Record<string, any>;
    device_id: string;
    diagnostic_code?: string;
    end: Record<string, any>;
    expires_at: string;
    id: string;
    key: string;
    provider: string;
    references: Record<string, any>;
    result: any;
    result_expired: boolean;
    state: string;
}
export interface DeviceControlOperationLoadMatch {
    device_id: string;
    id: string;
    organization_id: string;
    $action?: string;
    [action: string]: any;
}
export interface DeviceControlOperationCreateData {
    device_id: string;
    organization_id: string;
    action: string;
    arguments: Record<string, any>;
    key: string;
}
export interface DeviceEnterpriseRelay {
}
export interface DeviceEnterpriseRelayLoadMatch {
}
export interface DeviceFolderListing {
    code?: string;
    error?: string;
    folders?: any[];
    id: string;
    key: string;
    parent?: string | null;
    path?: string;
    state: string;
    truncated?: boolean;
}
export interface DeviceFolderListingLoadMatch {
    device_id: string;
    id: string;
    organization_id: string;
}
export interface DeviceFolderListingCreateData {
    device_id: string;
    organization_id: string;
    key: string;
    path: string;
}
export interface DeviceGrant {
    agent_id: string;
    agent_name: string | null;
    can_edit: boolean;
    can_revoke: boolean;
    capabilities: any[];
    created_at: string;
    id: string;
    principal_id: string;
    principal_name: string | null;
    revision: number;
    revoked_at: string | null;
    updated_at: string;
}
export interface DeviceGrantListMatch {
    device_id: string;
    organization_id: string;
    cursor?: string;
}
export interface DeviceGrantCreateData {
    device_id: string;
    organization_id: string;
    agent_id: string;
    capabilities: any[];
    principal_id: string;
    $action?: string;
    [action: string]: any;
}
export interface DeviceInvocation {
}
export interface DeviceInvocationCreateData {
    device_id: string;
    organization_id: string;
    challenge?: any;
    invocation_id?: any;
    request_hash?: any;
    signature?: any;
    $action?: string;
    [action: string]: any;
}
export interface DeviceLocalEvent {
    event: string;
    recorded: boolean;
}
export interface DeviceLocalEventCreateData {
    device_id: string;
    organization_id: string;
    event: string;
}
export interface DevicePairing {
    architecture: string;
    channel: string;
    id?: string;
    name: string;
    platform: string;
    public_key: string;
}
export interface DevicePairingCreateData {
    organization_id: string;
    architecture: string;
    channel: string;
    name: string;
    platform: string;
    public_key: string;
    $action?: string;
    [action: string]: any;
}
export interface DeviceProject {
    id?: string;
}
export interface DeviceProjectRemoveMatch {
    device_id: string;
    id: string;
    organization_id: string;
}
export interface DeviceScheduledCheckIn {
    enabled: boolean;
}
export interface DeviceScheduledCheckInCreateData {
    device_id: string;
    organization_id: string;
    enabled: boolean;
}
export interface DockerBuilder {
    backend: string;
    created_at: string | null;
    gateway_url?: string | null;
    generation: number;
    id: string;
    last_activity_at: string | null;
    organization_id: string;
    ready_at: string | null;
    slept_at: string | null;
    slug: string;
    startup_attempt: number;
    startup_failure: string | null;
    startup_stage: string | null;
    status: string;
    updated_at: string | null;
}
export interface DockerBuilderLoadMatch {
    id: string;
    organization_id: string;
}
export interface DockerBuilderListMatch {
    organization_id: string;
    slug?: string;
}
export interface DockerBuilderCreateData {
    organization_id: string;
    backend?: string;
    slug?: string;
    $action?: string;
    [action: string]: any;
}
export interface DockerBuilderUpdateData {
    id: string;
    organization_id: string;
}
export interface DockerBuilderPatchData {
    id: string;
    organization_id: string;
    slug?: string;
}
export interface DockerBuilderSession {
    created_at: string;
    docker_builder_id: string;
    expires_at: string;
    gateway_url?: string | null;
    generation: number;
    id: string;
    organization_id: string;
    revoked_at: string | null;
    user_id: string;
}
export interface DockerBuilderSessionLoadMatch {
    id: string;
    organization_id: string;
}
export interface DockerBuilderSessionCreateData {
    docker_builder_id: string;
    organization_id: string;
    $action?: string;
    [action: string]: any;
}
export interface DockerBuilderSessionRemoveMatch {
    id: string;
    organization_id: string;
}
export interface DockerBuilderSetting {
    idle_timeout_seconds: number;
    max_concurrency: number;
    organization_id: string;
    region: string;
    runtime_timeout_seconds: number;
}
export interface DockerBuilderSettingLoadMatch {
    organization_id: string;
}
export interface DockerBuilderSettingUpdateData {
    organization_id: string;
}
export interface DockerBuilderSettingPatchData {
    organization_id: string;
    idle_timeout_seconds?: number;
    max_concurrency?: number;
    region?: string;
    runtime_timeout_seconds?: number;
}
export interface DomainDnsIntegration {
    account_label: string | null;
    api_token: string;
    created_at: string;
    failure_message: string | null;
    has_token: boolean;
    id: string;
    last_verified_at: string | null;
    organization_id: string;
    provider: string;
    status: string;
    updated_at: string;
}
export interface DomainDnsIntegrationListMatch {
    organization_id: string;
}
export interface DomainDnsIntegrationCreateData {
    organization_id: string;
    account_label?: string | null;
    api_token: string;
}
export interface DomainPathRule {
    action_kind: string;
    app_service_endpoint_id: string | null;
    app_service_id: string | null;
    backend_ref: string | null;
    created_at: string;
    id: string;
    last_error: string | null;
    path_prefix: string;
    status: string;
    updated_at: string;
}
export interface DomainPathRuleLoadMatch {
    app_id: string;
    domain_id: string;
    id: string;
}
export interface DomainPathRuleListMatch {
    app_id: string;
    domain_id: string;
}
export interface DomainPathRuleCreateData {
    app_id: string;
    domain_id: string;
    app_service_endpoint_id?: string | null;
    app_service_id: string | null;
    path_prefix: string;
}
export interface DomainPathRuleUpdateData {
    app_id: string;
    domain_id: string;
    id: string;
    app_service_endpoint_id?: string | null;
    app_service_id?: string | null;
    path_prefix?: string;
}
export interface DomainPathRulePatchData {
    app_id: string;
    domain_id: string;
    id: string;
    app_service_endpoint_id?: string | null;
    app_service_id?: string | null;
    path_prefix?: string;
}
export interface DomainPathRuleRemoveMatch {
    app_id: string;
    domain_id: string;
    id: string;
}
export interface Dream {
    attention: boolean;
    changes: any[];
    completed_at: string | null;
    counts: Record<string, any>;
    dream: any;
    error_code: string | null;
    id: string;
    pagination: Record<string, any>;
    permissions: Record<string, any>;
    phase: string;
    reason: string | null;
    reviewed: number;
    reviewed_date: string;
    runs: any[];
    scope_name: string;
    skipped: number;
    tab: string;
    timezone: string;
}
export interface DreamLoadMatch {
    id: string;
    organization_id: string;
    page?: number;
    project_id: string;
    tab?: string;
}
export interface DreamListMatch {
    organization_id: string;
    page?: number;
    project_id: string;
}
export interface DreamCreateData {
    id: string;
    organization_id: string;
    project_id: string;
    attention: boolean;
    changes: any[];
    completed_at: string | null;
    counts: Record<string, any>;
    dream: any;
    error_code: string | null;
    pagination: Record<string, any>;
    permissions: Record<string, any>;
    phase: string;
    reason: string | null;
    reviewed: number;
    reviewed_date: string;
    runs: any[];
    scope_name: string;
    skipped: number;
    tab: string;
    timezone: string;
    $action?: string;
    [action: string]: any;
}
export interface Edge {
}
export interface EdgeLoadMatch {
    $action?: string;
    [action: string]: any;
}
export interface EmailVerification {
}
export interface EmailVerificationCreateData {
    email?: any;
    $action?: string;
    [action: string]: any;
}
export interface Environment {
    active_revision_id: string | null;
    agent_sign_up_available: boolean;
    allowed_actions: string;
    billing: Record<string, any>;
    cleanup: any[];
    connection: string;
    created_at: string;
    default_policy?: Record<string, any>;
    default_policy_json: Record<string, any>;
    discovery_defaults: Record<string, any>;
    environment: Record<string, any>;
    exploration_accounts?: any[];
    explorations?: any[];
    first_run?: any;
    hosted_app_id: string | null;
    id: string;
    imessage_number: string | null;
    included_deep_scan: boolean;
    lock_version: number;
    managed_google_available: boolean;
    managed_google_email: string;
    messaging_tester_number?: string | null;
    name: string;
    network_connections: any[];
    onboarding_discovery?: any;
    organization_id: string;
    pending_accounts?: any[];
    permissions: Record<string, any>;
    project_id: string | null;
    repository_id: string | null;
    revisions: any[];
    setup_discovery_id?: string | null;
    sign_in_check_available: boolean;
    slug: string;
    status: string;
    target_kind: string | null;
    target_url: string | null;
    test_accounts: Record<string, any>;
    updated_at: string;
    verify_network_connection_id: string | null;
    version?: number;
}
export interface EnvironmentLoadMatch {
    id?: string;
    organization_id: string;
    project_id?: string;
}
export interface EnvironmentCreateData {
    organization_id: string;
    allowed_actions?: string;
    default_policy?: Record<string, any>;
    imessage_number?: string | null;
    messaging_tester_number?: string | null;
    name?: string;
    project_id?: string | null;
    repository_id?: string | null;
    slug: string;
    target_kind?: string | null;
    target_url?: string | null;
}
export interface EnvironmentUpdateData {
    id: string;
    organization_id: string;
    $action?: string;
    [action: string]: any;
}
export interface EnvironmentPatchData {
    id: string;
    organization_id: string;
    allowed_actions?: string;
    imessage_number?: string | null;
    messaging_tester_number?: string | null;
    name?: string;
    target_url?: string | null;
    verify_network_connection_id?: string | null;
    version?: number;
}
export interface EnvironmentRemoveMatch {
    id: string;
    organization_id: string;
    $action?: string;
    [action: string]: any;
}
export interface EnvironmentDiscoveryRun {
    account_id: string | null;
    deadline_at: string;
    environment_revision_id: string;
    evidence?: any[];
    failure_code: string | null;
    id: string;
    queued_at: string;
    recording: Record<string, any>;
    result: Record<string, any> | null;
    status: string;
}
export interface EnvironmentDiscoveryRunLoadMatch {
    environment_id: string;
    id: string;
    organization_id: string;
}
export interface EnvironmentDiscoveryRunCreateData {
    environment_id: string;
    organization_id: string;
    account_id?: string | null;
    $action?: string;
    [action: string]: any;
}
export interface EnvironmentExploration {
    account_id?: string | null;
    agent_filters: Record<string, any>;
    agents: any[];
    can_continue?: boolean;
    chat_messages?: any[];
    concurrency: number;
    covered_areas: any[];
    created_at: string;
    deadline_at: string;
    demo_project: Record<string, any> | null;
    ended_early: boolean;
    environment_id: string;
    environment_name: string;
    explorer_activity: Record<string, any>;
    finding_count: number;
    findings: any[];
    findings_fix_prompt: string | null;
    finished_at?: string | null;
    goal: string;
    huntable_flows: any[];
    id: string;
    idempotency_key?: string;
    max_seconds: number;
    max_testers: number;
    mode?: string;
    next_scan_improvements: any[];
    observed_at?: string;
    onboarding: boolean;
    paywalled: boolean;
    permissions: Record<string, any>;
    persona_id?: string | null;
    priority_counts: Record<string, any>;
    project_id?: string | null;
    related_explorations: any[];
    report: Record<string, any>;
    reproduction_of: Record<string, any> | null;
    reproductions: any[];
    saves_scenarios: boolean;
    scannable_flows: any[];
    scenario_generation: Record<string, any>;
    sign_in_needs_answer: boolean;
    sign_in_outcome: string;
    sign_in_question?: string | null;
    startup_retryable?: boolean;
    status: string;
    time_limit_reached: boolean;
    title?: string;
    unlock: any;
    web_url: string;
}
export interface EnvironmentExplorationCreateData {
    environment_id: string;
    organization_id: string;
    project_id: string;
    account_id?: string | null;
    concurrency?: number;
    goal: string;
    idempotency_key?: string;
    max_seconds?: number;
    max_testers?: number;
    persona_id?: string | null;
}
export interface EnvironmentFirstRun {
}
export interface EnvironmentFirstRunCreateData {
    environment_id: string;
    organization_id: string;
    $action?: string;
    [action: string]: any;
}
export interface EnvironmentRevision {
    allowed_origins: any[];
    app_environment_id: string | null;
    app_release_id: string | null;
    blueprint: Record<string, any>;
    blueprint_json: Record<string, any>;
    cleanup_state: string;
    created_at: string;
    digest: string;
    dry_run?: boolean;
    expires_at: string | null;
    id: string;
    organization_id: string;
    ready_at: string | null;
    resolved_manifest_json: Record<string, any>;
    retention_policy_json: Record<string, any>;
    revision: number;
    revoked_at: string | null;
    runner_environment_revision_id: string | null;
    safety_policy_json: Record<string, any>;
    schema_version: number;
    source_metadata?: Record<string, any>;
    source_metadata_json: Record<string, any>;
    status: string;
    updated_at: string;
    validation_json: Record<string, any>;
    verify_environment_id: string;
}
export interface EnvironmentRevisionLoadMatch {
    environment_id: string;
    id: string;
    organization_id: string;
}
export interface EnvironmentRevisionCreateData {
    environment_id: string;
    organization_id: string;
    blueprint: Record<string, any>;
    dry_run?: boolean;
    source_metadata?: Record<string, any>;
    $action?: string;
    [action: string]: any;
}
export interface EnvironmentRevisionUpdateData {
    environment_id: string;
    id: string;
    organization_id: string;
}
export interface EnvironmentSecretBinding {
    env_key: string;
    id?: string;
    mode?: string;
    secret_id?: string;
    secret_version_id?: string;
}
export interface EnvironmentSecretBindingLoadMatch {
    app_id: string;
    environment_id: string;
}
export interface EnvironmentSecretBindingCreateData {
    app_id: string;
    environment_id: string;
    env_key: string;
    mode?: string;
    secret_id?: string;
    secret_version_id?: string;
    $action?: string;
    [action: string]: any;
}
export interface EnvironmentSecretBindingRemoveMatch {
    app_id: string;
    environment_id: string;
    id: string;
}
export interface EnvironmentTestAccount {
    configured: boolean;
    credentials: any[];
    id?: string;
    persona: string;
    revision_id: string;
    role: string;
    tenant: string;
}
export interface EnvironmentTestAccountListMatch {
    environment_id: string;
    organization_id: string;
}
export interface EnvironmentTestAccountUpdateData {
    environment_id: string;
    id: string;
    organization_id: string;
}
export interface EnvironmentTestAccountPatchData {
    environment_id: string;
    id: string;
    organization_id: string;
    credentials?: any[];
    revision_id?: string;
}
export interface Evidence {
    id?: string;
}
export interface EvidenceLoadMatch {
    id?: string;
    organization_id: string;
    agent_id?: string;
    cursor?: string;
    exploration_id?: string;
    kind?: string;
    limit?: number;
    repository_id?: string;
    scenario_run_id?: string;
    $action?: string;
    [action: string]: any;
}
export interface ExecutionDesiredState {
    desired_state: Record<string, any>;
    id?: string;
    stop_observed: boolean;
}
export interface ExecutionDesiredStateLoadMatch {
    id: string;
}
export interface ExecutionDesiredStateCreateData {
    $action?: string;
    [action: string]: any;
}
export interface ExecutionDesiredStateUpdateData {
    id: string;
}
export interface ExecutionDesiredStatePatchData {
    id: string;
}
export interface ExecutionDesiredStateRemoveMatch {
    id: string;
}
export interface ExecutionReconcilerTick {
    id?: string;
}
export interface ExecutionReconcilerTickLoadMatch {
    id: string;
}
export interface ExecutionReconcilerTickCreateData {
}
export interface ExecutionRelease {
    id?: string;
}
export interface ExecutionReleaseLoadMatch {
    id: string;
}
export interface ExecutionReleaseCreateData {
    $action?: string;
    [action: string]: any;
}
export interface ExecutionRuntimeInstance {
    adapter_kind: string;
    app_environment_id: string;
    app_release_id: string | null;
    app_service_id: string;
    booted_at: string | null;
    booted_at_label: string | null;
    created_at: string;
    created_at_label: string | null;
    hosted_app_id: string;
    id: string;
    instance_key: string;
    last_reconciled_at: string | null;
    last_reconciled_at_label: string | null;
    last_seen_at: string | null;
    last_seen_at_label: string | null;
    location: any;
    location_id: string;
    network_peer_id: string | null;
    nomad_allocation_id: string | null;
    nomad_task_name: string | null;
    organization_id: string;
    private_ipv4: string | null;
    private_ipv6: string | null;
    provider_instance_id: string | null;
    public_endpoint: string | null;
    service_name: string;
    slug: string;
    status: string;
    terminated_at: string | null;
    terminated_at_label: string | null;
    updated_at: string;
    updated_at_label: string | null;
}
export interface ExecutionRuntimeInstanceLoadMatch {
    id: string;
}
export interface ExecutionRuntimeInstanceListMatch {
    app_environment_id?: string;
    app_service_id?: string;
    hosted_app_id?: string;
    limit?: number;
    page?: number;
}
export interface ExecutionRuntimeInstanceCreateData {
    $action?: string;
    [action: string]: any;
}
export interface ExecutionRuntimeInstanceUpdateData {
    id: string;
}
export interface ExecutionRuntimeInstancePatchData {
    id: string;
}
export interface ExecutionRuntimeInstanceRemoveMatch {
    id: string;
}
export interface Exploration {
    account_id?: string | null;
    agent_filters: Record<string, any>;
    agents: any[];
    can_continue?: boolean;
    chat_messages?: any[];
    check_count: number;
    concurrency: number;
    covered_areas: any[];
    created_at: string;
    credential_name?: string | null;
    deadline_at: string;
    demo_project: Record<string, any> | null;
    duration_ms: number | null;
    ended_early: boolean;
    environment_id: string;
    environment_name: string;
    explorer_activity: Record<string, any>;
    finding_count: number;
    findings: any[];
    findings_fix_prompt: string | null;
    finished_at?: string | null;
    goal: string;
    huntable_flows: any[];
    id: string;
    idempotency_key?: string;
    max_seconds: number;
    max_testers: number;
    mode?: string;
    next_scan_improvements: any[];
    observed_at?: string;
    onboarding: boolean;
    paywalled: boolean;
    permissions: Record<string, any>;
    persona_id?: string | null;
    priority_counts: Record<string, any>;
    project_id?: string | null;
    related_explorations: any[];
    report: Record<string, any>;
    reproduction_of: Record<string, any> | null;
    reproductions: any[];
    saves_scenarios: boolean;
    scannable_flows: any[];
    scenario_count?: number;
    scenario_generation: Record<string, any>;
    scenarios_pending?: boolean;
    sign_in_needs_answer: boolean;
    sign_in_outcome: string;
    sign_in_question?: string | null;
    started_at: string;
    startup_retryable?: boolean;
    status: string;
    time_limit_reached: boolean;
    title?: string;
    unlock: any;
    web_url: string;
}
export interface ExplorationLoadMatch {
    id: string;
    organization_id: string;
    agent_id?: string;
    evidence?: string;
    finding_id?: string;
    project_id?: string;
    $action?: string;
    [action: string]: any;
}
export interface ExplorationListMatch {
    organization_id: string;
    launch?: boolean;
    page?: number;
    project_id?: string;
}
export interface ExplorationCreateData {
    organization_id: string;
    project_id?: string;
    account_id?: string | null;
    concurrency?: number;
    environment_id: string;
    goal: string;
    idempotency_key?: string;
    max_seconds?: number;
    max_testers?: number;
    persona_id?: string | null;
    $action?: string;
    [action: string]: any;
}
export interface ExplorationMessage {
    agent_filters: Record<string, any>;
    agents: any[];
    can_continue?: boolean;
    chat_messages?: any[];
    concurrency: number;
    covered_areas: any[];
    created_at: string;
    deadline_at: string;
    demo_project: Record<string, any> | null;
    ended_early: boolean;
    environment_id: string;
    environment_name: string;
    explorer_activity: Record<string, any>;
    finding_count: number;
    findings: any[];
    findings_fix_prompt: string | null;
    finished_at?: string | null;
    goal: string;
    huntable_flows: any[];
    id: string;
    max_seconds: number;
    max_testers: number;
    mode?: string;
    next_scan_improvements: any[];
    observed_at?: string;
    onboarding: boolean;
    paywalled: boolean;
    permissions: Record<string, any>;
    priority_counts: Record<string, any>;
    project_id?: string | null;
    related_explorations: any[];
    report: Record<string, any>;
    reproduction_of: Record<string, any> | null;
    reproductions: any[];
    saves_scenarios: boolean;
    scannable_flows: any[];
    scenario_generation: Record<string, any>;
    sign_in_needs_answer: boolean;
    sign_in_outcome: string;
    sign_in_question?: string | null;
    startup_retryable?: boolean;
    status: string;
    text: string;
    time_limit_reached: boolean;
    title?: string;
    unlock: any;
    web_url: string;
}
export interface ExplorationMessageCreateData {
    exploration_id: string;
    organization_id: string;
    project_id?: string;
    text: string;
}
export interface ExplorationReport {
}
export interface ExplorationReportLoadMatch {
    exploration_id: string;
    organization_id: string;
    project_id?: string;
    $action?: string;
    [action: string]: any;
}
export interface ExplorationReportCreateData {
    exploration_id: string;
    organization_id: string;
    project_id?: string;
    source_ids?: any;
    $action?: string;
    [action: string]: any;
}
export interface ExplorationScenario {
    agent_filters: Record<string, any>;
    agents: any[];
    can_continue?: boolean;
    chat_messages?: any[];
    concurrency: number;
    covered_areas: any[];
    created_at: string;
    deadline_at: string;
    demo_project: Record<string, any> | null;
    ended_early: boolean;
    environment_id: string;
    environment_name: string;
    explorer_activity: Record<string, any>;
    finding_count: number;
    findings: any[];
    findings_fix_prompt: string | null;
    finished_at?: string | null;
    goal: string;
    huntable_flows: any[];
    id: string;
    max_seconds: number;
    max_testers: number;
    mode?: string;
    next_scan_improvements: any[];
    observed_at?: string;
    onboarding: boolean;
    paywalled: boolean;
    permissions: Record<string, any>;
    priority_counts: Record<string, any>;
    project_id?: string | null;
    related_explorations: any[];
    report: Record<string, any>;
    reproduction_of: Record<string, any> | null;
    reproductions: any[];
    saves_scenarios: boolean;
    scannable_flows: any[];
    scenario_generation: Record<string, any>;
    sign_in_needs_answer: boolean;
    sign_in_outcome: string;
    sign_in_question?: string | null;
    startup_retryable?: boolean;
    status: string;
    time_limit_reached: boolean;
    title?: string;
    unlock: any;
    web_url: string;
}
export interface ExplorationScenarioCreateData {
    exploration_id: string;
    organization_id: string;
    project_id?: string;
}
export interface Finding {
    confidence: string;
    created_at: string;
    deferred_until?: string | null;
    finding: Record<string, any>;
    fingerprint: string;
    first_seen_at: string;
    id: string;
    last_seen_at: string;
    locked: boolean;
    occurrence_count: number;
    organization_id: string;
    permissions: Record<string, any>;
    reason?: string;
    reported_occurrence: Record<string, any> | null;
    repository_id: string | null;
    safe_summary: string;
    scenario_occurrences?: any[];
    severity: string;
    status: string;
    title: string;
    updated_at: string;
    verification: any;
}
export interface FindingLoadMatch {
    id: string;
    organization_id: string;
    repository_id?: string;
}
export interface FindingListMatch {
    organization_id: string;
    status?: string;
}
export interface FindingUpdateData {
    id: string;
    organization_id: string;
}
export interface FindingPatchData {
    id: string;
    organization_id: string;
    repository_id?: string;
    deferred_until?: string | null;
    reason?: string;
    status?: string;
}
export interface Gh {
    capabilities: Record<string, any>;
    content: Record<string, any>;
    fetched_at: string;
    id?: string;
    magic_merge: Record<string, any> | null;
    pull_request: any;
    stack: Record<string, any>;
    transcript_paths: any[];
}
export interface GhLoadMatch {
    gh_id: string;
    github_repo: string;
    id: string;
    organization_id: string;
    check_id?: string;
    cursor?: string;
    job_id?: string;
    page?: number;
    run_id?: string;
    section?: string;
    thread_id?: string;
}
export interface GitImport {
    destination_mode: string;
    error?: string | null;
    git_default_branch?: string;
    git_status: string;
    git_url: string;
    id: string;
    idempotency_key: string;
    name?: string;
    native_status: string;
    organization: string;
    repository_id?: string | null;
    root_path: string;
    slug: string;
    source_branch: string;
    target_branch: string;
}
export interface GitImportLoadMatch {
    id: string;
}
export interface GitImportCreateData {
    organization_id: string;
    destination_mode: string;
    git_default_branch?: string;
    idempotency_key: string;
    name?: string;
    root_path: string;
    slug: string;
    source_branch: string;
    target_branch?: string;
    $action?: string;
    [action: string]: any;
}
export interface Github {
}
export interface GithubLoadMatch {
    name: string;
    owner: string;
    $action?: string;
    [action: string]: any;
}
export interface GithubApp {
}
export interface GithubAppCreateData {
    $action?: string;
    [action: string]: any;
}
export interface GithubAppImportableRepository {
    account_login: string;
    github_app_installation_id: string;
    next_page: number | null;
    repositories: any[];
}
export interface GithubAppImportableRepositoryListMatch {
    github_app_installation_id?: string;
    page?: number;
}
export interface GithubAppInstallation {
    account_avatar_url: string | null;
    account_id: string | null;
    account_login: string;
    created_at: string;
    created_at_label: string | null;
    id: string;
    installation_id: string;
    installed_at: string | null;
    installed_at_label: string | null;
    manage_access_url: string;
    organization_id: string;
    permission_entries: any[];
    permissions: Record<string, any>;
    status: string;
    suspended_at: string | null;
    suspended_at_label: string | null;
    updated_at: string;
    updated_at_label: string | null;
}
export interface GithubAppInstallationListMatch {
    organization_id: string;
}
export interface GithubAppInstallationCreateData {
    id: string;
    organization_id: string;
    account_avatar_url: string | null;
    account_id: string | null;
    account_login: string;
    created_at: string;
    created_at_label: string | null;
    installation_id: string;
    installed_at: string | null;
    installed_at_label: string | null;
    manage_access_url: string;
    permission_entries: any[];
    permissions: Record<string, any>;
    status: string;
    suspended_at: string | null;
    suspended_at_label: string | null;
    updated_at: string;
    updated_at_label: string | null;
    $action?: string;
    [action: string]: any;
}
export interface GithubAppInstallationRemoveMatch {
    id: string;
    organization_id: string;
    force?: boolean;
    uninstall_on_github?: boolean;
}
export interface GithubAppInstallationAuthorization {
    installation_url: string;
    organization_slug: string;
    return_target: string;
}
export interface GithubAppInstallationAuthorizationCreateData {
    organization_slug: string;
    return_target: string;
    $action?: string;
    [action: string]: any;
}
export interface GithubAppUserAuthorization {
}
export interface GithubAppUserAuthorizationCreateData {
}
export interface GithubCiRepository {
    adoption_mode: string;
    check_name_prefix: string;
    ci_runner_pool_id: string | null;
    created_at: string;
    created_at_label: string | null;
    default_branch: string;
    github_app_installation_id: string;
    github_repository_id: string;
    id: string;
    last_compatibility_status: string | null;
    last_error_message: string | null;
    last_head_sha: string | null;
    last_pull_request_number: number | null;
    last_ref: string | null;
    last_webhook_action: string | null;
    last_webhook_at: string | null;
    last_webhook_at_label: string | null;
    last_webhook_delivery_id: string | null;
    last_webhook_event: string | null;
    metadata: Record<string, any>;
    organization_id: string;
    permission_status: string;
    repository_full_name: string;
    repository_name: string;
    repository_owner: string;
    status: string;
    updated_at: string;
    updated_at_label: string | null;
    webhook_delivery_count: number;
}
export interface GithubCiRepositoryLoadMatch {
    id: string;
    organization_id: string;
}
export interface GithubCiRepositoryListMatch {
    organization_id: string;
    adoption_mode?: string;
    status?: string;
}
export interface GithubCiRepositoryCreateData {
    organization_id: string;
    adoption_mode?: string;
    check_name_prefix?: string;
    ci_runner_pool_id?: string | null;
    default_branch?: string;
    github_app_installation_id: string;
    github_repository_id: string;
    repository_name: string;
    repository_owner: string;
    status?: string;
}
export interface GithubCiRepositoryUpdateData {
    id: string;
    organization_id: string;
    adoption_mode?: string;
    check_name_prefix?: string;
    ci_runner_pool_id?: string | null;
    default_branch?: string;
    permission_status?: string;
    status?: string;
}
export interface GithubCiRepositoryPatchData {
    id: string;
    organization_id: string;
    adoption_mode?: string;
    check_name_prefix?: string;
    ci_runner_pool_id?: string | null;
    default_branch?: string;
    permission_status?: string;
    status?: string;
}
export interface GithubCiRepositoryCompatibilityReport {
    analyzed_at: string;
    analyzed_at_label: string | null;
    ci_pipeline_id: string | null;
    ci_pipeline_run_id: string | null;
    created_at: string;
    created_at_label: string | null;
    diagnostics: any[];
    errors: any[];
    event_action: string | null;
    event_name: string;
    execution_allowed: boolean;
    github_ci_repository_id: string;
    head_sha: string | null;
    id: string;
    metadata: Record<string, any>;
    organization_id: string;
    parser_version: string;
    pull_request_number: number | null;
    ref_name: string | null;
    referenced_actions: any[];
    required_secrets: any[];
    runner_labels: any[];
    source_blob_sha: string | null;
    source_sha: string;
    status: string;
    supported_features: Record<string, any>;
    updated_at: string;
    updated_at_label: string | null;
    warnings: any[];
    workflow_name: string | null;
    workflow_path: string;
}
export interface GithubCiRepositoryCompatibilityReportLoadMatch {
    github_ci_repository_id: string;
    id: string;
    organization_id: string;
}
export interface GithubCiRepositoryCompatibilityReportListMatch {
    github_ci_repository_id: string;
    organization_id: string;
    event_name?: string;
    source_sha?: string;
    status?: string;
}
export interface GithubConnection {
    accounts: any[];
    github_app_installation_id: string;
    installations: any[];
    project_id?: string;
    replace?: boolean;
    repositories: any[];
}
export interface GithubConnectionLoadMatch {
    organization_id: string;
    github_app_installation_id?: string;
    project_id?: string;
}
export interface GithubConnectionCreateData {
    organization_id: string;
    github_app_installation_id: string;
    project_id?: string;
    replace?: boolean;
    repositories: any[];
}
export interface GithubIntegration {
    account_avatar_url: string | null;
    account_login: string;
    connection_status: string;
    connection_status_label: string;
    github_installation: any;
    health: Record<string, any>;
    id: string;
    imported_repositories_count: number;
    imported_repositories_count_label: string;
    organization: Record<string, any>;
    pagination: Record<string, any>;
    repositories: any[];
}
export interface GithubIntegrationLoadMatch {
    id: string;
    organization_id: string;
    page?: number;
}
export interface GithubIntegrationListMatch {
    organization_id: string;
}
export interface GithubOnboarding {
    accounts: any[];
    active_batch_id: string | null;
    batches: any[];
    capabilities: Record<string, any>;
    installations: any[];
}
export interface GithubOnboardingLoadMatch {
    organization_id: string;
}
export interface GithubOnboardingBranch {
    branches: any[];
}
export interface GithubOnboardingBranchListMatch {
    organization_id: string;
    github_app_installation_id: string;
    name: string;
    owner: string;
}
export interface GithubOnboardingImport {
    account_login: string;
    complete: boolean;
    created_at: string;
    failed_item_count: number;
    github_app_installation_id: string;
    id: string;
    imported_item_count: number;
    item_count: number;
    items: any[];
    repositories: any;
    status: string;
    terminal_item_count: number;
    updated_at: string;
}
export interface GithubOnboardingImportCreateData {
    organization_id: string;
    github_app_installation_id: string;
    repositories: any;
}
export interface GithubOnboardingImportBatch {
    account_login: string;
    complete: boolean;
    created_at: string;
    failed_item_count: number;
    github_app_installation_id: string;
    id: string;
    imported_item_count: number;
    item_count: number;
    items: any[];
    status: string;
    terminal_item_count: number;
    updated_at: string;
}
export interface GithubOnboardingImportBatchLoadMatch {
    id: string;
    organization_id: string;
}
export interface GithubOnboardingImportItem {
    id?: string;
}
export interface GithubOnboardingImportItemCreateData {
    id: string;
    organization_id: string;
    $action?: string;
    [action: string]: any;
}
export interface GithubPullRequest {
    capabilities: Record<string, any>;
    content: Record<string, any>;
    fetched_at: string;
    id?: string;
    magic_merge: Record<string, any> | null;
    pull_request: any;
    stack: Record<string, any>;
    transcript_paths: any[];
}
export interface GithubPullRequestLoadMatch {
    id: string;
    organization_id: string;
    pull_request_id: string;
    check_id?: string;
    cursor?: string;
    job_id?: string;
    page?: number;
    run_id?: string;
    section?: string;
    thread_id?: string;
}
export interface GithubPullRequestCreateData {
    organization_id: string;
    $action?: string;
    [action: string]: any;
}
export interface GithubRunnerAdmission {
}
export interface GithubRunnerAdmissionCreateData {
}
export interface GithubRunnerCache {
    entry_id?: string;
    key?: string;
    matched_key?: string;
    ok: boolean;
    operation: string;
    restore_keys?: any[];
    signed_download_url?: string;
    size_bytes?: string;
    upload_path?: string;
    version?: string;
}
export interface GithubRunnerCacheCreateData {
    entry_id?: string;
    key?: string;
    operation: string;
    restore_keys?: any[];
    size_bytes?: string;
    version?: string;
}
export interface GithubRunnerEgress {
    can_request: boolean;
    cidr: string | null;
    ipv4: string | null;
    requested_at_label: string | null;
    status: string;
}
export interface GithubRunnerEgressLoadMatch {
    organization_id: string;
}
export interface GithubRunnerEgressCreateData {
    organization_id: string;
}
export interface GithubRunnerHistory {
    activity: any[];
    counts: Record<string, any>;
    observed_at: string;
    pagination: Record<string, any>;
    repositories: any[];
    runs: any[];
    setup?: any;
    success_rate: number | null;
    usage: Record<string, any>;
}
export interface GithubRunnerHistoryLoadMatch {
    organization_id: string;
    day?: number;
    page?: number;
    q?: string;
    repository?: string;
    status?: string;
}
export interface GithubRunnerImage {
    created_at: string;
    id: string;
    image_reference: string;
    last_error: string | null;
    modal_image_id: string | null;
    name: string;
    registry_secret_name: string | null;
    status: string;
    updated_at: string;
}
export interface GithubRunnerImageLoadMatch {
    id: string;
    organization_id: string;
}
export interface GithubRunnerImageListMatch {
    organization_id: string;
}
export interface GithubRunnerImageCreateData {
    organization_id: string;
    image_reference: string;
    name: string;
    registry_secret_name?: string | null;
    $action?: string;
    [action: string]: any;
}
export interface GithubRunnerPool {
    cpu_millicores: number;
    enabled: boolean;
    github_app_installation_id: string;
    github_repository_id: string;
    github_runner_image: any;
    id: string;
    image?: string | null;
    invocations: any[];
    label: string;
    last_error: string | null;
    last_polled_at: string | null;
    max_concurrency: number;
    memory_mb: number;
    organization_id: string;
    provider: string;
    repository_full_name: string;
    runtime_kind: string;
    timeout_seconds: number;
}
export interface GithubRunnerPoolListMatch {
    organization_id: string;
}
export interface GithubRunnerPoolCreateData {
    organization_id: string;
    enabled?: boolean;
    github_app_installation_id: string;
    image?: string | null;
    label?: string;
    max_concurrency?: number;
    provider?: string;
    repository_full_name: string;
    timeout_seconds?: number;
}
export interface GithubRunnerPoolUpdateData {
    id: string;
    organization_id: string;
    enabled?: boolean;
    image?: string | null;
    max_concurrency?: number;
    provider?: string;
    timeout_seconds?: number;
    $action?: string;
    [action: string]: any;
}
export interface GithubRunnerSetup {
    error: string | null;
    github_repository_connection_id: string;
    id: string;
    pull_request_url: string | null;
    repository_full_name: string;
    roder_thread_id: string | null;
    runner_labels: any[];
    status: string;
    status_label: string;
    summary: string | null;
}
export interface GithubRunnerSetupLoadMatch {
    organization_id: string;
    id: string;
}
export interface GithubRunnerSetupCreateData {
    organization_id: string;
    github_repository_connection_id: string;
    $action?: string;
    [action: string]: any;
}
export interface Gitlab {
    configured: boolean;
    connections: any[];
    integrations: any[];
    inventory_error?: string | null;
    next_page: number | null;
    organization: Record<string, any>;
    projects: any[];
    redirect_uri: string | null;
    selected_integration_id: string | null;
}
export interface GitlabLoadMatch {
    organization_id: string;
    connection_id?: string;
    integration_id?: string;
    page?: number;
    search?: string;
    sort?: string;
}
export interface GitlabCreateData {
    organization_id: string;
    client_id?: any;
    client_secret?: any;
    instance_url?: any;
    integration_id?: any;
    return_target?: any;
    webhook_authentication?: any;
    $action?: string;
    [action: string]: any;
}
export interface GitlabConnection {
    id?: string;
}
export interface GitlabConnectionCreateData {
    id: string;
    organization_id: string;
    action_name?: any;
    integration_id?: any;
    source_branch?: any;
    $action?: string;
    [action: string]: any;
}
export interface GitlabImport {
    integration_id: string;
    project_id: number;
    repo_slug?: string;
    source_branch?: string;
}
export interface GitlabImportCreateData {
    organization_id: string;
    integration_id: string;
    project_id: number;
    repo_slug?: string;
    source_branch?: string;
}
export interface GitlabOauth {
}
export interface GitlabOauthLoadMatch {
    $action?: string;
    [action: string]: any;
}
export interface GrantAllAgent {
    all_agents_access: boolean;
    enabled: boolean;
    execution_available: boolean;
}
export interface GrantAllAgentCreateData {
    device_id: string;
    organization_id: string;
    enabled: boolean;
}
export interface HostingAppDomain {
    app_environment_id: string | null;
    app_service_id: string | null;
    certificate: Record<string, any> | null;
    created_at: string;
    dns_mode: string;
    dns_status: string;
    failure_message: string | null;
    hosted_app_id: string;
    hostname: string;
    id: string;
    kind: string;
    last_checked_at: string | null;
    path_rules: any[];
    record_name: string | null;
    record_type: string | null;
    record_value: string | null;
    redirect_to: string | null;
    static_site_id: string | null;
    target_kind: string;
    tls_status: string;
    updated_at: string;
    verification_record: Record<string, any> | null;
    verification_status: string;
}
export interface HostingAppDomainLoadMatch {
    app_id: string;
    id?: string;
    app_environment_id?: string;
}
export interface HostingAppDomainCreateData {
    app_id: string;
    app_environment_id?: string | null;
    app_service_id: string | null;
    dns_status?: string;
    hostname: string;
    kind: string;
    redirect_to?: string | null;
    tls_status?: string;
    $action?: string;
    [action: string]: any;
}
export interface HostingAppDomainUpdateData {
    app_id: string;
    id: string;
}
export interface HostingAppDomainPatchData {
    app_id: string;
    id: string;
}
export interface HostingAppDomainRemoveMatch {
    app_id: string;
    id: string;
}
export interface IdentityOrganization {
    id?: string;
}
export interface IdentityOrganizationLoadMatch {
    id: string;
    $action?: string;
    [action: string]: any;
}
export interface ImageRepository {
    auth_configured: boolean;
    created_at: string;
    created_at_label: string | null;
    hosted_app_id: string | null;
    id: string;
    name: string;
    organization_id: string;
    provider_kind: string;
    registry_auth_token?: string;
    repository_path: string;
    slug: string;
    status: string;
    updated_at: string;
    updated_at_label: string | null;
    visibility: string;
}
export interface ImageRepositoryListMatch {
    organization_id: string;
}
export interface ImageRepositoryCreateData {
    organization_id: string;
    hosted_app_id?: string | null;
    name: string;
    provider_kind?: string;
    registry_auth_token?: string;
    repository_path?: string;
    slug: string;
    status?: string;
    visibility?: string;
}
export interface ImageRepositoryTag {
    image_repository: Record<string, any>;
    name: string;
    registry_url: string;
    tags: any[];
}
export interface ImageRepositoryTagListMatch {
    image_repository_id: string;
}
export interface ImportBranchPolicy {
    can_manage_pr_scenario_writing: boolean;
    can_manage_sandbox_region: boolean;
    dedicated_outbound_ip_addresses: any[];
    default_trunk_bookmark: string;
    organization: Record<string, any>;
    sandbox_regions: any[];
}
export interface ImportBranchPolicyLoadMatch {
    organization_id: string;
}
export interface ImportBranchPolicyUpdateData {
    organization_id: string;
}
export interface ImportBranchPolicyPatchData {
    organization_id: string;
    default_trunk_bookmark?: string;
}
export interface Integration {
    github: Record<string, any>;
    gitlab: Record<string, any>;
    permissions: Record<string, any>;
    slack: Record<string, any>;
}
export interface IntegrationLoadMatch {
    organization_id: string;
}
export interface InteractionResponse {
    answer: Record<string, any>;
    conversation_id: string;
    expected_revision: number;
}
export interface InteractionResponseCreateData {
    agent_id: string;
    interaction_id: string;
    organization_id: string;
    answer: Record<string, any>;
    conversation_id: string;
    expected_revision: number;
}
export interface Invitation {
    accepted_at: string | null;
    accepted_by_user: any;
    created_at: string;
    created_at_label: string | null;
    email: string;
    email_delivery_status?: string;
    expires_at: string | null;
    expires_at_label: string | null;
    id: string;
    invite_url: string | null;
    invited_by_user: any;
    organization: Record<string, any>;
    revoked_at: string | null;
    role: string;
    status: string;
    updated_at: string;
    updated_at_label: string | null;
}
export interface InvitationListMatch {
    organization_id: string;
}
export interface InvitationCreateData {
    organization_id: string;
    email: string;
    role: string;
}
export interface InvitationRemoveMatch {
    id: string;
    organization_id: string;
}
export interface InvocationControl {
}
export interface InvocationControlCreateData {
    device_id: string;
    organization_id: string;
    challenge?: any;
    invocation_id?: any;
    request_hash?: any;
    signature?: any;
    $action?: string;
    [action: string]: any;
}
export interface JobLogChunk {
    byte_size: number;
    ci_job_id: string | null;
    ci_pipeline_run_id: string | null;
    ci_step_id: string | null;
    content: string;
    content_format: string;
    created_at: string;
    id: string;
    organization_id: string;
    sequence_number: number;
    stream: string;
    updated_at: string;
}
export interface JobLogChunkListMatch {
    job_id: string;
    pipeline_id: string;
    run_id: string;
    after_sequence?: number;
}
export interface JobLogChunkCreateData {
    job_id: string;
    pipeline_id: string;
    run_id: string;
}
export interface JobStep {
    id?: string;
}
export interface JobStepLoadMatch {
    job_id: string;
    pipeline_id: string;
    run_id: string;
}
export interface JobStepCreateData {
    job_id: string;
    pipeline_id: string;
    run_id: string;
}
export interface JobStepUpdateData {
    id: string;
    job_id: string;
    pipeline_id: string;
    run_id: string;
}
export interface JobStepPatchData {
    id: string;
    job_id: string;
    pipeline_id: string;
    run_id: string;
}
export interface JobWorkspace {
    id?: string;
}
export interface JobWorkspaceLoadMatch {
    job_id: string;
    pipeline_id: string;
    run_id: string;
}
export interface JobWorkspaceCreateData {
    job_id: string;
    pipeline_id: string;
    run_id: string;
}
export interface JobWorkspaceUpdateData {
    id: string;
    job_id: string;
    pipeline_id: string;
    run_id: string;
}
export interface JobWorkspacePatchData {
    id: string;
    job_id: string;
    pipeline_id: string;
    run_id: string;
}
export interface JourneyVariantReplay {
    actor_id: string | null;
    can_request_qualification: boolean;
    created_at: string;
    failure_code: string | null;
    failure_message: string | null;
    id: string;
    idempotency_key: string;
    max_seconds?: number;
    preparation_receipt: Record<string, any> | null;
    qualification: any;
    qualification_status: string;
    replay_required: boolean;
    review_reason: string;
    run_id: string | null;
    scenario_file: Record<string, any>;
    scenario_run_id: string | null;
    source_digest: string;
    status: string;
    updated_at: string;
    variant_id: string;
}
export interface JourneyVariantReplayCreateData {
    journey_variant_id: string;
    organization_id: string;
    project_id: string;
    actor_id?: string | null;
    idempotency_key: string;
    max_seconds?: number;
    review_reason: string;
    scenario_file: Record<string, any>;
}
export interface Knowledge {
    content_digest: string;
    content_json: Record<string, any>;
    document: Record<string, any>;
    documents: any[];
    dreaming: Record<string, any>;
    expected_digest: string;
    history: any[];
    id: string;
    kind: string;
    markdown: string;
    observed_at: string;
    organization: Record<string, any>;
    permissions: Record<string, any>;
    project_id: string;
    project_name: string;
    projects: any[];
    selected_project_id: string | null;
    source: Record<string, any>;
    title: string;
    total: number;
}
export interface KnowledgeLoadMatch {
    id?: string;
    organization_id: string;
    project_id?: string;
    q?: string;
}
export interface KnowledgeCreateData {
    organization_id: string;
    markdown: string;
    project_id: string;
    title: string;
}
export interface KnowledgeUpdateData {
    id: string;
    organization_id: string;
}
export interface KnowledgePatchData {
    id: string;
    organization_id: string;
    expected_digest?: string;
    markdown?: string;
    title?: string;
}
export interface KnowledgeRemoveMatch {
    id: string;
    organization_id: string;
}
export interface Known {
}
export interface KnownLoadMatch {
    $action?: string;
    [action: string]: any;
}
export interface Label {
    changes_count: number;
    id: string;
    name: string;
    slug: string;
}
export interface LabelListMatch {
    organization_id: string;
    include_unused?: boolean;
    limit?: number;
    q?: string;
}
export interface LeaseArtifact {
}
export interface LeaseArtifactCreateData {
    lease_id: string;
    node_id: string;
}
export interface LeaseCache {
}
export interface LeaseCacheCreateData {
    lease_id: string;
    node_id: string;
    $action?: string;
    [action: string]: any;
}
export interface LeaseLogChunk {
}
export interface LeaseLogChunkCreateData {
    lease_id: string;
    node_id: string;
}
export interface LeaseReconciliation {
    id?: string;
}
export interface LeaseReconciliationCreateData {
    id: string;
    lease_id: string;
    node_id: string;
    $action?: string;
    [action: string]: any;
}
export interface LeaseStep {
    id?: string;
}
export interface LeaseStepUpdateData {
    id: string;
    lease_id: string;
    node_id: string;
}
export interface LeaseVerifyDiagnostic {
    browser_events: Record<string, any>;
    live_browser: Record<string, any>;
    live_view: Record<string, any>;
    steps?: any[];
}
export interface LeaseVerifyDiagnosticCreateData {
    lease_id: string;
    swarm_id: string;
    task_id: string;
    browser_events: Record<string, any>;
    live_browser: Record<string, any>;
    live_view: Record<string, any>;
    steps?: any[];
}
export interface LeaseVerifySecret {
}
export interface LeaseVerifySecretCreateData {
    lease_id: string;
    swarm_id: string;
    task_id: string;
}
export interface LeaseWorkspace {
    id?: string;
}
export interface LeaseWorkspaceUpdateData {
    id: string;
    lease_id: string;
    node_id: string;
}
export interface LocalAgentDecision {
    request: Record<string, any>;
}
export interface LocalAgentDecisionCreateData {
    organization_id: string;
    request: Record<string, any>;
}
export interface LocalAgentResponse {
    input: any[];
    model: string;
    service_tier?: string | null;
    store: boolean;
    stream: boolean;
    tools?: any[];
}
export interface LocalAgentResponseCreateData {
    organization_id: string;
    input: any[];
    model: string;
    service_tier?: string | null;
    store: boolean;
    stream: boolean;
    tools?: any[];
}
export interface LocalThreadDelivery {
    decision: string;
    decision_pending: boolean;
    delivery: Record<string, any>;
    expected_version: number;
    id?: string;
    policy: Record<string, any>;
    recovery_message: string | null;
}
export interface LocalThreadDeliveryLoadMatch {
    agent_id: string;
    id: string;
    local_thread_id: string;
    organization_id: string;
    expected_version?: number;
}
export interface LocalThreadDeliveryUpdateData {
    agent_id: string;
    id: string;
    local_thread_id: string;
    organization_id: string;
    decision?: string;
    expected_version?: number;
}
export interface LocalThreadOperation {
    action: string;
    arguments: Record<string, any>;
    created_at: string;
    delivery: Record<string, any>;
    device_id: string;
    diagnostic_code?: string;
    end: Record<string, any>;
    expires_at: string;
    id: string;
    key: string;
    provider: string;
    references: Record<string, any>;
    result: any;
    result_expired: boolean;
    state: string;
}
export interface LocalThreadOperationLoadMatch {
    agent_id: string;
    id: string;
    local_thread_id?: string;
    organization_id: string;
}
export interface LocalThreadOperationCreateData {
    agent_id: string;
    local_thread_id: string;
    organization_id: string;
    action: string;
    arguments: Record<string, any>;
    key: string;
}
export interface Location {
    code: string;
    created_at: string;
    id: string;
    name: string;
    nomad_datacenter: string;
    updated_at: string;
}
export interface LocationListMatch {
    code?: string;
    created_at?: string;
    id?: string;
    name?: string;
    nomad_datacenter?: string;
    updated_at?: string;
}
export interface LogStreamChunk {
    id?: string;
}
export interface LogStreamChunkLoadMatch {
    id?: string;
    log_stream_id: string;
    space_id: string;
}
export interface LogStreamChunkCreateData {
    log_stream_id: string;
    space_id: string;
}
export interface LogoImage {
    activated_products: any[];
    agents_only?: boolean;
    can_activate_products: boolean;
    created_at: string;
    created_at_label: string | null;
    github_prs_authored_by_change_author: boolean;
    id: string;
    logo_url: string | null;
    member_count: number;
    name: string;
    pending_invitation_count: number;
    personal: boolean;
    repository_count: number;
    role: string | null;
    sandbox_region: string;
    shared_agent_personal_accounts_enabled?: boolean;
    slug: string;
    source_control_providers?: any[];
    source_ui_enabled?: boolean;
    timezone: string;
    updated_at: string;
    updated_at_label: string | null;
    verify_pr_scenario_writing_enabled: boolean;
}
export interface LogoImageUpdateData {
    organization_id: string;
}
export interface LogoImageRemoveMatch {
    organization_id: string;
}
export interface MarketingSetting {
    call_first: boolean;
}
export interface MarketingSettingLoadMatch {
    call_first?: boolean;
}
export interface McpOauth {
}
export interface McpOauthLoadMatch {
    request: string;
    $action?: string;
    [action: string]: any;
}
export interface McpOauthCreateData {
    all_organizations?: any;
    approve?: any;
    organization_id?: any;
    request?: any;
    $action?: string;
    [action: string]: any;
}
export interface Me {
    active_organization: any;
    analytics_distinct_id?: string;
    analytics_internal: boolean;
    api_base_url?: string;
    api_token?: string;
    app_promotion: Record<string, any>;
    commit_author_email: string;
    email: string;
    enabled_features: any[];
    github_pr_user_authorization_connected: boolean;
    github_pr_user_authorization_login: string | null;
    github_prs_authored_by_change_author: boolean;
    id: string;
    impersonation: Record<string, any> | null;
    name: string | null;
    next_path?: string;
    onboarding: Record<string, any>;
    openai_sign_in_connected?: boolean;
    openai_sign_in_enabled?: boolean;
    organizations: any[];
    pending_organization_invitation_count: number;
    pending_organization_invitation_count_label: string;
    picture_url: string | null;
    superadmin?: boolean;
    time_zone?: string | null;
}
export interface MeLoadMatch {
    active_organization?: any;
    analytics_distinct_id?: string;
    analytics_internal?: boolean;
    api_base_url?: string;
    api_token?: string;
    app_promotion?: Record<string, any>;
    commit_author_email?: string;
    email?: string;
    enabled_features?: any[];
    github_pr_user_authorization_connected?: boolean;
    github_pr_user_authorization_login?: string | null;
    github_prs_authored_by_change_author?: boolean;
    id: string;
    impersonation?: Record<string, any> | null;
    name?: string | null;
    next_path?: string;
    onboarding?: Record<string, any>;
    openai_sign_in_connected?: boolean;
    openai_sign_in_enabled?: boolean;
    organizations?: any[];
    pending_organization_invitation_count?: number;
    pending_organization_invitation_count_label?: string;
    picture_url?: string | null;
    superadmin?: boolean;
    time_zone?: string | null;
    $action?: string;
    [action: string]: any;
}
export interface MeCreateData {
    action_name?: any;
    confirmation?: any;
    $action?: string;
    [action: string]: any;
}
export interface MeUpdateData {
    $action?: string;
    [action: string]: any;
}
export interface MeRemoveMatch {
    active_organization?: any;
    analytics_distinct_id?: string;
    analytics_internal?: boolean;
    api_base_url?: string;
    api_token?: string;
    app_promotion?: Record<string, any>;
    commit_author_email?: string;
    email?: string;
    enabled_features?: any[];
    github_pr_user_authorization_connected?: boolean;
    github_pr_user_authorization_login?: string | null;
    github_prs_authored_by_change_author?: boolean;
    id: string;
    impersonation?: Record<string, any> | null;
    name?: string | null;
    next_path?: string;
    onboarding?: Record<string, any>;
    openai_sign_in_connected?: boolean;
    openai_sign_in_enabled?: boolean;
    organizations?: any[];
    pending_organization_invitation_count?: number;
    pending_organization_invitation_count_label?: string;
    picture_url?: string | null;
    superadmin?: boolean;
    time_zone?: string | null;
    $action?: string;
    [action: string]: any;
}
export interface MeEmail {
    account: boolean;
    can_delete: boolean;
    can_resend_verification: boolean;
    can_set_account: boolean;
    can_set_commit_author: boolean;
    commit_author: boolean;
    email: string;
    emails: any[];
    id: string;
    message?: string;
    verification_status: string;
    verified: boolean;
}
export interface MeEmailListMatch {
    account?: boolean;
    can_delete?: boolean;
    can_resend_verification?: boolean;
    can_set_account?: boolean;
    can_set_commit_author?: boolean;
    commit_author?: boolean;
    email?: string;
    emails?: any[];
    id?: string;
    message?: string;
    verification_status?: string;
    verified?: boolean;
}
export interface MeEmailCreateData {
    email: string;
    $action?: string;
    [action: string]: any;
}
export interface MeEmailUpdateData {
    id: string;
}
export interface MeEmailPatchData {
    id: string;
    account?: boolean;
    commit_author?: boolean;
}
export interface MeEmailRemoveMatch {
    id: string;
}
export interface MeOnboarding {
}
export interface MeOnboardingCreateData {
    step?: any;
    $action?: string;
    [action: string]: any;
}
export interface MediaFile {
    id?: string;
}
export interface MediaFileLoadMatch {
    browser_session_id: string;
    id: string;
    media_id: string;
    organization_id: string;
    inline?: boolean;
}
export interface Member {
    accepted_at: string | null;
    accepted_by_user: any;
    created_at: string;
    created_at_label: string | null;
    email: string;
    email_delivery_status?: string;
    expires_at: string | null;
    expires_at_label: string | null;
    id: string;
    invite_url: string | null;
    invited_by_user: any;
    is_self: boolean;
    organization: Record<string, any>;
    revoked_at: string | null;
    role: string;
    status: string;
    updated_at: string;
    updated_at_label: string | null;
    user: Record<string, any>;
}
export interface MemberListMatch {
    organization_id: string;
}
export interface MemberUpdateData {
    id: string;
    organization_id: string;
    role?: string;
}
export interface MemberPatchData {
    id: string;
    organization_id: string;
    role?: string;
}
export interface MemberRemoveMatch {
    id: string;
    organization_id: string;
}
export interface Memory {
    confidence: string;
    created_at: string;
    environment_id?: string;
    finding: string;
    history: any[];
    id: string;
    indexed_at: string | null;
    memory: Record<string, any>;
    project_id?: string;
    response?: string;
    scope: Record<string, any>;
    source: Record<string, any>;
    tags?: any[];
    title: string;
    workaround?: string;
}
export interface MemoryLoadMatch {
    id: string;
    organization_id: string;
    environment_id?: string;
    project_id?: string;
}
export interface MemoryListMatch {
    organization_id: string;
    environment_id?: string;
    include_environment?: boolean;
    project_id?: string;
    q?: string;
    tag?: string;
}
export interface MemoryCreateData {
    organization_id: string;
    environment_id?: string;
    finding: string;
    project_id?: string;
    response?: string;
    tags?: any[];
    title: string;
    workaround?: string;
}
export interface MemoryRemoveMatch {
    id: string;
    organization_id: string;
    project_id?: string;
}
export interface MergeQueueEntry {
    analytics: Record<string, any>;
    change_id?: string | null;
    expected_target_commit_id?: string | null;
    expected_target_version?: number | null;
    expected_version: number;
    github_pr_number?: number | null;
    id?: string;
    idempotency_key: string;
    kind: string;
    policy: Record<string, any>;
    priority?: string;
    queue: Record<string, any>;
    target_branches?: any[];
    when_ready?: boolean | null;
}
export interface MergeQueueEntryCreateData {
    merge_queue_id: string;
    organization_id: string;
    repo_id: string;
    change_id?: string | null;
    expected_target_commit_id?: string | null;
    expected_target_version?: number | null;
    expected_version: number;
    github_pr_number?: number | null;
    idempotency_key: string;
    kind: string;
    priority?: string;
    when_ready?: boolean | null;
    $action?: string;
    [action: string]: any;
}
export interface MergeQueueEntryRemoveMatch {
    id: string;
    merge_queue_id: string;
    organization_id: string;
    repo_id: string;
}
export interface MergeRequest {
    available_tests: any[];
    base_sha: string;
    branch?: string;
    comment_url: string | null;
    current_run?: any;
    draft: boolean;
    findings: any[];
    github_repository: string | null;
    github_url: string | null;
    head_sha: string;
    id: string;
    idempotency_key: string;
    number: number;
    pagination: Record<string, any>;
    permissions: Record<string, any>;
    preview_cleanup_ready: boolean;
    preview_url?: string | null;
    project?: any;
    project_id: string | null;
    project_slug: string | null;
    provider: string;
    pull_request: Record<string, any>;
    repository_id: string;
    request_label: string;
    requested_run_id: string | null;
    runs: any[];
    source_branch: string | null;
    source_repository: string | null;
    source_url: string | null;
    state: string;
    title: string;
    updated_at: string;
    web_path: string;
}
export interface MergeRequestLoadMatch {
    id: string;
    organization_id: string;
    page?: number;
}
export interface MergeRequestCreateData {
    organization_id: string;
    branch?: string;
    head_sha?: string;
    idempotency_key: string;
    number: number;
    project_id?: string | null;
    repository_id?: string;
    $action?: string;
    [action: string]: any;
}
export interface MergeResolution {
    action: string;
    base: string;
    content?: string | null;
    context?: Record<string, any>;
    duration_ms: number;
    fallback: boolean;
    model?: string;
    ours: string;
    path?: string;
    resolved: boolean;
    theirs: string;
}
export interface MergeResolutionCreateData {
    base: string;
    context?: Record<string, any>;
    ours: string;
    path?: string;
    theirs: string;
}
export interface MessagingConversationMessage {
    attachment_limit: number;
    attachment_max_bytes: number;
    client_operation_id: string;
    content: string;
    id?: string;
    media: Record<string, any>;
    media_upload_ids?: any[];
    messages: any[];
    reply_to?: string;
    retry_attachment?: boolean;
    send_blocked_reason: string | null;
    send_disposition?: string;
    send_error?: string | null;
    send_style?: string | null;
}
export interface MessagingConversationMessageCreateData {
    messaging_conversation_id: string;
    organization_id: string;
    project_id: string;
    client_operation_id: string;
    content: string;
    media: Record<string, any>;
    media_upload_ids?: any[];
    reply_to?: string;
    retry_attachment?: boolean;
    send_style?: string | null;
    $action?: string;
    [action: string]: any;
}
export interface MessagingConversationUpload {
    attachment: Record<string, any>;
    upload_id: string;
}
export interface MessagingConversationUploadCreateData {
    messaging_conversation_id: string;
    organization_id: string;
    project_id: string;
}
export interface MetricQuery {
}
export interface MetricQueryLoadMatch {
}
export interface MetronomeWebhook {
}
export interface MetronomeWebhookCreateData {
}
export interface ModelSubscriptionAccount {
    accounts: any[];
    agents: any[];
    can_disconnect: boolean;
    connection_agent: Record<string, any> | null;
    email?: string;
    id: string;
    label: string;
    provider: string;
    saved: boolean;
    status: string;
    usable: boolean;
}
export interface ModelSubscriptionAccountListMatch {
    accounts?: any[];
    agents?: any[];
    can_disconnect?: boolean;
    connection_agent?: Record<string, any> | null;
    email?: string;
    id?: string;
    label?: string;
    provider?: string;
    saved?: boolean;
    status?: string;
    usable?: boolean;
}
export interface ModelSubscriptionAccountCreateData {
    label: string;
    action_name?: any;
    agent_id?: any;
    profile_id?: any;
    token?: any;
}
export interface ModelSubscriptionAccountUpdateData {
    id: string;
}
export interface ModelSubscriptionAccountPatchData {
    id: string;
    label?: string;
}
export interface ModelSubscriptionAccountRemoveMatch {
    id: string;
}
export interface ModelSubscriptionAccountConnection {
    id?: string;
}
export interface ModelSubscriptionAccountConnectionLoadMatch {
    id: string;
}
export interface ModelSubscriptionAccountConnectionUpdateData {
    id: string;
    action_name?: any;
    login_id?: any;
    method?: any;
    step_id?: any;
    value?: any;
}
export interface NetworkConnection {
    aws_client_vpn_profile?: string;
    created_at: string;
    device_tag?: string;
    id: string;
    name: string;
    oauth_client_id?: string;
    oauth_client_secret?: string;
    provider?: string;
    status?: string;
    updated_at: string;
}
export interface NetworkConnectionCreateData {
    organization_id: string;
    aws_client_vpn_profile?: string;
    device_tag?: string;
    name: string;
    oauth_client_id?: string;
    oauth_client_secret?: string;
    provider?: string;
    status?: string;
}
export interface NetworkConnectionUpdateData {
    id: string;
    organization_id: string;
}
export interface NetworkConnectionPatchData {
    id: string;
    organization_id: string;
    aws_client_vpn_profile?: string;
    device_tag?: string;
    name?: string;
    oauth_client_id?: string;
    oauth_client_secret?: string;
    provider?: string;
    status?: string;
}
export interface NetworkingSpace {
    id?: string;
}
export interface NetworkingSpaceLoadMatch {
    id: string;
    $action?: string;
    [action: string]: any;
}
export interface NetworkingSpaceCreateData {
    $action?: string;
    [action: string]: any;
}
export interface NetworkingSpaceUpdateData {
    id: string;
}
export interface NetworkingSpacePatchData {
    id: string;
}
export interface NetworkingSpaceRemoveMatch {
    id: string;
}
export interface Node {
    account_avatar_url: string | null;
    account_id: string | null;
    account_login: string;
    created_at: string;
    created_at_label: string | null;
    id: string;
    installation_id: string;
    installed_at: string | null;
    installed_at_label: string | null;
    manage_access_url: string;
    organization_id: string;
    permission_entries: any[];
    permissions: Record<string, any>;
    status: string;
    suspended_at: string | null;
    suspended_at_label: string | null;
    updated_at: string;
    updated_at_label: string | null;
}
export interface NodeListMatch {
    organization_id: string;
}
export interface NodeCertificate {
}
export interface NodeCertificateCreateData {
    node_id: string;
    $action?: string;
    [action: string]: any;
}
export interface NodeLease {
    id?: string;
}
export interface NodeLeaseLoadMatch {
    node_id: string;
    $action?: string;
    [action: string]: any;
}
export interface NodeLeaseCreateData {
    id: string;
    node_id: string;
    $action?: string;
    [action: string]: any;
}
export interface NomadAllocation {
    allocation_id: string;
    client_status: string | null;
    create_time: string | null;
    datacenter: string | null;
    desired_description: string | null;
    desired_status: string | null;
    fetched_at: string;
    id?: string;
    job_id: string | null;
    modify_time: string | null;
    name: string | null;
    namespace: string;
    node_id: string | null;
    node_name: string | null;
    resources: Record<string, any>;
    task_group: string | null;
    task_states: any[];
    verify_runner_images?: any[];
}
export interface NomadAllocationLoadMatch {
    app_id: string;
    id: string;
}
export interface NomadLog {
    allocation_id: string;
    environment?: string;
    fetched_at: string;
    location?: string | null;
    logs: string;
    namespace: string;
    offset: number;
    origin: string;
    service?: string;
    task: string;
    type: string;
}
export interface NomadLogLoadMatch {
    app_id: string;
    environment?: string;
    location?: string;
    offset?: number;
    origin?: string;
    service?: string;
    task?: string;
    type?: string;
}
export interface Now {
    needs_attention: any[];
    pagination: Record<string, any>;
    recently_landed: any[];
    shipping_now: any[];
    summary: Record<string, any>;
}
export interface NowLoadMatch {
    organization_id: string;
    page?: number;
}
export interface ObservabilityClickhouseCluster {
    id?: string;
}
export interface ObservabilityClickhouseClusterLoadMatch {
    id: string;
}
export interface ObservabilityClickhouseClusterCreateData {
    $action?: string;
    [action: string]: any;
}
export interface ObservabilityClickhouseClusterUpdateData {
    id: string;
}
export interface ObservabilityClickhouseClusterPatchData {
    id: string;
}
export interface ObservabilityClickhouseClusterRemoveMatch {
    id: string;
}
export interface ObservabilityQuickwitCluster {
    id?: string;
}
export interface ObservabilityQuickwitClusterLoadMatch {
    id: string;
}
export interface ObservabilityQuickwitClusterCreateData {
    $action?: string;
    [action: string]: any;
}
export interface ObservabilityQuickwitClusterUpdateData {
    id: string;
}
export interface ObservabilityQuickwitClusterPatchData {
    id: string;
}
export interface ObservabilityQuickwitClusterRemoveMatch {
    id: string;
}
export interface ObservabilitySpace {
    id?: string;
}
export interface ObservabilitySpaceLoadMatch {
    id: string;
}
export interface ObservabilitySpaceCreateData {
    $action?: string;
    [action: string]: any;
}
export interface ObservabilitySpaceUpdateData {
    id: string;
}
export interface ObservabilitySpacePatchData {
    id: string;
}
export interface ObservabilitySpaceRemoveMatch {
    id: string;
}
export interface Openapi {
}
export interface OpenapiLoadMatch {
}
export interface OrgInvitation {
    id?: string;
    invitation: Record<string, any>;
    registration_options: any;
    requires_password_setup: boolean;
    start_guided_setup: boolean;
}
export interface OrgInvitationLoadMatch {
    id: string;
}
export interface OrgInvitationCreateData {
    id: string;
    $action?: string;
    [action: string]: any;
}
export interface Organization {
    activated_products: any[];
    agents_only?: boolean;
    can_activate_products: boolean;
    created_at: string;
    created_at_label: string | null;
    github_prs_authored_by_change_author: boolean;
    google_workspace_domain?: string | null;
    id: string;
    logo_url: string | null;
    member_count: number;
    name: string;
    pending_invitation_count: number;
    personal: boolean;
    repository_count: number;
    role: string | null;
    sandbox_region: string;
    shared_agent_personal_accounts_enabled?: boolean;
    slug: string;
    source_control_providers?: any[];
    source_ui_enabled?: boolean;
    timezone: string;
    updated_at: string;
    updated_at_label: string | null;
    verify_pr_scenario_writing_enabled: boolean;
}
export interface OrganizationLoadMatch {
    id: string;
}
export interface OrganizationListMatch {
    activated_products?: any[];
    agents_only?: boolean;
    can_activate_products?: boolean;
    created_at?: string;
    created_at_label?: string | null;
    github_prs_authored_by_change_author?: boolean;
    google_workspace_domain?: string | null;
    id?: string;
    logo_url?: string | null;
    member_count?: number;
    name?: string;
    pending_invitation_count?: number;
    personal?: boolean;
    repository_count?: number;
    role?: string | null;
    sandbox_region?: string;
    shared_agent_personal_accounts_enabled?: boolean;
    slug?: string;
    source_control_providers?: any[];
    source_ui_enabled?: boolean;
    timezone?: string;
    updated_at?: string;
    updated_at_label?: string | null;
    verify_pr_scenario_writing_enabled?: boolean;
}
export interface OrganizationCreateData {
    name: string;
    slug: string;
    timezone?: string;
}
export interface OrganizationUpdateData {
    id: string;
    github_prs_authored_by_change_author?: boolean;
    google_workspace_domain?: string | null;
    name?: string;
    sandbox_region?: string;
    shared_agent_personal_accounts_enabled?: boolean;
    slug?: string;
    timezone?: string;
    verify_pr_scenario_writing_enabled?: boolean;
}
export interface OrganizationPatchData {
    id: string;
    github_prs_authored_by_change_author?: boolean;
    google_workspace_domain?: string | null;
    name?: string;
    sandbox_region?: string;
    shared_agent_personal_accounts_enabled?: boolean;
    slug?: string;
    timezone?: string;
    verify_pr_scenario_writing_enabled?: boolean;
}
export interface OrganizationApp {
    id?: string;
}
export interface OrganizationAppLoadMatch {
    organization_id: string;
    context?: boolean;
    installed?: boolean;
    native_agent_id: string;
}
export interface OrganizationAppUpdateData {
    id: string;
    organization_id: string;
    $action?: string;
    [action: string]: any;
}
export interface OrganizationAppRemoveMatch {
    id: string;
    organization_id: string;
    $action?: string;
    [action: string]: any;
}
export interface OrganizationControl {
}
export interface OrganizationControlCreateData {
    organization_id: string;
    device_id?: any;
    native_device_id?: any;
    pairing_generation?: any;
    $action?: string;
    [action: string]: any;
}
export interface OrganizationDevice {
    id?: string;
}
export interface OrganizationDeviceCreateData {
    id: string;
    organization_id: string;
    payload?: any;
    signature?: any;
    $action?: string;
    [action: string]: any;
}
export interface OrganizationIdentityCertificate {
    id?: string;
}
export interface OrganizationIdentityCertificateLoadMatch {
    id?: string;
    organization_id: string;
}
export interface OrganizationIdentityCertificateCreateData {
    organization_id: string;
    $action?: string;
    [action: string]: any;
}
export interface OrganizationIdentityCertificateUpdateData {
    id: string;
    organization_id: string;
}
export interface OrganizationIdentityCertificatePatchData {
    id: string;
    organization_id: string;
}
export interface OrganizationIdentityCertificateRemoveMatch {
    id: string;
    organization_id: string;
}
export interface OrganizationInteraction {
}
export interface OrganizationInteractionCreateData {
    organization_id: string;
}
export interface OrganizationInvitation {
    email: string;
    id?: string;
    role: string;
}
export interface OrganizationInvitationCreateData {
    organization_id: string;
    email: string;
    role: string;
}
export interface OrganizationInvitationRemoveMatch {
    id: string;
    organization_id: string;
}
export interface OrganizationMessageFile {
}
export interface OrganizationMessageFileCreateData {
    organization_id: string;
}
export interface OrganizationOidcTrust {
    id?: string;
}
export interface OrganizationOidcTrustLoadMatch {
    id?: string;
    organization_id: string;
}
export interface OrganizationOidcTrustCreateData {
    organization_id: string;
    $action?: string;
    [action: string]: any;
}
export interface OrganizationOidcTrustUpdateData {
    id: string;
    organization_id: string;
}
export interface OrganizationOidcTrustPatchData {
    id: string;
    organization_id: string;
}
export interface OrganizationOidcTrustRemoveMatch {
    id: string;
    organization_id: string;
}
export interface OrganizationRunEvent {
}
export interface OrganizationRunEventCreateData {
    organization_id: string;
}
export interface OrganizationRunOutcome {
}
export interface OrganizationRunOutcomeCreateData {
    organization_id: string;
}
export interface OrganizationRunUsage {
}
export interface OrganizationRunUsageCreateData {
    organization_id: string;
}
export interface OrganizationSandbox {
}
export interface OrganizationSandboxCreateData {
    organization_id: string;
    $action?: string;
    [action: string]: any;
}
export interface OrganizationSecret {
    app_environment_id: string | null;
    app_service_id: string | null;
    created_at: string;
    created_at_label: string | null;
    created_by: Record<string, any> | null;
    current_version: Record<string, any> | null;
    description: string | null;
    env_key: string;
    expose_to_build: boolean;
    expose_to_ci: boolean;
    hosted_app_id: string | null;
    id: string;
    last_accessed_at: string | null;
    last_accessed_at_label: string | null;
    last_accessed_by: Record<string, any> | null;
    latest_version_number: number | null;
    name: string;
    organization_id: string | null;
    owner_service_account_id: string | null;
    rotation_policy: string | null;
    scope_kind: string;
    slug: string;
    status: string;
    updated_at: string;
    updated_at_label: string | null;
}
export interface OrganizationSecretLoadMatch {
    id: string;
    organization_id: string;
    $action?: string;
    [action: string]: any;
}
export interface OrganizationSecretListMatch {
    organization_id: string;
}
export interface OrganizationSecretCreateData {
    organization_id: string;
    $action?: string;
    [action: string]: any;
}
export interface OrganizationSecretUpdateData {
    id: string;
    organization_id: string;
}
export interface OrganizationSecretPatchData {
    id: string;
    organization_id: string;
}
export interface OrganizationSecretRemoveMatch {
    id: string;
    organization_id: string;
}
export interface OrganizationServiceAccount {
    id?: string;
}
export interface OrganizationServiceAccountLoadMatch {
    id?: string;
    organization_id: string;
}
export interface OrganizationServiceAccountCreateData {
    organization_id: string;
    $action?: string;
    [action: string]: any;
}
export interface OrganizationServiceAccountUpdateData {
    id: string;
    organization_id: string;
}
export interface OrganizationServiceAccountPatchData {
    id: string;
    organization_id: string;
}
export interface OrganizationServiceAccountRemoveMatch {
    id: string;
    organization_id: string;
}
export interface OrganizationSetting {
    concurrent_run_limit_override?: number | null;
    customize_onboarding_packages?: boolean;
    daily_run_limit_override?: number | null;
    deployment_usage_visibility?: string;
    monthly_browser_minutes_limit_override?: number | null;
    monthly_budget_dollars?: string | number | null;
    name?: string;
    onboarding_custom_pricing?: boolean;
    onboarding_package_keys?: any[];
}
export interface OrganizationSettingUpdateData {
    organization_id: string;
    concurrent_run_limit_override?: number | null;
    customize_onboarding_packages?: boolean;
    daily_run_limit_override?: number | null;
    deployment_usage_visibility?: string;
    monthly_browser_minutes_limit_override?: number | null;
    monthly_budget_dollars?: string | number | null;
    name?: string;
    onboarding_custom_pricing?: boolean;
    onboarding_package_keys?: any[];
}
export interface OrganizationSite {
    id?: string;
}
export interface OrganizationSiteLoadMatch {
    organization_id: string;
    native_agent_id: string;
}
export interface OrganizationSiteCreateData {
    organization_id: string;
    $action?: string;
    [action: string]: any;
}
export interface OrganizationSiteUpdateData {
    id: string;
    organization_id: string;
    $action?: string;
    [action: string]: any;
}
export interface OrganizationSiteRemoveMatch {
    id: string;
    organization_id: string;
    $action?: string;
    [action: string]: any;
}
export interface OrganizationSubscription {
}
export interface OrganizationSubscriptionCreateData {
    organization_id: string;
    $action?: string;
    [action: string]: any;
}
export interface OrganizationTool {
    arguments: Record<string, any>;
    native_agent_id: string;
    tool: string;
}
export interface OrganizationToolCreateData {
    organization_id: string;
    arguments: Record<string, any>;
    native_agent_id: string;
    tool: string;
}
export interface OrganizationWorkloadIdentity {
    id?: string;
}
export interface OrganizationWorkloadIdentityLoadMatch {
    id?: string;
    organization_id: string;
}
export interface OrganizationWorkloadIdentityCreateData {
    organization_id: string;
    $action?: string;
    [action: string]: any;
}
export interface OrganizationWorkloadIdentityUpdateData {
    id: string;
    organization_id: string;
}
export interface OrganizationWorkloadIdentityPatchData {
    id: string;
    organization_id: string;
}
export interface OrganizationWorkloadIdentityRemoveMatch {
    id: string;
    organization_id: string;
}
export interface OtelIngest {
}
export interface OtelIngestCreateData {
    $action?: string;
    [action: string]: any;
}
export interface Page {
    active_runs: any[];
    checkout_required: boolean;
    cli_signed_in_at: string | null;
    counts: Record<string, any>;
    demo_project: Record<string, any> | null;
    environments: any[];
    included_deep_scan: boolean;
    onboarding_discovery?: any;
    organization: Record<string, any>;
    permissions: Record<string, any>;
    project: any;
    pull_request_launch_options?: any[];
    pull_requests?: any[];
    repositories: any[];
    runs: any[];
    runs_pagination: Record<string, any>;
    suggested_app_url: string | null;
    url_first_start: boolean;
}
export interface PageLoadMatch {
    organization_id: string;
    page?: number;
    project_id?: string;
    query?: string;
    section?: string;
    status?: string;
    verify_environment_id?: string;
}
export interface PageAgent {
    agents: any[];
    can_edit_integration_connections: boolean;
    creation_enabled: boolean;
    inbox?: any;
    integration_choices: any[];
    integration_choices_truncated: boolean;
    integration_selected: any[];
    model_choices?: any[];
    new_configuration: any;
    organization_id: string;
    pagination: Record<string, any>;
    pinned_agent: any;
    platform_event_types: any[];
    repository_choices: any[];
    repository_choices_truncated: boolean;
    runtime_versions?: any[];
    selected_agent: any;
    selected_reference: string | null;
    viewer_id: string;
}
export interface PageAgentLoadMatch {
    organization_id: string;
    agent?: string;
    agent_search?: string;
    agent_visibility?: string;
    cursor?: string;
    integration_search?: string;
    limit?: number;
    $action?: string;
    [action: string]: any;
}
export interface PageAgentCreateData {
    organization_id: string;
    agent_ids?: any;
    $action?: string;
    [action: string]: any;
}
export interface PageArtefact {
    artefact: any;
    automation: Record<string, any> | null;
    automation_invocation_id?: string | null;
    byte_size: number;
    checksum_sha256: string;
    comment_threads: any[];
    content_type: string;
    created_at?: string | null;
    created_by_user_id?: string | null;
    description?: string | null;
    document_key?: string;
    draft: Record<string, any> | null;
    entrypoint?: string;
    expires_at?: string | null;
    filename: string;
    files?: any[];
    harness?: string | null;
    harness_version?: string | null;
    id: string;
    kind: string;
    kinds: any[];
    model?: string | null;
    organization: Record<string, any>;
    organization_id: string;
    pagination: Record<string, any>;
    permissions: Record<string, any>;
    preview: Record<string, any>;
    published_at?: string | null;
    published_at_label: string | null;
    publisher: Record<string, any> | null;
    repository: Record<string, any> | null;
    repository_id?: string | null;
    selected_path?: string;
    slug: string;
    source: string;
    status: string;
    title: string;
    vcs_agent_checkpoint_id?: string | null;
    vcs_agent_session_id?: string | null;
    version: number;
    versions: any[];
    view_url: string;
    web_url: string;
}
export interface PageArtefactLoadMatch {
    id: string;
    organization_id: string;
    file?: string;
    version?: number;
    versions_page?: number;
}
export interface PageArtefactListMatch {
    organization_id: string;
    author?: string;
    harness?: string;
    kind?: string;
    model?: string;
    page?: number;
    q?: string;
    repo?: string;
    slug?: string;
    source?: string;
}
export interface PageCiPipelineRun {
    error: string | null;
    id?: string;
    jobs: any[];
}
export interface PageCiPipelineRunLoadMatch {
    id: string;
    pipeline_id: string;
}
export interface PageProjectRun {
    available_tests: any[];
    fix_scenario_count: number;
    fix_scenarios: any[];
    fixable_count: number;
    id?: string;
    pagination: Record<string, any>;
    permissions: Record<string, any>;
    preparation_reason: string | null;
    project: Record<string, any>;
    run: Record<string, any>;
    scenario_runs: any[];
    selected_scenario_run: any;
    web_path: string;
}
export interface PageProjectRunLoadMatch {
    id: string;
    organization_id: string;
    project_id: string;
    browser?: string;
    detail?: boolean;
    page?: number;
}
export interface PageRepoVcCommit {
    commit: any;
    diff_path: string;
    id?: string;
}
export interface PageRepoVcCommitLoadMatch {
    id: string;
    organization_id: string;
    repo_id: string;
    parent?: string;
}
export interface PagesBilling {
    addons: any[];
    breakdown: any;
    budget: any;
    can_manage_contact: boolean;
    can_manage_extra_spend: boolean;
    can_manage_local_subscription: boolean;
    can_manage_payment_method: boolean;
    can_set_up_billing: boolean;
    customer: any;
    deployment_usage_visible: boolean;
    entitlements: Record<string, any>;
    extra_spend_enabled: boolean;
    feature_enabled: boolean;
    organization_id: string;
    package: any;
    prepaid: any;
    preview: any;
    storage_usage: Record<string, any>;
    stripe: Record<string, any>;
    subscription: any;
    token_account: Record<string, any>;
}
export interface PagesBillingLoadMatch {
    organization_id: string;
}
export interface PagesGithubOnboarding {
    onboarding: Record<string, any>;
    organization: Record<string, any>;
}
export interface PagesGithubOnboardingLoadMatch {
    organization_id: string;
    github_app_installation_id?: string;
    github_import_batch_id?: string;
}
export interface PagesMember {
    accepted_at: string | null;
    accepted_by_user: any;
    created_at: string;
    created_at_label: string | null;
    email: string;
    email_delivery_status?: string;
    expires_at: string | null;
    expires_at_label: string | null;
    id: string;
    invite_url: string | null;
    invited_by_user: any;
    organization: Record<string, any>;
    revoked_at: string | null;
    role: string;
    status: string;
    updated_at: string;
    updated_at_label: string | null;
}
export interface PagesMemberListMatch {
    organization_id: string;
}
export interface PagesProjectCredential {
    browser_authentication?: Record<string, any> | null;
    composal_address: string | null;
    configured: boolean;
    credential_keys: Record<string, any>;
    description: string | null;
    email_link_auth_origins: any[];
    has_inbox: boolean;
    id: string;
    identity_provider: Record<string, any> | null;
    instructions: string | null;
    login_method: string;
    login_url: string;
    managed: boolean;
    mfa_enabled: boolean;
    name: string;
    project_id: string;
    provider_guidance: string;
    sign_in_verified: boolean;
    sign_in_verified_at: string | null;
    status: string;
    updated_at: string;
    username: string;
}
export interface PagesProjectCredentialListMatch {
    organization_id: string;
    project_id: string;
}
export interface PagesProjectPersona {
    access_mode: string;
    active_run_count: number;
    archived_at: string | null;
    attention: any[];
    capabilities: string | null;
    created_at: string;
    credential: any;
    credential_id: string | null;
    goals: string | null;
    health: Record<string, any>;
    id: string;
    lock_version: number;
    name: string;
    project_id: string;
    role: string;
    scenario_count: number;
    updated_at: string;
}
export interface PagesProjectPersonaListMatch {
    organization_id: string;
    project_id: string;
}
export interface PagesProjectRun {
    archived_at: string | null;
    browser_seconds: number | null;
    can_archive: boolean;
    can_restore: boolean;
    cleanup_state: string;
    commit_sha: string | null;
    created_at: string;
    duration_seconds: number | null;
    environment_name: string | null;
    finished_at: string | null;
    id: string;
    outcome: string | null;
    pull_request: any;
    pull_request_label: string | null;
    scenario_count: number;
    source_run: Record<string, any> | null;
    started_at: string | null;
    state: string;
    title: string;
    trigger_kind: string;
    triggered_by: string | null;
    web_path: string;
}
export interface PagesProjectRunListMatch {
    organization_id: string;
    project_id: string;
    environment_id?: string;
    environment_query?: string;
    page?: number;
    query?: string;
    status?: string;
    trigger?: string;
}
export interface PagesProjectScenario {
    base_url: string | null;
    id: string;
    kind: string | null;
    name: string;
}
export interface PagesProjectScenarioListMatch {
    organization_id: string;
    project_id: string;
    limit?: number;
    sort?: string;
}
export interface PagesRegistry {
    active_repository_count: number;
    error: string | null;
    pagination: Record<string, any>;
    repositories: any[];
    repository_count: number;
}
export interface PagesRegistryLoadMatch {
    organization_id: string;
    page?: number;
}
export interface PagesSession {
    adapter?: string;
    created_at: string | null;
    cursor?: string;
    ended_at: string | null;
    external_session_id: string;
    facets: Record<string, any>;
    from?: string;
    github_access_warnings?: any[];
    harness: string;
    id: string;
    last_activity_at: string | null;
    last_checkpoint_at: string | null;
    limit?: number;
    markers: any[];
    max_bytes?: number;
    mode?: string;
    offset?: number;
    pagination: Record<string, any>;
    query?: string;
    repo?: string;
    repository: any;
    search?: any;
    search_enabled?: boolean;
    session: any;
    sessions: any[];
    started_at: string | null;
    stats: Record<string, any>;
    status?: string;
    title: string | null;
    to?: string;
    token_stats: any;
    transcript_index: any;
    transcript_stats: any;
    updated_at: string | null;
    user: any;
    user_id?: string;
}
export interface PagesSessionLoadMatch {
    id: string;
    organization_id: string;
    around_event?: number;
    checkpoint?: string;
    event_digest?: string;
}
export interface PagesSessionListMatch {
    organization_id: string;
    adapter?: string;
    from?: string;
    limit?: number;
    offset?: number;
    repo?: string;
    session?: string;
    status?: string;
    to?: string;
    user_id?: string;
}
export interface PagesSessionCreateData {
    organization_id: string;
    adapter?: string;
    cursor?: string;
    from?: string;
    limit?: number;
    max_bytes?: number;
    mode?: string;
    offset?: number;
    query?: string;
    repo?: string;
    status?: string;
    to?: string;
    user_id?: string;
}
export interface Pairing {
    id?: string;
}
export interface PairingLoadMatch {
    id: string;
}
export interface PairingCreateData {
    $action?: string;
    [action: string]: any;
}
export interface PairingEvent {
}
export interface PairingEventLoadMatch {
    pairing_id: string;
}
export interface ParallelV1 {
}
export interface ParallelV1CreateData {
    organization_id: string;
    $action?: string;
    [action: string]: any;
}
export interface PatchsetDiff {
    files: any[];
    id?: string;
    patchset: Record<string, any>;
}
export interface PatchsetDiffLoadMatch {
    change_id: string;
    id: string;
    organization_id: string;
    patchset_id: string;
    repo_id: string;
}
export interface PersonalAccessToken {
    id?: string;
}
export interface PersonalAccessTokenLoadMatch {
    id: string;
}
export interface PersonalAccessTokenCreateData {
}
export interface PersonalAccessTokenRemoveMatch {
    id: string;
}
export interface PreviewOperation {
}
export interface PreviewOperationLoadMatch {
    app_id: string;
    preview_id: string;
}
export interface PreviewProfileSecretBinding {
    env_key: string;
    id?: string;
    mode?: string;
    secret_id?: string;
    secret_version_id?: string;
}
export interface PreviewProfileSecretBindingLoadMatch {
    app_id: string;
    preview_profile_id: string;
}
export interface PreviewProfileSecretBindingCreateData {
    app_id: string;
    preview_profile_id: string;
    env_key: string;
    mode?: string;
    secret_id?: string;
    secret_version_id?: string;
}
export interface PreviewProfileSecretBindingRemoveMatch {
    app_id: string;
    id: string;
    preview_profile_id: string;
}
export interface PreviewSecret {
    env_key: string;
    id?: string;
    name: string;
    slug: string;
    value: string;
}
export interface PreviewSecretCreateData {
    app_id: string;
    preview_id: string;
    env_key: string;
    name: string;
    slug: string;
    value: string;
    $action?: string;
    [action: string]: any;
}
export interface PreviewSecretRemoveMatch {
    app_id: string;
    id: string;
    preview_id: string;
}
export interface PreviewSharingApproval {
    approved_build_keys: any[];
    approved_build_secrets: any[];
    approved_default_configuration: any[];
    approved_default_secrets: any[];
    approved_source_keys: any[];
    build_keys?: any[];
    build_secrets: any[];
    default_configuration: any[];
    default_secrets: any[];
    services: any[];
    snapshot_version: number;
    source_keys: any[];
}
export interface PreviewSharingApprovalLoadMatch {
    app_id: string;
    preview_id: string;
}
export interface PreviewSharingApprovalCreateData {
    app_id: string;
    preview_id: string;
    build_keys?: any[];
    build_secrets?: any[];
    default_configuration?: any[];
    default_secrets?: any[];
    snapshot_version: number;
    source_keys?: any[];
}
export interface ProactiveAgentWaitlistEntry {
    email: string;
    first_task?: string | null;
    invite_code?: string | null;
    places_per_referral: number;
    position: number;
    position_after_next_referral: number;
    referral_code: string;
    referral_count: number;
    total: number;
    website?: string | null;
}
export interface ProactiveAgentWaitlistEntryLoadMatch {
    id: string;
}
export interface ProactiveAgentWaitlistEntryCreateData {
    email: string;
    first_task?: string | null;
    invite_code?: string | null;
    website?: string | null;
}
export interface Product {
    activated_products: any[];
    agents_only?: boolean;
    can_activate_products: boolean;
    created_at: string;
    created_at_label: string | null;
    github_prs_authored_by_change_author: boolean;
    id: string;
    logo_url: string | null;
    member_count: number;
    name: string;
    pending_invitation_count: number;
    personal: boolean;
    product: string;
    repository_count: number;
    role: string | null;
    sandbox_region: string;
    shared_agent_personal_accounts_enabled?: boolean;
    slug: string;
    source_control_providers?: any[];
    source_ui_enabled?: boolean;
    timezone: string;
    updated_at: string;
    updated_at_label: string | null;
    verify_pr_scenario_writing_enabled: boolean;
}
export interface ProductCreateData {
    organization_id: string;
    product: string;
}
export interface ProductMapIdentityDecision {
    observations: any[];
    operation: string;
    reason: string;
    target: Record<string, any>;
}
export interface ProductMapIdentityDecisionCreateData {
    organization_id: string;
    project_id: string;
    observations: any[];
    operation: string;
    reason: string;
    target: Record<string, any>;
}
export interface ProductMapJourney {
    default_variant_id?: string | null;
    goal: string;
    id: string;
    journey: Record<string, any>;
    next_cursor: string | null;
    preview?: any;
    scope: Record<string, any>;
    title: string;
    tree: Record<string, any>;
    tree_loaded?: boolean;
    variant_count: number;
    variants: any[];
}
export interface ProductMapJourneyLoadMatch {
    id: string;
    organization_id: string;
    project_id: string;
    account_id?: string;
    after?: string;
    area?: string;
    before?: string;
    include_tree?: boolean;
    persona_id?: string;
    query?: string;
    revision_id?: string;
    since?: string;
    variant_id?: string;
}
export interface ProductMapJourneyListMatch {
    organization_id: string;
    project_id: string;
    account_id?: string;
    after?: string;
    area?: string;
    before?: string;
    include_coverage?: boolean;
    journey_query?: string;
    persona_id?: string;
    query?: string;
    revision_id?: string;
    since?: string;
}
export interface ProductMapJourneyReplay {
    actor_id: string | null;
    can_request_qualification: boolean;
    created_at: string;
    failure_code: string | null;
    failure_message: string | null;
    id: string;
    preparation_receipt: Record<string, any> | null;
    qualification: any;
    qualification_status: string;
    replay_required: boolean;
    review_reason: string;
    run_id: string | null;
    scenario_run_id: string | null;
    source_digest: string;
    status: string;
    updated_at: string;
    variant_id: string;
}
export interface ProductMapJourneyReplayLoadMatch {
    id: string;
    organization_id: string;
    project_id: string;
}
export interface ProductMapJourneyReplayCreateData {
    id: string;
    organization_id: string;
    project_id: string;
    $action?: string;
    [action: string]: any;
}
export interface ProductMapObservation {
    capture: Record<string, any>;
    events: any[];
    evidence_id: string;
    id?: string;
    observation_id: string;
    scope: Record<string, any>;
    state: any;
    status: string;
}
export interface ProductMapObservationLoadMatch {
    id: string;
    organization_id: string;
    project_id: string;
    account_id?: string;
    area?: string;
    before?: string;
    persona_id?: string;
    query?: string;
    revision_id?: string;
    since?: string;
    $action?: string;
    [action: string]: any;
}
export interface ProductMapQuestion {
    account_id?: string;
    area?: string;
    before?: string;
    claims: any[];
    evidence_truncated: boolean;
    model: string;
    persona_id?: string;
    query?: string;
    question: string;
    reasoning_effort: string;
    revision_id?: string;
    scope: Record<string, any>;
    since?: string;
    state_id?: string;
    status: string;
    unknowns: any[];
}
export interface ProductMapQuestionCreateData {
    organization_id: string;
    project_id: string;
    account_id?: string;
    area?: string;
    before?: string;
    persona_id?: string;
    query?: string;
    question: string;
    revision_id?: string;
    since?: string;
    state_id?: string;
}
export interface ProductMapState {
    account_id: string | null;
    attempts: any[];
    captured_at: string;
    id: string;
    incoming: any[];
    labels: Record<string, any>;
    layout: Record<string, any>;
    observation_id: string;
    omitted_controls: number;
    outgoing: any[];
    revision_id: string;
    scope: Record<string, any>;
    screenshot_url: string | null;
    state: Record<string, any>;
    truncated: boolean;
    url: string;
}
export interface ProductMapStateLoadMatch {
    id: string;
    organization_id: string;
    project_id: string;
    account_id?: string;
    area?: string;
    before?: string;
    include_connection?: boolean;
    observation_id?: string;
    persona_id?: string;
    query?: string;
    revision_id?: string;
    since?: string;
}
export interface ProductMapStateListMatch {
    organization_id: string;
    project_id: string;
    account_id?: string;
    after?: string;
    area?: string;
    before?: string;
    persona_id?: string;
    query?: string;
    revision_id?: string;
    since?: string;
}
export interface Project {
    archived_at: string | null;
    context: string | null;
    created_at: string;
    credentials: any[];
    demo: boolean;
    documentation_urls: any[];
    environments: any[];
    execution_mode: string;
    icon_url: string | null;
    id: string;
    identity_provider: Record<string, any>;
    lock_version: number;
    name: string;
    network_connections: any[];
    organization_id: string;
    overview: Record<string, any>;
    permissions: Record<string, any>;
    personas: any[];
    project: Record<string, any>;
    pull_request_options: Record<string, any>;
    pull_requests: any[];
    purpose: string | null;
    runs: any[];
    scenario_history: Record<string, any>;
    scenario_states: Record<string, any>;
    scenarios: any[];
    setup_required?: boolean;
    slug: string;
    updated_at: string;
    verifier_preferences: Record<string, any>;
    version: number;
    website_url: string | null;
}
export interface ProjectLoadMatch {
    id: string;
    organization_id: string;
    overview?: boolean;
    page?: number;
    query?: string;
    scenario_id?: string;
    status?: string;
    verify_environment_id?: string;
    view?: string;
    $action?: string;
    [action: string]: any;
}
export interface ProjectListMatch {
    organization_id: string;
}
export interface ProjectCreateData {
    organization_id: string;
    context?: string | null;
    documentation_urls?: any[];
    execution_mode?: string;
    name: string;
    purpose?: string | null;
    slug?: string;
    verifier_preferences?: Record<string, any>;
    website_url?: string | null;
    $action?: string;
    [action: string]: any;
}
export interface ProjectUpdateData {
    id: string;
    organization_id: string;
    context?: string | null;
    documentation_urls?: any[];
    execution_mode?: string;
    name?: string;
    purpose?: string | null;
    slug?: string;
    verifier_preferences?: Record<string, any>;
    version?: number;
    website_url?: string | null;
    $action?: string;
    [action: string]: any;
}
export interface ProjectPatchData {
    id: string;
    organization_id: string;
    context?: string | null;
    documentation_urls?: any[];
    execution_mode?: string;
    name?: string;
    purpose?: string | null;
    slug?: string;
    verifier_preferences?: Record<string, any>;
    version?: number;
    website_url?: string | null;
}
export interface ProjectAndroidApk {
    android: Record<string, any>;
    artifact_paths?: any[];
    description: string;
    image: string;
    ios: Record<string, any>;
    launch_command?: string;
    managed_binary: Record<string, any>;
    platform?: string;
    provider?: string;
    setup_command?: string;
}
export interface ProjectAndroidApkCreateData {
    organization_id: string;
    project_id: string;
}
export interface ProjectCodeMap {
    can_scan: boolean;
    commit_sha: string;
    configured: boolean;
    error_code: string | null;
    id: string;
    name: string;
    ref?: string;
    repository_id: string;
    revision: Record<string, any>;
    slug: string;
    status: string;
}
export interface ProjectCodeMapListMatch {
    organization_id: string;
    project_id: string;
    ref?: string;
    repository_id?: string;
}
export interface ProjectCodeMapCreateData {
    organization_id: string;
    project_id: string;
    ref?: string;
    repository_id: string;
    $action?: string;
    [action: string]: any;
}
export interface ProjectEnvironment {
    allowed_actions: string;
    allowed_origins: any[];
    archived_at: string | null;
    base_url: string | null;
    base_url_changeable: boolean;
    binary?: string;
    conversation_only_messaging: boolean;
    created_at: string;
    desktop: Record<string, any> | null;
    execution_mode: string;
    id: string;
    imessage_number: string | null;
    kind: string;
    lock_version: number;
    messaging_conversation: any;
    messaging_problem: string | null;
    messaging_source: any;
    messaging_tester_number: string | null;
    name: string;
    project_id: string;
    pull_request: Record<string, any> | null;
    source_branch: string | null;
    updated_at: string;
    verify_network_connection_id: string | null;
    version: number;
}
export interface ProjectEnvironmentLoadMatch {
    id: string;
    organization_id: string;
    project_id: string;
    $action?: string;
    [action: string]: any;
}
export interface ProjectEnvironmentListMatch {
    organization_id: string;
    project_id: string;
}
export interface ProjectEnvironmentCreateData {
    organization_id: string;
    project_id: string;
    allowed_actions?: string;
    allowed_origins?: any[];
    base_url?: string | null;
    binary?: string;
    desktop?: Record<string, any> | null;
    imessage_number?: string | null;
    kind?: string;
    messaging_tester_number?: string | null;
    name: string;
    $action?: string;
    [action: string]: any;
}
export interface ProjectEnvironmentUpdateData {
    id: string;
    organization_id: string;
    project_id: string;
    allowed_actions?: string;
    allowed_origins?: any[];
    base_url?: string | null;
    binary?: string;
    imessage_number?: string | null;
    kind?: string;
    messaging_tester_number?: string | null;
    name?: string;
    verify_network_connection_id?: string | null;
    version?: number;
}
export interface ProjectEnvironmentPatchData {
    id: string;
    organization_id: string;
    project_id: string;
    allowed_actions?: string;
    allowed_origins?: any[];
    base_url?: string | null;
    binary?: string;
    imessage_number?: string | null;
    kind?: string;
    messaging_tester_number?: string | null;
    name?: string;
    verify_network_connection_id?: string | null;
    version?: number;
}
export interface ProjectFinding {
    deferred_until?: string | null;
    environment_name: string;
    id: string;
    last_seen_at: string;
    locked: boolean;
    severity: string;
    source: string;
    source_title: string;
    status: string;
    title: string;
    verification: any;
    web_path: string;
}
export interface ProjectFindingListMatch {
    organization_id: string;
    project_id: string;
    page?: number;
    priority?: string;
    query?: string;
    run_id?: string;
    source?: string;
    state?: string;
}
export interface ProjectFixture {
    assignments: any[];
    byte_size: number;
    content_type: string;
    credential_ids: any[];
    environment_ids: any[];
    id?: string;
    lock_version: number;
    name: string;
    persona_ids: any[];
    sha256: string;
    url: string;
    version: number;
}
export interface ProjectFixtureLoadMatch {
    id: string;
    organization_id: string;
    project_id: string;
}
export interface ProjectFixtureListMatch {
    organization_id: string;
    project_id: string;
    credential_id?: string;
    environment_id?: string;
    page?: number;
    persona_id?: string;
    q?: string;
}
export interface ProjectFixtureCreateData {
    organization_id: string;
    project_id: string;
}
export interface ProjectFixtureUpdateData {
    id: string;
    organization_id: string;
    project_id: string;
    credential_ids?: any[];
    environment_ids?: any[];
    name?: string;
    persona_ids?: any[];
    version?: number;
}
export interface ProjectFixturePatchData {
    id: string;
    organization_id: string;
    project_id: string;
    credential_ids?: any[];
    environment_ids?: any[];
    name?: string;
    persona_ids?: any[];
    version?: number;
}
export interface ProjectFixtureRemoveMatch {
    id: string;
    organization_id: string;
    project_id: string;
    version: number;
}
export interface ProjectIosApp {
    android: Record<string, any>;
    artifact_paths?: any[];
    description: string;
    image: string;
    ios: Record<string, any>;
    launch_command?: string;
    managed_binary: Record<string, any>;
    platform?: string;
    provider?: string;
    setup_command?: string;
}
export interface ProjectIosAppCreateData {
    organization_id: string;
    project_id: string;
}
export interface ProjectMessagingConversation {
    assistant_number: string;
    attachment_limit: number;
    attachment_max_bytes: number;
    environment_name: string;
    id: string;
    leased: boolean;
    messages: any[];
    reconciled_at: string | null;
    retirable: boolean;
    seeded: boolean;
    send_blocked_reason: string | null;
    send_disposition?: string;
    send_error?: string | null;
    tester_number: string;
    unknown_send: boolean;
    verify_environment_id: string;
}
export interface ProjectMessagingConversationLoadMatch {
    id: string;
    organization_id: string;
    project_id: string;
}
export interface ProjectMessagingConversationCreateData {
    organization_id: string;
    project_id: string;
    assistant_number: string;
    tester_number: string;
    verify_environment_id: string;
    $action?: string;
    [action: string]: any;
}
export interface ProjectMessagingConversationUpdateData {
    id: string;
    organization_id: string;
    project_id: string;
    assistant_number?: string;
    tester_number?: string;
}
export interface ProjectMessagingConversationPatchData {
    id: string;
    organization_id: string;
    project_id: string;
    assistant_number?: string;
    tester_number?: string;
}
export interface ProjectOverviewMetric {
    active_runs: number;
    open_findings: number;
    ready_environments: number;
    scenarios: Record<string, any>;
}
export interface ProjectOverviewMetricLoadMatch {
    organization_id: string;
    project_id: string;
}
export interface ProjectOverviewPullRequest {
    base_sha: string;
    can_verify: boolean;
    comment_url: string | null;
    draft: boolean;
    github_repository: string | null;
    github_url: string | null;
    head_sha: string;
    id: string;
    latest_created_at: string | null;
    latest_current: boolean;
    latest_head_sha: string | null;
    latest_reason: string | null;
    latest_run_id: string | null;
    latest_state: string | null;
    number: number;
    project_id: string | null;
    project_slug: string | null;
    provider: string;
    repository_id: string;
    request_label: string;
    source_branch: string | null;
    source_repository: string | null;
    source_url: string | null;
    state: string;
    title: string;
    updated_at: string;
    web_path: string;
}
export interface ProjectOverviewPullRequestListMatch {
    organization_id: string;
    project_id: string;
}
export interface ProjectProductMap {
}
export interface ProjectProductMapLoadMatch {
    organization_id: string;
    project_id: string;
    account_id?: string;
    area?: string;
    before?: string;
    persona_id?: string;
    query?: string;
    revision_id?: string;
    since?: string;
    source?: string;
    target?: string;
    compare_revision_id?: string;
    after?: string;
    view_id?: string;
    $action?: string;
    [action: string]: any;
}
export interface ProjectProductMapCreateData {
    organization_id: string;
    project_id: string;
    $action?: string;
    [action: string]: any;
}
export interface ProjectRecording {
    browser: Record<string, any>;
    created_at: string;
    draft: any;
    environment_id: string;
    error: string | null;
    event_count: number;
    id: string;
    persona_id: string;
    phase: string;
    signed_in_during_recording: boolean;
    start_path?: string;
    status: string;
    updated_at: string;
}
export interface ProjectRecordingLoadMatch {
    id: string;
    organization_id: string;
    project_id: string;
}
export interface ProjectRecordingCreateData {
    organization_id: string;
    project_id: string;
    environment_id: string;
    persona_id: string;
    start_path?: string;
    $action?: string;
    [action: string]: any;
}
export interface ProjectRecordingRemoveMatch {
    id: string;
    organization_id: string;
    project_id: string;
}
export interface ProjectRunPlan {
    archived_at: string | null;
    base_url: string | null;
    created_at: string;
    dependencies: any[];
    id: string;
    identity_probe: Record<string, any> | null;
    kind: string | null;
    lock_version: number;
    name: string;
    nodes: any[];
    preview: any;
    project_id: string;
    updated_at: string;
    version: number;
}
export interface ProjectRunPlanLoadMatch {
    id: string;
    organization_id: string;
    project_id: string;
}
export interface ProjectRunPlanListMatch {
    organization_id: string;
    project_id: string;
    page?: number;
}
export interface ProjectRunPlanCreateData {
    organization_id: string;
    project_id: string;
    dependencies: any[];
    identity_probe: Record<string, any> | null;
    name: string;
    nodes: any[];
    $action?: string;
    [action: string]: any;
}
export interface ProjectRunPlanUpdateData {
    id: string;
    organization_id: string;
    project_id: string;
    dependencies?: any[];
    identity_probe?: Record<string, any> | null;
    name?: string;
    nodes?: any[];
    version?: number;
}
export interface ProjectRunPlanPatchData {
    id: string;
    organization_id: string;
    project_id: string;
    dependencies?: any[];
    identity_probe?: Record<string, any> | null;
    name?: string;
    nodes?: any[];
    version?: number;
}
export interface ProjectRunSchedule {
    credential_ids: Record<string, any>;
    cron_expression?: string | null;
    environment_id: string;
    environment_name?: string;
    history: any[];
    id: string;
    labels: any[];
    lock_version: number;
    name: string;
    next_run_at: string;
    notification_channel?: string;
    scenario_count: number;
    selection_mode: string;
    slack_subscription_id?: string | null;
    source_scenario_id?: string | null;
    state: string;
    time_of_day: string;
    time_zone: string;
    version: number;
}
export interface ProjectRunScheduleLoadMatch {
    id: string;
    organization_id: string;
    project_id: string;
    $action?: string;
    [action: string]: any;
}
export interface ProjectRunScheduleListMatch {
    organization_id: string;
    project_id: string;
}
export interface ProjectRunScheduleCreateData {
    organization_id: string;
    project_id: string;
    credential_ids: Record<string, any>;
    environment_id: string;
    labels: any[];
    name: string;
    notification_channel?: string;
    selection_mode: string;
    slack_subscription_id?: string | null;
    state: string;
    time_of_day: string;
    time_zone: string;
    $action?: string;
    [action: string]: any;
}
export interface ProjectRunScheduleUpdateData {
    id: string;
    organization_id: string;
    project_id: string;
    credential_ids?: Record<string, any>;
    environment_id?: string;
    labels?: any[];
    name?: string;
    notification_channel?: string;
    selection_mode?: string;
    slack_subscription_id?: string | null;
    state?: string;
    time_of_day?: string;
    time_zone?: string;
    version?: number;
}
export interface ProjectRunSchedulePatchData {
    id: string;
    organization_id: string;
    project_id: string;
    credential_ids?: Record<string, any>;
    environment_id?: string;
    labels?: any[];
    name?: string;
    notification_channel?: string;
    selection_mode?: string;
    slack_subscription_id?: string | null;
    state?: string;
    time_of_day?: string;
    time_zone?: string;
    version?: number;
}
export interface ProjectScenarioOption {
    environments: any[];
    permissions: Record<string, any>;
    personas: any[];
    project: Record<string, any>;
    scenario_states: Record<string, any>;
    scenarios: any[];
    schedule_options?: any;
    schedules?: any[];
}
export interface ProjectScenarioOptionLoadMatch {
    organization_id: string;
    project_id: string;
}
export interface ProjectScenarioRow {
    actor_count: number;
    dependency_count: number;
    health: Record<string, any>;
    id: string;
    labels: any[];
    name: string;
    persona_id: string;
    selectable_for_run: boolean;
    step_count: number;
}
export interface ProjectScenarioRowListMatch {
    organization_id: string;
    project_id: string;
    page?: number;
    sort?: string;
    state?: string;
}
export interface ProjectSetting {
    available_messaging_environments: any[];
    messaging_conversations: any[];
    messaging_enabled: boolean;
    permissions: Record<string, any>;
    project: Record<string, any>;
    tester_numbers: any[];
}
export interface ProjectSettingLoadMatch {
    organization_id: string;
    project_id: string;
}
export interface PullRequest {
    available_tests: any[];
    branch?: string;
    cleanup_only?: boolean;
    current_run?: any;
    findings: any[];
    head_sha?: string;
    id?: string;
    idempotency_key: string;
    imessage_number?: string;
    number?: number;
    pagination: Record<string, any>;
    permissions: Record<string, any>;
    preview_cleanup_ready: boolean;
    preview_url?: string | null;
    project?: any;
    project_id?: string;
    pull_request: Record<string, any>;
    repository_id?: string;
    runs: any[];
}
export interface PullRequestLoadMatch {
    id: string;
    organization_id: string;
    page?: number;
    $action?: string;
    [action: string]: any;
}
export interface PullRequestCreateData {
    organization_id: string;
    branch?: string;
    cleanup_only?: boolean;
    head_sha?: string;
    idempotency_key: string;
    imessage_number?: string;
    number?: number;
    preview_url?: string | null;
    project_id?: string;
    repository_id?: string;
    $action?: string;
    [action: string]: any;
}
export interface PullRequestRemoveMatch {
    id: string;
    organization_id: string;
    $action?: string;
    [action: string]: any;
}
export interface PullRequestAction {
    action_name: string;
    body?: string;
    comment_id?: string;
    comments?: any[];
    event?: string;
    expected_head_sha?: string;
    id?: string | null;
    label?: string;
    line?: number;
    node_id?: string | null;
    operation_key: string;
    path?: string;
    run_id?: string;
    side?: string;
    start_line?: number;
    start_side?: string;
    thread_id?: string;
}
export interface PullRequestActionCreateData {
    number: string;
    organization_id: string;
    pull_request_id: string;
    action_name: string;
    body?: string;
    comment_id?: string;
    comments?: any[];
    event?: string;
    expected_head_sha?: string;
    label?: string;
    line?: number;
    operation_key: string;
    path?: string;
    run_id?: string;
    side?: string;
    start_line?: number;
    start_side?: string;
    thread_id?: string;
}
export interface PullRequestMagicMerge {
}
export interface PullRequestMagicMergeCreateData {
    number: string;
    organization_id: string;
    pull_request_id: string;
    expected_base_sha?: any;
    expected_head_sha?: any;
    idempotency_key?: any;
    mode?: any;
    resolutions?: any;
    $action?: string;
    [action: string]: any;
}
export interface PullRequestSetting {
    app_preview_profile_id?: string | null;
    app_service_id?: string | null;
    bots: any[];
    browser_options_available: boolean;
    ci_preview: Record<string, any> | null;
    concurrency?: number;
    configured_repository: any;
    demo_videos: boolean;
    demo_videos_enabled?: boolean;
    deployment: string | null;
    deployment_environment?: string;
    enabled: boolean;
    environment: string;
    environments: any[];
    github_check_enabled?: boolean;
    hosting_presets: any[];
    id: string;
    imessage_comment_prefix: string | null;
    imessage_number: string | null;
    imessage_number_source: string;
    limits: Record<string, any>;
    link_pattern: string | null;
    links: string | null;
    max_seconds?: number;
    messaging_enabled: boolean;
    messaging_tester_number: string | null;
    non_product_paths?: any[];
    permissions: Record<string, any>;
    pr_check: boolean;
    preview_access?: string;
    preview_comment_authors?: any[];
    preview_comment_pattern?: string;
    preview_comment_wildcard: string | null;
    preview_profile: string | null;
    preview_profiles: any[];
    previews: string;
    project_id: string;
    project_repositories: any[];
    provider: string;
    repositories: any[];
    repository: string;
    repository_id: string;
    repository_kind: string;
    selected_repository: any;
    service: string | null;
    settings: any[];
    setup: any;
    setup_defaults: Record<string, any>;
    source_repository: string;
    target_mode: string;
    tester_numbers: any[];
    trigger_label: string;
    trigger_on_comment?: boolean;
    trigger_on_label?: boolean;
    trigger_on_push?: boolean;
    trigger_on_ready?: boolean;
    triggers: Record<string, any>;
    verify_environment_id: string;
    write_scenarios: boolean;
}
export interface PullRequestSettingLoadMatch {
    organization_id: string;
    project_id?: string;
    provider?: string;
    repository_id?: string;
}
export interface PullRequestSettingCreateData {
    organization_id: string;
    app_preview_profile_id?: string | null;
    app_service_id?: string | null;
    bots: any[];
    concurrency?: number;
    demo_videos: boolean;
    demo_videos_enabled?: boolean;
    deployment: string | null;
    deployment_environment?: string;
    enabled: boolean;
    environment: string;
    github_check_enabled?: boolean;
    imessage_comment_prefix: string | null;
    imessage_number: string | null;
    imessage_number_source: string;
    limits: Record<string, any>;
    link_pattern: string | null;
    links: string | null;
    max_seconds?: number;
    messaging_tester_number: string | null;
    non_product_paths?: any[];
    pr_check: boolean;
    preview_access?: string;
    preview_comment_authors?: any[];
    preview_comment_pattern?: string;
    preview_comment_wildcard: string | null;
    preview_profile: string | null;
    previews: string;
    project_id: string;
    provider: string;
    repository: string;
    repository_id: string;
    repository_kind: string;
    service: string | null;
    target_mode: string;
    trigger_label: string;
    trigger_on_comment?: boolean;
    trigger_on_label?: boolean;
    trigger_on_push?: boolean;
    trigger_on_ready?: boolean;
    triggers: Record<string, any>;
    verify_environment_id: string;
    write_scenarios: boolean;
    $action?: string;
    [action: string]: any;
}
export interface PullRequestSettingAddRepository {
    project_id: string;
    replace?: boolean;
    repositories: any[];
}
export interface PullRequestSettingAddRepositoryCreateData {
    organization_id: string;
    project_id: string;
    replace?: boolean;
    repositories: any[];
}
export interface PullRequestSettingDetectComment {
    bots?: any[];
    deployment?: string;
    example_url?: string;
    imessage_comment_prefix?: string;
    imessage_number?: string | null;
    kind: string;
    link_pattern?: string;
    project_id: string;
    provider?: string;
    repository_id?: string;
    request_number?: number;
}
export interface PullRequestSettingDetectCommentCreateData {
    organization_id: string;
    project_id: string;
    repository_id?: string;
}
export interface PullRequestTranscript {
    adapter: string;
    created_at: string | null;
    ended_at: string | null;
    external_session_id: string;
    harness: string;
    id: string;
    last_activity_at: string | null;
    last_checkpoint_at: string | null;
    repository: any;
    started_at: string | null;
    stats: Record<string, any>;
    status: string;
    title: string | null;
    updated_at: string | null;
    user: any;
}
export interface PullRequestTranscriptListMatch {
    organization_id: string;
    pull_request_id: string;
    repo_id: string;
    cursor?: string;
    limit?: number;
    paginated?: boolean;
}
export interface PullZone {
    id: string;
    name: string;
    slug: string;
}
export interface PullZoneListMatch {
    organization_id: string;
    app?: string;
}
export interface Recorder {
    id: string;
    name: string;
    slug: string;
}
export interface RecorderLoadMatch {
    organization_id: string;
}
export interface Registry {
}
export interface RegistryLoadMatch {
    $action?: string;
    [action: string]: any;
}
export interface RegistryV2 {
}
export interface RegistryV2CreateData {
    $action?: string;
    [action: string]: any;
}
export interface RelayAgentConnection {
    agent_card_url: string;
    auth_scheme: string;
    can_configure: boolean;
    can_disconnect: boolean;
    can_setup: boolean;
    connection: Record<string, any>;
    credential?: string | null;
    error_code: string | null;
    expected_generation: number;
    generation: number;
    id: string;
    name: string;
    remote_agent: string | null;
    requester_id: string;
    retired_at: string | null;
    revoked_at: string | null;
    scope_key: string;
    source_operation_id: string | null;
    state: string;
}
export interface RelayAgentConnectionLoadMatch {
    agent_id: string;
    id: string;
    organization_id: string;
    $action?: string;
    [action: string]: any;
}
export interface RelayAgentConnectionListMatch {
    agent_id: string;
    organization_id: string;
    cursor?: string;
    limit?: number;
    selected_connection_id?: string;
}
export interface RelayAgentConnectionCreateData {
    agent_id: string;
    organization_id: string;
    agent_card_url: string;
    auth_scheme: string;
    credential?: string | null;
    name: string;
    remote_agent?: string | null;
    source_operation_id?: string | null;
    $action?: string;
    [action: string]: any;
}
export interface RelayAgentConnectionUpdateData {
    agent_id: string;
    id: string;
    organization_id: string;
    auth_scheme?: string;
    credential?: string | null;
    expected_generation?: number;
    name?: string;
    remote_agent?: string | null;
}
export interface RelayAgentConnectionRemoveMatch {
    agent_id: string;
    id: string;
    organization_id: string;
}
export interface RelayAgentLocalThread {
    id?: string;
}
export interface RelayAgentLocalThreadRemoveMatch {
    agent_id: string;
    id: string;
    organization_id: string;
}
export interface RelaySignal {
}
export interface RelaySignalCreateData {
}
export interface ReleaseRollout {
    id?: string;
}
export interface ReleaseRolloutLoadMatch {
    id?: string;
    release_id: string;
}
export interface ReleaseRolloutCreateData {
    release_id: string;
    $action?: string;
    [action: string]: any;
}
export interface Repo {
    can_retry_import: boolean;
    can_retry_sync: boolean;
    disclaimer: string | null;
    federated_in_home: boolean;
    github_repository: string | null;
    icon_name: string;
    id: string;
    import_item_id: string | null;
    is_home: boolean;
    name: string;
    remote_repository?: string | null;
    root_path: string | null;
    slug: string;
    sync_error_message: string | null;
    sync_provider?: string;
    sync_status: string;
}
export interface RepoLoadMatch {
    id: string;
    organization_id: string;
    $action?: string;
    [action: string]: any;
}
export interface RepoListMatch {
    organization_id: string;
    direction?: string;
    page?: number;
    q?: string;
    sort?: string;
}
export interface RepoRemoveMatch {
    id: string;
    organization_id: string;
}
export interface RepoAccessToken {
    access_token: Record<string, any>;
    active: boolean;
    created_at: string;
    created_at_label: string | null;
    credential_purpose?: string;
    expires_at: string | null;
    expires_at_label: string | null;
    expires_in_days?: number | null;
    id: string;
    last_used_at: string | null;
    last_used_at_label: string | null;
    name: string;
    permission_level?: string;
    plain_text_token: string;
    revoked_at: string | null;
    revoked_at_label: string | null;
    token_preview: string;
    updated_at: string;
    updated_at_label: string | null;
}
export interface RepoAccessTokenListMatch {
    organization_id: string;
    repo_id: string;
}
export interface RepoAccessTokenCreateData {
    organization_id: string;
    repo_id: string;
    credential_purpose?: string;
    expires_in_days?: number | null;
    name: string;
    permission_level?: string;
}
export interface RepoAccessTokenRemoveMatch {
    id: string;
    organization_id: string;
    repo_id: string;
}
export interface RepoAction {
    pipeline: Record<string, any>;
    run: Record<string, any>;
}
export interface RepoActionListMatch {
    organization_id: string;
    repo_id: string;
    pipeline_id?: string;
    range?: string;
}
export interface RepoAgentCheckpoint {
    id?: string;
}
export interface RepoAgentCheckpointLoadMatch {
    id: string;
    organization_id: string;
    repo_id: string;
    $action?: string;
    [action: string]: any;
}
export interface RepoAgentSession {
    adapter?: string;
    agent_session: Record<string, any>;
    external_session_id?: string;
    id?: string;
    status?: string;
    title?: string | null;
}
export interface RepoAgentSessionLoadMatch {
    id?: string;
    organization_id: string;
    repo_id: string;
    $action?: string;
    [action: string]: any;
}
export interface RepoAgentSessionCreateData {
    organization_id: string;
    repo_id: string;
    $action?: string;
    [action: string]: any;
}
export interface RepoAgentSessionUpdateData {
    id: string;
    organization_id: string;
    repo_id: string;
}
export interface RepoAgentSessionPatchData {
    id: string;
    organization_id: string;
    repo_id: string;
    agent_session?: Record<string, any>;
}
export interface RepoBookmarkProtection {
    actor_policy: Record<string, any>;
    bypass_mode: string;
    created_at: string;
    created_by_user_id: string | null;
    enabled: boolean;
    id: string;
    name: string;
    organization_id: string;
    priority: number;
    repository_id: string;
    requirements: Record<string, any>;
    target_kind: string;
    target_pattern: string | null;
    updated_at: string;
    updated_by_user_id: string | null;
}
export interface RepoBookmarkProtectionLoadMatch {
    id: string;
    organization_id: string;
    repo_id: string;
}
export interface RepoBookmarkProtectionListMatch {
    organization_id: string;
    repo_id: string;
}
export interface RepoBookmarkProtectionCreateData {
    organization_id: string;
    repo_id: string;
    actor_policy?: Record<string, any>;
    bypass_mode?: string;
    enabled?: boolean;
    name?: string;
    priority?: number;
    requirements?: Record<string, any>;
    target_kind?: string;
    target_pattern?: string | null;
    $action?: string;
    [action: string]: any;
}
export interface RepoBookmarkProtectionUpdateData {
    id: string;
    organization_id: string;
    repo_id: string;
    actor_policy?: Record<string, any>;
    bypass_mode?: string;
    enabled?: boolean;
    name?: string;
    priority?: number;
    requirements?: Record<string, any>;
    target_kind?: string;
    target_pattern?: string | null;
}
export interface RepoBookmarkProtectionPatchData {
    id: string;
    organization_id: string;
    repo_id: string;
    actor_policy?: Record<string, any>;
    bypass_mode?: string;
    enabled?: boolean;
    name?: string;
    priority?: number;
    requirements?: Record<string, any>;
    target_kind?: string;
    target_pattern?: string | null;
}
export interface RepoBookmarkProtectionRemoveMatch {
    id: string;
    organization_id: string;
    repo_id: string;
}
export interface RepoBookmarkProtectionEvent {
    action: string;
    actor_kind: string;
    actor_label: string | null;
    actor_user_id: string | null;
    bookmark_name: string;
    bookmark_protection_rule_id: string | null;
    created_at: string;
    created_at_label: string | null;
    decision: string;
    id: string;
    intent: string | null;
    metadata: Record<string, any>;
    new_target: string | null;
    old_target: string | null;
    organization_id: string;
    reason_codes: any[];
    repository_id: string;
    source_request_id: string | null;
    updated_at: string;
    updated_at_label: string | null;
}
export interface RepoBookmarkProtectionEventListMatch {
    organization_id: string;
    repo_id: string;
    bookmark?: string;
    limit?: number;
}
export interface RepoCloudWorkspaceBackup {
    id?: string;
}
export interface RepoCloudWorkspaceBackupLoadMatch {
    id?: string;
    organization_id: string;
    repo_id: string;
}
export interface RepoCloudWorkspaceBackupCreateData {
    organization_id: string;
    repo_id: string;
    $action?: string;
    [action: string]: any;
}
export interface RepoCodeRule {
    active_revision_number: number | null;
    capabilities: Record<string, any>;
    code_rule: any;
    created_at: string;
    definition: Record<string, any>;
    draft_pending: boolean;
    enabled: boolean;
    expected_version: number;
    id: string;
    latest_revision_number: number;
    name: string;
    repository: Record<string, any>;
    scope: any[];
    slug: string;
    state_version: number;
    updated_at: string;
    web_url: string;
}
export interface RepoCodeRuleLoadMatch {
    id: string;
    organization_id: string;
    repo_id: string;
}
export interface RepoCodeRuleListMatch {
    organization_id: string;
    repo_id: string;
    rule?: string;
}
export interface RepoCodeRuleCreateData {
    organization_id: string;
    repo_id: string;
    definition: Record<string, any>;
}
export interface RepoCodeRuleUpdateData {
    id: string;
    organization_id: string;
    repo_id: string;
    definition?: Record<string, any>;
    expected_version?: number;
    $action?: string;
    [action: string]: any;
}
export interface RepoCodeRulePatchData {
    id: string;
    organization_id: string;
    repo_id: string;
    definition?: Record<string, any>;
    expected_version?: number;
}
export interface RepoCodeRuleRemoveMatch {
    id: string;
    organization_id: string;
    repo_id: string;
    $action?: string;
    [action: string]: any;
}
export interface RepoSetting {
    active: boolean;
    created_at: string;
    created_at_label: string | null;
    description: string | null;
    expires_at: string | null;
    expires_at_label: string | null;
    icon_name: string;
    id: string;
    last_used_at: string | null;
    last_used_at_label: string | null;
    merge_authority: string;
    name: string;
    organization_id: string;
    permission_level: string;
    revoked_at: string | null;
    revoked_at_label: string | null;
    slug: string;
    status: string;
    token_preview: string;
    updated_at: string;
    updated_at_label: string | null;
}
export interface RepoSettingListMatch {
    organization_id: string;
    repo_id: string;
}
export interface RepoSettingUpdateData {
    organization_id: string;
    repo_id: string;
    description?: string | null;
    icon_name?: string;
    name?: string;
    status?: string;
    $action?: string;
    [action: string]: any;
}
export interface RepoStat {
    backend: string;
    can_refresh: boolean;
    freshness: Record<string, any>;
    note: string;
    physical: Record<string, any>;
    series: any[];
}
export interface RepoStatLoadMatch {
    organization_id: string;
    repo_id: string;
}
export interface RepoStatCreateData {
    organization_id: string;
    repo_id: string;
    backend: string;
    can_refresh: boolean;
    freshness: Record<string, any>;
    note: string;
    physical: Record<string, any>;
    series: any[];
    $action?: string;
    [action: string]: any;
}
export interface RepoVc {
}
export interface RepoVcLoadMatch {
    organization_id: string;
    repo_id: string;
    path?: string;
    ref?: string;
    $action?: string;
    [action: string]: any;
}
export interface RepoVcCreateData {
    organization_id: string;
    repo_id: string;
    from?: any;
    into?: any;
    $action?: string;
    [action: string]: any;
}
export interface RepoVcUpdateData {
    organization_id: string;
    repo_id: string;
    auto_land_enabled?: any;
    expected_version?: any;
    github_merge_gate?: any;
    merge_authority?: any;
    merge_github_repository_connection_id?: any;
    queue_concurrency?: any;
    queue_validation_mode?: any;
    $action?: string;
    [action: string]: any;
}
export interface RepoVcCommit {
    name: string;
    target_commit_id: string;
}
export interface RepoVcCommitListMatch {
    organization_id: string;
    repo_id: string;
    limit?: number;
    offset?: number;
    page?: number;
    path?: string;
    q?: string;
    ref: string;
}
export interface ReportReplay {
    agent_id: string;
    generated_at: string;
    id?: string;
    recording: Record<string, any>;
    replay_steps: any[];
}
export interface ReportReplayLoadMatch {
    exploration_id: string;
    id: string;
    organization_id: string;
    generated_at?: string;
    project_id?: string;
}
export interface ReportScenario {
    environment_name: string;
    goal: string;
    id: string;
    mode: string;
    permissions: Record<string, any>;
    project_id: string | null;
    related_explorations: any[];
    report: Record<string, any>;
    saves_scenarios: boolean;
    scenario_generation: Record<string, any>;
    status: string;
}
export interface ReportScenarioCreateData {
    exploration_id: string;
    organization_id: string;
    project_id?: string;
}
export interface RepositoryAccess {
}
export interface RepositoryAccessLoadMatch {
    organization_slug?: string;
    $action?: string;
    [action: string]: any;
}
export interface RepositoryAccessCreateData {
    $action?: string;
    [action: string]: any;
}
export interface RepositoryAccessResolve {
    default_branch: string;
    git_auth_username: string;
    git_https_clone_url: string | null;
    git_https_supported: boolean;
    github_access_warnings?: any[];
    id?: string;
    membership_role: string;
    organization_id: string;
    organization_name: string;
    organization_slug: string;
    repository_id: string;
    repository_name: string;
    repository_slug: string;
}
export interface RepositoryAccessResolveLoadMatch {
    id: string;
    resolve_id: string;
}
export interface RepositoryEvent {
}
export interface RepositoryEventCreateData {
    $action?: string;
    [action: string]: any;
}
export interface RepositoryImport {
    can_manage_connections: boolean;
    github_imports: any[];
    github_installations: any[];
    gitlab_configured: boolean;
    gitlab_imports: any[];
    gitlab_integrations: any[];
    gitlab_redirect_uri: string | null;
    gitlab_self_managed_available: boolean;
    inventory_errors: any[];
    organization_id: string;
    repositories: any[];
}
export interface RepositoryImportLoadMatch {
    organization_id: string;
    accounts_only?: boolean;
    search?: string;
}
export interface RepositoryImportSession {
    action_required?: string;
    authorization_endpoint?: string;
    can_authorize_github: boolean;
    client_name: string | null;
    client_version: string | null;
    created_at: string;
    error_message: string | null;
    expires_at: string;
    git_imports: any[];
    github_app_installation_id: string | null;
    github_connected: boolean;
    id: string;
    idempotency_key: string;
    organization_id: string;
    organization_slug: string;
    status: string;
    updated_at: string;
}
export interface RepositoryImportSessionLoadMatch {
    id: string;
}
export interface RepositoryImportSessionCreateData {
    organization_id: string;
    client_name?: string | null;
    client_version?: string | null;
    github_app_installation_id?: string | null;
    idempotency_key: string;
    $action?: string;
    [action: string]: any;
}
export interface RepositoryImportSessionRepository {
    default_branch: string | null;
    full_name: string;
    name: string;
    owner: string;
    private: boolean;
    reason?: string | null;
    selectable: boolean;
    status: string;
    visibility: string;
}
export interface RepositoryImportSessionRepositoryListMatch {
    repository_import_session_id: string;
    q?: string;
}
export interface RepositoryImportSessionSelection {
    repositories: any;
}
export interface RepositoryImportSessionSelectionCreateData {
    repository_import_session_id: string;
    repositories: any;
}
export interface RepositorySandboxEnvironment {
    id?: string;
}
export interface RepositorySandboxEnvironmentLoadMatch {
    id: string;
    repository_id: string;
}
export interface RepositorySandboxEnvironmentCreateData {
    repository_id: string;
    $action?: string;
    [action: string]: any;
}
export interface RoderCodeRepair {
    base_sha: string;
    cancel_requested: boolean;
    failure_code: string | null;
    id: string;
    launch_state: string;
    organization_id: string;
    repository_slug: string;
    roder_thread_id: string | null;
    roder_turn_id: string | null;
    scenario_run_id: string;
    task: Record<string, any> | null;
    trigger_kind: string;
}
export interface RoderCodeRepairLoadMatch {
    id: string;
}
export interface RoderCodeRepairCreateData {
    base_sha: string;
    organization_id: string;
    repository_slug: string;
    scenario_run_id: string;
    $action?: string;
    [action: string]: any;
}
export interface RoderCodeRepairSetting {
    available: boolean;
    daily_limit: number;
    enabled: boolean;
    enabled_at: string | null;
    operator_user_id: string | null;
    organization_id: string;
    repository_slug: string | null;
}
export interface RoderCodeRepairSettingLoadMatch {
    organization_id: string;
}
export interface RoderCodeRepairSettingCreateData {
    enabled: boolean;
    organization_id: string;
    repository_slug?: string | null;
}
export interface RoderMachine {
    id?: string;
}
export interface RoderMachineUpdateData {
    id: string;
}
export interface RoderRun {
}
export interface RoderRunCreateData {
    events?: any;
    $action?: string;
    [action: string]: any;
}
export interface RoderWorkspaceCredential {
    api_token: string;
    author_email: string;
    author_name: string;
    clone_url: string;
    default_branch: string;
    expires_at: string;
    organization_id: string;
    repository_id: string;
    repository_slug: string;
    repository_spec: string;
    required_lifetime_seconds: number;
    token: string;
    username: string;
}
export interface RoderWorkspaceCredentialCreateData {
    required_lifetime_seconds: number;
}
export interface RunArtifact {
}
export interface RunArtifactLoadMatch {
    pipeline_id: string;
    run_id: string;
}
export interface RunArtifactCreateData {
    pipeline_id: string;
    run_id: string;
}
export interface RunJob {
    active: boolean;
    allow_failure: boolean;
    cache_archive_observations: Record<string, any> | null;
    ci_pipeline_run_id: string;
    ci_runner_id: string | null;
    created_at: string;
    dependencies_csv: string | null;
    display_id: number;
    environment_csv: string | null;
    execution_order: number;
    execution_profile?: string | null;
    exit_code: number | null;
    failed: boolean;
    finished_at: string | null;
    id: string;
    kind: string;
    log_chunks: any[];
    name: string;
    number: number;
    organization_id: string;
    queued_at: string | null;
    reconciliation_id?: string | null;
    retry_number: number;
    reuse: Record<string, any> | null;
    runner_label_selector: string | null;
    slug: string;
    started_at: string | null;
    status: string;
    status_label: string;
    status_state: string;
    status_tone: string;
    steps: any[];
    timeout_seconds: number | null;
    updated_at: string;
}
export interface RunJobLoadMatch {
    id?: string;
    pipeline_id: string;
    run_id: string;
}
export interface RunJobCreateData {
    pipeline_id: string;
    run_id: string;
}
export interface RunScenarioRun {
    id?: string;
}
export interface RunScenarioRunLoadMatch {
    id: string;
    organization_id: string;
    project_id: string;
    run_id: string;
    $action?: string;
    [action: string]: any;
}
export interface RunScenarioRunUpdateData {
    id: string;
    organization_id: string;
    project_id: string;
    run_id: string;
    outcomes?: any;
    steps?: any;
    version?: any;
    $action?: string;
    [action: string]: any;
}
export interface RunScheduleOption {
    id: string;
    name: string;
}
export interface RunScheduleOptionListMatch {
    organization_id: string;
    project_id: string;
}
export interface RunSearch {
    runs: any[];
}
export interface RunSearchLoadMatch {
    organization_id: string;
    query?: string;
}
export interface RunUpdate {
    base_sha: string;
    can_verify: boolean;
    comment_url: string | null;
    draft: boolean;
    github_repository: string | null;
    github_url: string | null;
    head_sha: string;
    id: string;
    latest_created_at: string | null;
    latest_current: boolean;
    latest_head_sha: string | null;
    latest_reason: string | null;
    latest_run_id: string | null;
    latest_state: string | null;
    number: number;
    project_id: string | null;
    project_slug: string | null;
    provider: string;
    repository_id: string;
    request_label: string;
    source_branch: string | null;
    source_repository: string | null;
    source_url: string | null;
    state: string;
    title: string;
    updated_at: string;
    web_path: string;
}
export interface RunUpdateListMatch {
    organization_id: string;
    page?: number;
    query?: string;
    status?: string;
    verify_environment_id?: string;
}
export interface RunWorkspaceCredential {
}
export interface RunWorkspaceCredentialCreateData {
}
export interface RunnerLease {
    id?: string;
}
export interface RunnerLeaseLoadMatch {
    runner_id: string;
    runner_pool_id: string;
}
export interface RunnerLeaseCreateData {
    runner_id: string;
    runner_pool_id: string;
    $action?: string;
    [action: string]: any;
}
export interface RunnerPoolNodeEnrollmentToken {
    capabilities_csv: string | null;
    ci_runner_pool_id: string;
    created_at: string;
    created_at_label: string | null;
    creator_user_id: string | null;
    description: string | null;
    expires_at: string | null;
    expires_at_label: string | null;
    id: string;
    kind: string;
    last_used_at: string | null;
    last_used_at_label: string | null;
    name: string;
    organization_id: string;
    raw_token: string | null;
    revoked_at: string | null;
    status: string;
    token_hint: string;
    updated_at: string;
    updated_at_label: string | null;
    usage_count: number;
    usage_count_label: string;
}
export interface RunnerPoolNodeEnrollmentTokenListMatch {
    runner_pool_id: string;
}
export interface RunnerPoolNodeEnrollmentTokenCreateData {
    runner_pool_id: string;
    capabilities_csv?: string | null;
    description?: string | null;
    expires_at?: string | null;
    kind?: string;
    name: string;
    $action?: string;
    [action: string]: any;
}
export interface RunnerPoolRunner {
    id?: string;
}
export interface RunnerPoolRunnerLoadMatch {
    id?: string;
    runner_pool_id: string;
}
export interface RunnerPoolRunnerCreateData {
    runner_pool_id: string;
    $action?: string;
    [action: string]: any;
}
export interface RunnerPoolRunnerUpdateData {
    id: string;
    runner_pool_id: string;
}
export interface RunnerPoolRunnerPatchData {
    id: string;
    runner_pool_id: string;
}
export interface RuntimeInstanceHealthSnapshot {
}
export interface RuntimeInstanceHealthSnapshotLoadMatch {
    runtime_instance_id: string;
}
export interface RuntimeInstanceHealthSnapshotCreateData {
    runtime_instance_id: string;
}
export interface SandboxIntegration {
    can_manage: boolean;
    catalog: any[];
    configuration: Record<string, any>;
    connected_profiles: Record<string, any>;
    credentials: Record<string, any>;
    enabled: boolean;
    id: string;
    integrations: any[];
    name: string;
    provider: string;
    version: number;
}
export interface SandboxIntegrationLoadMatch {
    organization_id: string;
    provider?: string;
}
export interface SandboxIntegrationCreateData {
    organization_id: string;
    configuration: Record<string, any>;
    credentials: Record<string, any>;
    name: string;
    provider: string;
}
export interface SandboxIntegrationUpdateData {
    id: string;
    organization_id: string;
    credentials?: Record<string, any>;
    enabled?: boolean;
    name?: string;
    version?: number;
}
export interface SandboxIntegrationPatchData {
    id: string;
    organization_id: string;
    credentials?: Record<string, any>;
    enabled?: boolean;
    name?: string;
    version?: number;
}
export interface ScenarioRevision {
    action: string;
    batch: string;
    created_at: string;
    definition: Record<string, any>;
    id: string;
    source: string;
    user: any;
    version: number;
}
export interface ScenarioRevisionListMatch {
    organization_id: string;
    project_id: string;
    scenario_id: string;
    page?: number;
}
export interface ScenarioRunLesson {
    finding: string;
    title?: string;
    workaround: string;
}
export interface ScenarioRunLessonCreateData {
    organization_id: string;
    project_id: string;
    run_id: string;
    scenario_run_id: string;
    finding: string;
    title?: string;
    workaround: string;
}
export interface ScenarioRunScenarioEdit {
}
export interface ScenarioRunScenarioEditCreateData {
    organization_id: string;
    project_id: string;
    run_id: string;
    scenario_run_id: string;
    idempotency_key?: any;
    outcomes?: any;
    prompt?: any;
    steps?: any;
    version?: any;
    viewer_time_zone?: any;
    $action?: string;
    [action: string]: any;
}
export interface SecretGrant {
    id?: string;
}
export interface SecretGrantLoadMatch {
    id?: string;
    organization_id: string;
    secret_id: string;
}
export interface SecretGrantCreateData {
    organization_id: string;
    secret_id: string;
    $action?: string;
    [action: string]: any;
}
export interface SecretGrantUpdateData {
    id: string;
    organization_id: string;
    secret_id: string;
}
export interface SecretGrantPatchData {
    id: string;
    organization_id: string;
    secret_id: string;
}
export interface SecretGrantRemoveMatch {
    id: string;
    organization_id: string;
    secret_id: string;
}
export interface SecretVersion {
    id?: string;
}
export interface SecretVersionLoadMatch {
    id?: string;
    organization_id: string;
    secret_id: string;
}
export interface SecretVersionCreateData {
    organization_id: string;
    secret_id: string;
    $action?: string;
    [action: string]: any;
}
export interface SecretVersionUpdateData {
    id: string;
    organization_id: string;
    secret_id: string;
}
export interface SecretVersionPatchData {
    id: string;
    organization_id: string;
    secret_id: string;
}
export interface SecretVersionRemoveMatch {
    id: string;
    organization_id: string;
    secret_id: string;
}
export interface ServiceEndpoint {
    id?: string;
}
export interface ServiceEndpointLoadMatch {
    app_id: string;
    id?: string;
    service_id: string;
}
export interface ServiceEndpointCreateData {
    app_id: string;
    service_id: string;
}
export interface ServiceEndpointUpdateData {
    app_id: string;
    id: string;
    service_id: string;
}
export interface ServiceEndpointPatchData {
    app_id: string;
    id: string;
    service_id: string;
}
export interface ServiceEndpointRemoveMatch {
    app_id: string;
    id: string;
    service_id: string;
}
export interface Setting {
    can_manage_pr_scenario_writing: boolean;
    can_manage_sandbox_region: boolean;
    dedicated_outbound_ip_addresses: any[];
    default_trunk_bookmark: string;
    organization: Record<string, any>;
    sandbox_regions: any[];
}
export interface SettingLoadMatch {
    organization_id: string;
}
export interface SettingMutationLease {
}
export interface SettingMutationLeaseCreateData {
    organization_id: string;
    repo_id: string;
    reason?: any;
    $action?: string;
    [action: string]: any;
}
export interface Signal {
    acked_at: string | null;
    acked_by: Record<string, any> | null;
    agent_runs: Record<string, any>;
    app_service_id: string | null;
    attribution: Record<string, any>;
    created_at: string;
    dedupe_key: string | null;
    hosted_app_id: string | null;
    id: string;
    kind: string;
    links: Record<string, any>;
    occurred_at: string;
    organization_id: string;
    payload: Record<string, any>;
    recovery: Record<string, any>;
    resolution: Record<string, any>;
    severity: string;
    source: Record<string, any>;
    subject_id: string | null;
    subject_type: string | null;
    summary: string;
}
export interface SignalLoadMatch {
    id: string;
    organization_id: string;
    $action?: string;
    [action: string]: any;
}
export interface SignalListMatch {
    organization_id: string;
    after_id?: string;
    before_id?: string;
    hosted_app_id?: string;
    integration_id?: string;
    kind?: string;
    limit?: number;
    min_severity?: string;
    order?: string;
    severity?: string;
    since?: string;
    source?: string;
    subscription_id?: string;
    unacked?: boolean;
}
export interface SignalCreateData {
    $action?: string;
    [action: string]: any;
}
export interface SignalInbound {
    id?: string;
}
export interface SignalInboundUpdateData {
    id: string;
    inbound_id: string;
}
export interface SignalIntegration {
    api_token?: string;
    api_token_stored: boolean;
    config: Record<string, any>;
    created_at?: string | null;
    failure_message: string | null;
    id: string;
    inbound_path: string;
    inbound_url: string;
    last_received_at?: string | null;
    last_verified_at?: string | null;
    mode: string;
    name: string;
    organization_id: string;
    provider: string;
    rejected_signature_count: number;
    status: string;
    target_count: number;
    unmapped_delivery_count: number;
    updated_at?: string | null;
    webhook_secret?: string;
    webhook_secret_stored: boolean;
}
export interface SignalIntegrationLoadMatch {
    id: string;
    organization_id: string;
}
export interface SignalIntegrationListMatch {
    organization_id: string;
}
export interface SignalIntegrationCreateData {
    organization_id: string;
    api_token?: string;
    config?: Record<string, any>;
    mode?: string;
    name: string;
    provider: string;
    webhook_secret?: string;
    $action?: string;
    [action: string]: any;
}
export interface SignalIntegrationUpdateData {
    id: string;
    organization_id: string;
    api_token?: string;
    config?: Record<string, any>;
    mode?: string;
    name?: string;
    status?: string;
    webhook_secret?: string;
}
export interface SignalIntegrationPatchData {
    id: string;
    organization_id: string;
    api_token?: string;
    config?: Record<string, any>;
    mode?: string;
    name?: string;
    status?: string;
    webhook_secret?: string;
}
export interface SignalIntegrationRemoveMatch {
    id: string;
    organization_id: string;
}
export interface SignalIntegrationDelivery {
    attempt_count: number;
    created_at?: string | null;
    delivery_id: string;
    event_kind?: string | null;
    id: string;
    last_error?: string | null;
    ops_signal_id?: string | null;
    organization_id: string;
    processed_at?: string | null;
    provider: string;
    received_at?: string | null;
    signal_integration_id: string;
    state: string;
}
export interface SignalIntegrationDeliveryListMatch {
    organization_id: string;
    signal_integration_id: string;
    limit?: number;
}
export interface SignalIntegrationTarget {
    app_service_id?: string | null;
    created_at?: string | null;
    display_name?: string | null;
    enabled: boolean;
    external_id: string;
    external_kind: string;
    external_slug?: string | null;
    hosted_app_id?: string | null;
    id: string;
    organization_id: string;
    signal_integration_id: string;
    signal_integration_targets: any[];
    targets: any[];
    updated_at?: string | null;
}
export interface SignalIntegrationTargetListMatch {
    organization_id: string;
    signal_integration_id: string;
}
export interface SignalIntegrationTargetUpdateData {
    organization_id: string;
    signal_integration_id: string;
    targets?: any[];
}
export interface SignalSubscription {
    id?: string;
}
export interface SignalSubscriptionLoadMatch {
    id?: string;
    organization_id: string;
}
export interface SignalSubscriptionCreateData {
    organization_id: string;
}
export interface SignalSubscriptionUpdateData {
    id: string;
    organization_id: string;
}
export interface SignalSubscriptionPatchData {
    id: string;
    organization_id: string;
}
export interface SignalSubscriptionRemoveMatch {
    id: string;
    organization_id: string;
}
export interface Site {
    activated_at: string | null;
    activated_at_label: string | null;
    commit_sha: string | null;
    created_at: string;
    created_at_label: string | null;
    creator_user_id: string | null;
    deploy_slug: string;
    failure_message: string | null;
    file_count: number;
    file_count_label: string;
    finished_at: string | null;
    finished_at_label: string | null;
    id: string;
    is_active: boolean;
    source_ref: string | null;
    started_at: string | null;
    started_at_label: string | null;
    static_site_id: string;
    status: string;
    total_bytes: number;
    total_bytes_label: string;
    trigger_kind: string;
    updated_at: string;
    updated_at_label: string | null;
    uploaded_at: string | null;
    uploaded_at_label: string | null;
}
export interface SiteListMatch {
    organization_id: string;
    site?: string;
}
export interface SiteAccessKey {
    id?: string;
}
export interface SiteAccessKeyLoadMatch {
    organization_id: string;
    site_id: string;
}
export interface SiteAccessKeyCreateData {
    organization_id: string;
    site_id: string;
}
export interface SiteAccessKeyRemoveMatch {
    id: string;
    organization_id: string;
    site_id: string;
}
export interface SitePreview {
    icon_data_url: string | null;
    title: string | null;
    url: string;
}
export interface SitePreviewLoadMatch {
    organization_id: string;
    url: string;
}
export interface SiteSecret {
    id?: string;
    native_agent_id: string;
    value: string;
}
export interface SiteSecretUpdateData {
    id: string;
    organization_id: string;
    site_id: string;
    native_agent_id?: string;
    value?: string;
}
export interface SiteSecretRemoveMatch {
    id: string;
    organization_id: string;
    site_id: string;
}
export interface SlackChannel {
    id: string;
    is_member: boolean;
    is_private: boolean;
    is_slack_connect: boolean;
    name: string;
    published: boolean;
}
export interface SlackChannelListMatch {
    agent_id: string;
    organization_id: string;
    cursor?: string;
    kind?: string;
    q?: string;
    refresh?: boolean;
}
export interface SourceConnection {
    id?: string;
}
export interface SourceConnectionCreateData {
    id: string;
    $action?: string;
    [action: string]: any;
}
export interface SpaceAlertRule {
    id?: string;
}
export interface SpaceAlertRuleLoadMatch {
    id?: string;
    space_id: string;
}
export interface SpaceAlertRuleCreateData {
    space_id: string;
    $action?: string;
    [action: string]: any;
}
export interface SpaceAlertRuleUpdateData {
    id: string;
    space_id: string;
}
export interface SpaceAlertRulePatchData {
    id: string;
    space_id: string;
}
export interface SpaceAlertRuleRemoveMatch {
    id: string;
    space_id: string;
}
export interface SpaceAuditEvent {
}
export interface SpaceAuditEventLoadMatch {
    space_id: string;
}
export interface SpaceAuditEventCreateData {
    space_id: string;
}
export interface SpaceDnsRecord {
    id?: string;
}
export interface SpaceDnsRecordLoadMatch {
    id?: string;
    space_id: string;
    $action?: string;
    [action: string]: any;
}
export interface SpaceDnsRecordCreateData {
    space_id: string;
    $action?: string;
    [action: string]: any;
}
export interface SpaceDnsRecordUpdateData {
    id: string;
    space_id: string;
}
export interface SpaceDnsRecordPatchData {
    id: string;
    space_id: string;
}
export interface SpaceDnsRecordRemoveMatch {
    id: string;
    space_id: string;
}
export interface SpaceEnrollmentToken {
    id?: string;
}
export interface SpaceEnrollmentTokenLoadMatch {
    id?: string;
    space_id: string;
}
export interface SpaceEnrollmentTokenCreateData {
    space_id: string;
    $action?: string;
    [action: string]: any;
}
export interface SpaceEnrollmentTokenUpdateData {
    id: string;
    space_id: string;
}
export interface SpaceEnrollmentTokenPatchData {
    id: string;
    space_id: string;
}
export interface SpaceEnrollmentTokenRemoveMatch {
    id: string;
    space_id: string;
}
export interface SpaceGateway {
    id?: string;
}
export interface SpaceGatewayLoadMatch {
    id?: string;
    space_id: string;
    $action?: string;
    [action: string]: any;
}
export interface SpaceGatewayCreateData {
    space_id: string;
    $action?: string;
    [action: string]: any;
}
export interface SpaceGatewayUpdateData {
    id: string;
    space_id: string;
}
export interface SpaceGatewayPatchData {
    id: string;
    space_id: string;
}
export interface SpaceGatewayRemoveMatch {
    id: string;
    space_id: string;
}
export interface SpaceGroup {
    id?: string;
}
export interface SpaceGroupLoadMatch {
    space_id: string;
}
export interface SpaceGroupCreateData {
    space_id: string;
}
export interface SpaceGroupUpdateData {
    id: string;
    space_id: string;
}
export interface SpaceGroupPatchData {
    id: string;
    space_id: string;
}
export interface SpaceGroupRemoveMatch {
    id: string;
    space_id: string;
}
export interface SpaceGroupMembership {
    id?: string;
}
export interface SpaceGroupMembershipLoadMatch {
    space_id: string;
}
export interface SpaceGroupMembershipCreateData {
    space_id: string;
}
export interface SpaceGroupMembershipUpdateData {
    id: string;
    space_id: string;
}
export interface SpaceGroupMembershipPatchData {
    id: string;
    space_id: string;
}
export interface SpaceGroupMembershipRemoveMatch {
    id: string;
    space_id: string;
}
export interface SpaceLogStream {
}
export interface SpaceLogStreamLoadMatch {
    space_id: string;
}
export interface SpaceLogStreamCreateData {
    space_id: string;
}
export interface SpaceMetricSery {
}
export interface SpaceMetricSeryLoadMatch {
    space_id: string;
}
export interface SpaceMetricSeryCreateData {
    space_id: string;
}
export interface SpaceOtelCollector {
    id?: string;
}
export interface SpaceOtelCollectorLoadMatch {
    id?: string;
    space_id: string;
    $action?: string;
    [action: string]: any;
}
export interface SpaceOtelCollectorCreateData {
    space_id: string;
    $action?: string;
    [action: string]: any;
}
export interface SpaceOtelCollectorUpdateData {
    id: string;
    space_id: string;
}
export interface SpaceOtelCollectorPatchData {
    id: string;
    space_id: string;
}
export interface SpaceOtelCollectorRemoveMatch {
    id: string;
    space_id: string;
}
export interface SpacePeer {
    id?: string;
}
export interface SpacePeerLoadMatch {
    id?: string;
    space_id: string;
    $action?: string;
    [action: string]: any;
}
export interface SpacePeerCreateData {
    space_id: string;
    $action?: string;
    [action: string]: any;
}
export interface SpacePeerUpdateData {
    id: string;
    space_id: string;
}
export interface SpacePeerPatchData {
    id: string;
    space_id: string;
}
export interface SpacePeerRemoveMatch {
    id: string;
    space_id: string;
}
export interface SpacePeerAttachment {
    id?: string;
}
export interface SpacePeerAttachmentLoadMatch {
    space_id: string;
}
export interface SpacePeerAttachmentCreateData {
    space_id: string;
}
export interface SpacePeerAttachmentUpdateData {
    id: string;
    space_id: string;
}
export interface SpacePeerAttachmentPatchData {
    id: string;
    space_id: string;
}
export interface SpacePeerAttachmentRemoveMatch {
    id: string;
    space_id: string;
}
export interface SpacePolicy {
    id?: string;
}
export interface SpacePolicyLoadMatch {
    id?: string;
    space_id: string;
}
export interface SpacePolicyCreateData {
    space_id: string;
    $action?: string;
    [action: string]: any;
}
export interface SpacePolicyUpdateData {
    id: string;
    space_id: string;
}
export interface SpacePolicyPatchData {
    id: string;
    space_id: string;
}
export interface SpacePolicyRemoveMatch {
    id: string;
    space_id: string;
}
export interface SpaceSegment {
    id?: string;
}
export interface SpaceSegmentLoadMatch {
    id?: string;
    space_id: string;
}
export interface SpaceSegmentCreateData {
    space_id: string;
}
export interface SpaceSegmentUpdateData {
    id: string;
    space_id: string;
}
export interface SpaceSegmentPatchData {
    id: string;
    space_id: string;
}
export interface SpaceSegmentRemoveMatch {
    id: string;
    space_id: string;
}
export interface SpaceTraceSpan {
}
export interface SpaceTraceSpanLoadMatch {
    space_id: string;
}
export interface SpaceTraceSpanCreateData {
    space_id: string;
}
export interface Spark {
    activated_products: any[];
    agents_only?: boolean;
    can_activate_products: boolean;
    can_manage: boolean;
    compute_credit_cents: number | null;
    created_at: string;
    created_at_label: string | null;
    credit_cents: number | null;
    first_spark: Record<string, any> | null;
    github_connected: boolean;
    github_prs_authored_by_change_author: boolean;
    id: string;
    jsonrpc: string;
    logo_url: string | null;
    member_count: number;
    method: string;
    name: string;
    params?: Record<string, any>;
    pending_invitation_count: number;
    personal: boolean;
    repository_count: number;
    role: string | null;
    sandbox_region: string;
    shared_agent_personal_accounts_enabled?: boolean;
    slug: string;
    source_control_providers?: any[];
    source_ui_enabled?: boolean;
    started: boolean;
    timezone: string;
    updated_at: string;
    updated_at_label: string | null;
    verify_pr_scenario_writing_enabled: boolean;
}
export interface SparkLoadMatch {
    organization_id: string;
}
export interface SparkCreateData {
    id?: string;
    jsonrpc: string;
    method: string;
    params?: Record<string, any>;
}
export interface SparkAgentIntegration {
    account_counts: Record<string, any>;
    accounts_path: string;
    added_toolkits: any[];
    can_manage: boolean;
    can_manage_organization: boolean;
    catalog: any[];
    connect_as: string | null;
    connect_as_by_toolkit: Record<string, any>;
    connected_counts: Record<string, any>;
    connection_id: string;
    connections: any[];
    email: Record<string, any>;
    enabled: boolean;
    enabled_toolkits: any[];
    generation: number;
    pagination: Record<string, any>;
    pending_counts: Record<string, any>;
    personal_creation_key_supported?: boolean;
    private_agent: boolean;
    shared_agent_personal_accounts_enabled: boolean;
    slack: Record<string, any>;
    webhook_connections: any[];
    webhooks_available: boolean;
}
export interface SparkAgentIntegrationLoadMatch {
    agent_id: string;
    organization_id: string;
    catalog_q?: string;
    cursor?: string;
    limit?: number;
    q?: string;
    toolkit?: string;
}
export interface SparkAgentIntegrationCreateData {
    agent_id: string;
    organization_id: string;
    cursor?: string;
    limit?: number;
    q?: string;
    toolkit?: string;
    connection_id: string;
    enabled: boolean;
    generation: number;
}
export interface SparkAgentLocalThread {
    action: string;
    archived: boolean;
    can_archive: boolean;
    can_disconnect_relay?: boolean;
    can_end: boolean;
    can_interrupt: boolean;
    can_send: boolean;
    created_at: string;
    delivery: Record<string, any>;
    device_id: string;
    device_name: string;
    diagnostic_code?: string;
    end: any;
    expires_at: string;
    full_title: string;
    id: string;
    key: string;
    last_activity_at: string | null;
    native_thread_id: string;
    parent_conversation_id: string | null;
    provider: string;
    references: Record<string, any>;
    relay_disconnected_at?: string | null;
    relay_participant: Record<string, any>;
    result: any;
    result_expired: boolean;
    result_schema?: Record<string, any> | boolean;
    section: string;
    state: string;
    status: string | null;
    task_configured: boolean;
    thread_id: string;
    title: string;
}
export interface SparkAgentLocalThreadLoadMatch {
    agent_id: string;
    id: string;
    organization_id: string;
    $action?: string;
    [action: string]: any;
}
export interface SparkAgentLocalThreadCreateData {
    agent_id: string;
    organization_id: string;
    device_id: string;
    key: string;
    provider: string;
    result_schema?: Record<string, any> | boolean;
    thread_id: string;
}
export interface SparkAgentLocalThreadUpdateData {
    agent_id: string;
    id: string;
    organization_id: string;
    allowed_senders?: any;
    ask_first?: any;
    expected_version?: any;
    reply_with_final_answer?: any;
    restricted?: any;
    $action?: string;
    [action: string]: any;
}
export interface SparkAgentSite {
    deployed_at: string;
    deployments_count: number;
    hostname: string;
    https: string;
    id: string;
    name: string;
    url: string;
    visibility: string;
}
export interface SparkAgentSiteListMatch {
    agent_id: string;
    organization_id: string;
    cursor?: string;
    limit?: number;
}
export interface SparkAgentSkill {
    available: boolean;
    can_configure: boolean;
    can_manage: boolean;
    configuration_state?: string;
    description: string;
    enabled: boolean;
    name: string;
    skills: any[];
    version: string;
}
export interface SparkAgentSkillListMatch {
    agent_id: string;
    organization_id: string;
}
export interface SparkAgentSkillCreateData {
    agent_id: string;
    organization_id: string;
    enabled: boolean;
    name: string;
    version: string;
}
export interface SparkAgentThread {
    archive_deletes_sandbox?: boolean;
    archived: boolean;
    attention: Record<string, any> | null;
    can_archive: boolean;
    can_compact: boolean;
    can_snooze: boolean;
    coordination_status?: string | null;
    execution?: any;
    first_input?: any;
    first_input_key?: string;
    first_input_requester_membership_id?: string;
    group: string;
    has_active_run: boolean;
    id: string;
    inherit_context?: boolean;
    is_main: boolean;
    kind: string;
    message?: string;
    older: boolean;
    parent_conversation_id?: string;
    parent_conversation_title?: string;
    requester_membership_id?: string;
    snoozed_until: string | null;
    thread: Record<string, any>;
    title?: string;
    updated_at: string | null;
}
export interface SparkAgentThreadListMatch {
    agent_id: string;
    organization_id: string;
    archived?: boolean;
    conversation_id?: string;
    cursor?: string;
    local_cursor?: string;
}
export interface SparkAgentThreadCreateData {
    agent_id: string;
    organization_id: string;
    execution?: any;
    inherit_context?: boolean;
    message?: string;
    parent_conversation_id?: string;
    requester_membership_id?: string;
    title?: string;
    $action?: string;
    [action: string]: any;
}
export interface SparkCredit {
    amount_cents?: number;
    autofill: any;
    autofill_payment_unconfirmed: boolean;
    available_usd: string;
    billing_unit?: string;
    can_manage: boolean;
    compute_minutes: Record<string, any>;
    compute_usd?: string;
    credits_per_usd: number;
    inference_usd?: string;
    kind: string;
    payment_method: Record<string, any> | null;
    payments_enabled: boolean;
    plan: string | null;
    plans: any[];
    quoted_credits_cents?: number;
    quoted_price_cents?: number;
    refill_limits_cents: any[];
    refill_options: any[];
    refill_thresholds_cents: any[];
    request_key: string;
    settings: any;
    starter_cents: number;
    top_up_max_cents: number;
    top_up_step_cents: number;
}
export interface SparkCreditLoadMatch {
    organization_id: string;
    view?: string;
    $action?: string;
    [action: string]: any;
}
export interface SparkCreditCreateData {
    organization_id: string;
    amount_cents?: number;
    billing_unit?: string;
    kind: string;
    plan?: string | null;
    quoted_credits_cents?: number;
    quoted_price_cents?: number;
    request_key: string;
}
export interface SparkCreditUpdateData {
    organization_id: string;
}
export interface SparkCreditPatchData {
    organization_id: string;
    view?: string;
    settings?: any;
}
export interface SparkCreditAgentUsage {
    agents: any[];
    all: Record<string, any>;
    days: any[];
    id?: string;
    owners: any[];
}
export interface SparkCreditAgentUsageLoadMatch {
    id: string;
    organization_id: string;
}
export interface SparkCreditUsageTotal {
    compute_minutes_used: string;
    compute_usd: string;
    inference_usd: string;
}
export interface SparkCreditUsageTotalLoadMatch {
    organization_id: string;
}
export interface StaticSite {
    active_deployment_id: string | null;
    cdn_hostname: string;
    cdn_url: string;
    cname_target: string;
    created_at: string;
    default_url: string;
    description: string | null;
    error_document: string | null;
    failure_message: string | null;
    hosted_app_id: string | null;
    id: string;
    index_document: string;
    name: string;
    organization_id: string;
    provisioned: boolean;
    provisioned_at: string | null;
    region: string | null;
    replication_regions: any[];
    repository_id: string | null;
    slug: string;
    status: string;
    updated_at: string;
}
export interface StaticSiteLoadMatch {
    id: string;
}
export interface StaticSiteListMatch {
    organization_id: string;
}
export interface StaticSiteCreateData {
    organization_id: string;
    description?: string | null;
    error_document?: string | null;
    hosted_app_id?: string | null;
    index_document?: string;
    name: string;
    region?: string | null;
    replication_regions?: any[];
    repository_id?: string | null;
    slug: string;
    $action?: string;
    [action: string]: any;
}
export interface StaticSiteUpdateData {
    id: string;
}
export interface StaticSitePatchData {
    id: string;
}
export interface StaticSiteRemoveMatch {
    id: string;
}
export interface StaticSiteDeployment {
    activated_at: string | null;
    activated_at_label: string | null;
    commit_sha: string | null;
    created_at: string;
    created_at_label: string | null;
    creator_user_id: string | null;
    deploy_slug: string;
    failure_message: string | null;
    file_count: number;
    file_count_label: string;
    finished_at: string | null;
    finished_at_label: string | null;
    id: string;
    is_active: boolean;
    source_ref: string | null;
    started_at: string | null;
    started_at_label: string | null;
    static_site_id: string;
    status: string;
    total_bytes: number;
    total_bytes_label: string;
    trigger_kind: string;
    updated_at: string;
    updated_at_label: string | null;
    uploaded_at: string | null;
    uploaded_at_label: string | null;
}
export interface StaticSiteDeploymentLoadMatch {
    id: string;
    static_site_id: string;
}
export interface StaticSiteDeploymentListMatch {
    static_site_id: string;
}
export interface StaticSiteDeploymentCreateData {
    static_site_id: string;
    $action?: string;
    [action: string]: any;
}
export interface StaticSiteDomain {
    app_environment_id: string | null;
    app_service_id: string | null;
    created_at: string;
    dns_mode: string;
    dns_status: string;
    failure_message: string | null;
    hosted_app_id: string | null;
    hostname: string;
    id: string;
    kind: string;
    last_checked_at: string | null;
    record_name: string | null;
    record_type: string | null;
    record_value: string | null;
    redirect_to: string | null;
    static_site_id: string | null;
    target_kind: string;
    tls_status: string;
    updated_at: string;
    verification_status: string;
}
export interface StaticSiteDomainLoadMatch {
    id: string;
    static_site_id: string;
}
export interface StaticSiteDomainListMatch {
    static_site_id: string;
}
export interface StaticSiteDomainCreateData {
    static_site_id: string;
    dns_mode?: string;
    hostname: string;
    kind?: string;
    redirect_to?: string | null;
    $action?: string;
    [action: string]: any;
}
export interface StaticSiteDomainUpdateData {
    id: string;
    static_site_id: string;
}
export interface StaticSiteDomainPatchData {
    id: string;
    static_site_id: string;
}
export interface StaticSiteDomainRemoveMatch {
    id: string;
    static_site_id: string;
}
export interface StatusChange {
    change_id: string;
    id?: string;
    patchsets: any[];
    status: string;
    status_label: string;
    status_state: string;
    status_tone: string;
}
export interface StatusChangeLoadMatch {
    id: string;
    organization_id: string;
    repo_id: string;
}
export interface StatusCommit {
    checks: any[];
    commit_sha: string;
    counts: Record<string, any>;
    id?: string;
    status: string;
    status_label: string;
    status_state: string;
    status_tone: string;
    total: number;
}
export interface StatusCommitLoadMatch {
    id: string;
    organization_id: string;
    repo_id: string;
}
export interface StatusPatchset {
    checks: any[];
    checks_status: string | null;
    commit_sha: string | null;
    counts: Record<string, any>;
    id?: string;
    patchset_id: string;
    status: string;
    status_label: string;
    status_state: string;
    status_tone: string;
    total: number;
}
export interface StatusPatchsetLoadMatch {
    id: string;
    organization_id: string;
    repo_id: string;
}
export interface StripeWebhook {
}
export interface StripeWebhookCreateData {
}
export interface SubmitTelemetry {
}
export interface SubmitTelemetryCreateData {
}
export interface SubscriptionModel {
    default_reasoning?: string;
    id: string;
    name: string;
    provider: string;
    reasoning?: any[];
    speeds?: any[];
}
export interface SubscriptionModelListMatch {
    agent_id: string;
    organization_id: string;
    profile_id: string;
}
export interface SwarmEvent {
    agent_swarm_id: string;
    attempt_id: string | null;
    created_at: string;
    created_at_label: string | null;
    id: number;
    kind: string;
    payload: Record<string, any>;
    reason: string | null;
    scheduler_generation: number | null;
    task_id: string | null;
}
export interface SwarmEventListMatch {
    swarm_id: string;
    after?: number;
    kind?: string;
    limit?: number;
}
export interface SwarmLive {
}
export interface SwarmLiveLoadMatch {
    swarm_id: string;
    after_event_id?: number;
    after_seq?: number;
    cursor?: string;
    limit?: number;
    $action?: string;
    [action: string]: any;
}
export interface SwarmNote {
    task_id?: string | null;
    text: string;
}
export interface SwarmNoteCreateData {
    swarm_id: string;
    task_id?: string | null;
    text: string;
}
export interface SwarmTask {
    acceptance_commands: any[];
    agent_swarm_id: string;
    assigned_runner_id: string | null;
    blocked_reason: string | null;
    changes: any[];
    commit_count: number;
    commit_sha_result: string | null;
    created_at: string;
    created_at_label: string | null;
    current_attempt_id: string | null;
    deadline_at: string | null;
    depends_on_task_ids: any[];
    depth: number;
    diff_artifact_url: string | null;
    display_id: number;
    environment_profile: string | null;
    error_message: string | null;
    failure_code: string | null;
    finished_at: string | null;
    finished_at_label: string | null;
    harness: string;
    id: string;
    input_revision: string | null;
    iteration: number;
    landing_state: string;
    model: string | null;
    model_provider: string | null;
    number: number;
    organization_id: string;
    owned_paths: any[];
    parent_task_id: string | null;
    position: number;
    prompt: string;
    queued_at: string | null;
    queued_at_label: string | null;
    reasoning_effort: string | null;
    recent_activity: any[];
    repo_url: string;
    result: Record<string, any>;
    retry_number: number;
    role: string;
    run_id: string | null;
    stack_after_task_id: string | null;
    started_at: string | null;
    started_at_label: string | null;
    status: string;
    title: string | null;
    updated_at: string;
    updated_at_label: string | null;
}
export interface SwarmTaskLoadMatch {
    id: string;
    swarm_id: string;
    after_seq?: number;
    limit?: number;
    $action?: string;
    [action: string]: any;
}
export interface SwarmTaskListMatch {
    swarm_id: string;
}
export interface TaskLease {
    id?: string;
}
export interface TaskLeaseCreateData {
    swarm_id: string;
    task_id: string;
    $action?: string;
    [action: string]: any;
}
export interface ThreadPreview {
    expires_at: string | null;
    port: number;
    url: string;
}
export interface ThreadPreviewCreateData {
    agent_id: string;
    organization_id: string;
    thread_id: string;
    port: number;
}
export interface ThreadPreviewAccess {
}
export interface ThreadPreviewAccessLoadMatch {
    host: string;
    return_to?: string;
    $action?: string;
    [action: string]: any;
}
export interface ThreadPreviewAccessCreateData {
    host?: any;
    token?: any;
    $action?: string;
    [action: string]: any;
}
export interface ToolFeedback {
    category: string;
    created_at: string;
    details: string;
    feedback: Record<string, any>;
    id: string;
    metadata: Record<string, any>;
    organization_id: string;
    source: string;
    summary: string;
    user_id: string;
}
export interface ToolFeedbackLoadMatch {
    id: string;
    organization_id: string;
}
export interface ToolFeedbackCreateData {
    organization_id: string;
    feedback: Record<string, any>;
}
export interface Transcript {
    agent: string;
    author: Record<string, any>;
    checkpoint_pagination: Record<string, any>;
    checkpoints: any[];
    id: string;
    last_checkpoint_at: string | null;
    selected_checkpoint: any;
    source_url: string;
    started_at: string;
    status: string;
    title: string | null;
}
export interface TranscriptLoadMatch {
    around_event?: number;
    cursor?: string;
    event_digest?: string;
    include_tool?: boolean;
    limit?: number;
    max_byte?: number;
    source_ref?: string;
    $action?: string;
    [action: string]: any;
}
export interface TranscriptListMatch {
    change?: string;
    checkpoint_cursor?: string;
    commit?: string;
    cursor?: string;
    limit?: number;
    patchset?: number;
    pr?: string;
    repo: string;
    session?: string;
}
export interface TranscriptCreateData {
    organization_id: string;
    status: string;
    adapter?: any;
    cursor?: any;
    from?: any;
    limit?: any;
    max_bytes?: any;
    mode?: any;
    query?: any;
    repo?: any;
    to?: any;
    user?: any;
    $action?: string;
    [action: string]: any;
}
export interface V1Message {
}
export interface V1MessageCreateData {
    organization_id: string;
}
export interface VcBranch {
    id?: string;
    name: string;
    target_commit_id: string;
}
export interface VcBranchListMatch {
    organization_id: string;
    repo_id: string;
}
export interface VcBranchCreateData {
    organization_id: string;
    repo_id: string;
}
export interface VcBranchRemoveMatch {
    id: string;
    organization_id: string;
    repo_id: string;
}
export interface VcBrowser {
}
export interface VcBrowserLoadMatch {
    organization_id: string;
    repo_id: string;
    file?: string;
    path?: string;
    ref: string;
    recursive?: boolean;
    $action?: string;
    [action: string]: any;
}
export interface VcChange {
    activity: any[];
    canonical_path: string;
    change: any;
    checks?: any[];
    checks_status?: string;
    description?: string | null;
    group?: Record<string, any> | null;
    id: string;
    jj_change_id?: string | null;
    labels?: any[];
    landing: Record<string, any>;
    number: number;
    patchset_number?: number | null;
    previews: any[];
    primary_status?: string | null;
    public_id?: string;
    related_changes: any[];
    relation_chain: any[];
    restack_state?: string;
    review_summary?: Record<string, any>;
    stack?: any;
    status: string;
    sync: Record<string, any>;
    target: Record<string, any>;
    target_advanced: boolean;
    target_branch: string;
    title: string;
    url?: string;
}
export interface VcChangeLoadMatch {
    id: string;
    organization_id: string;
    repo_id: string;
    $action?: string;
    [action: string]: any;
}
export interface VcChangeListMatch {
    organization_id: string;
    repo_id: string;
    group?: string;
    label?: string;
    limit?: number;
    mine?: boolean;
    page?: number;
    status?: string;
    target?: string;
}
export interface VcChangeCreateData {
    id?: string;
    organization_id: string;
    repo_id: string;
    description?: string | null;
    labels?: any[];
    title: string;
    assets?: any;
    base?: any;
    draft?: any;
    dry_run?: any;
    expected_base_commit_id?: any;
    expected_head_commit_id?: any;
    expected_review_head_commit_id?: any;
    expected_review_patchset_number?: any;
    git_publication_id?: any;
    head?: any;
    into?: any;
    message?: any;
    remove_reviewers?: any;
    request_id?: any;
    reviewers?: any;
    transcript_chat?: any;
    $action?: string;
    [action: string]: any;
}
export interface VcChangeUpdateData {
    id: string;
    organization_id: string;
    repo_id: string;
    description?: string | null;
    assets?: any;
    $action?: string;
    [action: string]: any;
}
export interface VcChangeGroup {
    changes: any[];
    id?: string;
    name?: string;
    number?: number;
    status: string;
    title: string | null;
}
export interface VcChangeGroupLoadMatch {
    id: string;
    organization_id: string;
    repo_id: string;
}
export interface VcChangeGroupListMatch {
    organization_id: string;
    repo_id: string;
}
export interface VcChangeGroupCreateData {
    organization_id: string;
    repo_id: string;
    name: string;
    title?: string | null;
}
export interface VcFile {
    paths: any[];
    truncated: boolean;
}
export interface VcFileListMatch {
    organization_id: string;
    repo_id: string;
    prefix?: string;
    ref: string;
}
export interface VcMergeQueue {
    analytics: Record<string, any>;
    id?: string;
    policy: Record<string, any>;
    queue: Record<string, any>;
    target_branches?: any[];
}
export interface VcMergeQueueLoadMatch {
    id: string;
    organization_id: string;
    repo_id: string;
    change?: string;
    entry_id?: string;
    page?: number;
    window_day?: number;
}
export interface VcMergeQueueListMatch {
    organization_id: string;
    repo_id: string;
    change?: string;
    entry_id?: string;
    page?: number;
    target?: string;
    window_day?: number;
}
export interface VcMergeQueueCreateData {
    id: string;
    organization_id: string;
    repo_id: string;
    expected_version?: any;
    $action?: string;
    [action: string]: any;
}
export interface VcMergeQueueUpdateData {
    id: string;
    organization_id: string;
    repo_id: string;
    concurrency?: any;
    enabled?: any;
    expected_version?: any;
    $action?: string;
    [action: string]: any;
}
export interface VcStack {
    alias_ref_name: string | null;
    changes: any[];
    code: string;
    id?: string;
    landing: Record<string, any>;
    member_count: number;
    name: string | null;
    ref_name: string;
    status: string;
    tip_change_number: number | null;
    updated_at: string;
    updated_at_label: string;
}
export interface VcStackLoadMatch {
    id: string;
    organization_id: string;
    repo_id: string;
}
export interface VcStackListMatch {
    organization_id: string;
    repo_id: string;
}
export interface VcStackUpdateData {
    id: string;
    organization_id: string;
    repo_id: string;
    name?: string | null;
    $action?: string;
    [action: string]: any;
}
export interface VcsNode {
    account_avatar_url: string | null;
    account_id: string | null;
    account_login: string;
    created_at: string;
    created_at_label: string | null;
    id: string;
    installation_id: string;
    installed_at: string | null;
    installed_at_label: string | null;
    manage_access_url: string;
    organization_id: string;
    permission_entries: any[];
    permissions: Record<string, any>;
    status: string;
    suspended_at: string | null;
    suspended_at_label: string | null;
    updated_at: string;
    updated_at_label: string | null;
}
export interface VcsNodeListMatch {
    organization_id: string;
}
export interface VcsSetting {
    can_manage_pr_scenario_writing: boolean;
    can_manage_sandbox_region: boolean;
    dedicated_outbound_ip_addresses: any[];
    default_trunk_bookmark: string;
    organization: Record<string, any>;
    sandbox_regions: any[];
}
export interface VcsSettingLoadMatch {
    organization_id: string;
}
export interface VerificationProjectCredential {
    browser_authentication?: Record<string, any> | null;
    browser_session?: string;
    composal_address: string | null;
    composal_inbox?: boolean;
    composal_inbox_user?: string;
    composal_managed_google?: boolean;
    configured: boolean;
    cookies?: string;
    credential_keys: Record<string, any>;
    description: string | null;
    email_link_auth_origins: any[];
    has_inbox: boolean;
    id: string;
    identity_provider: Record<string, any> | null;
    instructions: string | null;
    login_method: string;
    login_url: string;
    managed: boolean;
    mfa_enabled: boolean;
    name: string;
    oidc?: Record<string, any>;
    passkey?: string;
    password?: string;
    project_id: string;
    provider_guidance: string;
    remove_browser_authentication?: boolean;
    remove_totp?: boolean;
    sign_in_verified: boolean;
    sign_in_verified_at: string | null;
    status: string;
    totp_secret?: string;
    updated_at: string;
    username: string;
}
export interface VerificationProjectCredentialLoadMatch {
    id: string;
    organization_id: string;
    project_id: string;
    $action?: string;
    [action: string]: any;
}
export interface VerificationProjectCredentialListMatch {
    organization_id: string;
    project_id: string;
}
export interface VerificationProjectCredentialCreateData {
    organization_id: string;
    project_id: string;
    browser_session?: string;
    composal_inbox?: boolean;
    composal_inbox_user?: string;
    composal_managed_google?: boolean;
    cookies?: string;
    description?: string | null;
    email_link_auth_origins?: any[];
    instructions?: string | null;
    login_method: string;
    login_url?: string;
    name: string;
    oidc?: Record<string, any>;
    passkey?: string;
    password?: string;
    remove_browser_authentication?: boolean;
    remove_totp?: boolean;
    totp_secret?: string;
    username?: string;
    $action?: string;
    [action: string]: any;
}
export interface VerificationProjectCredentialUpdateData {
    id: string;
    organization_id: string;
    project_id: string;
    browser_session?: string;
    composal_inbox?: boolean;
    composal_inbox_user?: string;
    composal_managed_google?: boolean;
    cookies?: string;
    description?: string | null;
    email_link_auth_origins?: any[];
    instructions?: string | null;
    login_method?: string;
    login_url?: string;
    name?: string;
    oidc?: Record<string, any>;
    passkey?: string;
    password?: string;
    remove_browser_authentication?: boolean;
    remove_totp?: boolean;
    totp_secret?: string;
    username?: string;
}
export interface VerificationProjectCredentialPatchData {
    id: string;
    organization_id: string;
    project_id: string;
    browser_session?: string;
    composal_inbox?: boolean;
    composal_inbox_user?: string;
    composal_managed_google?: boolean;
    cookies?: string;
    description?: string | null;
    email_link_auth_origins?: any[];
    instructions?: string | null;
    login_method?: string;
    login_url?: string;
    name?: string;
    oidc?: Record<string, any>;
    passkey?: string;
    password?: string;
    remove_browser_authentication?: boolean;
    remove_totp?: boolean;
    totp_secret?: string;
    username?: string;
}
export interface VerificationProjectCredentialRemoveMatch {
    id: string;
    organization_id: string;
    project_id: string;
    permanent?: boolean;
}
export interface VerificationProjectPersona {
    access_mode: string;
    archived_at: string | null;
    capabilities: string | null;
    created_at: string;
    credential_id: string | null;
    goals: string | null;
    id: string;
    lock_version: number;
    name: string;
    project_id: string;
    role: string;
    updated_at: string;
    version: number;
}
export interface VerificationProjectPersonaLoadMatch {
    id: string;
    organization_id: string;
    project_id: string;
}
export interface VerificationProjectPersonaListMatch {
    organization_id: string;
    project_id: string;
}
export interface VerificationProjectPersonaCreateData {
    organization_id: string;
    project_id: string;
    access_mode?: string;
    capabilities?: string | null;
    credential_id?: string | null;
    goals?: string | null;
    name: string;
    role: string;
    $action?: string;
    [action: string]: any;
}
export interface VerificationProjectPersonaUpdateData {
    id: string;
    organization_id: string;
    project_id: string;
    access_mode?: string;
    capabilities?: string | null;
    credential_id?: string | null;
    goals?: string | null;
    name?: string;
    role?: string;
    version?: number;
}
export interface VerificationProjectPersonaPatchData {
    id: string;
    organization_id: string;
    project_id: string;
    access_mode?: string;
    capabilities?: string | null;
    credential_id?: string | null;
    goals?: string | null;
    name?: string;
    role?: string;
    version?: number;
}
export interface VerificationProjectPersonaRemoveMatch {
    id: string;
    organization_id: string;
    project_id: string;
}
export interface VerificationProjectRun {
    approved_at: string | null;
    approved_digest: string | null;
    archived_at: string | null;
    available_tests: any[];
    can_archive: boolean;
    can_restore: boolean;
    can_start_another_run: boolean;
    cleanup_state: string;
    concurrency: number;
    created_at: string;
    creator_name: string | null;
    definition_mode: string;
    environment_id: string | null;
    id: string;
    lock_version: number;
    max_seconds: number;
    outcome: string | null;
    permissions: Record<string, any>;
    plan_digest: string | null;
    preparation_error_code: string | null;
    progress: Record<string, any>;
    project: Record<string, any>;
    project_id: string;
    pull_request: any;
    queued_at: string | null;
    run: Record<string, any>;
    run_plan_id?: string | null;
    scenario_runs: any[];
    source_run_id: string | null;
    source_versions: any[] | null;
    start_when_prepared: boolean;
    state: string;
    target_snapshot: Record<string, any>;
    title: string;
    updated_at: string;
    verifier_preferences_snapshot: Record<string, any>;
    web_path: string;
}
export interface VerificationProjectRunLoadMatch {
    id: string;
    organization_id: string;
    project_id: string;
    diagnostic?: boolean;
    $action?: string;
    [action: string]: any;
}
export interface VerificationProjectRunListMatch {
    organization_id: string;
    project_id: string;
    page?: number;
    status?: string;
}
export interface VerificationProjectRunCreateData {
    id?: string;
    organization_id: string;
    project_id: string;
    concurrency: number;
    environment_id: string | null;
    max_seconds: number;
    run_plan_id?: string | null;
    start_when_prepared: boolean;
    digest?: any;
    idempotency_key?: any;
    mode?: any;
    run_plan_version?: any;
    scenario_files?: any;
    scenario_ids?: any;
    viewer_time_zone?: any;
    $action?: string;
    [action: string]: any;
}
export interface VerificationProjectScenario {
    actors?: Record<string, any>;
    allowed_actions: string;
    archived_at: string | null;
    cleanup?: any[];
    created_at: string;
    dependencies: any[];
    fixtures?: any[];
    health: Record<string, any>;
    id: string;
    identity_probe?: any;
    if?: string | null;
    labels: any[];
    last_revision: any;
    lock_version: number;
    name: string;
    on?: any;
    outcomes: any[];
    persona_id: string;
    primary_actor?: string | null;
    project_id: string;
    selectable_for_run: boolean;
    starting_conditions: string | null;
    steps: any[];
    triggers: any[];
    updated_at: string;
    version: number;
}
export interface VerificationProjectScenarioLoadMatch {
    id: string;
    organization_id: string;
    project_id: string;
    $action?: string;
    [action: string]: any;
}
export interface VerificationProjectScenarioListMatch {
    organization_id: string;
    project_id: string;
}
export interface VerificationProjectScenarioCreateData {
    organization_id: string;
    project_id: string;
    actors?: Record<string, any>;
    allowed_actions?: string;
    cleanup?: any[];
    dependencies?: any[];
    fixtures?: any[];
    identity_probe?: any;
    if?: string | null;
    labels?: any[];
    name: string;
    on?: any;
    outcomes?: any[];
    persona_id?: string;
    primary_actor?: string | null;
    starting_conditions?: string | null;
    steps?: any[];
    triggers?: any[];
    $action?: string;
    [action: string]: any;
}
export interface VerificationProjectScenarioUpdateData {
    id: string;
    organization_id: string;
    project_id: string;
    actors?: Record<string, any>;
    allowed_actions?: string;
    cleanup?: any[];
    dependencies?: any[];
    fixtures?: any[];
    identity_probe?: any;
    if?: string | null;
    labels?: any[];
    name?: string;
    on?: any;
    outcomes?: any[];
    persona_id?: string;
    primary_actor?: string | null;
    starting_conditions?: string | null;
    steps?: any[];
    triggers?: any[];
    version?: number;
}
export interface VerificationProjectScenarioPatchData {
    id: string;
    organization_id: string;
    project_id: string;
    actors?: Record<string, any>;
    allowed_actions?: string;
    cleanup?: any[];
    dependencies?: any[];
    fixtures?: any[];
    identity_probe?: any;
    if?: string | null;
    labels?: any[];
    name?: string;
    on?: any;
    outcomes?: any[];
    persona_id?: string;
    primary_actor?: string | null;
    starting_conditions?: string | null;
    steps?: any[];
    triggers?: any[];
    version?: number;
}
export interface VerifyAppDomain {
    id?: string;
}
export interface VerifyAppDomainCreateData {
    app_id: string;
    id: string;
}
export interface VerifyBrowserSession {
    account_id: string;
    expires_at: string;
    id: string;
    name?: string;
    origin: string;
    project_id: string;
    status: string;
    url: string;
    viewer_url: string | null;
}
export interface VerifyBrowserSessionLoadMatch {
    id: string;
    organization_id: string;
}
export interface VerifyBrowserSessionCreateData {
    organization_id: string;
    account_id?: string;
    name?: string;
    project_id: string;
    url: string;
    $action?: string;
    [action: string]: any;
}
export interface VerifyBrowserSessionRemoveMatch {
    id: string;
    organization_id: string;
}
export interface VerifyEmailVerification {
}
export interface VerifyEmailVerificationLoadMatch {
}
export interface VerifySignalIntegration {
    api_token_stored: boolean;
    config: Record<string, any>;
    created_at?: string | null;
    failure_message: string | null;
    id: string;
    inbound_path: string;
    inbound_url: string;
    last_received_at?: string | null;
    last_verified_at?: string | null;
    mode: string;
    name: string;
    organization_id: string;
    provider: string;
    rejected_signature_count: number;
    status: string;
    target_count: number;
    unmapped_delivery_count: number;
    updated_at?: string | null;
    webhook_secret_stored: boolean;
}
export interface VerifySignalIntegrationCreateData {
    id: string;
    organization_id: string;
}
export interface VerifyStaticSiteDomain {
    app_environment_id: string | null;
    app_service_id: string | null;
    created_at: string;
    dns_mode: string;
    dns_status: string;
    failure_message: string | null;
    hosted_app_id: string | null;
    hostname: string;
    id: string;
    kind: string;
    last_checked_at: string | null;
    record_name: string | null;
    record_type: string | null;
    record_value: string | null;
    redirect_to: string | null;
    static_site_id: string | null;
    target_kind: string;
    tls_status: string;
    updated_at: string;
    verification_status: string;
}
export interface VerifyStaticSiteDomainCreateData {
    id: string;
    static_site_id: string;
}
export interface VersionLog {
    base_image: string;
    failure_phase: string | null;
    id: string;
    image_digest: string | null;
    image_reference: string | null;
    installer_version: string;
    ready_at: string | null;
    receipt: Record<string, any> | null;
    safe_error: string | null;
    started_at: string | null;
    status: string;
}
export interface VersionLogListMatch {
    binary_id: string;
    organization_id: string;
    version_id: string;
    project_id: string;
}
export interface WaitlistApplication {
}
export interface WaitlistApplicationCreateData {
    company_name?: any;
    company_size?: any;
    email?: any;
    invite_code?: any;
    name?: any;
    use_case?: any;
}
export interface WebBotAuth {
    expires_at: string;
    origin: string;
    signatures: any[];
}
export interface WebBotAuthCreateData {
    origin: string;
}
export interface WebhookGitlab {
    id?: string;
}
export interface WebhookGitlabUpdateData {
    id: string;
}
export interface WorkflowRunStep {
    id?: string;
}
export interface WorkflowRunStepLoadMatch {
    agent_id: string;
    id: string;
    organization_id: string;
    workflow_run_id: string;
    $action?: string;
    [action: string]: any;
}
export interface WorkflowRunStopNotice {
}
export interface WorkflowRunStopNoticeCreateData {
    agent_id: string;
    organization_id: string;
    workflow_run_id: string;
    $action?: string;
    [action: string]: any;
}
export interface WorkflowTriggerSkipped {
    id?: string;
}
export interface WorkflowTriggerSkippedCreateData {
    agent_id: string;
    id: string;
    organization_id: string;
    workflow_trigger_id: string;
    $action?: string;
    [action: string]: any;
}
export interface WorkspaceActivity {
    live_activity: any[];
    recent_items: any[];
    unresolved_notification_count: number;
}
export interface WorkspaceActivityLoadMatch {
    organization_id: string;
}
export interface WorkspaceActivityNotification {
    id?: string;
}
export interface WorkspaceActivityNotificationUpdateData {
    id: string;
    organization_id: string;
    $action?: string;
    [action: string]: any;
}
export interface WorkspaceSpace {
    created_at: string;
    default_branch?: string;
    description: string | null;
    hidden: boolean;
    icon_name: string;
    id: string;
    import_status: string | null;
    name: string;
    organization_id: string;
    position: number | null;
    repository_id: string;
    repository_slug: string;
    slug: string;
    status: string;
    updated_at: string;
}
export interface WorkspaceSpaceLoadMatch {
    id: string;
    organization_id: string;
}
export interface WorkspaceSpaceListMatch {
    organization_id: string;
}
export interface WorkspaceSpaceCreateData {
    organization_id: string;
    default_branch?: string;
    description?: string | null;
    icon_name: string;
    name: string;
    slug: string;
}
export interface WorkspaceSpacePreference {
    preferences: any[];
    spaces: any[];
}
export interface WorkspaceSpacePreferenceUpdateData {
    organization_id: string;
    preferences?: any[];
}
