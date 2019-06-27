import {
    NativeModules    
} from 'react-native'

const BatchedBridge = require('react-native/Libraries/BatchedBridge/BatchedBridge')

const NativeCallDetector = NativeModules.CallDetectionManager;
var CallStateUpdateActionModule = require('./CallStateUpdateActionModule')

BatchedBridge.registerCallableModule('CallStateUpdateActionModule', CallStateUpdateActionModule)

class CallDetectionManager {

    subscription;
    callback
    constructor(callback, readPhoneNumberAndroid, permissionDeniedCallback = ()=>{}, permissionMessage) {
        this.callback = callback
        NativeCallDetector.startListener();
        CallStateUpdateActionModule.callback = callback;
        console.log('CallDetectionManager constructor');
    }

    dispose() {    	
    	NativeCallDetector && NativeCallDetector.stopListener()
        CallStateUpdateActionModule.callback = undefined
      if(this.subscription) {
          this.subscription.removeAllListeners('PhoneCallStateUpdate');
          this.subscription = undefined
      }
    }
}
export default module.exports = CallDetectionManager;