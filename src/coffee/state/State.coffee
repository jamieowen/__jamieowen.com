StateContainer = require "state/StateContainer"

class State extends StateContainer
  constructor:()->
    super()

    @id = null

    # signals
    @onOpen = null
    @onClose = null
    @onOpened = null
    @onClosed = null
    @onRequest = null




