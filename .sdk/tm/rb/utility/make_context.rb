# Composal SDK utility: make_context
require_relative '../core/context'
module ComposalUtilities
  MakeContext = ->(ctxmap, basectx) {
    ComposalContext.new(ctxmap, basectx)
  }
end
