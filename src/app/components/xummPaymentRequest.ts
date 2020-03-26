import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { XummService } from '../services/xumm.service';
import { webSocket, WebSocketSubject} from 'rxjs/webSocket';
import { DeviceDetectorService } from 'ngx-device-detector';
import { GenericBackendPostRequest, TransactionValidation } from '../util/types';
import { XummPostPayloadBodyJson, XummPostPayloadResponse } from 'xumm-api';

@Component({
    selector: "xummPaymentRequest",
    templateUrl: "xummPaymentRequest.html"
})
export class XummPaymentComponent implements OnInit {

    @Output()
    userSigned: EventEmitter<any> = new EventEmitter();
    
    qrLink:string;

    websocket: WebSocketSubject<any>;
    payloadUUID: string;
    showError: boolean = false;
    waitingForPayloadResolved:boolean = false;
    showQR:boolean = false;
    requestExpired:boolean = false;
    backendNotAvailable:boolean = false;
    loading:boolean = false;
    paymentReceived:boolean = false;
    isInit:boolean = true;

    constructor(
        private xummApi: XummService,
        private deviceDetector: DeviceDetectorService) {
    }

    ngOnInit() {
        this.supportViaXumm();
    }    

    async supportViaXumm() {
        this.loading = true;

        //setting up xumm payload and waiting for websocket
        let xummResponse:XummPostPayloadResponse; 
        try {
            xummResponse = await this.xummApi.initiatePayment(this.deviceDetector.isDesktop() ? 'web':'app');
            console.log(JSON.stringify(xummResponse)); 
        } catch (err) {
            console.log(JSON.stringify(err));
            this.loading = false;
            this.backendNotAvailable = true;
            this.showError = true;
            return;
        }
        
        this.payloadUUID = xummResponse.uuid;

        if(!this.deviceDetector.isDesktop() && xummResponse.next.always)
            window.location.href = xummResponse.next.always;
        else {
            this.qrLink = xummResponse.refs.qr_png;
            this.initSocket(xummResponse.refs.websocket_status);
        }
    }

    initSocket(url:string) {
        // register socket for receiving data:
        console.log("connecting socket to: " + url);
        this.websocket = webSocket(url);
        this.loading = false;
        this.waitingForPayloadResolved = true;
        let userOpenedPayload:boolean = false;
        this.websocket.asObservable().subscribe(async message => {
            console.log("message received: " + JSON.stringify(message));
            //user opened payload. Do not expire it!
            if(message.opened)
                userOpenedPayload = message.opened

            //user signed payload. Handle it!
            if(message.payload_uuidv4 && message.payload_uuidv4 === this.payloadUUID) {
                let transactionResult:TransactionValidation = await this.xummApi.checkPayment(message.payload_uuidv4);
                console.log(transactionResult);
                this.waitingForPayloadResolved = false;

                if(transactionResult && transactionResult.success && !transactionResult.testnet) {
                    this.paymentReceived = true;
                    
                    setTimeout(() => this.handleSuccessfullPayment(), 5000);
                } else {
                    this.showError = true;
                }

                this.websocket.unsubscribe();
                this.websocket.complete();
            } else if((message.expired || message.expires_in_seconds <= 0) && !userOpenedPayload) {
                this.showError = true;
                this.waitingForPayloadResolved = false;
                this.requestExpired = true;
                this.websocket.unsubscribe();
                this.websocket.complete();
            } else if(message.opened) {
                this.showQR = false;
                this.qrLink = null;
            }
        });
    }
    
    handleSuccessfullPayment() {
        this.userSigned.next(true);
    }

    QRLoaded() {
        this.showQR = true;
    }

    closeIt() {
        this.userSigned.next(true);
    }

    closing() {
        console.log("close dialog");
        if(this.websocket) {
            this.websocket.unsubscribe();
            this.websocket.complete();
        }

        if(!this.paymentReceived && !this.requestExpired && this.showQR && this.payloadUUID) {
            console.log("sending delete request")
            this.xummApi.deletePayload(this.payloadUUID);
        }
    }
}