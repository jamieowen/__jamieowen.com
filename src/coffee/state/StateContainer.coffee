State = require "state/State"

class StateContainer

  constructor:()->
    @states = []


  addState:(state)->
    if not state instanceof State
      throw new Error "Add"