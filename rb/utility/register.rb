# Composal SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

ComposalUtility.registrar = ->(u) {
  u.clean = ComposalUtilities::Clean
  u.clean_add = ComposalUtilities::CleanAdd
  u.clean_explain = ComposalUtilities::CleanExplain
  u.done = ComposalUtilities::Done
  u.make_error = ComposalUtilities::MakeError
  u.feature_add = ComposalUtilities::FeatureAdd
  u.feature_hook = ComposalUtilities::FeatureHook
  u.feature_init = ComposalUtilities::FeatureInit
  u.fetcher = ComposalUtilities::Fetcher
  u.make_fetch_def = ComposalUtilities::MakeFetchDef
  u.make_context = ComposalUtilities::MakeContext
  u.make_options = ComposalUtilities::MakeOptions
  u.make_request = ComposalUtilities::MakeRequest
  u.make_response = ComposalUtilities::MakeResponse
  u.make_result = ComposalUtilities::MakeResult
  u.make_point = ComposalUtilities::MakePoint
  u.make_spec = ComposalUtilities::MakeSpec
  u.make_url = ComposalUtilities::MakeUrl
  u.param = ComposalUtilities::Param
  u.prepare_auth = ComposalUtilities::PrepareAuth
  u.prepare_body = ComposalUtilities::PrepareBody
  u.prepare_headers = ComposalUtilities::PrepareHeaders
  u.prepare_method = ComposalUtilities::PrepareMethod
  u.prepare_params = ComposalUtilities::PrepareParams
  u.prepare_path = ComposalUtilities::PreparePath
  u.prepare_query = ComposalUtilities::PrepareQuery
  u.graphql_body = ComposalUtilities::GraphqlBody
  u.graphql_errors = ComposalUtilities::GraphqlErrors
  u.result_basic = ComposalUtilities::ResultBasic
  u.result_body = ComposalUtilities::ResultBody
  u.result_headers = ComposalUtilities::ResultHeaders
  u.transform_request = ComposalUtilities::TransformRequest
  u.transform_response = ComposalUtilities::TransformResponse
}
