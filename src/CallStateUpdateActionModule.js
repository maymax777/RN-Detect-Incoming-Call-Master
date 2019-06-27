var CallStateUpdateActionModule = {

    callStateUpdated(state, incomingNumber) {
      this.callback && this.callback(state, incomingNumber)
      console.log(state + ' ' +incomingNumber);
    }
  
  }
  
  module.exports = CallStateUpdateActionModule;