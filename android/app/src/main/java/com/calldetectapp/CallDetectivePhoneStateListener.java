package com.calldetectapp;

import android.telephony.PhoneStateListener;

public class CallDetectivePhoneStateListener extends PhoneStateListener {
    private PhoneCallStateUpdate callStatCallBack;

    public CallDetectivePhoneStateListener(PhoneCallStateUpdate callStatCallBack) {
        super();
        this.callStatCallBack = callStatCallBack;
        System.out.println("Call Detective Phone State Listener");
    }

    @Override
    public void onCallStateChanged(int state, String incomingNumber) {
        this.callStatCallBack.phoneCallStateUpdated(state, incomingNumber);
        System.out.println("Call Detective Phone State Listener : " + state + ' ' + incomingNumber);
    }

    interface PhoneCallStateUpdate {
        void phoneCallStateUpdated(int state, String incomingNumber);
    }
}
