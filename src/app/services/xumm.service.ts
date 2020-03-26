import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { TransactionValidation, GenericBackendPostRequest} from '../util/types';
import { XummPostPayloadResponse, XummGetPayloadResponse, XummDeletePayloadResponse } from 'xumm-api';

@Injectable()
export class XummService {
    constructor(private app: AppService) {}

    isTestMode = false;
    xummBackendURL = this.isTestMode ? 'http://localhost:4001' : 'https://api.xumm.community';

    async submitPayload(payload:GenericBackendPostRequest): Promise<XummPostPayloadResponse> {
        try {
            return this.app.post(this.xummBackendURL+"/api/v1/platform/payload", payload);
        } catch(err) {
            console.log(JSON.stringify(err))
            return null;
        }
    }

    async initiatePayment(type:string): Promise<XummPostPayloadResponse> {
        try {
            return this.app.get(this.xummBackendURL+"/api/v1/initiate/simplePayment/"+type);
        } catch(err) {
            console.log(JSON.stringify(err))
            return null;
        }
    }

    async getPayloadInfo(payloadId:string): Promise<XummGetPayloadResponse> {
        try {
            return this.app.get(this.xummBackendURL+"/api/v1/platform/payload/"+payloadId);
        } catch(err) {
            console.log(JSON.stringify(err))
            return null;
        }
    }

    async deletePayload(payloadId:string): Promise<XummDeletePayloadResponse> {
        try {
            return this.app.delete(this.xummBackendURL+"/api/v1/platform/payload/"+payloadId);
        } catch(err) {
            console.log(JSON.stringify(err))
            return null;
        }
    }

    async validateTransaction(payloadId:string): Promise<TransactionValidation> {
        try {
            return this.app.get(this.xummBackendURL+"/api/v1/xrpl/validatetx/"+payloadId);
        } catch(err) {
            console.log(JSON.stringify(err))
            return { error: true, success: false, testnet:false }
        }
    }

    async checkPayment(payloadId:string): Promise<TransactionValidation> {
        try {
            return this.app.get(this.xummBackendURL+"/api/v1/check/payment/"+payloadId);
        } catch(err) {
            console.log(JSON.stringify(err))
            return { error: true, success: false, testnet:false  }
        }
    }

    async checkTimedPayment(payloadId:string, referer:string): Promise<TransactionValidation> {
        try {
            return this.app.get(this.xummBackendURL+"/api/v1/check/timed/payment/referer/"+payloadId+"?referer="+referer);
        } catch(err) {
            console.log(JSON.stringify(err))
            return { error: true, success: false, testnet:false  }
        }
    }

    async checkSignIn(payloadId:string): Promise<TransactionValidation> {
        try {
            return this.app.get(this.xummBackendURL+"/api/v1/check/signin/"+payloadId);
        } catch(err) {
            console.log(JSON.stringify(err))
            return { error: true, success: false, testnet:false  }
        }
    }

    async signInToValidateTimedPayment(payloadId:any, referer:string): Promise<TransactionValidation> {
        try {
            return this.app.get(this.xummBackendURL+"/api/v1/check/signinToValidatePayment/"+payloadId+(referer ? "?referer="+referer:""));
        } catch(err) {
            console.log(JSON.stringify(err))
            return { error: true, success: false, testnet:false  }
        }
    }
}