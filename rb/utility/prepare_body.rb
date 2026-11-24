# Composal SDK utility: prepare_body
require_relative 'media'
module ComposalUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return ComposalUtilities.raw_body(ctx.reqdata) if ComposalUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
