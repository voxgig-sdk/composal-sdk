// Typed models for the Composal SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Agent {
  attention: string | null
  avatar?: string | null
  can_delete?: boolean
  can_edit_configuration: boolean
  can_manage: boolean
  can_manage_sharing?: boolean
  can_name_managers?: boolean
  can_queue_input?: boolean
  can_reconcile_save: boolean
  configuration: any
  configuration_revision: number
  configuration_version: string | null
  control_connections_available?: boolean
  controlling_user_id: string
  coordination_available?: boolean
  created_at: string
  direct_chat_available?: boolean
  has_unread_updates: boolean
  id: string
  last_reply_at: string | null
  lifecycle_actions: any[]
  lifecycle_version: string | null
  local_agent_control_available?: boolean
  managers?: any[]
  model_change_action?: string | null
  name: string
  organization_id: string
  persona?: any
  preview?: any
  preview_received_at?: string | null
  provisioning?: any
  reply_triage: Record<string, any> | null
  runtime_version?: string
  setup_pending: boolean
  sharing_fixed?: boolean
  sharing_version?: number
  slug: string
  status: string
  team_role?: string
  updated_at: string
  url_slug?: string
  visibility?: string
}

export interface AgentLoadMatch {
  id: string
  organization_id: string

  // Selects a custom action instead of the plain load:
  //   'activity' | 'avatar' | 'compute' | 'computer' | 'conversation' | 'coordination' | 'debug' | 'email' | 'environment' | 'github_access' | 'input_delivery' | 'inspection' | 'library' | 'lifecycle' | 'message_image' | 'mission_control_card' | 'resource' | 'run_usage' | 'runtime' | 'sandbox' | 'thread_model' | 'usage'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface AgentListMatch {
  organization_id: string
  cursor?: string
  limit?: number
  q?: string
  runtime_version?: string
  status?: string
}

export interface AgentCreateData {
  organization_id: string
  viewer_time_zone?: string
  configuration?: any
  name: string
  runtime_version?: string
  slug?: string
  visibility?: string

  // Selects a custom action instead of the plain create:
  //   'browser_opened' | 'call_session' | 'lifecycle' | 'marked_read' | 'slack' | 'transcription_session' | 'warm'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface AgentUpdateData {
  id: string
  organization_id: string
  name?: string
  team_role?: string
  visibility?: string
  acknowledge_reset?: any
  after_id?: any
  before_id?: any
  conversation_id?: any
  expected_generation?: any
  expected_version?: any
  github_access?: any
  integration_id?: any
  keep_connections?: any
  memory_mb?: any
  model?: any
  profile?: any
  provider?: any
  reasoning?: any
  revoke_access?: any
  setup_only?: any
  value?: any

  // Selects a custom action instead of the plain update:
  //   'environment' | 'github_access' | 'model' | 'rename' | 'roster_position' | 'runtime' | 'sandbox' | 'sharing' | 'thread_model'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface AgentRemoveMatch {
  id: string
  organization_id: string
}

export interface AgentAttachment {
  byte_size: number
  content_type: string
  file_name: string
  id?: string
}

export interface AgentAttachmentCreateData {
  agent_id: string
  organization_id: string
  byte_size: number
  content_type: string
  file_name: string

  // Selects a custom action instead of the plain create:
  //   'complete'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface AgentAutomation {
  can_manage: boolean
  can_manage_events: boolean
  can_run: boolean
  can_schedule: boolean
  definition: Record<string, any>
  event_subscriptions: any[]
  event_triggers: any[]
  expected_revision: number
  id: string
  key: string
  name: string
  revision: number
  schedule: any
  schedules: any[]
  version: Record<string, any>
}

export interface AgentAutomationLoadMatch {
  agent_id: string
  id: string
  organization_id: string
}

export interface AgentAutomationListMatch {
  agent_id: string
  organization_id: string
  cursor?: string
  limit?: number
}

export interface AgentAutomationUpdateData {
  agent_id: string
  id: string
  organization_id: string
  definition?: Record<string, any>
  expected_revision?: number

  // Selects a custom action instead of the plain update:
  //   'schedule'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface AgentAvatar {
}

export interface AgentAvatarLoadMatch {
  agent_id: string
  organization_id: string
  style_catalog?: number

  // Selects a custom action instead of the plain load:
  //   'configuration'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface AgentAvatarCreateData {
  agent_id: string
  organization_id: string
  style_catalog?: number
  description?: any
  expected_generation?: any
  mode?: any
  pixel?: any
  style?: any

  // Selects a custom action instead of the plain create:
  //   'generate' | 'retry'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface AgentCommand {
  description: string
  display_name: string
  name: string
  skill_model_visible: boolean
  source: string
}

export interface AgentCommandListMatch {
  agent_id: string
  organization_id: string
  conversation_id?: string
}

export interface AgentComputer {
}

export interface AgentComputerLoadMatch {
  agent_id: string
  organization_id: string

  // Selects a custom action instead of the plain load:
  //   'frame'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface AgentComputerCreateData {
  agent_id: string
  organization_id: string
  prepare?: any

  // Selects a custom action instead of the plain create:
  //   'connect' | 'egress' | 'start'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface AgentConnection {
  agent_card_url: string
  auth_scheme: string
  can_configure: boolean
  can_disconnect: boolean
  can_setup: boolean
  connection: Record<string, any>
  credential?: string | null
  error_code: string | null
  expected_generation: number
  generation: number
  id: string
  name: string
  remote_agent: string | null
  requester_id: string
  retired_at: string | null
  revoked_at: string | null
  scope_key: string
  source_operation_id: string | null
  state: string
}

export interface AgentConnectionLoadMatch {
  agent_id: string
  id: string
  organization_id: string

  // Selects a custom action instead of the plain load:
  //   'change'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface AgentConnectionListMatch {
  agent_id: string
  organization_id: string
  cursor?: string
  limit?: number
  selected_connection_id?: string
}

export interface AgentConnectionCreateData {
  agent_id: string
  organization_id: string
  agent_card_url: string
  auth_scheme: string
  credential?: string | null
  name: string
  remote_agent?: string | null
  source_operation_id?: string | null

  // Selects a custom action instead of the plain create:
  //   'setup'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface AgentConnectionUpdateData {
  agent_id: string
  id: string
  organization_id: string
  auth_scheme?: string
  credential?: string | null
  expected_generation?: number
  name?: string
  remote_agent?: string | null
}

export interface AgentConnectionRemoveMatch {
  agent_id: string
  id: string
  organization_id: string
}

export interface AgentControlFlow {
  can_cancel: boolean
  cancellation_requested: boolean
  device_name: string
  flow_id: string
  id?: string
  providers: any[]
  repair_of_flow_id?: string
  status_label: string
  step_count: number
  title: string | null
}

export interface AgentControlFlowLoadMatch {
  agent_id: string
  id: string
  organization_id: string
}

export interface AgentControlFlowListMatch {
  agent_id: string
  organization_id: string
}

export interface AgentControlFlowCreateData {
  agent_id: string
  id: string
  organization_id: string

  // Selects a custom action instead of the plain create:
  //   'cancel'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface AgentCoordination {
  id?: string
}

export interface AgentCoordinationCreateData {
  agent_id: string
  id: string
  organization_id: string
  include_source?: any

  // Selects a custom action instead of the plain create:
  //   'stop'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface AgentEmail {
  delivery: string | null
  direction: string
  from: string
  id: string
  preview?: string
  received_at: string
  recipient_tag: string | null
  spam: boolean
  subject: string | null
  text: string
  to: any[]
}

export interface AgentEmailLoadMatch {
  agent_id: string
  id: string
  organization_id: string
}

export interface AgentFile {
  content_type: string
  download_url: string
  filename: string
  id: string
  size_bytes: number
}

export interface AgentFileLoadMatch {
  agent_id: string
  id: string
  organization_id: string
}

export interface AgentInput {
  attachment_ids?: any[]
  attachments?: any[]
  browser_context: Record<string, any>
  client_time: Record<string, any>
  conversation_id: string
  model_policy?: any
  requester_membership_id?: string
  speed?: string
  text: string
}

export interface AgentInputCreateData {
  agent_id: string
  organization_id: string
  attachment_ids?: any[]
  attachments?: any[]
  browser_context: Record<string, any>
  client_time: Record<string, any>
  conversation_id: string
  model_policy?: any
  requester_membership_id?: string
  speed?: string
  text: string
}

export interface AgentIntegration {
  account_counts: Record<string, any>
  accounts_path: string
  added_toolkits: any[]
  can_manage: boolean
  can_manage_organization: boolean
  catalog: any[]
  connect_as: string | null
  connect_as_by_toolkit: Record<string, any>
  connected_counts: Record<string, any>
  connection_id: string
  connections: any[]
  email: Record<string, any>
  enabled: boolean
  enabled_toolkits: any[]
  generation: number
  pagination: Record<string, any>
  pending_counts: Record<string, any>
  personal_creation_key_supported?: boolean
  private_agent: boolean
  shared_agent_personal_accounts_enabled: boolean
  slack: Record<string, any>
  webhook_connections: any[]
  webhooks_available: boolean
}

export interface AgentIntegrationListMatch {
  agent_id: string
  organization_id: string
  catalog_q?: string
  cursor?: string
  limit?: number
  q?: string
  toolkit?: string
}

export interface AgentIntegrationCreateData {
  agent_id: string
  organization_id: string
  cursor?: string
  limit?: number
  q?: string
  toolkit?: string
  connection_id: string
  enabled: boolean
  generation: number
}

export interface AgentInteraction {
  id?: string
  interactions: any[]
}

export interface AgentInteractionLoadMatch {
  agent_id: string
  id: string
  organization_id: string
  conversation_id: string
}

export interface AgentInteractionListMatch {
  agent_id: string
  organization_id: string
  conversation_id: string
  ids?: any[]
}

export interface AgentInteractionCreateData {
  agent_id: string
  id: string
  organization_id: string
  conversation_id?: any
  expected_revision?: any

  // Selects a custom action instead of the plain create:
  //   'cancel' | 'connect'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface AgentLibrary {
  id?: string
}

export interface AgentLibraryLoadMatch {
  agent_id: string
  id: string
  organization_id: string

  // Selects a custom action instead of the plain load:
  //   'download'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface AgentManager {
  attention: string | null
  avatar?: string | null
  can_delete?: boolean
  can_edit_configuration: boolean
  can_manage: boolean
  can_manage_sharing?: boolean
  can_name_managers?: boolean
  can_queue_input?: boolean
  can_reconcile_save: boolean
  configuration: any
  configuration_revision: number
  configuration_version: string | null
  control_connections_available?: boolean
  controlling_user_id: string
  coordination_available?: boolean
  created_at: string
  direct_chat_available?: boolean
  has_unread_updates: boolean
  id: string
  last_reply_at: string | null
  lifecycle_actions: any[]
  lifecycle_version: string | null
  local_agent_control_available?: boolean
  managers?: any[]
  model_change_action?: string | null
  name: string
  organization_id: string
  persona?: any
  preview?: any
  preview_received_at?: string | null
  provisioning?: any
  reply_triage: Record<string, any> | null
  runtime_version?: string
  setup_pending: boolean
  sharing_fixed?: boolean
  sharing_version?: number
  slug: string
  status: string
  team_role?: string
  updated_at: string
  url_slug?: string
  user_id: string
  visibility?: string
}

export interface AgentManagerCreateData {
  agent_id: string
  organization_id: string
  user_id: string
}

export interface AgentManagerRemoveMatch {
  agent_id: string
  id: string
  organization_id: string
}

export interface AgentManagerChoice {
  id: string
  name: string
}

export interface AgentManagerChoiceListMatch {
  agent_id: string
  organization_id: string
  q?: string
}

export interface AgentMarketplace {
  bundle: Record<string, any>
  can_manage: boolean
  catalog_key: string | null
  categories: any[]
  category: string
  counts: Record<string, any>
  created_at: string
  expected_version: number
  explainer: string | null
  featured: boolean
  from_composal: boolean
  id: string
  installs_count: number
  instructions: string
  integration_toolkits: any[]
  integrations: any[]
  listing: any
  listings: any[]
  memories: any[]
  name: string
  next_page: number | null
  organization_name: string
  page_apps: any[]
  publisher_avatar_url: string | null
  publisher_name: string
  sections: any[]
  share_token: string | null
  skills: any[]
  slug: string
  source_agent_id?: string
  summary: string
  updated_at: string
  version: number
  viewer: Record<string, any>
  visibility: string
}

export interface AgentMarketplaceLoadMatch {
  id: string

  // Selects a custom action instead of the plain load:
  //   'draft'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface AgentMarketplaceCreateData {
  organization_id: string
  bundle: Record<string, any>
  category: string
  explainer?: string | null
  name: string
  source_agent_id?: string
  summary: string
  visibility?: string

  // Selects a custom action instead of the plain create:
  //   'install'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface AgentMarketplaceUpdateData {
  id: string
  organization_id: string
}

export interface AgentMarketplacePatchData {
  id: string
  organization_id: string
  bundle?: Record<string, any>
  category?: string
  expected_version?: number
  explainer?: string | null
  name?: string
  summary?: string
  visibility?: string
}

export interface AgentMarketplaceRemoveMatch {
  id: string
  organization_id: string
}

export interface AgentMarketplaceShared {
  can_manage: boolean
  catalog_key: string | null
  category: string
  counts: Record<string, any>
  created_at: string
  explainer: string | null
  featured: boolean
  from_composal: boolean
  id: string
  installs_count: number
  instructions: string
  integration_toolkits: any[]
  integrations: any[]
  listing: any
  memories: any[]
  name: string
  organization_name: string
  page_apps: any[]
  publisher_avatar_url: string | null
  publisher_name: string
  share_token: string | null
  skills: any[]
  slug: string
  summary: string
  updated_at: string
  version: number
  viewer: Record<string, any>
  visibility: string
}

export interface AgentMarketplaceSharedLoadMatch {
  id: string
  organization_id?: string
}

export interface AgentMarketplaceSharedCreateData {
  id: string
  organization_id: string

  // Selects a custom action instead of the plain create:
  //   'install'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface AgentMissionControl {
}

export interface AgentMissionControlCreateData {
  organization_id: string
  action?: any
  agent_id?: any
  agent_ids?: any
  at?: any

  // Selects a custom action instead of the plain create:
  //   'feedback' | 'relevance'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface AgentOperation {
  arguments: Record<string, any>
  id?: string
  key: string
  name: string
  operation: Record<string, any>
  participant: string
  requester_id: string
  scope_key: string
}

export interface AgentOperationLoadMatch {
  agent_id: string
  id: string
  organization_id: string
}

export interface AgentOperationCreateData {
  agent_id: string
  organization_id: string
  arguments: Record<string, any>
  key: string
  name: string
  requester_id: string
}

export interface AgentProvisioning {
}

export interface AgentProvisioningCreateData {
  agent_id: string
  organization_id: string
  expected_version?: any

  // Selects a custom action instead of the plain create:
  //   'retry'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface AgentPullRequest {
  id: string
  number: number
  owners: any[]
  repository: string
  status: string
  title: string
  url: string
}

export interface AgentPullRequestListMatch {
  agent_id: string
  organization_id: string
  cursor?: string
  scope?: string
}

export interface AgentQuestion {
  id?: string
}

export interface AgentQuestionCreateData {
  agent_id: string
  id: string
  organization_id: string
  answers?: any
  conversation_id?: any

  // Selects a custom action instead of the plain create:
  //   'answer'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface AgentRepository {
  can_manage: boolean
  environments: Record<string, any>
  expected_version: number
  id?: string
  repository_choices: any[]
  repository_choices_error?: string | null
  repository_choices_truncated: boolean
  version: number
  work_repositories: any[]
}

export interface AgentRepositoryListMatch {
  agent_id: string
  organization_id: string
  q?: string
}

export interface AgentRepositoryUpdateData {
  agent_id: string
  organization_id: string
  expected_version?: number
  work_repositories?: any[]

  // Selects a custom action instead of the plain update:
  //   'environment'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface AgentResource {
  name: string
  uri: string
}

export interface AgentResourceListMatch {
  agent_id: string
  organization_id: string
}

export interface AgentRoutine {
  can_manage: boolean
  consecutive_errors: number
  credit_wait: Record<string, any>
  description: string | null
  enabled: boolean
  id: string
  kind: string
  last_error: string | null
  last_run_at: string | null
  last_status: string | null
  managed: boolean
  name: string
  next_run_at: string | null
  routine: Record<string, any>
  schedule: Record<string, any>
  schedule_label: string
  utility_model: Record<string, any>
}

export interface AgentRoutineListMatch {
  agent_id: string
  organization_id: string
  cursor?: string
}

export interface AgentRoutineUpdateData {
  agent_id: string
  id: string
  organization_id: string
  enabled?: boolean
  utility_model?: Record<string, any>
}

export interface AgentRun {
  error?: string | null
  id?: string
  run_id: string
  status: string
}

export interface AgentRunLoadMatch {
  agent_id: string
  id: string
  organization_id: string
  conversation_id?: string
}

export interface AgentRuntime {
  available_profiles?: any[]
  can_manage: boolean
  can_reset?: boolean
  image: string
  memory_mb: number | null
  platform?: string
  profile: string
  provider?: string
  state: string
  version: string
  volume: Record<string, any> | null
}

export interface AgentRuntimeCreateData {
  agent_id: string
  organization_id: string
  acknowledge_data_loss?: any
  expected_version?: any

  // Selects a custom action instead of the plain create:
  //   'reset'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface AgentSetting {
  can_manage: boolean
  expected_version: string
  instructions: string
  version: string
}

export interface AgentSettingListMatch {
  agent_id: string
  organization_id: string
}

export interface AgentSettingUpdateData {
  agent_id: string
  organization_id: string
  expected_version?: string
  instructions?: string
}

export interface AgentSharing {
}

export interface AgentSharingLoadMatch {
  agent_id: string
  organization_id: string

  // Selects a custom action instead of the plain load:
  //   'review'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface AgentSite {
  deployed_at: string
  deployments_count: number
  hostname: string
  https: string
  id: string
  name: string
  url: string
  visibility: string
}

export interface AgentSiteListMatch {
  agent_id: string
  organization_id: string
  cursor?: string
  limit?: number
}

export interface AgentSkill {
  available: boolean
  can_configure: boolean
  can_manage: boolean
  configuration_state?: string
  description: string
  enabled: boolean
  name: string
  skills: any[]
  version: string
}

export interface AgentSkillListMatch {
  agent_id: string
  organization_id: string
}

export interface AgentSkillCreateData {
  agent_id: string
  organization_id: string
  enabled: boolean
  name: string
  version: string
}

export interface AgentSlack {
}

export interface AgentSlackCreateData {
  agent_id: string
  organization_id: string
  action?: any
  bot_token?: any
  callback?: any
  confirm_before_sending?: any
  expected_version?: any
  mode?: any
  show_sent_using?: any
  signing_secret?: any

  // Selects a custom action instead of the plain create:
  //   'app' | 'as_you'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface AgentSubagent {
  active: boolean
  attention: Record<string, any> | null
  ended_at: string | null
  id: string
  model: string | null
  parent_id: string
  preview: string | null
  started_at: string | null
  state: string | null
  status: string
  title: string
  updated_at: string | null
}

export interface AgentSubagentListMatch {
  agent_id: string
  organization_id: string
  conversation_id?: string
  cursor?: string
}

export interface AgentSubscription {
}

export interface AgentSubscriptionListMatch {
  agent_id: string
  organization_id: string
  refresh_provider?: string
}

export interface AgentSubscriptionCreateData {
  agent_id: string
  organization_id: string
  action_name?: any
  label?: any
  login_id?: any
  method?: any
  model?: any
  profile_id?: any
  provider?: any
  reasoning?: any
  step_id?: any
  token?: any
  value?: any
  version?: any
}

export interface AgentTeammate {
  avatar: string | null
  id: string
  name: string
  persona?: any
  slug: string
}

export interface AgentTeammateListMatch {
  agent_id: string
  organization_id: string
  q?: string
}

export interface AgentTerminal {
}

export interface AgentTerminalCreateData {
  agent_id: string
  organization_id: string

  // Selects a custom action instead of the plain create:
  //   'connect'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface AgentThread {
  archived_count?: number | null
  can_create: boolean
  execution?: any
  first_input?: any
  first_input_key?: string
  first_input_requester_membership_id?: string
  id?: string
  inherit_context?: boolean
  local_activities: Record<string, any>
  local_archived_count: number
  local_next_cursor: string | null
  local_scope_key: string | null
  local_status_pending: boolean
  local_threads: any[]
  main_thread_id: string
  message?: string
  next_cursor: string | null
  parent_conversation_id?: string
  requester_membership_id?: string
  selected_thread: any
  thread: Record<string, any>
  threads: any[]
  title?: string
  total_archived_count: number | null
}

export interface AgentThreadListMatch {
  agent_id: string
  organization_id: string
  archived?: boolean
  conversation_id?: string
  cursor?: string
  local_cursor?: string
}

export interface AgentThreadCreateData {
  agent_id: string
  organization_id: string
  execution?: any
  inherit_context?: boolean
  message?: string
  parent_conversation_id?: string
  requester_membership_id?: string
  title?: string

  // Selects a custom action instead of the plain create:
  //   'archive' | 'compact' | 'snooze'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface AgentTool {
  description?: string
  inputSchema: Record<string, any>
  name: string
}

export interface AgentToolListMatch {
  agent_id: string
  organization_id: string
}

export interface AgentVerifyProject {
  available: boolean
  can_manage: boolean
  expected_version: number
  project_choices: any[]
  project_choices_truncated: boolean
  verify_projects: any[]
  version: number
}

export interface AgentVerifyProjectListMatch {
  agent_id: string
  organization_id: string
}

export interface AgentVerifyProjectUpdateData {
  agent_id: string
  organization_id: string
  expected_version?: number
  verify_projects?: any[]
}

export interface AgentWait {
  id?: string
}

export interface AgentWaitCreateData {
  agent_id: string
  id: string
  organization_id: string

  // Selects a custom action instead of the plain create:
  //   'stop'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface AgentWebhook {
  action: string
  connection: Record<string, any>
  deliveries: any[]
  event_types: any[]
  expected_generation: number
  id?: string
  max_events_per_day: number
  name: string
  purpose: string
  signing_key: string | null
}

export interface AgentWebhookLoadMatch {
  agent_id: string
  id: string
  organization_id: string
}

export interface AgentWebhookCreateData {
  agent_id: string
  organization_id: string
  event_types: any[]
  max_events_per_day: number
  name: string
  purpose: string
}

export interface AgentWebhookUpdateData {
  agent_id: string
  id: string
  organization_id: string
  action?: string
  expected_generation?: number
}

export interface AgentWork {
  id?: string
}

export interface AgentWorkCreateData {
  agent_id: string
  id: string
  organization_id: string
  revision?: any

  // Selects a custom action instead of the plain create:
  //   'handled'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface AgentWorkflow {
  can_manage: boolean
  expected_digest: string
  path: string
  source: string
  template: string
  templates: any[]
  truncated: boolean
  workflows: any[]
}

export interface AgentWorkflowListMatch {
  agent_id: string
  organization_id: string
  view?: string
  workflow_path?: string
}

export interface AgentWorkflowCreateData {
  agent_id: string
  organization_id: string
  path: string
  template: string
}

export interface AgentWorkflowUpdateData {
  agent_id: string
  organization_id: string
  expected_digest?: string
  path?: string
  source?: string
}

export interface AgentWorkflowProposal {
  agent_steps: Record<string, any>
  base_digest: string | null
  can_manage: boolean
  can_revise: boolean
  can_save: boolean
  can_set_trigger: boolean
  created_at: string
  definition: Record<string, any> | null
  digest: string
  error: string | null
  id: string
  model_choices?: any[]
  name: string
  native_rows?: any[]
  path: string
  pipeline_checkpoints: Record<string, any>
  pipeline_commands: Record<string, any>
  reasoning_choices?: any[]
  runs_on_earlier_version: number | null
  saved: Record<string, any> | null
  stale: boolean
  starts: Record<string, any> | null
  trigger_error: string | null
}

export interface AgentWorkflowProposalLoadMatch {
  agent_id: string
  id: string
  organization_id: string
}

export interface AgentWorkflowProposalCreateData {
  agent_id: string
  id: string
  organization_id: string
  digest: string
  model?: any
  reasoning?: any

  // Selects a custom action instead of the plain create:
  //   'revise' | 'save'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface AgentWorkflowRun {
  action: string
  automation: Record<string, any> | null
  budget_seconds: number | null
  budget_usd: number | null
  can_answer: boolean
  can_approve: boolean
  can_dismiss: boolean
  checkpoint: Record<string, any> | null
  conversation_id: string | null
  decision_history: Record<string, any>
  error: string | null
  finished_at: string | null
  flow_steps: any[] | null
  id: string
  needs_you: boolean
  note: string | null
  nothing_to_do_reason: string | null
  resume_count: number
  retry_step_id: string | null
  running_seconds: number
  source: string
  spent_tokens: number
  spent_usd: number
  stalled: boolean
  started_at: string
  started_by: Record<string, any> | null
  status: string
  step_count: number
  steps: any[]
  trigger_id: string | null
  wake_at: string | null
  workflow_digest: string | null
  workflow_path: string | null
}

export interface AgentWorkflowRunLoadMatch {
  agent_id: string
  id: string
  organization_id: string
  decision_cursor?: string

  // Selects a custom action instead of the plain load:
  //   'summary'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface AgentWorkflowRunListMatch {
  agent_id: string
  organization_id: string
  automation_key?: string
  cursor?: string
  limit?: number
  view?: string
  workflow_path?: string
}

export interface AgentWorkflowRunCreateData {
  agent_id: string
  id: string
  organization_id: string
  checkpoint: Record<string, any> | null
  resume_count: number
  answer?: any
  approved?: any
  question_at?: any

  // Selects a custom action instead of the plain create:
  //   'answer' | 'approve' | 'dismiss' | 'retry'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface AgentWorkflowTrigger {
  budget: Record<string, any> | null
  can_manage: boolean
  can_pause: boolean
  can_resume: boolean
  can_review: boolean
  daily_limit: number | null
  day_resets_at: string | null
  id: string
  kind: string
  next_due_at: string | null
  pause_cause: string | null
  paused: boolean
  read_at: string | null
  run_budget_usd: number | null
  schedule: Record<string, any> | null
  settings_changed_at: string | null
  skipped_today: number
  stale_at: string | null
  stale_reason: string | null
  starts: Record<string, any> | null
  subscription_id: string | null
  time_zone: string
  today_count: number | null
  trigger: Record<string, any>
  workflow_path: string
}

export interface AgentWorkflowTriggerLoadMatch {
  agent_id: string
  id: string
  organization_id: string

  // Selects a custom action instead of the plain load:
  //   'review' | 'skipped'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface AgentWorkflowTriggerListMatch {
  agent_id: string
  organization_id: string
}

export interface AgentWorkflowTriggerUpdateData {
  agent_id: string
  id: string
  organization_id: string
  daily_limit?: number | null
  read_at?: string | null
  run_budget_usd?: number | null

  // Selects a custom action instead of the plain update:
  //   'pause' | 'resume' | 'review'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface AgentWorkflowTriggerRemoveMatch {
  agent_id: string
  id: string
  organization_id: string
}

export interface AgentWorkspace {
  action: string
  can_delete: boolean
  can_keep: boolean
  cleanup_after: string | null
  created_at: string
  id: string
  name: string
  reason: string
  state: string
}

export interface AgentWorkspaceListMatch {
  agent_id: string
  organization_id: string
  cursor?: string
}

export interface AgentWorkspaceUpdateData {
  agent_id: string
  id: string
  organization_id: string
  action?: string
}

export interface AgentWritePermission {
  account: string
  granted_at: string
  granted_by: string | null
  id: string
  in_effect: boolean
  last_used_at: string | null
  tool: string
}

export interface AgentWritePermissionListMatch {
  agent_id: string
  organization_id: string
}

export interface AgentWritePermissionRemoveMatch {
  agent_id: string
  id: string
  organization_id: string
}

export interface AllocationLog {
  allocation_id: string
  environment?: string
  fetched_at: string
  location?: string | null
  logs: string
  namespace: string
  offset: number
  origin: string
  service?: string
  task: string
  type: string
}

export interface AllocationLogListMatch {
  allocation_id: string
  app_id: string
  offset?: number
  origin?: string
  task?: string
  type?: string
}

export interface App {
  created_at: string
  created_at_label: string | null
  description: string | null
  framework: string | null
  id: string
  name: string
  organization_id: string
  repository_id: string
  repository_kind: string | null
  root_path: string
  root_path_display: string
  slug: string
  status: string
  updated_at: string
  updated_at_label: string | null
}

export interface AppLoadMatch {
  id: string

  // Selects a custom action instead of the plain load:
  //   'catalog' | 'deployment_dashboard'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface AppListMatch {
  organization_id?: string
}

export interface AppCreateData {
  description?: string | null
  framework?: string | null
  name: string
  organization_id: string
  repository_id: string
  root_path: string
  slug: string
  status?: string

  // Selects a custom action instead of the plain create:
  //   'activate' | 'archive'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface AppUpdateData {
  id: string
  description?: string | null
  framework?: string | null
  name?: string
  organization_id?: string
  repository_id?: string
  root_path?: string
  slug?: string
  status?: string
}

export interface AppPatchData {
  id: string
  description?: string | null
  framework?: string | null
  name?: string
  organization_id?: string
  repository_id?: string
  root_path?: string
  slug?: string
  status?: string
}

export interface AppRemoveMatch {
  id: string
}

export interface AppCdn {
  app_environment_id: string | null
  app_service_id: string | null
  cache_path_prefix?: string | null
  cache_settings_json: string | null
  created_at: string
  created_at_label: string | null
  distribution_kind: string
  edge_hostname: string | null
  failure_message: string | null
  hosted_app_id: string
  hostnames: any[]
  id: string
  last_deployed_at: string | null
  last_deployed_at_label: string | null
  last_purged_at: string | null
  last_purged_at_label: string | null
  last_synced_at: string | null
  last_synced_at_label: string | null
  name: string
  origin_url: string
  provisioned: boolean
  routing_settings_json: string | null
  security_settings_json: string | null
  slug: string
  status: string
  updated_at: string
  updated_at_label: string | null
}

export interface AppCdnLoadMatch {
  app_id: string
  id: string
}

export interface AppCdnListMatch {
  app_id: string
}

export interface AppCdnCreateData {
  app_id: string
  app_environment_id?: string | null
  app_service_id?: string | null
  cache_path_prefix?: string | null
  cache_settings_json?: string | null
  distribution_kind?: string
  name: string
  origin_url: string
  routing_settings_json?: string | null
  security_settings_json?: string | null
  slug: string
  status?: string

  // Selects a custom action instead of the plain create:
  //   'archive' | 'pause' | 'provision' | 'purge' | 'resume' | 'sync'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface AppCdnUpdateData {
  app_id: string
  id: string
  app_environment_id?: string | null
  app_service_id?: string | null
  cache_path_prefix?: string | null
  cache_settings_json?: string | null
  distribution_kind?: string
  name?: string
  origin_url?: string
  routing_settings_json?: string | null
  security_settings_json?: string | null
  slug?: string
  status?: string
}

export interface AppCdnPatchData {
  app_id: string
  id: string
  app_environment_id?: string | null
  app_service_id?: string | null
  cache_path_prefix?: string | null
  cache_settings_json?: string | null
  distribution_kind?: string
  name?: string
  origin_url?: string
  routing_settings_json?: string | null
  security_settings_json?: string | null
  slug?: string
  status?: string
}

export interface AppCdnRemoveMatch {
  app_id: string
  id: string
}

export interface AppConfigVariable {
  app_environment_id: string | null
  app_service_id: string | null
  created_at: string
  description: string | null
  exposed_to_build: boolean
  has_value: boolean
  hosted_app_id: string
  id: string
  key: string
  scope_kind: string
  updated_at: string
  value: string | null
  value_kind: string
}

export interface AppConfigVariableLoadMatch {
  app_id: string
  id: string
}

export interface AppConfigVariableListMatch {
  app_id: string
  app_environment_id?: string
}

export interface AppConfigVariableCreateData {
  app_id: string
  app_environment_id?: string | null
  app_service_id?: string | null
  description?: string | null
  exposed_to_build: boolean
  key: string
  scope_kind: string
  value?: string | null
  value_kind: string

  // Selects a custom action instead of the plain create:
  //   'disable' | 'rotate'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface AppConfigVariableUpdateData {
  app_id: string
  id: string
}

export interface AppConfigVariablePatchData {
  app_id: string
  id: string
}

export interface AppConfigVariableRemoveMatch {
  app_id: string
  id: string
}

export interface AppDataResource {
  app_environment_id: string | null
  created_at: string
  engine: string
  failure_message: string | null
  high_availability: boolean
  hosted_app_id: string
  id: string
  kind: string
  name: string
  plan: string | null
  provider_metadata: Record<string, any>
  region: string | null
  slug: string
  status: string
  storage_gb: number | null
  storage_label: string | null
  updated_at: string
  version: string | null
}

export interface AppDataResourceLoadMatch {
  app_id: string
  id: string
}

export interface AppDataResourceListMatch {
  app_id: string
}

export interface AppDataResourceCreateData {
  app_id: string
  app_environment_id?: string | null
  engine: string
  high_availability?: boolean
  kind: string
  name: string
  plan?: string | null
  region?: string | null
  slug: string
  storage_gb?: number | null
  version?: string | null

  // Selects a custom action instead of the plain create:
  //   'archive' | 'refresh' | 'restore' | 'resume' | 'suspend'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface AppDataResourceUpdateData {
  app_id: string
  id: string
}

export interface AppDataResourcePatchData {
  app_id: string
  id: string
}

export interface AppDataResourceRemoveMatch {
  app_id: string
  id: string
}

export interface AppDeploy {
  app_environment_id?: string
  app_service_id?: string
  channel?: string
  command?: string
  commit_sha?: string
  desired_instances?: number
  environment?: string
  image: string
  region?: string
  rollout_predecessor?: string
  service?: string
  source_ref?: string
}

export interface AppDeployCreateData {
  app_id: string
  app_environment_id?: string
  app_service_id?: string
  channel?: string
  command?: string
  commit_sha?: string
  desired_instances?: number
  environment?: string
  image: string
  region?: string
  rollout_predecessor?: string
  service?: string
  source_ref?: string
}

export interface AppDeployment {
  app_environment_id: string
  app_service_id: string
  app_service_placement_id?: string
  artifact_locator: string | null
  build_role: string | null
  commit_sha: string | null
  created_at: string
  created_at_label: string | null
  creator_user_id: string | null
  deployed_url: string | null
  display_id: number
  failure_message: string | null
  finished_at: string | null
  finished_at_label: string | null
  hosted_app_id: string
  id: string
  idempotency_key: string | null
  is_rollback: boolean
  location: any
  location_id: string
  number: number
  operation_key: string | null
  organization_id: string
  rollback_reason: string | null
  rollback_source_deployment_id: string | null
  rollback_source_release_id: string | null
  rollback_target_release_id: string | null
  source_ref: string | null
  started_at: string | null
  started_at_label: string | null
  status: string
  trigger_kind: string
  updated_at: string
  updated_at_label: string | null
}

export interface AppDeploymentLoadMatch {
  app_id: string
  id: string

  // Selects a custom action instead of the plain load:
  //   'live'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface AppDeploymentListMatch {
  app_id: string
}

export interface AppDeploymentCreateData {
  app_id: string
  app_environment_id?: string
  app_service_id?: string
  app_service_placement_id?: string
  artifact_locator?: string | null
  commit_sha?: string | null
  deployed_url?: string | null
  failure_message?: string | null
  finished_at?: string | null
  location_id?: string
  source_ref?: string | null
  started_at?: string | null
  status?: string
  trigger_kind?: string

  // Selects a custom action instead of the plain create:
  //   'cancel' | 'fail' | 'succeed'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface AppDeploymentUpdateData {
  app_id: string
  id: string
}

export interface AppDeploymentPatchData {
  app_id: string
  id: string
}

export interface AppDeploymentRemoveMatch {
  app_id: string
  id: string
}

export interface AppDeploymentOperation {
  app: Record<string, any>
  app_environment_id?: string
  app_service_id?: string
  app_service_placement_id?: string
  artifact_locator: string | null
  build_duration_seconds: number | null
  build_source: Record<string, any> | null
  build_status: string
  children: any[]
  ci_pipeline_id: string | null
  ci_pipeline_run_id: string | null
  commit_sha: string | null
  created_at: string
  creator: Record<string, any> | null
  deployed_url: string | null
  duration_seconds: number | null
  environment: Record<string, any>
  failure_message?: string
  finished_at?: string
  history_kind: string
  history_reason: string | null
  id: string
  is_live: boolean
  is_rollback: boolean
  live_region_count: number
  location_id?: string
  number: number
  placement: Record<string, any> | null
  region_count: number
  replicas_per_region: number
  rollback_reason: string | null
  rollback_source_release_id: string | null
  rollback_target_release_id: string | null
  rollout_predecessor_id: string | null
  rollout_status: string
  rollout_strategy: string
  service: Record<string, any>
  source_ref: string | null
  started_at?: string
  status: string
  total_replicas: number
  trigger_kind: string
  updated_at: string
}

export interface AppDeploymentOperationLoadMatch {
  app_id: string
  id: string

  // Selects a custom action instead of the plain load:
  //   'live'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface AppDeploymentOperationListMatch {
  app_id: string
  limit?: number
  page?: number
}

export interface AppDeploymentOperationCreateData {
  app_id: string
  app_environment_id?: string
  app_service_id?: string
  app_service_placement_id?: string
  artifact_locator?: string | null
  commit_sha?: string | null
  deployed_url?: string | null
  failure_message?: string
  finished_at?: string
  location_id?: string
  source_ref?: string | null
  started_at?: string
  status?: string
  trigger_kind?: string

  // Selects a custom action instead of the plain create:
  //   'cancel' | 'redeploy' | 'rollback'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface AppDeploymentRollback {
  app_environment_id?: string
  app_id: string
  app_service_id?: string
  blockers: any[]
  candidate_releases: any[]
  confirmation_text: string
  current_deployment: any
  current_release: any
  deployment: any
  desired_state: any
  environment: any
  execution_allowed: boolean
  force: boolean
  idempotency_key?: string
  idempotent_reuse: boolean
  location: any
  operation: any
  reason: string | null
  rollback_release: any
  rollout: any
  service: any
  target_artifact_locator: string | null
  target_release: any
  to?: string
  warnings: any[]
}

export interface AppDeploymentRollbackCreateData {
  app_id: string
  app_environment_id?: string
  app_service_id?: string
  deployment?: any
  environment?: any
  force?: boolean
  idempotency_key?: string
  reason?: string | null
  service?: any
  to?: string

  // Selects a custom action instead of the plain create:
  //   'plan'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface AppEnvironment {
  auto_deploy: boolean
  base_domain: string | null
  branch_pattern: string | null
  created_at: string
  created_at_label: string | null
  hosted_app_id: string
  id: string
  kind: string
  location: any
  location_id: string
  name: string
  slug: string
  status: string
  updated_at: string
  updated_at_label: string | null
}

export interface AppEnvironmentLoadMatch {
  app_id: string
  id: string
}

export interface AppEnvironmentListMatch {
  app_id: string
}

export interface AppEnvironmentCreateData {
  app_id: string
  auto_deploy: boolean
  base_domain?: string | null
  branch_pattern?: string | null
  kind: string
  location_id: string
  name: string
  slug: string
  status: string

  // Selects a custom action instead of the plain create:
  //   'archive' | 'pause' | 'resume'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface AppEnvironmentUpdateData {
  app_id: string
  id: string
  auto_deploy?: boolean
  base_domain?: string | null
  branch_pattern?: string | null
  kind?: string
  location_id?: string
  name?: string
  slug?: string
  status?: string
}

export interface AppEnvironmentPatchData {
  app_id: string
  id: string
  auto_deploy?: boolean
  base_domain?: string | null
  branch_pattern?: string | null
  kind?: string
  location_id?: string
  name?: string
  slug?: string
  status?: string
}

export interface AppEnvironmentRemoveMatch {
  app_id: string
  id: string
}

export interface AppLocation {
  code: string
  created_at: string
  id: string
  location_id: string
  name: string
  nomad_datacenter: string
  updated_at: string
}

export interface AppLocationListMatch {
  app_id: string
}

export interface AppLocationCreateData {
  app_id: string
  location_id: string
}

export interface AppLocationRemoveMatch {
  app_id: string
  id: string
}

export interface AppMetric {
}

export interface AppMetricLoadMatch {
  app_id: string

  // Selects a custom action instead of the plain load:
  //   'query_range'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface AppPreview {
  access?: string
  app_preview_profile_id: string
  change_number?: string
  expected_generation?: number
  expected_patchset?: number
  expires_at?: string
  id?: string
  name: string
  resource_overrides?: Record<string, any>
  retained?: boolean
  shared_data_binding_ids?: any[]
  shared_service_binding_ids?: any[]
  slug: string
  source_ref?: string
  storage_binding_resources?: Record<string, any>
}

export interface AppPreviewLoadMatch {
  app_id: string
  id: string

  // Selects a custom action instead of the plain load:
  //   'administration' | 'administration_index' | 'secret_comparison'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface AppPreviewListMatch {
  app_id: string
}

export interface AppPreviewCreateData {
  app_id: string
  app_preview_profile_id: string
  change_number?: string
  expected_patchset?: number
  name: string
  slug: string
  source_ref?: string

  // Selects a custom action instead of the plain create:
  //   'archive' | 'deploy' | 'expire' | 'pause' | 'refresh_source' | 'resume' | 'review_source' | 'update_revision'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface AppPreviewUpdateData {
  app_id: string
  id: string
}

export interface AppPreviewPatchData {
  app_id: string
  id: string
  access?: string
  expected_generation?: number
  expires_at?: string
  resource_overrides?: Record<string, any>
  retained?: boolean
  shared_data_binding_ids?: any[]
  shared_service_binding_ids?: any[]
  storage_binding_resources?: Record<string, any>
}

export interface AppPreviewRemoveMatch {
  app_id: string
  id: string
}

export interface AppPreviewProfile {
  automatic?: boolean
  configuration?: Record<string, any>
  created_at?: string
  hosted_app_id: string
  id: string
  name: string
  slug: string
  source_environment_id: string
  ttl_days?: number
  updated_at?: string
}

export interface AppPreviewProfileLoadMatch {
  app_id: string
  id: string
}

export interface AppPreviewProfileListMatch {
  app_id: string
}

export interface AppPreviewProfileCreateData {
  app_id: string
  automatic?: boolean
  configuration?: Record<string, any>
  name: string
  slug: string
  source_environment_id: string
  ttl_days?: number
}

export interface AppPreviewProfileUpdateData {
  app_id: string
  id: string
}

export interface AppPreviewProfilePatchData {
  app_id: string
  id: string
  automatic?: boolean
  configuration?: Record<string, any>
  name?: string
  slug?: string
  source_environment_id?: string
  ttl_days?: number
}

export interface AppPreviewProfileRemoveMatch {
  app_id: string
  id: string
}

export interface AppRun {
  id?: string
  image?: string
}

export interface AppRunLoadMatch {
  id: string
}

export interface AppRunListMatch {
  id?: string
  image?: string
}

export interface AppRunCreateData {
  image?: string

  // Selects a custom action instead of the plain create:
  //   'cancel'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface AppSecret {
  created_at?: string
  description?: string | null
  env_key?: string | null
  expose_to_build?: boolean
  has_value?: boolean
  hosted_app_id: string
  id: string
  latest_version_number?: number | null
  name: string
  organization_id: string
  rotation_policy?: string | null
  scope_kind: string
  slug: string
  status: string
  updated_at?: string
  value?: string
  value_digest?: string | null
  value_kind?: string | null
}

export interface AppSecretLoadMatch {
  app_id: string
  id: string

  // Selects a custom action instead of the plain load:
  //   'dotenv' | 'value'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface AppSecretListMatch {
  app_id: string
}

export interface AppSecretCreateData {
  app_id: string
  description?: string | null
  env_key?: string | null
  expose_to_build?: boolean
  name: string
  rotation_policy?: string | null
  slug: string
  value?: string
  value_kind?: string | null

  // Selects a custom action instead of the plain create:
  //   'bulk' | 'set_value'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface AppSecretUpdateData {
  app_id: string
  id: string
  description?: string | null
  env_key?: string | null
  expose_to_build?: boolean
  name?: string
  rotation_policy?: string | null
}

export interface AppSecretPatchData {
  app_id: string
  id: string
  description?: string | null
  env_key?: string | null
  expose_to_build?: boolean
  name?: string
  rotation_policy?: string | null
}

export interface AppSecretRemoveMatch {
  app_id: string
  id: string
}

export interface AppService {
  auto_deploy: boolean
  bindings: any[]
  build_command: string | null
  cpu_label: string | null
  cpu_mhz: number | null
  created_at: string
  created_at_label: string | null
  deploy_paths: any[]
  desired_instances: number
  disk_label: string | null
  disk_mb: number | null
  effective_deploy_paths: any[]
  healthcheck_path: string | null
  hosted_app_id: string
  id: string
  internal_port: number | null
  kind: string
  memory_label: string | null
  memory_max_label: string | null
  memory_max_mb: number | null
  memory_mb: number | null
  name: string
  nomad_constraints_json: string | null
  nomad_kill_timeout_seconds: number | null
  nomad_namespace: string | null
  nomad_region: string | null
  nomad_shutdown_delay_seconds: number | null
  nomad_ulimits_json: string | null
  nomad_update_strategy_json: string | null
  prestart_command: string | null
  publicly_accessible: boolean
  release_command: string | null
  repo_source_path: string
  runtime: string
  runtime_adapter_kind: string
  runtime_adapter_settings_json: string | null
  schedule: string | null
  slug: string
  source_path: string
  start_command: string | null
  updated_at: string
  updated_at_label: string | null
}

export interface AppServiceLoadMatch {
  app_id: string
  id: string
}

export interface AppServiceListMatch {
  app_id: string
}

export interface AppServiceCreateData {
  app_id: string
  auto_deploy: boolean
  build_command?: string | null
  cpu_mhz?: number | null
  deploy_paths?: any[]
  desired_instances: number
  disk_mb?: number | null
  healthcheck_path?: string | null
  internal_port?: number | null
  kind: string
  memory_max_mb?: number | null
  memory_mb?: number | null
  name: string
  nomad_constraints_json?: string | null
  nomad_kill_timeout_seconds?: number | null
  nomad_namespace?: string | null
  nomad_region?: string | null
  nomad_shutdown_delay_seconds?: number | null
  nomad_ulimits_json?: string | null
  nomad_update_strategy_json?: string | null
  prestart_command?: string | null
  publicly_accessible: boolean
  release_command?: string | null
  runtime: string
  runtime_adapter_kind: string
  runtime_adapter_settings_json?: string | null
  schedule?: string | null
  slug: string
  source_path: string
  start_command: string | null

  // Selects a custom action instead of the plain create:
  //   'archive' | 'pause' | 'resume'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface AppServiceUpdateData {
  app_id: string
  id: string
  auto_deploy?: boolean
  build_command?: string | null
  cpu_mhz?: number | null
  deploy_paths?: any[]
  desired_instances?: number
  disk_mb?: number | null
  healthcheck_path?: string | null
  internal_port?: number | null
  kind?: string
  memory_max_mb?: number | null
  memory_mb?: number | null
  name?: string
  nomad_constraints_json?: string | null
  nomad_kill_timeout_seconds?: number | null
  nomad_namespace?: string | null
  nomad_region?: string | null
  nomad_shutdown_delay_seconds?: number | null
  nomad_ulimits_json?: string | null
  nomad_update_strategy_json?: string | null
  prestart_command?: string | null
  publicly_accessible?: boolean
  release_command?: string | null
  runtime?: string
  runtime_adapter_kind?: string
  runtime_adapter_settings_json?: string | null
  schedule?: string | null
  slug?: string
  source_path?: string
  start_command?: string | null
}

export interface AppServicePatchData {
  app_id: string
  id: string
  auto_deploy?: boolean
  build_command?: string | null
  cpu_mhz?: number | null
  deploy_paths?: any[]
  desired_instances?: number
  disk_mb?: number | null
  healthcheck_path?: string | null
  internal_port?: number | null
  kind?: string
  memory_max_mb?: number | null
  memory_mb?: number | null
  name?: string
  nomad_constraints_json?: string | null
  nomad_kill_timeout_seconds?: number | null
  nomad_namespace?: string | null
  nomad_region?: string | null
  nomad_shutdown_delay_seconds?: number | null
  nomad_ulimits_json?: string | null
  nomad_update_strategy_json?: string | null
  prestart_command?: string | null
  publicly_accessible?: boolean
  release_command?: string | null
  runtime?: string
  runtime_adapter_kind?: string
  runtime_adapter_settings_json?: string | null
  schedule?: string | null
  slug?: string
  source_path?: string
  start_command?: string | null
}

export interface AppServiceRemoveMatch {
  app_id: string
  id: string
}

export interface AppServiceBinding {
  id?: string
}

export interface AppServiceBindingLoadMatch {
  app_id: string
  id: string
}

export interface AppServiceBindingListMatch {
  app_id: string
}

export interface AppServiceBindingCreateData {
  app_id: string

  // Selects a custom action instead of the plain create:
  //   'disable' | 'enable'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface AppServiceBindingUpdateData {
  app_id: string
  id: string
}

export interface AppServiceBindingPatchData {
  app_id: string
  id: string
}

export interface AppServiceBindingRemoveMatch {
  app_id: string
  id: string
}

export interface AppServicePlacement {
  app_environment_id: string
  app_service_id: string
  created_at: string
  deployment_channel: string | null
  hosted_app_id: string
  id: string
  mode: string
  organization_id: string
  region_count: number
  replicas_per_region: number
  rollout_strategy: string
  targets: any[]
  total_replicas: number
  updated_at: string
}

export interface AppServicePlacementLoadMatch {
  app_id: string
  id: string
}

export interface AppServicePlacementListMatch {
  app_id: string
  existing?: boolean
  service?: string
}

export interface AppServicePlacementUpdateData {
  app_id: string
  app_environment_id?: string
  app_service_id?: string
  deployment_channel?: string | null
  mode?: string
  replicas_per_region?: number
  rollout_strategy?: string
  targets?: any[]
  expected_generation?: any

  // Selects a custom action instead of the plain update:
  //   'configure'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface AppStorageResource {
  access_mode: string
  app_environment_id: string | null
  attachment: Record<string, any> | null
  capacity_gb: number | null
  capacity_label: string | null
  created_at: string
  ephemeral: boolean
  external_volume_id: string | null
  hosted_app_id: string
  id: string
  kind: string
  location_code: string | null
  location_id: string | null
  mount_path: string | null
  name: string
  provider: string
  provider_error: string | null
  region: string | null
  slug: string
  status: string
  updated_at: string
}

export interface AppStorageResourceLoadMatch {
  app_id: string
  id: string
}

export interface AppStorageResourceListMatch {
  app_id: string
}

export interface AppStorageResourceCreateData {
  app_id: string
  access_mode: string
  app_environment_id?: string | null
  capacity_gb?: number | null
  kind: string
  location_id?: string | null
  mount_path?: string | null
  name: string
  provider: string
  region?: string | null
  slug: string
  status: string

  // Selects a custom action instead of the plain create:
  //   'archive' | 'issue_access_key' | 'resume' | 'suspend'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface AppStorageResourceUpdateData {
  app_id: string
  id: string
}

export interface AppStorageResourcePatchData {
  app_id: string
  id: string
}

export interface AppStorageResourceRemoveMatch {
  app_id: string
  id: string
}

export interface AttachmentPart {
  id?: string
}

export interface AttachmentPartUpdateData {
  agent_id: string
  attachment_id: string
  id: string
  organization_id: string
}

export interface AutomationEvent {
  action: string
  can_manage: boolean
  can_manage_events: boolean
  can_run: boolean
  can_schedule: boolean
  event_subscriptions: any[]
  event_triggers: any[]
  expected_revision: string | null
  id: string
  key: string
  name: string
  revision: number
  schedule: any
  schedules: any[]
  settings?: Record<string, any>
  subscription_key: string
  version: Record<string, any>
}

export interface AutomationEventUpdateData {
  agent_id: string
  automation_id: string
  organization_id: string
  action?: string
  expected_revision?: string | null
  settings?: Record<string, any>
  subscription_key?: string
}

export interface AutomationRun {
  action: string
  automation: Record<string, any> | null
  budget_seconds: number | null
  budget_usd: number | null
  can_answer: boolean
  can_approve: boolean
  can_dismiss: boolean
  checkpoint: Record<string, any> | null
  conversation_id: string | null
  decision_history: Record<string, any>
  error: string | null
  finished_at: string | null
  flow_steps: any[] | null
  id: string
  input: Record<string, any>
  needs_you: boolean
  note: string | null
  nothing_to_do_reason: string | null
  request_id: string
  resume_count: number
  retry_step_id: string | null
  running_seconds: number
  source: string
  spent_tokens: number
  spent_usd: number
  stalled: boolean
  started_at: string
  started_by: Record<string, any> | null
  status: string
  step_count: number
  steps: any[]
  trigger_id: string | null
  version_id: string
  wake_at: string | null
  workflow_digest: string | null
  workflow_path: string | null
}

export interface AutomationRunCreateData {
  agent_id: string
  automation_id: string
  organization_id: string
  input: Record<string, any>
  request_id: string
  version_id: string
}

export interface Binary {
  accepts_versions: boolean
  arch?: any
  archived_at: string | null
  binary: Record<string, any>
  created_at: string
  download_secret?: string
  download_url: string
  executable: string
  format: any
  id: string
  idempotency_key: string
  latest_version: any
  launch_args?: any[]
  name: string
  needs_refresh: boolean
  operation: Record<string, any>
  pagination: Record<string, any>
  permissions: Record<string, any>
  platform?: any
  project_id: string
  sha256?: string
  slug: string
  version: Record<string, any>
  version_defaults?: any
  versions: any[]
  window_title: string
}

export interface BinaryLoadMatch {
  id: string
  organization_id: string
  page?: number
  project_id: string
}

export interface BinaryListMatch {
  organization_id: string
  page?: number
  project_id: string
}

export interface BinaryCreateData {
  organization_id: string
  project_id: string
  arch?: any
  download_secret?: string
  download_url: string
  executable: string
  format: any
  idempotency_key: string
  launch_args?: any[]
  name: string
  platform?: any
  sha256?: string
  slug: string
  window_title: string

  // Selects a custom action instead of the plain create:
  //   'archive'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface BinaryVersion {
  arch?: any
  cancelable: boolean
  configuration: Record<string, any>
  configuration_digest: string
  created_at: string
  deletable: boolean
  download_secret?: string
  download_url: string
  environment_uses: any[]
  executable?: string
  format?: any
  id: string
  idempotency_key: string
  launch_args?: any[]
  operation: Record<string, any>
  package_sha256: string | null
  package_size: number | null
  permissions: Record<string, any>
  platform?: any
  preparations: any[]
  retryable: boolean
  sha256?: string
  status: string
  version: Record<string, any>
  window_title?: string
}

export interface BinaryVersionLoadMatch {
  binary_id: string
  id: string
  organization_id: string
  project_id: string
}

export interface BinaryVersionListMatch {
  binary_id: string
  organization_id: string
  page?: number
  project_id: string
}

export interface BinaryVersionCreateData {
  binary_id: string
  organization_id: string
  project_id: string
  arch?: any
  download_secret?: string
  download_url: string
  executable?: string
  format?: any
  idempotency_key: string
  launch_args?: any[]
  platform?: any
  sha256?: string
  window_title?: string

  // Selects a custom action instead of the plain create:
  //   'cancel' | 'retry'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface BinaryVersionRemoveMatch {
  binary_id: string
  id: string
  organization_id: string
  project_id: string
}

export interface BrowserEgressCandidate {
  id: string
}

export interface BrowserEgressCandidateListMatch {
  organization_id: string
  cursor?: string
  limit?: number
}

export interface BrowserSession {
  active_task_id?: string | null
  authentication_status: string
  authentication_task_id?: string | null
  cdp_url?: string | null
  closed_at?: string | null
  closure_basis?: string | null
  control_generation: number
  controller: string
  credential_id?: string | null
  environment_id?: string
  environment_revision_id?: string | null
  expires_at: string
  failure_code?: string | null
  id: string
  idempotency_key?: string
  initial_url: string
  max_seconds?: number
  pending_control_id?: string | null
  project_id?: string | null
  reconciled_at?: string | null
  started_at?: string | null
  status: string
  url?: string
  viewer?: Record<string, any> | null
}

export interface BrowserSessionLoadMatch {
  id: string
  organization_id: string

  // Selects a custom action instead of the plain load:
  //   'media'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface BrowserSessionCreateData {
  organization_id: string
  controller?: string
  credential_id?: string | null
  environment_id?: string
  idempotency_key?: string
  max_seconds?: number
  project_id?: string | null
  url?: string

  // Selects a custom action instead of the plain create:
  //   'control'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface BrowserSessionRemoveMatch {
  id: string
  organization_id: string
}

export interface BrowserSessionConnection {
  generation: number
  idempotency_key?: string
}

export interface BrowserSessionConnectionCreateData {
  browser_session_id: string
  organization_id: string
  generation: number
  idempotency_key?: string
}

export interface BrowserSessionControl {
  browser_session_id: string
  completed_at?: string | null
  completed_generation?: number | null
  connection?: Record<string, any> | null
  failure_code?: string | null
  id: string
  requested_controller: string
  requested_generation: number
  status: string
}

export interface BrowserSessionControlLoadMatch {
  browser_session_id: string
  id: string
  organization_id: string
}

export interface BrowserSessionEvent {
  browser_task_id?: string | null
  created_at: string
  id: string
  kind: string
  payload: Record<string, any>
  source_sequence?: number | null
}

export interface BrowserSessionEventListMatch {
  browser_session_id: string
  organization_id: string
  after?: string
}

export interface BrowserSessionMedia {
  browser_session_id: string
  capture_omissions?: Record<string, any> | null
  captured_at?: string | null
  ended_at?: string | null
  failure_code?: string | null
  files: any[]
  frames?: number | null
  id: string
  kind: string
  partial: boolean
  retention_expires_at: string
  source?: Record<string, any> | null
  status: string
  stop_requested_at?: string | null
}

export interface BrowserSessionMediaLoadMatch {
  browser_session_id: string
  id: string
  organization_id: string
}

export interface BrowserSessionRecording {
  id?: string
  idempotency_key?: string
  wait?: boolean
}

export interface BrowserSessionRecordingCreateData {
  browser_session_id: string
  organization_id: string
  idempotency_key?: string
  wait?: boolean

  // Selects a custom action instead of the plain create:
  //   'stop'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface BrowserSessionScreenshot {
  idempotency_key?: string
  wait?: boolean
}

export interface BrowserSessionScreenshotCreateData {
  browser_session_id: string
  organization_id: string
  idempotency_key?: string
  wait?: boolean
}

export interface BrowserSessionTask {
  activity?: Record<string, any> | null
  browser_session_id: string
  cancel_requested_at?: string | null
  completed_at?: string | null
  control_generation?: number | null
  deadline_at: string
  effects_unknown: boolean
  failure_code?: string | null
  id: string
  idempotency_key?: string
  instruction: string
  max_rounds: number
  max_seconds?: number
  model_selection: Record<string, any>
  outcome?: string | null
  result: Record<string, any>
  started_at?: string | null
  status: string
}

export interface BrowserSessionTaskLoadMatch {
  browser_session_id: string
  id: string
  organization_id: string
}

export interface BrowserSessionTaskCreateData {
  browser_session_id: string
  organization_id: string
  idempotency_key?: string
  instruction: string
  max_rounds?: number
  max_seconds?: number
  outcome?: string | null

  // Selects a custom action instead of the plain create:
  //   'cancel'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface CatalogSelector {
  app: Record<string, any>
}

export interface CatalogSelectorListMatch {
  app_id: string
}

export interface CdnDeployment {
  id?: string
}

export interface CdnDeploymentLoadMatch {
  app_id: string
  cdn_id: string
  id: string
}

export interface CdnDeploymentListMatch {
  app_id: string
  cdn_id: string
}

export interface CdnDeploymentCreateData {
  app_id: string
  cdn_id: string
}

export interface CdnHostname {
  app_cdn_distribution_id: string
  created_at: string
  dns_status: string
  force_ssl: boolean
  hostname: string
  id: string
  provider_hostname_id: string | null
  tls_status: string
  updated_at: string
}

export interface CdnHostnameLoadMatch {
  app_id: string
  cdn_id: string
  id: string
}

export interface CdnHostnameListMatch {
  app_id: string
  cdn_id: string
}

export interface CdnHostnameCreateData {
  app_id: string
  cdn_id: string
  dns_status?: string
  force_ssl?: boolean
  hostname: string
  tls_status?: string
}

export interface CdnHostnameUpdateData {
  app_id: string
  cdn_id: string
  id: string
}

export interface CdnHostnamePatchData {
  app_id: string
  cdn_id: string
  id: string
}

export interface CdnHostnameRemoveMatch {
  app_id: string
  cdn_id: string
  id: string
}

export interface CdnSpace {
  id?: string
}

export interface CdnSpaceLoadMatch {
  id: string
}

export interface CdnSpaceListMatch {
  organization_id: string
}

export interface CdnSpaceCreateData {
  organization_id: string

  // Selects a custom action instead of the plain create:
  //   'archive' | 'provision'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface CdnSpaceUpdateData {
  id: string
}

export interface CdnSpacePatchData {
  id: string
}

export interface CdnSpaceRemoveMatch {
  id: string
}

export interface CdnSpaceObject {
  id?: string
}

export interface CdnSpaceObjectLoadMatch {
  cdn_space_id: string
  id: string
}

export interface CdnSpaceObjectListMatch {
  cdn_space_id: string
}

export interface CdnSpaceObjectUpdateData {
  cdn_space_id: string
}

export interface CdnSpaceObjectRemoveMatch {
  cdn_space_id: string
  id: string
}

export interface ConnectionRequest {
  agent_card_url: string
  auth_scheme: string
  can_configure: boolean
  can_disconnect: boolean
  can_setup: boolean
  error_code: string | null
  generation: number
  id: string
  name: string
  remote_agent: string | null
  retired_at: string | null
  revoked_at: string | null
  source_operation_id: string | null
  state: string
}

export interface ConnectionRequestLoadMatch {
  agent_id: string
  id: string
  organization_id: string
}

export interface ConnectionSource {
  device_id: string
  device_name: string
  provider: string
  source_operation_id: string
  title: string
}

export interface ConnectionSourceListMatch {
  agent_id: string
  organization_id: string
  cursor?: string
  limit?: number
}

export interface CoordinationWait {
  can_stop: boolean
  expires_at: string
  id: string
  status: string
  stop_state: string | null
  wake_outcome: string | null
}

export interface CoordinationWaitListMatch {
  agent_id: string
  coordination_id: string
  organization_id: string
  cursor?: string
}

export interface CredentialSignInCheck {
  agent_filters: Record<string, any>
  agents: any[]
  can_continue?: boolean
  chat_messages?: any[]
  concurrency: number
  covered_areas: any[]
  created_at: string
  deadline_at: string
  demo_project: Record<string, any> | null
  ended_early: boolean
  environment_id: string
  environment_name: string
  explorer_activity: Record<string, any>
  finding_count: number
  findings: any[]
  findings_fix_prompt: string | null
  finished_at?: string | null
  goal: string
  huntable_flows: any[]
  id: string
  max_seconds: number
  max_testers: number
  mode?: string
  next_scan_improvements: any[]
  observed_at?: string
  onboarding: boolean
  paywalled: boolean
  permissions: Record<string, any>
  priority_counts: Record<string, any>
  project_id?: string | null
  related_explorations: any[]
  report: Record<string, any>
  reproduction_of: Record<string, any> | null
  reproductions: any[]
  saves_scenarios: boolean
  scannable_flows: any[]
  scenario_generation: Record<string, any>
  sign_in_needs_answer: boolean
  sign_in_outcome: string
  sign_in_question?: string | null
  startup_retryable?: boolean
  status: string
  time_limit_reached: boolean
  title?: string
  unlock: any
  web_url: string
}

export interface CredentialSignInCheckCreateData {
  credential_id: string
  organization_id: string
  project_id: string
  environment_id: string

  // Selects a custom action instead of the plain create:
  //   'try_again'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface DataResourceRotateCredential {
  app_environment_id: string | null
  created_at: string
  engine: string
  failure_message: string | null
  high_availability: boolean
  hosted_app_id: string
  id: string
  kind: string
  name: string
  plan: string | null
  provider_metadata: Record<string, any>
  region: string | null
  slug: string
  status: string
  storage_gb: number | null
  storage_label: string | null
  updated_at: string
  version: string | null
}

export interface DataResourceRotateCredentialCreateData {
  app_id: string
  data_resource_id: string
}

export interface DeepScan {
  account_id?: string | null
  active: any[]
  agent_filters: Record<string, any>
  agents: any[]
  can_continue?: boolean
  chat_messages?: any[]
  concurrency: number
  covered_areas: any[]
  created_at: string
  deadline_at: string
  demo_project: Record<string, any> | null
  ended_early: boolean
  environment_id: string
  environment_name: string
  explorations: any[]
  explorer_activity: Record<string, any>
  finding_count: number
  findings: any[]
  findings_fix_prompt: string | null
  finished_at?: string | null
  goal: string
  huntable_flows: any[]
  id: string
  idempotency_key?: string
  launch_options: Record<string, any>
  max_seconds: number
  max_testers: number
  mode?: string
  next_scan_improvements: any[]
  observed_at?: string
  onboarding: boolean
  pagination: Record<string, any>
  paywalled: boolean
  permissions: Record<string, any>
  priority_counts: Record<string, any>
  project_id?: string | null
  related_explorations: any[]
  report: Record<string, any>
  reproduction_of: Record<string, any> | null
  reproductions: any[]
  saves_scenarios: boolean
  scannable_flows: any[]
  scenario_generation: Record<string, any>
  sign_in_needs_answer: boolean
  sign_in_outcome: string
  sign_in_question?: string | null
  startup_retryable?: boolean
  status: string
  time_limit_reached: boolean
  title?: string
  unlock: any
  web_url: string
}

export interface DeepScanLoadMatch {
  id: string
  organization_id: string
  agent_id?: string
  evidence?: string
  finding_id?: string
  project_id?: string

  // Selects a custom action instead of the plain load:
  //   'agent' | 'context'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface DeepScanListMatch {
  organization_id: string
  finding?: string
  page?: number
  project_id?: string
  query?: string
  status?: string
}

export interface DeepScanCreateData {
  organization_id: string
  project_id?: string
  account_id?: string | null
  concurrency?: number
  environment_id: string
  goal: string
  idempotency_key?: string
  max_seconds?: number
  max_testers?: number

  // Selects a custom action instead of the plain create:
  //   'reproduce' | 'stop'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface DeepScanFinding {
  finding_count: number
  finding_ids: any[]
  findings: any[]
  findings_fix_prompt: string | null
  free_findings_pending: boolean
  id: string
  mode: string
  permissions: Record<string, any>
  priority: string | null
  priority_counts: Record<string, any>
  project_id: string | null
  reproduction_of: Record<string, any> | null
  reproductions: any[]
  reruns_available: boolean
  status: string
  title: string
  unlock: Record<string, any>
  web_url: string
}

export interface DeepScanFindingListMatch {
  deep_scan_id: string
  organization_id: string
  priority?: string
  project_id?: string
}

export interface DeepScanFlow {
  account_id?: string | null
  concurrency?: number
  environment_id?: string
  exploration_id?: string
  flow_names: any[]
  idempotency_key?: string
  max_seconds?: number
  max_testers?: number
  note?: string | null
}

export interface DeepScanFlowCreateData {
  organization_id: string
  project_id?: string
  account_id?: string | null
  concurrency?: number
  environment_id?: string
  exploration_id?: string
  flow_names: any[]
  idempotency_key?: string
  max_seconds?: number
  max_testers?: number
  note?: string | null
}

export interface DeepScanMappedFlow {
  account_id: string | null
  environment_id: string
  flow_map: Record<string, any> | null
  revision_id: string | null
}

export interface DeepScanMappedFlowListMatch {
  organization_id: string
  account_id?: string
  environment_id: string
  project_id?: string
}

export interface DeepScanOption {
  accounts: any[]
  deep_scan_defaults?: any
  flow_map: Record<string, any> | null
  id: string
  name: string
  personas?: any[]
  preview?: boolean
  target_url: string | null
}

export interface DeepScanOptionListMatch {
  organization_id: string
  environment_query?: string
  project_id?: string
}

export interface DemoShare {
  head_sha: string
  id?: string
  recording: Record<string, any>
  summary: string
}

export interface DemoShareLoadMatch {
  id: string

  // Selects a custom action instead of the plain load:
  //   'thumbnail'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface DemoShareSegment {
  id?: string
}

export interface DemoShareSegmentLoadMatch {
  demo_share_id: string
  id: string
}

export interface DeploymentDashboardNomad {
}

export interface DeploymentDashboardNomadLoadMatch {
  app_id: string
  environment?: string
  location?: string
  service?: string

  // Selects a custom action instead of the plain load:
  //   'allocation'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface DeploymentFile {
}

export interface DeploymentFileUpdateData {
  deployment_id: string
  static_site_id: string
}

export interface DomainPathRule {
  action_kind: string
  app_service_endpoint_id: string | null
  app_service_id: string | null
  backend_ref: string | null
  created_at: string
  id: string
  last_error: string | null
  path_prefix: string
  status: string
  updated_at: string
}

export interface DomainPathRuleLoadMatch {
  app_id: string
  domain_id: string
  id: string
}

export interface DomainPathRuleListMatch {
  app_id: string
  domain_id: string
}

export interface DomainPathRuleCreateData {
  app_id: string
  domain_id: string
  app_service_endpoint_id?: string | null
  app_service_id: string | null
  path_prefix: string
}

export interface DomainPathRuleUpdateData {
  app_id: string
  domain_id: string
  id: string
  app_service_endpoint_id?: string | null
  app_service_id?: string | null
  path_prefix?: string
}

export interface DomainPathRulePatchData {
  app_id: string
  domain_id: string
  id: string
  app_service_endpoint_id?: string | null
  app_service_id?: string | null
  path_prefix?: string
}

export interface DomainPathRuleRemoveMatch {
  app_id: string
  domain_id: string
  id: string
}

export interface Dream {
  attention: boolean
  changes: any[]
  completed_at: string | null
  counts: Record<string, any>
  dream: any
  error_code: string | null
  id: string
  pagination: Record<string, any>
  permissions: Record<string, any>
  phase: string
  reason: string | null
  reviewed: number
  reviewed_date: string
  runs: any[]
  scope_name: string
  skipped: number
  tab: string
  timezone: string
}

export interface DreamLoadMatch {
  id: string
  organization_id: string
  page?: number
  project_id: string
  tab?: string
}

export interface DreamListMatch {
  organization_id: string
  page?: number
  project_id: string
}

export interface DreamCreateData {
  id: string
  organization_id: string
  project_id: string
  attention: boolean
  changes: any[]
  completed_at: string | null
  counts: Record<string, any>
  dream: any
  error_code: string | null
  pagination: Record<string, any>
  permissions: Record<string, any>
  phase: string
  reason: string | null
  reviewed: number
  reviewed_date: string
  runs: any[]
  scope_name: string
  skipped: number
  tab: string
  timezone: string

  // Selects a custom action instead of the plain create:
  //   'resume'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface Environment {
  active_revision_id: string | null
  agent_sign_up_available: boolean
  allowed_actions: string
  billing: Record<string, any>
  cleanup: any[]
  connection: string
  created_at: string
  default_policy?: Record<string, any>
  default_policy_json: Record<string, any>
  discovery_defaults: Record<string, any>
  environment: Record<string, any>
  exploration_accounts?: any[]
  explorations?: any[]
  first_run?: any
  hosted_app_id: string | null
  id: string
  imessage_number: string | null
  included_deep_scan: boolean
  lock_version: number
  managed_google_available: boolean
  managed_google_email: string
  messaging_tester_number?: string | null
  name: string
  network_connections: any[]
  onboarding_discovery?: any
  organization_id: string
  pending_accounts?: any[]
  permissions: Record<string, any>
  project_id: string | null
  repository_id: string | null
  revisions: any[]
  setup_discovery_id?: string | null
  sign_in_check_available: boolean
  slug: string
  status: string
  target_kind: string | null
  target_url: string | null
  test_accounts: Record<string, any>
  updated_at: string
  verify_network_connection_id: string | null
  version?: number
}

export interface EnvironmentLoadMatch {
  id: string
  organization_id: string
  project_id?: string
}

export interface EnvironmentListMatch {
  organization_id: string
  project_id?: string
}

export interface EnvironmentCreateData {
  organization_id: string
  allowed_actions?: string
  default_policy?: Record<string, any>
  imessage_number?: string | null
  messaging_tester_number?: string | null
  name?: string
  project_id?: string | null
  repository_id?: string | null
  slug: string
  target_kind?: string | null
  target_url?: string | null
}

export interface EnvironmentUpdateData {
  id: string
  organization_id: string

  // Selects a custom action instead of the plain update:
  //   'first_run'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface EnvironmentPatchData {
  id: string
  organization_id: string
  allowed_actions?: string
  imessage_number?: string | null
  messaging_tester_number?: string | null
  name?: string
  target_url?: string | null
  verify_network_connection_id?: string | null
  version?: number
}

export interface EnvironmentRemoveMatch {
  id: string
  organization_id: string

  // Selects a custom action instead of the plain remove:
  //   'first_run'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface EnvironmentDiscoveryRun {
  account_id: string | null
  deadline_at: string
  environment_revision_id: string
  evidence?: any[]
  failure_code: string | null
  id: string
  queued_at: string
  recording: Record<string, any>
  result: Record<string, any> | null
  status: string
}

export interface EnvironmentDiscoveryRunLoadMatch {
  environment_id: string
  id: string
  organization_id: string
}

export interface EnvironmentDiscoveryRunCreateData {
  environment_id: string
  organization_id: string
  account_id?: string | null

  // Selects a custom action instead of the plain create:
  //   'stop'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface EnvironmentExploration {
  account_id?: string | null
  agent_filters: Record<string, any>
  agents: any[]
  can_continue?: boolean
  chat_messages?: any[]
  concurrency: number
  covered_areas: any[]
  created_at: string
  deadline_at: string
  demo_project: Record<string, any> | null
  ended_early: boolean
  environment_id: string
  environment_name: string
  explorer_activity: Record<string, any>
  finding_count: number
  findings: any[]
  findings_fix_prompt: string | null
  finished_at?: string | null
  goal: string
  huntable_flows: any[]
  id: string
  idempotency_key?: string
  max_seconds: number
  max_testers: number
  mode?: string
  next_scan_improvements: any[]
  observed_at?: string
  onboarding: boolean
  paywalled: boolean
  permissions: Record<string, any>
  persona_id?: string | null
  priority_counts: Record<string, any>
  project_id?: string | null
  related_explorations: any[]
  report: Record<string, any>
  reproduction_of: Record<string, any> | null
  reproductions: any[]
  saves_scenarios: boolean
  scannable_flows: any[]
  scenario_generation: Record<string, any>
  sign_in_needs_answer: boolean
  sign_in_outcome: string
  sign_in_question?: string | null
  startup_retryable?: boolean
  status: string
  time_limit_reached: boolean
  title?: string
  unlock: any
  web_url: string
}

export interface EnvironmentExplorationCreateData {
  environment_id: string
  organization_id: string
  project_id: string
  account_id?: string | null
  concurrency?: number
  goal: string
  idempotency_key?: string
  max_seconds?: number
  max_testers?: number
  persona_id?: string | null
}

export interface EnvironmentFirstRun {
}

export interface EnvironmentFirstRunCreateData {
  environment_id: string
  organization_id: string

  // Selects a custom action instead of the plain create:
  //   'start' | 'test_user'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface EnvironmentRevision {
  allowed_origins: any[]
  app_environment_id: string | null
  app_release_id: string | null
  blueprint: Record<string, any>
  blueprint_json: Record<string, any>
  cleanup_state: string
  created_at: string
  digest: string
  dry_run?: boolean
  expires_at: string | null
  id: string
  organization_id: string
  ready_at: string | null
  resolved_manifest_json: Record<string, any>
  retention_policy_json: Record<string, any>
  revision: number
  revoked_at: string | null
  runner_environment_revision_id: string | null
  safety_policy_json: Record<string, any>
  schema_version: number
  source_metadata?: Record<string, any>
  source_metadata_json: Record<string, any>
  status: string
  updated_at: string
  validation_json: Record<string, any>
  verify_environment_id: string
}

export interface EnvironmentRevisionLoadMatch {
  environment_id: string
  id: string
  organization_id: string
}

export interface EnvironmentRevisionCreateData {
  environment_id: string
  organization_id: string
  blueprint: Record<string, any>
  dry_run?: boolean
  source_metadata?: Record<string, any>

  // Selects a custom action instead of the plain create:
  //   'provision' | 'revoke' | 'validate'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface EnvironmentRevisionUpdateData {
  environment_id: string
  id: string
  organization_id: string
}

export interface EnvironmentSecretBinding {
  env_key: string
  id?: string
  mode?: string
  secret_id?: string
  secret_version_id?: string
}

export interface EnvironmentSecretBindingListMatch {
  app_id: string
  environment_id: string
}

export interface EnvironmentSecretBindingCreateData {
  app_id: string
  environment_id: string
  env_key: string
  mode?: string
  secret_id?: string
  secret_version_id?: string

  // Selects a custom action instead of the plain create:
  //   'copy'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface EnvironmentSecretBindingRemoveMatch {
  app_id: string
  environment_id: string
  id: string
}

export interface EnvironmentTestAccount {
  configured: boolean
  credentials: any[]
  id?: string
  persona: string
  revision_id: string
  role: string
  tenant: string
}

export interface EnvironmentTestAccountListMatch {
  environment_id: string
  organization_id: string
}

export interface EnvironmentTestAccountUpdateData {
  environment_id: string
  id: string
  organization_id: string
}

export interface EnvironmentTestAccountPatchData {
  environment_id: string
  id: string
  organization_id: string
  credentials?: any[]
  revision_id?: string
}

export interface Evidence {
  id?: string
}

export interface EvidenceLoadMatch {
  id?: string
  organization_id: string
  agent_id?: string
  cursor?: string
  exploration_id?: string
  kind?: string
  limit?: number
  repository_id?: string
  scenario_run_id?: string

  // Selects a custom action instead of the plain load:
  //   'archive' | 'download'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface Exploration {
  account_id?: string | null
  active: any[]
  agent_filters: Record<string, any>
  agents: any[]
  can_continue?: boolean
  chat_messages?: any[]
  concurrency: number
  covered_areas: any[]
  created_at: string
  deadline_at: string
  demo_project: Record<string, any> | null
  ended_early: boolean
  environment_id: string
  environment_name: string
  explorations: any[]
  explorer_activity: Record<string, any>
  finding_count: number
  findings: any[]
  findings_fix_prompt: string | null
  finished_at?: string | null
  goal: string
  huntable_flows: any[]
  id: string
  idempotency_key?: string
  launch_options: Record<string, any>
  max_seconds: number
  max_testers: number
  mode?: string
  next_scan_improvements: any[]
  observed_at?: string
  onboarding: boolean
  pagination: Record<string, any>
  paywalled: boolean
  permissions: Record<string, any>
  persona_id?: string | null
  priority_counts: Record<string, any>
  project_id?: string | null
  related_explorations: any[]
  report: Record<string, any>
  reproduction_of: Record<string, any> | null
  reproductions: any[]
  saves_scenarios: boolean
  scannable_flows: any[]
  scenario_generation: Record<string, any>
  sign_in_needs_answer: boolean
  sign_in_outcome: string
  sign_in_question?: string | null
  startup_retryable?: boolean
  status: string
  time_limit_reached: boolean
  title?: string
  unlock: any
  web_url: string
}

export interface ExplorationLoadMatch {
  id: string
  organization_id: string
  agent_id?: string
  evidence?: string
  finding_id?: string
  project_id?: string

  // Selects a custom action instead of the plain load:
  //   'progress' | 'report' | 'sign_in_browser'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface ExplorationListMatch {
  organization_id: string
  launch?: boolean
  page?: number
  project_id?: string
}

export interface ExplorationCreateData {
  organization_id: string
  project_id?: string
  account_id?: string | null
  concurrency?: number
  environment_id: string
  goal: string
  idempotency_key?: string
  max_seconds?: number
  max_testers?: number
  persona_id?: string | null

  // Selects a custom action instead of the plain create:
  //   'create_project' | 'report' | 'retry_startup' | 'stop'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface ExplorationMessage {
  agent_filters: Record<string, any>
  agents: any[]
  can_continue?: boolean
  chat_messages?: any[]
  concurrency: number
  covered_areas: any[]
  created_at: string
  deadline_at: string
  demo_project: Record<string, any> | null
  ended_early: boolean
  environment_id: string
  environment_name: string
  explorer_activity: Record<string, any>
  finding_count: number
  findings: any[]
  findings_fix_prompt: string | null
  finished_at?: string | null
  goal: string
  huntable_flows: any[]
  id: string
  max_seconds: number
  max_testers: number
  mode?: string
  next_scan_improvements: any[]
  observed_at?: string
  onboarding: boolean
  paywalled: boolean
  permissions: Record<string, any>
  priority_counts: Record<string, any>
  project_id?: string | null
  related_explorations: any[]
  report: Record<string, any>
  reproduction_of: Record<string, any> | null
  reproductions: any[]
  saves_scenarios: boolean
  scannable_flows: any[]
  scenario_generation: Record<string, any>
  sign_in_needs_answer: boolean
  sign_in_outcome: string
  sign_in_question?: string | null
  startup_retryable?: boolean
  status: string
  text: string
  time_limit_reached: boolean
  title?: string
  unlock: any
  web_url: string
}

export interface ExplorationMessageCreateData {
  exploration_id: string
  organization_id: string
  project_id?: string
  text: string
}

export interface ExplorationReport {
}

export interface ExplorationReportLoadMatch {
  exploration_id: string
  organization_id: string
  project_id?: string

  // Selects a custom action instead of the plain load:
  //   'document'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface ExplorationReportCreateData {
  exploration_id: string
  organization_id: string
  project_id?: string
  source_ids?: any

  // Selects a custom action instead of the plain create:
  //   'refresh'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface ExplorationScenario {
  agent_filters: Record<string, any>
  agents: any[]
  can_continue?: boolean
  chat_messages?: any[]
  concurrency: number
  covered_areas: any[]
  created_at: string
  deadline_at: string
  demo_project: Record<string, any> | null
  ended_early: boolean
  environment_id: string
  environment_name: string
  explorer_activity: Record<string, any>
  finding_count: number
  findings: any[]
  findings_fix_prompt: string | null
  finished_at?: string | null
  goal: string
  huntable_flows: any[]
  id: string
  max_seconds: number
  max_testers: number
  mode?: string
  next_scan_improvements: any[]
  observed_at?: string
  onboarding: boolean
  paywalled: boolean
  permissions: Record<string, any>
  priority_counts: Record<string, any>
  project_id?: string | null
  related_explorations: any[]
  report: Record<string, any>
  reproduction_of: Record<string, any> | null
  reproductions: any[]
  saves_scenarios: boolean
  scannable_flows: any[]
  scenario_generation: Record<string, any>
  sign_in_needs_answer: boolean
  sign_in_outcome: string
  sign_in_question?: string | null
  startup_retryable?: boolean
  status: string
  time_limit_reached: boolean
  title?: string
  unlock: any
  web_url: string
}

export interface ExplorationScenarioCreateData {
  exploration_id: string
  organization_id: string
  project_id?: string
}

export interface Finding {
  confidence: string
  created_at: string
  deferred_until?: string | null
  finding: Record<string, any>
  fingerprint: string
  first_seen_at: string
  id: string
  last_seen_at: string
  locked: boolean
  occurrence_count: number
  organization_id: string
  permissions: Record<string, any>
  reason?: string
  reported_occurrence: Record<string, any> | null
  repository_id: string | null
  safe_summary: string
  scenario_occurrences?: any[]
  severity: string
  status: string
  title: string
  updated_at: string
  verification: any
}

export interface FindingLoadMatch {
  id: string
  organization_id: string
  repository_id?: string
}

export interface FindingListMatch {
  organization_id: string
  status?: string
}

export interface FindingUpdateData {
  id: string
  organization_id: string
}

export interface FindingPatchData {
  id: string
  organization_id: string
  repository_id?: string
  deferred_until?: string | null
  reason?: string
  status?: string
}

export interface GithubConnection {
  accounts: any[]
  github_app_installation_id: string
  installations: any[]
  project_id?: string
  replace?: boolean
  repositories: any[]
}

export interface GithubConnectionListMatch {
  organization_id: string
  github_app_installation_id?: string
  project_id?: string
}

export interface GithubConnectionCreateData {
  organization_id: string
  github_app_installation_id: string
  project_id?: string
  replace?: boolean
  repositories: any[]
}

export interface HostingAppDomain {
  app_environment_id: string | null
  app_service_id: string | null
  certificate: Record<string, any> | null
  created_at: string
  dns_mode: string
  dns_status: string
  failure_message: string | null
  hosted_app_id: string
  hostname: string
  id: string
  kind: string
  last_checked_at: string | null
  path_rules: any[]
  record_name: string | null
  record_type: string | null
  record_value: string | null
  redirect_to: string | null
  static_site_id: string | null
  target_kind: string
  tls_status: string
  updated_at: string
  verification_record: Record<string, any> | null
  verification_status: string
}

export interface HostingAppDomainLoadMatch {
  app_id: string
  id: string
}

export interface HostingAppDomainListMatch {
  app_id: string
  app_environment_id?: string
}

export interface HostingAppDomainCreateData {
  app_id: string
  app_environment_id?: string | null
  app_service_id: string | null
  dns_status?: string
  hostname: string
  kind: string
  redirect_to?: string | null
  tls_status?: string

  // Selects a custom action instead of the plain create:
  //   'disable' | 'enable'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface HostingAppDomainUpdateData {
  app_id: string
  id: string
}

export interface HostingAppDomainPatchData {
  app_id: string
  id: string
}

export interface HostingAppDomainRemoveMatch {
  app_id: string
  id: string
}

export interface ImageRepository {
  auth_configured: boolean
  created_at: string
  created_at_label: string | null
  hosted_app_id: string | null
  id: string
  name: string
  organization_id: string
  provider_kind: string
  registry_auth_token?: string
  repository_path: string
  slug: string
  status: string
  updated_at: string
  updated_at_label: string | null
  visibility: string
}

export interface ImageRepositoryListMatch {
  organization_id: string
}

export interface ImageRepositoryCreateData {
  organization_id: string
  hosted_app_id?: string | null
  name: string
  provider_kind?: string
  registry_auth_token?: string
  repository_path?: string
  slug: string
  status?: string
  visibility?: string
}

export interface Integration {
  github: Record<string, any>
  gitlab: Record<string, any>
  permissions: Record<string, any>
  slack: Record<string, any>
}

export interface IntegrationListMatch {
  organization_id: string
}

export interface InteractionResponse {
  answer: Record<string, any>
  conversation_id: string
  expected_revision: number
}

export interface InteractionResponseCreateData {
  agent_id: string
  interaction_id: string
  organization_id: string
  answer: Record<string, any>
  conversation_id: string
  expected_revision: number
}

export interface Invitation {
  accepted_at: string | null
  accepted_by_user: any
  created_at: string
  created_at_label: string | null
  email: string
  email_delivery_status?: string
  expires_at: string | null
  expires_at_label: string | null
  id: string
  invite_url: string | null
  invited_by_user: any
  organization: Record<string, any>
  revoked_at: string | null
  role: string
  status: string
  updated_at: string
  updated_at_label: string | null
}

export interface InvitationListMatch {
  organization_id: string
}

export interface InvitationCreateData {
  organization_id: string
  email: string
  role: string
}

export interface InvitationRemoveMatch {
  id: string
  organization_id: string
}

export interface JourneyVariantReplay {
  actor_id: string | null
  can_request_qualification: boolean
  created_at: string
  failure_code: string | null
  failure_message: string | null
  id: string
  idempotency_key: string
  max_seconds?: number
  preparation_receipt: Record<string, any> | null
  qualification: any
  qualification_status: string
  replay_required: boolean
  review_reason: string
  run_id: string | null
  scenario_file: Record<string, any>
  scenario_run_id: string | null
  source_digest: string
  status: string
  updated_at: string
  variant_id: string
}

export interface JourneyVariantReplayCreateData {
  journey_variant_id: string
  organization_id: string
  project_id: string
  actor_id?: string | null
  idempotency_key: string
  max_seconds?: number
  review_reason: string
  scenario_file: Record<string, any>
}

export interface Knowledge {
  content_digest: string
  content_json: Record<string, any>
  document: Record<string, any>
  documents: any[]
  dreaming: Record<string, any>
  expected_digest: string
  history: any[]
  id: string
  kind: string
  markdown: string
  observed_at: string
  organization: Record<string, any>
  permissions: Record<string, any>
  project_id: string
  project_name: string
  projects: any[]
  selected_project_id: string | null
  source: Record<string, any>
  title: string
  total: number
}

export interface KnowledgeLoadMatch {
  id?: string
  organization_id: string
  project_id?: string
  q?: string
}

export interface KnowledgeCreateData {
  organization_id: string
  markdown: string
  project_id: string
  title: string
}

export interface KnowledgeUpdateData {
  id: string
  organization_id: string
}

export interface KnowledgePatchData {
  id: string
  organization_id: string
  expected_digest?: string
  markdown?: string
  title?: string
}

export interface KnowledgeRemoveMatch {
  id: string
  organization_id: string
}

export interface LocalThreadDelivery {
  decision: string
  decision_pending: boolean
  delivery: Record<string, any>
  expected_version: number
  id?: string
  policy: Record<string, any>
  recovery_message: string | null
}

export interface LocalThreadDeliveryLoadMatch {
  agent_id: string
  id: string
  local_thread_id: string
  organization_id: string
  expected_version?: number
}

export interface LocalThreadDeliveryUpdateData {
  agent_id: string
  id: string
  local_thread_id: string
  organization_id: string
  decision?: string
  expected_version?: number
}

export interface LocalThreadOperation {
  action: string
  arguments: Record<string, any>
  created_at: string
  delivery: Record<string, any>
  device_id: string
  diagnostic_code?: string
  end: Record<string, any>
  expires_at: string
  id: string
  key: string
  provider: string
  references: Record<string, any>
  result: any
  result_expired: boolean
  state: string
}

export interface LocalThreadOperationLoadMatch {
  agent_id: string
  id: string
  local_thread_id?: string
  organization_id: string
}

export interface LocalThreadOperationCreateData {
  agent_id: string
  local_thread_id: string
  organization_id: string
  action: string
  arguments: Record<string, any>
  key: string
}

export interface Location {
  code: string
  created_at: string
  id: string
  name: string
  nomad_datacenter: string
  updated_at: string
}

export interface LocationListMatch {
  code?: string
  created_at?: string
  id?: string
  name?: string
  nomad_datacenter?: string
  updated_at?: string
}

export interface Me {
  active_organization: any
  analytics_distinct_id?: string
  analytics_internal: boolean
  api_base_url?: string
  api_token?: string
  app_promotion: Record<string, any>
  commit_author_email: string
  email: string
  enabled_features: any[]
  github_pr_user_authorization_connected: boolean
  github_pr_user_authorization_login: string | null
  github_prs_authored_by_change_author: boolean
  id: string
  impersonation: Record<string, any> | null
  name: string | null
  next_path?: string
  onboarding: Record<string, any>
  openai_sign_in_connected?: boolean
  openai_sign_in_enabled?: boolean
  organizations: any[]
  pending_organization_invitation_count: number
  pending_organization_invitation_count_label: string
  picture_url: string | null
  superadmin?: boolean
  time_zone?: string | null
}

export interface MeLoadMatch {
  active_organization?: any
  analytics_distinct_id?: string
  analytics_internal?: boolean
  api_base_url?: string
  api_token?: string
  app_promotion?: Record<string, any>
  commit_author_email?: string
  email?: string
  enabled_features?: any[]
  github_pr_user_authorization_connected?: boolean
  github_pr_user_authorization_login?: string | null
  github_prs_authored_by_change_author?: boolean
  id: string
  impersonation?: Record<string, any> | null
  name?: string | null
  next_path?: string
  onboarding?: Record<string, any>
  openai_sign_in_connected?: boolean
  openai_sign_in_enabled?: boolean
  organizations?: any[]
  pending_organization_invitation_count?: number
  pending_organization_invitation_count_label?: string
  picture_url?: string | null
  superadmin?: boolean
  time_zone?: string | null

  // Selects a custom action instead of the plain load:
  //   'account_deletion' | 'landing' | 'workspace_suggestion'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface MeCreateData {
  action_name?: any
  confirmation?: any

  // Selects a custom action instead of the plain create:
  //   'account_deletion' | 'app_promotion'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface MeUpdateData {

  // Selects a custom action instead of the plain update:
  //   'active_organization' | 'profile_image'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface MeRemoveMatch {
  active_organization?: any
  analytics_distinct_id?: string
  analytics_internal?: boolean
  api_base_url?: string
  api_token?: string
  app_promotion?: Record<string, any>
  commit_author_email?: string
  email?: string
  enabled_features?: any[]
  github_pr_user_authorization_connected?: boolean
  github_pr_user_authorization_login?: string | null
  github_prs_authored_by_change_author?: boolean
  id: string
  impersonation?: Record<string, any> | null
  name?: string | null
  next_path?: string
  onboarding?: Record<string, any>
  openai_sign_in_connected?: boolean
  openai_sign_in_enabled?: boolean
  organizations?: any[]
  pending_organization_invitation_count?: number
  pending_organization_invitation_count_label?: string
  picture_url?: string | null
  superadmin?: boolean
  time_zone?: string | null

  // Selects a custom action instead of the plain remove:
  //   'profile_image'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface MeEmail {
  account: boolean
  can_delete: boolean
  can_resend_verification: boolean
  can_set_account: boolean
  can_set_commit_author: boolean
  commit_author: boolean
  email: string
  emails: any[]
  id: string
  message?: string
  verification_status: string
  verified: boolean
}

export interface MeEmailListMatch {
  account?: boolean
  can_delete?: boolean
  can_resend_verification?: boolean
  can_set_account?: boolean
  can_set_commit_author?: boolean
  commit_author?: boolean
  email?: string
  emails?: any[]
  id?: string
  message?: string
  verification_status?: string
  verified?: boolean
}

export interface MeEmailCreateData {
  email: string

  // Selects a custom action instead of the plain create:
  //   'resend_verification'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface MeEmailUpdateData {
  id: string
}

export interface MeEmailPatchData {
  id: string
  account?: boolean
  commit_author?: boolean
}

export interface MeEmailRemoveMatch {
  id: string
}

export interface MeOnboarding {
}

export interface MeOnboardingCreateData {
  step?: any

  // Selects a custom action instead of the plain create:
  //   'call' | 'claim' | 'dismiss'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface MediaFile {
  id?: string
}

export interface MediaFileLoadMatch {
  browser_session_id: string
  id: string
  media_id: string
  organization_id: string
  inline?: boolean
}

export interface Member {
  accepted_at: string | null
  accepted_by_user: any
  created_at: string
  created_at_label: string | null
  email: string
  email_delivery_status?: string
  expires_at: string | null
  expires_at_label: string | null
  id: string
  invite_url: string | null
  invited_by_user: any
  is_self: boolean
  organization: Record<string, any>
  revoked_at: string | null
  role: string
  status: string
  updated_at: string
  updated_at_label: string | null
  user: Record<string, any>
}

export interface MemberListMatch {
  organization_id: string
}

export interface MemberUpdateData {
  id: string
  organization_id: string
  role?: string
}

export interface MemberPatchData {
  id: string
  organization_id: string
  role?: string
}

export interface MemberRemoveMatch {
  id: string
  organization_id: string
}

export interface Memory {
  confidence: string
  created_at: string
  environment_id?: string
  finding: string
  history: any[]
  id: string
  indexed_at: string | null
  memory: Record<string, any>
  project_id?: string
  response?: string
  scope: Record<string, any>
  source: Record<string, any>
  tags?: any[]
  title: string
  workaround?: string
}

export interface MemoryLoadMatch {
  id: string
  organization_id: string
  environment_id?: string
  project_id?: string
}

export interface MemoryListMatch {
  organization_id: string
  environment_id?: string
  include_environment?: boolean
  project_id?: string
  q?: string
  tag?: string
}

export interface MemoryCreateData {
  organization_id: string
  environment_id?: string
  finding: string
  project_id?: string
  response?: string
  tags?: any[]
  title: string
  workaround?: string
}

export interface MemoryRemoveMatch {
  id: string
  organization_id: string
  project_id?: string
}

export interface MergeRequest {
  available_tests: any[]
  base_sha: string
  branch?: string
  comment_url: string | null
  current_run?: any
  draft: boolean
  findings: any[]
  github_repository: string | null
  github_url: string | null
  head_sha: string
  id: string
  idempotency_key: string
  number: number
  pagination: Record<string, any>
  permissions: Record<string, any>
  preview_cleanup_ready: boolean
  preview_url?: string | null
  project?: any
  project_id: string | null
  project_slug: string | null
  provider: string
  pull_request: Record<string, any>
  repository_id: string
  request_label: string
  requested_run_id: string | null
  runs: any[]
  source_branch: string | null
  source_repository: string | null
  source_url: string | null
  state: string
  title: string
  updated_at: string
  web_path: string
}

export interface MergeRequestLoadMatch {
  id: string
  organization_id: string
  page?: number
}

export interface MergeRequestCreateData {
  organization_id: string
  branch?: string
  head_sha?: string
  idempotency_key: string
  number: number
  project_id?: string | null
  repository_id?: string

  // Selects a custom action instead of the plain create:
  //   'preview' | 'rerun'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface MessagingConversationMessage {
  attachment_limit: number
  attachment_max_bytes: number
  client_operation_id: string
  content: string
  id?: string
  media: Record<string, any>
  media_upload_ids?: any[]
  messages: any[]
  reply_to?: string
  retry_attachment?: boolean
  send_blocked_reason: string | null
  send_disposition?: string
  send_error?: string | null
  send_style?: string | null
}

export interface MessagingConversationMessageCreateData {
  messaging_conversation_id: string
  organization_id: string
  project_id: string
  client_operation_id: string
  content: string
  media: Record<string, any>
  media_upload_ids?: any[]
  reply_to?: string
  retry_attachment?: boolean
  send_style?: string | null

  // Selects a custom action instead of the plain create:
  //   'reaction'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface MessagingConversationUpload {
  attachment: Record<string, any>
  upload_id: string
}

export interface MessagingConversationUploadCreateData {
  messaging_conversation_id: string
  organization_id: string
  project_id: string
}

export interface MetricQuery {
}

export interface MetricQueryListMatch {
}

export interface NetworkConnection {
  aws_client_vpn_profile?: string
  created_at: string
  device_tag?: string
  id: string
  name: string
  oauth_client_id?: string
  oauth_client_secret?: string
  provider?: string
  status?: string
  updated_at: string
}

export interface NetworkConnectionCreateData {
  organization_id: string
  aws_client_vpn_profile?: string
  device_tag?: string
  name: string
  oauth_client_id?: string
  oauth_client_secret?: string
  provider?: string
  status?: string
}

export interface NetworkConnectionUpdateData {
  id: string
  organization_id: string
}

export interface NetworkConnectionPatchData {
  id: string
  organization_id: string
  aws_client_vpn_profile?: string
  device_tag?: string
  name?: string
  oauth_client_id?: string
  oauth_client_secret?: string
  provider?: string
  status?: string
}

export interface NomadAllocation {
  allocation_id: string
  client_status: string | null
  create_time: string | null
  datacenter: string | null
  desired_description: string | null
  desired_status: string | null
  fetched_at: string
  id?: string
  job_id: string | null
  modify_time: string | null
  name: string | null
  namespace: string
  node_id: string | null
  node_name: string | null
  resources: Record<string, any>
  task_group: string | null
  task_states: any[]
  verify_runner_images?: any[]
}

export interface NomadAllocationLoadMatch {
  app_id: string
  id: string
}

export interface NomadLog {
  allocation_id: string
  environment?: string
  fetched_at: string
  location?: string | null
  logs: string
  namespace: string
  offset: number
  origin: string
  service?: string
  task: string
  type: string
}

export interface NomadLogListMatch {
  app_id: string
  environment?: string
  location?: string
  offset?: number
  origin?: string
  service?: string
  task?: string
  type?: string
}

export interface Organization {
  activated_products: any[]
  agents_only?: boolean
  can_activate_products: boolean
  created_at: string
  created_at_label: string | null
  github_prs_authored_by_change_author: boolean
  google_workspace_domain?: string | null
  id: string
  logo_url: string | null
  member_count: number
  name: string
  pending_invitation_count: number
  personal: boolean
  repository_count: number
  role: string | null
  sandbox_region: string
  shared_agent_personal_accounts_enabled?: boolean
  slug: string
  source_control_providers?: any[]
  source_ui_enabled?: boolean
  timezone: string
  updated_at: string
  updated_at_label: string | null
  verify_pr_scenario_writing_enabled: boolean
}

export interface OrganizationLoadMatch {
  id: string
}

export interface OrganizationListMatch {
  activated_products?: any[]
  agents_only?: boolean
  can_activate_products?: boolean
  created_at?: string
  created_at_label?: string | null
  github_prs_authored_by_change_author?: boolean
  google_workspace_domain?: string | null
  id?: string
  logo_url?: string | null
  member_count?: number
  name?: string
  pending_invitation_count?: number
  personal?: boolean
  repository_count?: number
  role?: string | null
  sandbox_region?: string
  shared_agent_personal_accounts_enabled?: boolean
  slug?: string
  source_control_providers?: any[]
  source_ui_enabled?: boolean
  timezone?: string
  updated_at?: string
  updated_at_label?: string | null
  verify_pr_scenario_writing_enabled?: boolean
}

export interface OrganizationCreateData {
  name: string
  slug: string
  timezone?: string
}

export interface OrganizationUpdateData {
  id: string
  github_prs_authored_by_change_author?: boolean
  google_workspace_domain?: string | null
  name?: string
  sandbox_region?: string
  shared_agent_personal_accounts_enabled?: boolean
  slug?: string
  timezone?: string
  verify_pr_scenario_writing_enabled?: boolean
}

export interface OrganizationPatchData {
  id: string
  github_prs_authored_by_change_author?: boolean
  google_workspace_domain?: string | null
  name?: string
  sandbox_region?: string
  shared_agent_personal_accounts_enabled?: boolean
  slug?: string
  timezone?: string
  verify_pr_scenario_writing_enabled?: boolean
}

export interface Page {
  active_runs: any[]
  checkout_required: boolean
  cli_signed_in_at: string | null
  counts: Record<string, any>
  demo_project: Record<string, any> | null
  environments: any[]
  included_deep_scan: boolean
  onboarding_discovery?: any
  organization: Record<string, any>
  permissions: Record<string, any>
  project: any
  pull_request_launch_options?: any[]
  pull_requests?: any[]
  repositories: any[]
  runs: any[]
  runs_pagination: Record<string, any>
  suggested_app_url: string | null
  url_first_start: boolean
}

export interface PageLoadMatch {
  organization_id: string
  page?: number
  project_id?: string
  query?: string
  section?: string
  status?: string
  verify_environment_id?: string
}

export interface PageAgent {
  agents: any[]
  can_edit_integration_connections: boolean
  creation_enabled: boolean
  inbox?: any
  integration_choices: any[]
  integration_choices_truncated: boolean
  integration_selected: any[]
  model_choices?: any[]
  new_configuration: any
  organization_id: string
  pagination: Record<string, any>
  pinned_agent: any
  platform_event_types: any[]
  repository_choices: any[]
  repository_choices_truncated: boolean
  runtime_versions?: any[]
  selected_agent: any
  selected_reference: string | null
  viewer_id: string
}

export interface PageAgentLoadMatch {
  organization_id: string
  agent?: string
  agent_search?: string
  agent_visibility?: string
  cursor?: string
  limit?: number

  // Selects a custom action instead of the plain load:
  //   'roster'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface PageAgentListMatch {
  organization_id: string
  agent?: string
  agent_search?: string
  agent_visibility?: string
  cursor?: string
  integration_search?: string
  limit?: number
}

export interface PageAgentCreateData {
  organization_id: string
  agent_ids?: any

  // Selects a custom action instead of the plain create:
  //   'activity'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface PageProjectRun {
  available_tests: any[]
  fix_scenario_count: number
  fix_scenarios: any[]
  fixable_count: number
  id?: string
  pagination: Record<string, any>
  permissions: Record<string, any>
  preparation_reason: string | null
  project: Record<string, any>
  run: Record<string, any>
  scenario_runs: any[]
  selected_scenario_run: any
  web_path: string
}

export interface PageProjectRunLoadMatch {
  id: string
  organization_id: string
  project_id: string
  browser?: string
  detail?: boolean
  page?: number
}

export interface PagesProjectCredential {
  browser_authentication?: Record<string, any> | null
  composal_address: string | null
  configured: boolean
  credential_keys: Record<string, any>
  description: string | null
  email_link_auth_origins: any[]
  has_inbox: boolean
  id: string
  identity_provider: Record<string, any> | null
  instructions: string | null
  login_method: string
  login_url: string
  managed: boolean
  mfa_enabled: boolean
  name: string
  project_id: string
  provider_guidance: string
  sign_in_verified: boolean
  sign_in_verified_at: string | null
  status: string
  updated_at: string
  username: string
}

export interface PagesProjectCredentialListMatch {
  organization_id: string
  project_id: string
}

export interface PagesProjectPersona {
  active_count: number
  credentials: any[]
  needs_attention_count: number
  permissions: Record<string, any>
  persona_states: Record<string, any>
  personas: any[]
  project: Record<string, any>
}

export interface PagesProjectPersonaListMatch {
  organization_id: string
  project_id: string
}

export interface PagesProjectRun {
  environment_query: string
  environments: any[]
  environments_has_more: boolean
  pagination: Record<string, any>
  runs: any[]
  selected_environment: any
}

export interface PagesProjectRunListMatch {
  organization_id: string
  project_id: string
  environment_id?: string
  environment_query?: string
  page?: number
  query?: string
  status?: string
  trigger?: string
}

export interface PagesProjectScenario {
  base_url: string | null
  id: string
  kind: string | null
  name: string
}

export interface PagesProjectScenarioListMatch {
  organization_id: string
  project_id: string
  limit?: number
  sort?: string
}

export interface PersonalAccessToken {
  id?: string
}

export interface PersonalAccessTokenListMatch {
  id?: string
}

export interface PersonalAccessTokenCreateData {
}

export interface PersonalAccessTokenRemoveMatch {
  id: string
}

export interface PreviewOperation {
}

export interface PreviewOperationListMatch {
  app_id: string
  preview_id: string
}

export interface PreviewProfileSecretBinding {
  env_key: string
  id?: string
  mode?: string
  secret_id?: string
  secret_version_id?: string
}

export interface PreviewProfileSecretBindingListMatch {
  app_id: string
  preview_profile_id: string
}

export interface PreviewProfileSecretBindingCreateData {
  app_id: string
  preview_profile_id: string
  env_key: string
  mode?: string
  secret_id?: string
  secret_version_id?: string
}

export interface PreviewProfileSecretBindingRemoveMatch {
  app_id: string
  id: string
  preview_profile_id: string
}

export interface PreviewSecret {
  env_key: string
  id?: string
  name: string
  slug: string
  value: string
}

export interface PreviewSecretCreateData {
  app_id: string
  preview_id: string
  env_key: string
  name: string
  slug: string
  value: string

  // Selects a custom action instead of the plain create:
  //   'rotate'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface PreviewSecretRemoveMatch {
  app_id: string
  id: string
  preview_id: string
}

export interface PreviewSharingApproval {
  approved_build_keys: any[]
  approved_build_secrets: any[]
  approved_default_configuration: any[]
  approved_default_secrets: any[]
  approved_source_keys: any[]
  build_keys?: any[]
  build_secrets?: any[]
  default_configuration?: any[]
  default_secrets?: any[]
  services: any[]
  snapshot_version: number
  source_keys?: any[]
}

export interface PreviewSharingApprovalListMatch {
  app_id: string
  preview_id: string
}

export interface PreviewSharingApprovalCreateData {
  app_id: string
  preview_id: string
  build_keys?: any[]
  build_secrets?: any[]
  default_configuration?: any[]
  default_secrets?: any[]
  snapshot_version: number
  source_keys?: any[]
}

export interface ProductMapIdentityDecision {
  observations: any[]
  operation: string
  reason: string
  target: Record<string, any>
}

export interface ProductMapIdentityDecisionCreateData {
  organization_id: string
  project_id: string
  observations: any[]
  operation: string
  reason: string
  target: Record<string, any>
}

export interface ProductMapJourney {
  default_variant_id?: string | null
  goal: string
  id: string
  journey: Record<string, any>
  next_cursor: string | null
  preview?: any
  scope: Record<string, any>
  title: string
  tree: Record<string, any>
  tree_loaded?: boolean
  variant_count: number
  variants: any[]
}

export interface ProductMapJourneyLoadMatch {
  id: string
  organization_id: string
  project_id: string
  account_id?: string
  after?: string
  area?: string
  before?: string
  include_tree?: boolean
  persona_id?: string
  query?: string
  revision_id?: string
  since?: string
  variant_id?: string
}

export interface ProductMapJourneyListMatch {
  organization_id: string
  project_id: string
  account_id?: string
  after?: string
  area?: string
  before?: string
  include_coverage?: boolean
  journey_query?: string
  persona_id?: string
  query?: string
  revision_id?: string
  since?: string
}

export interface ProductMapJourneyReplay {
  actor_id: string | null
  can_request_qualification: boolean
  created_at: string
  failure_code: string | null
  failure_message: string | null
  id: string
  preparation_receipt: Record<string, any> | null
  qualification: any
  qualification_status: string
  replay_required: boolean
  review_reason: string
  run_id: string | null
  scenario_run_id: string | null
  source_digest: string
  status: string
  updated_at: string
  variant_id: string
}

export interface ProductMapJourneyReplayLoadMatch {
  id: string
  organization_id: string
  project_id: string
}

export interface ProductMapJourneyReplayCreateData {
  id: string
  organization_id: string
  project_id: string

  // Selects a custom action instead of the plain create:
  //   'qualification'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface ProductMapObservation {
  capture: Record<string, any>
  events: any[]
  evidence_id: string
  id?: string
  observation_id: string
  scope: Record<string, any>
  state: any
  status: string
}

export interface ProductMapObservationLoadMatch {
  id: string
  organization_id: string
  project_id: string
  account_id?: string
  area?: string
  before?: string
  persona_id?: string
  query?: string
  revision_id?: string
  since?: string

  // Selects a custom action instead of the plain load:
  //   'identity_history'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface ProductMapQuestion {
  account_id?: string
  area?: string
  before?: string
  claims: any[]
  evidence_truncated: boolean
  model: string
  persona_id?: string
  query?: string
  question: string
  reasoning_effort: string
  revision_id?: string
  scope: Record<string, any>
  since?: string
  state_id?: string
  status: string
  unknowns: any[]
}

export interface ProductMapQuestionCreateData {
  organization_id: string
  project_id: string
  account_id?: string
  area?: string
  before?: string
  persona_id?: string
  query?: string
  question: string
  revision_id?: string
  since?: string
  state_id?: string
}

export interface ProductMapState {
  account_id: string | null
  attempts: any[]
  captured_at: string
  id: string
  incoming: any[]
  labels: Record<string, any>
  layout: Record<string, any>
  observation_id: string
  omitted_controls: number
  outgoing: any[]
  revision_id: string
  scope: Record<string, any>
  screenshot_url: string | null
  state: Record<string, any>
  truncated: boolean
  url: string
}

export interface ProductMapStateLoadMatch {
  id: string
  organization_id: string
  project_id: string
  account_id?: string
  area?: string
  before?: string
  include_connection?: boolean
  observation_id?: string
  persona_id?: string
  query?: string
  revision_id?: string
  since?: string
}

export interface ProductMapStateListMatch {
  organization_id: string
  project_id: string
  account_id?: string
  after?: string
  area?: string
  before?: string
  persona_id?: string
  query?: string
  revision_id?: string
  since?: string
}

export interface Project {
  archived_at: string | null
  context: string | null
  created_at: string
  credentials: any[]
  demo: boolean
  documentation_urls: any[]
  environments: any[]
  execution_mode: string
  icon_url: string | null
  id: string
  identity_provider: Record<string, any>
  lock_version: number
  name: string
  network_connections: any[]
  organization_id: string
  overview: Record<string, any>
  permissions: Record<string, any>
  personas: any[]
  project: Record<string, any>
  pull_request_options: Record<string, any>
  pull_requests: any[]
  purpose: string | null
  runs: any[]
  scenario_history: Record<string, any>
  scenario_states: Record<string, any>
  scenarios: any[]
  setup_required?: boolean
  slug: string
  updated_at: string
  verifier_preferences: Record<string, any>
  version: number
  website_url: string | null
}

export interface ProjectLoadMatch {
  id: string
  organization_id: string
  overview?: boolean
  page?: number
  query?: string
  scenario_id?: string
  status?: string
  verify_environment_id?: string
  view?: string

  // Selects a custom action instead of the plain load:
  //   'environment' | 'header' | 'overview' | 'overview_activity' | 'overview_discovery' | 'overview_history' | 'persona' | 'pr_testing' | 'product_map' | 'product_map_comparison' | 'recorder' | 'scenario' | 'scenario_editor'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface ProjectListMatch {
  organization_id: string
}

export interface ProjectCreateData {
  organization_id: string
  context?: string | null
  documentation_urls?: any[]
  execution_mode?: string
  name: string
  purpose?: string | null
  slug?: string
  verifier_preferences?: Record<string, any>
  website_url?: string | null

  // Selects a custom action instead of the plain create:
  //   'archive' | 'discovery'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface ProjectUpdateData {
  id: string
  organization_id: string
  context?: string | null
  documentation_urls?: any[]
  execution_mode?: string
  name?: string
  purpose?: string | null
  slug?: string
  verifier_preferences?: Record<string, any>
  version?: number
  website_url?: string | null

  // Selects a custom action instead of the plain update:
  //   'icon_image'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface ProjectPatchData {
  id: string
  organization_id: string
  context?: string | null
  documentation_urls?: any[]
  execution_mode?: string
  name?: string
  purpose?: string | null
  slug?: string
  verifier_preferences?: Record<string, any>
  version?: number
  website_url?: string | null
}

export interface ProjectAndroidApk {
  android: Record<string, any>
  artifact_paths?: any[]
  description: string
  image: string
  ios: Record<string, any>
  launch_command?: string
  managed_binary: Record<string, any>
  platform?: string
  provider?: string
  setup_command?: string
}

export interface ProjectAndroidApkCreateData {
  organization_id: string
  project_id: string
}

export interface ProjectCodeMap {
  can_scan: boolean
  commit_sha: string
  configured: boolean
  error_code: string | null
  id: string
  name: string
  ref?: string
  repository_id: string
  revision: Record<string, any>
  slug: string
  status: string
}

export interface ProjectCodeMapListMatch {
  organization_id: string
  project_id: string
  ref?: string
  repository_id?: string
}

export interface ProjectCodeMapCreateData {
  organization_id: string
  project_id: string
  ref?: string
  repository_id: string

  // Selects a custom action instead of the plain create:
  //   'session'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface ProjectEnvironment {
  allowed_actions: string
  allowed_origins: any[]
  archived_at: string | null
  base_url: string | null
  base_url_changeable: boolean
  binary?: string
  conversation_only_messaging: boolean
  created_at: string
  desktop: Record<string, any> | null
  execution_mode: string
  id: string
  imessage_number: string | null
  kind: string
  lock_version: number
  messaging_conversation: any
  messaging_problem: string | null
  messaging_source: any
  messaging_tester_number: string | null
  name: string
  project_id: string
  pull_request: Record<string, any> | null
  source_branch: string | null
  updated_at: string
  verify_network_connection_id: string | null
  version: number
}

export interface ProjectEnvironmentLoadMatch {
  id: string
  organization_id: string
  project_id: string

  // Selects a custom action instead of the plain load:
  //   'directory'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface ProjectEnvironmentListMatch {
  organization_id: string
  project_id: string
}

export interface ProjectEnvironmentCreateData {
  organization_id: string
  project_id: string
  allowed_actions?: string
  allowed_origins?: any[]
  base_url?: string | null
  binary?: string
  desktop?: Record<string, any> | null
  imessage_number?: string | null
  kind?: string
  messaging_tester_number?: string | null
  name: string

  // Selects a custom action instead of the plain create:
  //   'archive'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface ProjectEnvironmentUpdateData {
  id: string
  organization_id: string
  project_id: string
  allowed_actions?: string
  allowed_origins?: any[]
  base_url?: string | null
  binary?: string
  imessage_number?: string | null
  kind?: string
  messaging_tester_number?: string | null
  name?: string
  verify_network_connection_id?: string | null
  version?: number
}

export interface ProjectEnvironmentPatchData {
  id: string
  organization_id: string
  project_id: string
  allowed_actions?: string
  allowed_origins?: any[]
  base_url?: string | null
  binary?: string
  imessage_number?: string | null
  kind?: string
  messaging_tester_number?: string | null
  name?: string
  verify_network_connection_id?: string | null
  version?: number
}

export interface ProjectFinding {
  deferred_until?: string | null
  environment_name: string
  id: string
  last_seen_at: string
  locked: boolean
  severity: string
  source: string
  source_title: string
  status: string
  title: string
  verification: any
  web_path: string
}

export interface ProjectFindingListMatch {
  organization_id: string
  project_id: string
  page?: number
  priority?: string
  query?: string
  run_id?: string
  source?: string
  state?: string
}

export interface ProjectFixture {
  assignments: any[]
  byte_size: number
  content_type: string
  credential_ids: any[]
  credentials: any[]
  environment_ids: any[]
  environments: any[]
  fixtures: any[]
  id?: string
  lock_version: number
  name: string
  pagination: Record<string, any>
  permissions: Record<string, any>
  persona_ids: any[]
  personas: any[]
  project: Record<string, any>
  sha256: string
  url: string
  version: number
}

export interface ProjectFixtureLoadMatch {
  id: string
  organization_id: string
  project_id: string
}

export interface ProjectFixtureListMatch {
  organization_id: string
  project_id: string
  credential_id?: string
  environment_id?: string
  page?: number
  persona_id?: string
  q?: string
}

export interface ProjectFixtureCreateData {
  organization_id: string
  project_id: string
}

export interface ProjectFixtureUpdateData {
  id: string
  organization_id: string
  project_id: string
  credential_ids?: any[]
  environment_ids?: any[]
  name?: string
  persona_ids?: any[]
  version?: number
}

export interface ProjectFixturePatchData {
  id: string
  organization_id: string
  project_id: string
  credential_ids?: any[]
  environment_ids?: any[]
  name?: string
  persona_ids?: any[]
  version?: number
}

export interface ProjectFixtureRemoveMatch {
  id: string
  organization_id: string
  project_id: string
  version: number
}

export interface ProjectIosApp {
  android: Record<string, any>
  artifact_paths?: any[]
  description: string
  image: string
  ios: Record<string, any>
  launch_command?: string
  managed_binary: Record<string, any>
  platform?: string
  provider?: string
  setup_command?: string
}

export interface ProjectIosAppCreateData {
  organization_id: string
  project_id: string
}

export interface ProjectMessagingConversation {
  assistant_number: string
  attachment_limit: number
  attachment_max_bytes: number
  environment_name: string
  id: string
  leased: boolean
  messages: any[]
  reconciled_at: string | null
  retirable: boolean
  seeded: boolean
  send_blocked_reason: string | null
  send_disposition?: string
  send_error?: string | null
  tester_number: string
  unknown_send: boolean
  verify_environment_id: string
}

export interface ProjectMessagingConversationLoadMatch {
  id: string
  organization_id: string
  project_id: string
}

export interface ProjectMessagingConversationCreateData {
  organization_id: string
  project_id: string
  assistant_number: string
  tester_number: string
  verify_environment_id: string

  // Selects a custom action instead of the plain create:
  //   'mark_read' | 'retire' | 'typing'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface ProjectMessagingConversationUpdateData {
  id: string
  organization_id: string
  project_id: string
  assistant_number?: string
  tester_number?: string
}

export interface ProjectMessagingConversationPatchData {
  id: string
  organization_id: string
  project_id: string
  assistant_number?: string
  tester_number?: string
}

export interface ProjectOverviewMetric {
  counts: Record<string, any>
}

export interface ProjectOverviewMetricListMatch {
  organization_id: string
  project_id: string
}

export interface ProjectOverviewPullRequest {
  base_sha: string
  can_verify: boolean
  comment_url: string | null
  draft: boolean
  github_repository: string | null
  github_url: string | null
  head_sha: string
  id: string
  latest_created_at: string | null
  latest_current: boolean
  latest_head_sha: string | null
  latest_reason: string | null
  latest_run_id: string | null
  latest_state: string | null
  number: number
  project_id: string | null
  project_slug: string | null
  provider: string
  repository_id: string
  request_label: string
  source_branch: string | null
  source_repository: string | null
  source_url: string | null
  state: string
  title: string
  updated_at: string
  web_path: string
}

export interface ProjectOverviewPullRequestListMatch {
  organization_id: string
  project_id: string
}

export interface ProjectProductMap {
}

export interface ProjectProductMapLoadMatch {
  organization_id: string
  project_id: string
  account_id?: string
  area?: string
  before?: string
  persona_id?: string
  query?: string
  revision_id?: string
  since?: string
  source?: string
  target?: string
  compare_revision_id?: string
  after?: string
  view_id?: string

  // Selects a custom action instead of the plain load:
  //   'brief' | 'compare' | 'frontier' | 'overview' | 'path' | 'version'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface ProjectProductMapCreateData {
  organization_id: string
  project_id: string

  // Selects a custom action instead of the plain create:
  //   'overview'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface ProjectRecording {
  browser: Record<string, any>
  created_at: string
  draft: any
  environment_id: string
  error: string | null
  event_count: number
  id: string
  persona_id: string
  phase: string
  signed_in_during_recording: boolean
  start_path?: string
  status: string
  updated_at: string
}

export interface ProjectRecordingLoadMatch {
  id: string
  organization_id: string
  project_id: string
}

export interface ProjectRecordingCreateData {
  organization_id: string
  project_id: string
  environment_id: string
  persona_id: string
  start_path?: string

  // Selects a custom action instead of the plain create:
  //   'finish' | 'redraft'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface ProjectRecordingRemoveMatch {
  id: string
  organization_id: string
  project_id: string
}

export interface ProjectRunPlan {
  archived_at: string | null
  base_url: string | null
  created_at: string
  dependencies: any[]
  id: string
  identity_probe: Record<string, any> | null
  kind: string | null
  lock_version: number
  name: string
  nodes: any[]
  preview: any
  project_id: string
  updated_at: string
  version: number
}

export interface ProjectRunPlanLoadMatch {
  id: string
  organization_id: string
  project_id: string
}

export interface ProjectRunPlanListMatch {
  organization_id: string
  project_id: string
  page?: number
}

export interface ProjectRunPlanCreateData {
  organization_id: string
  project_id: string
  dependencies: any[]
  identity_probe: Record<string, any> | null
  name: string
  nodes: any[]

  // Selects a custom action instead of the plain create:
  //   'archive'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface ProjectRunPlanUpdateData {
  id: string
  organization_id: string
  project_id: string
  dependencies?: any[]
  identity_probe?: Record<string, any> | null
  name?: string
  nodes?: any[]
  version?: number
}

export interface ProjectRunPlanPatchData {
  id: string
  organization_id: string
  project_id: string
  dependencies?: any[]
  identity_probe?: Record<string, any> | null
  name?: string
  nodes?: any[]
  version?: number
}

export interface ProjectRunSchedule {
  credential_ids: Record<string, any>
  cron_expression?: string | null
  environment_id: string
  environment_name?: string
  history: any[]
  id: string
  labels: any[]
  lock_version: number
  name: string
  next_run_at: string
  notification_channel?: string
  scenario_count: number
  selection_mode: string
  slack_subscription_id?: string | null
  source_scenario_id?: string | null
  state: string
  time_of_day: string
  time_zone: string
  version: number
}

export interface ProjectRunScheduleLoadMatch {
  id: string
  organization_id: string
  project_id: string

  // Selects a custom action instead of the plain load:
  //   'lookup'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface ProjectRunScheduleListMatch {
  organization_id: string
  project_id: string
}

export interface ProjectRunScheduleCreateData {
  organization_id: string
  project_id: string
  credential_ids: Record<string, any>
  environment_id: string
  labels: any[]
  name: string
  notification_channel?: string
  selection_mode: string
  slack_subscription_id?: string | null
  state: string
  time_of_day: string
  time_zone: string

  // Selects a custom action instead of the plain create:
  //   'preview'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface ProjectRunScheduleUpdateData {
  id: string
  organization_id: string
  project_id: string
  credential_ids?: Record<string, any>
  environment_id?: string
  labels?: any[]
  name?: string
  notification_channel?: string
  selection_mode?: string
  slack_subscription_id?: string | null
  state?: string
  time_of_day?: string
  time_zone?: string
  version?: number
}

export interface ProjectRunSchedulePatchData {
  id: string
  organization_id: string
  project_id: string
  credential_ids?: Record<string, any>
  environment_id?: string
  labels?: any[]
  name?: string
  notification_channel?: string
  selection_mode?: string
  slack_subscription_id?: string | null
  state?: string
  time_of_day?: string
  time_zone?: string
  version?: number
}

export interface ProjectScenarioOption {
  environments: any[]
  permissions: Record<string, any>
  personas: any[]
  project: Record<string, any>
  scenario_states: Record<string, any>
  scenarios: any[]
  schedule_options?: any
  schedules?: any[]
}

export interface ProjectScenarioOptionListMatch {
  organization_id: string
  project_id: string
}

export interface ProjectScenarioRow {
  actor_count: number
  dependency_count: number
  health: Record<string, any>
  id: string
  labels: any[]
  name: string
  persona_id: string
  selectable_for_run: boolean
  step_count: number
}

export interface ProjectScenarioRowListMatch {
  organization_id: string
  project_id: string
  page?: number
  sort?: string
  state?: string
}

export interface ProjectSetting {
  available_messaging_environments: any[]
  messaging_conversations: any[]
  messaging_enabled: boolean
  permissions: Record<string, any>
  project: Record<string, any>
  tester_numbers: any[]
}

export interface ProjectSettingListMatch {
  organization_id: string
  project_id: string
}

export interface PullRequest {
  available_tests: any[]
  branch?: string
  cleanup_only?: boolean
  current_run?: any
  findings: any[]
  head_sha?: string
  id?: string
  idempotency_key: string
  imessage_number?: string
  number?: number
  pagination: Record<string, any>
  permissions: Record<string, any>
  preview_cleanup_ready: boolean
  preview_url?: string | null
  project?: any
  project_id?: string
  pull_request: Record<string, any>
  repository_id?: string
  runs: any[]
}

export interface PullRequestLoadMatch {
  id: string
  organization_id: string
  page?: number

  // Selects a custom action instead of the plain load:
  //   'lookup'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface PullRequestCreateData {
  organization_id: string
  branch?: string
  cleanup_only?: boolean
  head_sha?: string
  idempotency_key: string
  imessage_number?: string
  number?: number
  preview_url?: string | null
  project_id?: string
  repository_id?: string

  // Selects a custom action instead of the plain create:
  //   'demo_share' | 'preview' | 'rerun'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface PullRequestRemoveMatch {
  id: string
  organization_id: string

  // Selects a custom action instead of the plain remove:
  //   'demo_share'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface PullRequestSetting {
  app_preview_profile_id?: string | null
  app_service_id?: string | null
  bots: any[]
  browser_options_available: boolean
  ci_preview: Record<string, any> | null
  concurrency?: number
  configured_repository: any
  demo_videos: boolean
  demo_videos_enabled?: boolean
  deployment: string | null
  deployment_environment?: string
  enabled: boolean
  environment: string
  environments: any[]
  github_check_enabled?: boolean
  hosting_presets: any[]
  id: string
  imessage_comment_prefix: string | null
  imessage_number: string | null
  imessage_number_source: string
  limits: Record<string, any>
  link_pattern: string | null
  links: string | null
  max_seconds?: number
  messaging_enabled: boolean
  messaging_tester_number: string | null
  non_product_paths?: any[]
  permissions: Record<string, any>
  pr_check: boolean
  preview_access?: string
  preview_comment_authors?: any[]
  preview_comment_pattern?: string
  preview_comment_wildcard: string | null
  preview_profile: string | null
  preview_profiles: any[]
  previews: string
  project_id: string
  project_repositories: any[]
  provider: string
  repositories: any[]
  repository: string
  repository_id: string
  repository_kind: string
  selected_repository: any
  service: string | null
  settings: any[]
  setup: any
  setup_defaults: Record<string, any>
  source_repository: string
  target_mode: string
  tester_numbers: any[]
  trigger_label: string
  trigger_on_comment?: boolean
  trigger_on_label?: boolean
  trigger_on_push?: boolean
  trigger_on_ready?: boolean
  triggers: Record<string, any>
  verify_environment_id: string
  write_scenarios: boolean
}

export interface PullRequestSettingListMatch {
  organization_id: string
  project_id?: string
  provider?: string
  repository_id?: string
}

export interface PullRequestSettingCreateData {
  organization_id: string
  app_preview_profile_id?: string | null
  app_service_id?: string | null
  bots: any[]
  concurrency?: number
  demo_videos: boolean
  demo_videos_enabled?: boolean
  deployment: string | null
  deployment_environment?: string
  enabled: boolean
  environment: string
  github_check_enabled?: boolean
  imessage_comment_prefix: string | null
  imessage_number: string | null
  imessage_number_source: string
  limits: Record<string, any>
  link_pattern: string | null
  links: string | null
  max_seconds?: number
  messaging_tester_number: string | null
  non_product_paths?: any[]
  pr_check: boolean
  preview_access?: string
  preview_comment_authors?: any[]
  preview_comment_pattern?: string
  preview_comment_wildcard: string | null
  preview_profile: string | null
  previews: string
  project_id: string
  provider: string
  repository: string
  repository_id: string
  repository_kind: string
  service: string | null
  target_mode: string
  trigger_label: string
  trigger_on_comment?: boolean
  trigger_on_label?: boolean
  trigger_on_push?: boolean
  trigger_on_ready?: boolean
  triggers: Record<string, any>
  verify_environment_id: string
  write_scenarios: boolean

  // Selects a custom action instead of the plain create:
  //   'detect_preview'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface PullRequestSettingAddRepository {
  project_id: string
  replace?: boolean
  repositories: any[]
}

export interface PullRequestSettingAddRepositoryCreateData {
  organization_id: string
  project_id: string
  replace?: boolean
  repositories: any[]
}

export interface PullRequestSettingDetectComment {
  bots?: any[]
  deployment?: string
  example_url?: string
  imessage_comment_prefix?: string
  imessage_number?: string | null
  kind: string
  link_pattern?: string
  project_id: string
  provider?: string
  repository_id?: string
  request_number?: number
}

export interface PullRequestSettingDetectCommentCreateData {
  organization_id: string
  project_id: string
  repository_id?: string
}

export interface Recorder {
  id: string
  name: string
  slug: string
}

export interface RecorderLoadMatch {
  organization_id: string
}

export interface Registry {
}

export interface RegistryLoadMatch {

  // Selects a custom action instead of the plain load:
  //   'namespace'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface RegistryV2 {
}

export interface RegistryV2CreateData {

  // Selects a custom action instead of the plain create:
  //   'authorize'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface RelayAgentLocalThread {
  id?: string
}

export interface RelayAgentLocalThreadRemoveMatch {
  agent_id: string
  id: string
  organization_id: string
}

export interface ReportReplay {
  agent_id: string
  generated_at: string
  id?: string
  recording: Record<string, any>
  replay_steps: any[]
}

export interface ReportReplayLoadMatch {
  exploration_id: string
  id: string
  organization_id: string
  generated_at?: string
  project_id?: string
}

export interface ReportScenario {
  environment_name: string
  goal: string
  id: string
  mode: string
  permissions: Record<string, any>
  project_id: string | null
  related_explorations: any[]
  report: Record<string, any>
  saves_scenarios: boolean
  scenario_generation: Record<string, any>
  status: string
}

export interface ReportScenarioCreateData {
  exploration_id: string
  organization_id: string
  project_id?: string
}

export interface RunScenarioRun {
  id?: string
}

export interface RunScenarioRunLoadMatch {
  id: string
  organization_id: string
  project_id: string
  run_id: string

  // Selects a custom action instead of the plain load:
  //   'live_frame' | 'scenario_edit'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface RunScenarioRunUpdateData {
  id: string
  organization_id: string
  project_id: string
  run_id: string
  outcomes?: any
  steps?: any
  version?: any

  // Selects a custom action instead of the plain update:
  //   'scenario_edit'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface RunScheduleOption {
  id: string
  name: string
}

export interface RunScheduleOptionListMatch {
  organization_id: string
  project_id: string
}

export interface RunSearch {
  runs: any[]
}

export interface RunSearchLoadMatch {
  organization_id: string
  query?: string
}

export interface RunUpdate {
  base_sha: string
  can_verify: boolean
  comment_url: string | null
  draft: boolean
  github_repository: string | null
  github_url: string | null
  head_sha: string
  id: string
  latest_created_at: string | null
  latest_current: boolean
  latest_head_sha: string | null
  latest_reason: string | null
  latest_run_id: string | null
  latest_state: string | null
  number: number
  project_id: string | null
  project_slug: string | null
  provider: string
  repository_id: string
  request_label: string
  source_branch: string | null
  source_repository: string | null
  source_url: string | null
  state: string
  title: string
  updated_at: string
  web_path: string
}

export interface RunUpdateListMatch {
  organization_id: string
  page?: number
  query?: string
  status?: string
  verify_environment_id?: string
}

export interface ScenarioRevision {
  action: string
  batch: string
  created_at: string
  definition: Record<string, any>
  id: string
  source: string
  user: any
  version: number
}

export interface ScenarioRevisionListMatch {
  organization_id: string
  project_id: string
  scenario_id: string
  page?: number
}

export interface ScenarioRunLesson {
  finding: string
  title?: string
  workaround: string
}

export interface ScenarioRunLessonCreateData {
  organization_id: string
  project_id: string
  run_id: string
  scenario_run_id: string
  finding: string
  title?: string
  workaround: string
}

export interface ScenarioRunScenarioEdit {
}

export interface ScenarioRunScenarioEditCreateData {
  organization_id: string
  project_id: string
  run_id: string
  scenario_run_id: string
  idempotency_key?: any
  outcomes?: any
  prompt?: any
  steps?: any
  version?: any
  viewer_time_zone?: any

  // Selects a custom action instead of the plain create:
  //   'run' | 'suggest' | 'validate'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface ServiceEndpoint {
  id?: string
}

export interface ServiceEndpointLoadMatch {
  app_id: string
  id: string
  service_id: string
}

export interface ServiceEndpointListMatch {
  app_id: string
  service_id: string
}

export interface ServiceEndpointCreateData {
  app_id: string
  service_id: string
}

export interface ServiceEndpointUpdateData {
  app_id: string
  id: string
  service_id: string
}

export interface ServiceEndpointPatchData {
  app_id: string
  id: string
  service_id: string
}

export interface ServiceEndpointRemoveMatch {
  app_id: string
  id: string
  service_id: string
}

export interface SitePreview {
  icon_data_url: string | null
  title: string | null
  url: string
}

export interface SitePreviewLoadMatch {
  organization_id: string
  url: string
}

export interface SlackChannel {
  id: string
  is_member: boolean
  is_private: boolean
  is_slack_connect: boolean
  name: string
  published: boolean
}

export interface SlackChannelListMatch {
  agent_id: string
  organization_id: string
  cursor?: string
  kind?: string
  q?: string
  refresh?: boolean
}

export interface SparkAgentLocalThread {
  action: string
  archived: boolean
  can_archive: boolean
  can_disconnect_relay?: boolean
  can_end: boolean
  can_interrupt: boolean
  can_send: boolean
  created_at: string
  delivery: Record<string, any>
  device_id: string
  device_name: string
  diagnostic_code?: string
  end: any
  expires_at: string
  full_title: string
  id: string
  key: string
  last_activity_at: string | null
  native_thread_id: string
  parent_conversation_id: string | null
  provider: string
  references: Record<string, any>
  relay_disconnected_at?: string | null
  relay_participant: Record<string, any>
  result: any
  result_expired: boolean
  result_schema?: Record<string, any> | boolean
  section: string
  state: string
  status: string | null
  task_configured: boolean
  thread_id: string
  title: string
}

export interface SparkAgentLocalThreadLoadMatch {
  agent_id: string
  id: string
  organization_id: string

  // Selects a custom action instead of the plain load:
  //   'delivery_policy' | 'task'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface SparkAgentLocalThreadCreateData {
  agent_id: string
  organization_id: string
  device_id: string
  key: string
  provider: string
  result_schema?: Record<string, any> | boolean
  thread_id: string
}

export interface SparkAgentLocalThreadUpdateData {
  agent_id: string
  id: string
  organization_id: string
  allowed_senders?: any
  ask_first?: any
  expected_version?: any
  reply_with_final_answer?: any
  restricted?: any

  // Selects a custom action instead of the plain update:
  //   'delivery_policy'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface StaticSite {
  active_deployment_id: string | null
  cdn_hostname: string
  cdn_url: string
  cname_target: string
  created_at: string
  default_url: string
  description: string | null
  error_document: string | null
  failure_message: string | null
  hosted_app_id: string | null
  id: string
  index_document: string
  name: string
  organization_id: string
  provisioned: boolean
  provisioned_at: string | null
  region: string | null
  replication_regions: any[]
  repository_id: string | null
  slug: string
  status: string
  updated_at: string
}

export interface StaticSiteLoadMatch {
  id: string
}

export interface StaticSiteListMatch {
  organization_id: string
}

export interface StaticSiteCreateData {
  organization_id: string
  description?: string | null
  error_document?: string | null
  hosted_app_id?: string | null
  index_document?: string
  name: string
  region?: string | null
  replication_regions?: any[]
  repository_id?: string | null
  slug: string

  // Selects a custom action instead of the plain create:
  //   'provision'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface StaticSiteUpdateData {
  id: string
}

export interface StaticSitePatchData {
  id: string
}

export interface StaticSiteRemoveMatch {
  id: string
}

export interface StaticSiteDeployment {
  activated_at: string | null
  activated_at_label: string | null
  commit_sha: string | null
  created_at: string
  created_at_label: string | null
  creator_user_id: string | null
  deploy_slug: string
  failure_message: string | null
  file_count: number
  file_count_label: string
  finished_at: string | null
  finished_at_label: string | null
  id: string
  is_active: boolean
  source_ref: string | null
  started_at: string | null
  started_at_label: string | null
  static_site_id: string
  status: string
  total_bytes: number
  total_bytes_label: string
  trigger_kind: string
  updated_at: string
  updated_at_label: string | null
  uploaded_at: string | null
  uploaded_at_label: string | null
}

export interface StaticSiteDeploymentLoadMatch {
  id: string
  static_site_id: string
}

export interface StaticSiteDeploymentListMatch {
  static_site_id: string
}

export interface StaticSiteDeploymentCreateData {
  static_site_id: string

  // Selects a custom action instead of the plain create:
  //   'activate' | 'cancel' | 'finalize'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface StaticSiteDomain {
  app_environment_id: string | null
  app_service_id: string | null
  created_at: string
  dns_mode: string
  dns_status: string
  failure_message: string | null
  hosted_app_id: string | null
  hostname: string
  id: string
  kind: string
  last_checked_at: string | null
  record_name: string | null
  record_type: string | null
  record_value: string | null
  redirect_to: string | null
  static_site_id: string | null
  target_kind: string
  tls_status: string
  updated_at: string
  verification_status: string
}

export interface StaticSiteDomainLoadMatch {
  id: string
  static_site_id: string
}

export interface StaticSiteDomainListMatch {
  static_site_id: string
}

export interface StaticSiteDomainCreateData {
  static_site_id: string
  dns_mode?: string
  hostname: string
  kind?: string
  redirect_to?: string | null

  // Selects a custom action instead of the plain create:
  //   'provision'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface StaticSiteDomainUpdateData {
  id: string
  static_site_id: string
}

export interface StaticSiteDomainPatchData {
  id: string
  static_site_id: string
}

export interface StaticSiteDomainRemoveMatch {
  id: string
  static_site_id: string
}

export interface SubscriptionModel {
  default_reasoning?: string
  id: string
  name: string
  provider: string
  reasoning?: any[]
  speeds?: any[]
}

export interface SubscriptionModelListMatch {
  agent_id: string
  organization_id: string
  profile_id: string
}

export interface ThreadPreview {
  expires_at: string | null
  port: number
  url: string
}

export interface ThreadPreviewCreateData {
  agent_id: string
  organization_id: string
  thread_id: string
  port: number
}

export interface VerificationProjectCredential {
  browser_authentication?: Record<string, any> | null
  browser_session?: string
  composal_address: string | null
  composal_inbox?: boolean
  composal_inbox_user?: string
  composal_managed_google?: boolean
  configured: boolean
  cookies?: string
  credential_keys: Record<string, any>
  description: string | null
  email_link_auth_origins: any[]
  has_inbox: boolean
  id: string
  identity_provider: Record<string, any> | null
  instructions: string | null
  login_method: string
  login_url: string
  managed: boolean
  mfa_enabled: boolean
  name: string
  oidc?: Record<string, any>
  passkey?: string
  password?: string
  project_id: string
  provider_guidance: string
  remove_browser_authentication?: boolean
  remove_totp?: boolean
  sign_in_verified: boolean
  sign_in_verified_at: string | null
  status: string
  totp_secret?: string
  updated_at: string
  username: string
}

export interface VerificationProjectCredentialLoadMatch {
  id: string
  organization_id: string
  project_id: string

  // Selects a custom action instead of the plain load:
  //   'inbox'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface VerificationProjectCredentialListMatch {
  organization_id: string
  project_id: string
}

export interface VerificationProjectCredentialCreateData {
  organization_id: string
  project_id: string
  browser_session?: string
  composal_inbox?: boolean
  composal_inbox_user?: string
  composal_managed_google?: boolean
  cookies?: string
  description?: string | null
  email_link_auth_origins?: any[]
  instructions?: string | null
  login_method: string
  login_url?: string
  name: string
  oidc?: Record<string, any>
  passkey?: string
  password?: string
  remove_browser_authentication?: boolean
  remove_totp?: boolean
  totp_secret?: string
  username?: string

  // Selects a custom action instead of the plain create:
  //   'disable'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface VerificationProjectCredentialUpdateData {
  id: string
  organization_id: string
  project_id: string
  browser_session?: string
  composal_inbox?: boolean
  composal_inbox_user?: string
  composal_managed_google?: boolean
  cookies?: string
  description?: string | null
  email_link_auth_origins?: any[]
  instructions?: string | null
  login_method?: string
  login_url?: string
  name?: string
  oidc?: Record<string, any>
  passkey?: string
  password?: string
  remove_browser_authentication?: boolean
  remove_totp?: boolean
  totp_secret?: string
  username?: string
}

export interface VerificationProjectCredentialPatchData {
  id: string
  organization_id: string
  project_id: string
  browser_session?: string
  composal_inbox?: boolean
  composal_inbox_user?: string
  composal_managed_google?: boolean
  cookies?: string
  description?: string | null
  email_link_auth_origins?: any[]
  instructions?: string | null
  login_method?: string
  login_url?: string
  name?: string
  oidc?: Record<string, any>
  passkey?: string
  password?: string
  remove_browser_authentication?: boolean
  remove_totp?: boolean
  totp_secret?: string
  username?: string
}

export interface VerificationProjectCredentialRemoveMatch {
  id: string
  organization_id: string
  project_id: string
  permanent?: boolean
}

export interface VerificationProjectPersona {
  access_mode: string
  archived_at: string | null
  capabilities: string | null
  created_at: string
  credential_id: string | null
  goals: string | null
  id: string
  lock_version: number
  name: string
  project_id: string
  role: string
  updated_at: string
  version: number
}

export interface VerificationProjectPersonaLoadMatch {
  id: string
  organization_id: string
  project_id: string
}

export interface VerificationProjectPersonaListMatch {
  organization_id: string
  project_id: string
}

export interface VerificationProjectPersonaCreateData {
  organization_id: string
  project_id: string
  access_mode?: string
  capabilities?: string | null
  credential_id?: string | null
  goals?: string | null
  name: string
  role: string

  // Selects a custom action instead of the plain create:
  //   'archive'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface VerificationProjectPersonaUpdateData {
  id: string
  organization_id: string
  project_id: string
  access_mode?: string
  capabilities?: string | null
  credential_id?: string | null
  goals?: string | null
  name?: string
  role?: string
  version?: number
}

export interface VerificationProjectPersonaPatchData {
  id: string
  organization_id: string
  project_id: string
  access_mode?: string
  capabilities?: string | null
  credential_id?: string | null
  goals?: string | null
  name?: string
  role?: string
  version?: number
}

export interface VerificationProjectPersonaRemoveMatch {
  id: string
  organization_id: string
  project_id: string
}

export interface VerificationProjectRun {
  approved_at: string | null
  approved_digest: string | null
  archived_at: string | null
  available_tests: any[]
  can_archive: boolean
  can_restore: boolean
  can_start_another_run: boolean
  cleanup_state: string
  concurrency: number
  created_at: string
  creator_name: string | null
  definition_mode: string
  environment_id: string | null
  id: string
  lock_version: number
  max_seconds: number
  outcome: string | null
  permissions: Record<string, any>
  plan_digest: string | null
  preparation_error_code: string | null
  progress: Record<string, any>
  project: Record<string, any>
  project_id: string
  pull_request: any
  queued_at: string | null
  run: Record<string, any>
  run_plan_id?: string | null
  scenario_runs: any[]
  source_run_id: string | null
  source_versions: any[] | null
  start_when_prepared: boolean
  state: string
  target_snapshot: Record<string, any>
  title: string
  updated_at: string
  verifier_preferences_snapshot: Record<string, any>
  web_path: string
}

export interface VerificationProjectRunLoadMatch {
  id: string
  organization_id: string
  project_id: string
  diagnostic?: boolean

  // Selects a custom action instead of the plain load:
  //   'card'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface VerificationProjectRunListMatch {
  organization_id: string
  project_id: string
  page?: number
  status?: string
}

export interface VerificationProjectRunCreateData {
  id?: string
  organization_id: string
  project_id: string
  concurrency: number
  environment_id: string | null
  max_seconds: number
  run_plan_id?: string | null
  start_when_prepared: boolean
  digest?: any
  idempotency_key?: any
  mode?: any
  run_plan_version?: any
  scenario_files?: any
  scenario_ids?: any
  viewer_time_zone?: any

  // Selects a custom action instead of the plain create:
  //   'archive' | 'cancel' | 'launch' | 'prepare' | 'rerun' | 'restore'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface VerificationProjectScenario {
  actors?: Record<string, any>
  allowed_actions: string
  archived_at: string | null
  cleanup?: any[]
  created_at: string
  dependencies: any[]
  fixtures?: any[]
  health: Record<string, any>
  id: string
  identity_probe?: any
  if?: string | null
  labels: any[]
  last_revision: any
  lock_version: number
  name: string
  on?: any
  outcomes: any[]
  persona_id: string
  primary_actor?: string | null
  project_id: string
  selectable_for_run: boolean
  starting_conditions: string | null
  steps: any[]
  triggers: any[]
  updated_at: string
  version: number
}

export interface VerificationProjectScenarioLoadMatch {
  id: string
  organization_id: string
  project_id: string

  // Selects a custom action instead of the plain load:
  //   'export'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface VerificationProjectScenarioListMatch {
  organization_id: string
  project_id: string
}

export interface VerificationProjectScenarioCreateData {
  organization_id: string
  project_id: string
  actors?: Record<string, any>
  allowed_actions?: string
  cleanup?: any[]
  dependencies?: any[]
  fixtures?: any[]
  identity_probe?: any
  if?: string | null
  labels?: any[]
  name: string
  on?: any
  outcomes?: any[]
  persona_id?: string
  primary_actor?: string | null
  starting_conditions?: string | null
  steps?: any[]
  triggers?: any[]

  // Selects a custom action instead of the plain create:
  //   'archive' | 'duplicate' | 'from_exploration' | 'import'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface VerificationProjectScenarioUpdateData {
  id: string
  organization_id: string
  project_id: string
  actors?: Record<string, any>
  allowed_actions?: string
  cleanup?: any[]
  dependencies?: any[]
  fixtures?: any[]
  identity_probe?: any
  if?: string | null
  labels?: any[]
  name?: string
  on?: any
  outcomes?: any[]
  persona_id?: string
  primary_actor?: string | null
  starting_conditions?: string | null
  steps?: any[]
  triggers?: any[]
  version?: number
}

export interface VerificationProjectScenarioPatchData {
  id: string
  organization_id: string
  project_id: string
  actors?: Record<string, any>
  allowed_actions?: string
  cleanup?: any[]
  dependencies?: any[]
  fixtures?: any[]
  identity_probe?: any
  if?: string | null
  labels?: any[]
  name?: string
  on?: any
  outcomes?: any[]
  persona_id?: string
  primary_actor?: string | null
  starting_conditions?: string | null
  steps?: any[]
  triggers?: any[]
  version?: number
}

export interface VerifyAppDomain {
  id?: string
}

export interface VerifyAppDomainCreateData {
  app_id: string
  id: string
}

export interface VerifyBrowserSession {
  account_id: string
  expires_at: string
  id: string
  name?: string
  origin: string
  project_id: string
  status: string
  url: string
  viewer_url: string | null
}

export interface VerifyBrowserSessionLoadMatch {
  id: string
  organization_id: string
}

export interface VerifyBrowserSessionCreateData {
  organization_id: string
  account_id?: string
  name?: string
  project_id: string
  url: string

  // Selects a custom action instead of the plain create:
  //   'save'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface VerifyBrowserSessionRemoveMatch {
  id: string
  organization_id: string
}

export interface VerifyStaticSiteDomain {
  app_environment_id: string | null
  app_service_id: string | null
  created_at: string
  dns_mode: string
  dns_status: string
  failure_message: string | null
  hosted_app_id: string | null
  hostname: string
  id: string
  kind: string
  last_checked_at: string | null
  record_name: string | null
  record_type: string | null
  record_value: string | null
  redirect_to: string | null
  static_site_id: string | null
  target_kind: string
  tls_status: string
  updated_at: string
  verification_status: string
}

export interface VerifyStaticSiteDomainCreateData {
  id: string
  static_site_id: string
}

export interface VersionLog {
  base_image: string
  failure_phase: string | null
  id: string
  image_digest: string | null
  image_reference: string | null
  installer_version: string
  ready_at: string | null
  receipt: Record<string, any> | null
  safe_error: string | null
  started_at: string | null
  status: string
}

export interface VersionLogListMatch {
  binary_id: string
  organization_id: string
  version_id: string
  project_id: string
}

export interface WebBotAuth {
  expires_at: string
  origin: string
  signatures: any[]
}

export interface WebBotAuthCreateData {
  origin: string
}

export interface WorkflowRunStep {
  id?: string
}

export interface WorkflowRunStepLoadMatch {
  agent_id: string
  id: string
  organization_id: string
  workflow_run_id: string

  // Selects a custom action instead of the plain load:
  //   'output'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface WorkflowRunStopNotice {
}

export interface WorkflowRunStopNoticeCreateData {
  agent_id: string
  organization_id: string
  workflow_run_id: string

  // Selects a custom action instead of the plain create:
  //   'dismissal'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface WorkflowTriggerSkipped {
  id?: string
}

export interface WorkflowTriggerSkippedCreateData {
  agent_id: string
  id: string
  organization_id: string
  workflow_trigger_id: string

  // Selects a custom action instead of the plain create:
  //   'run'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

