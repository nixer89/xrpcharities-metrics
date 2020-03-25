import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { XummService } from '../services/xumm.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.html'
})
export class AppTopbarComponent implements OnInit {
    openDialog:boolean = false;
    constructor(private route: ActivatedRoute,private xummApi: XummService, private snackBar: MatSnackBar,) {

        var xrpTipbotScript = document.createElement("script");
        xrpTipbotScript.setAttribute("id", "xrpTipbotScript");
        xrpTipbotScript.setAttribute("src", "https://www.xrptipbot.com/static/donate/tipper.js");
        document.body.appendChild(xrpTipbotScript);
    }

    ngOnInit() {
        this.route.queryParams.subscribe(async params => {
            let payloadIdReceived = params.payloadId;
      
            if(payloadIdReceived) {
                //this is a sign in, handle differently!
                let isValid = await this.xummApi.checkPayment(payloadIdReceived);
                if(isValid.success && !isValid.testnet)
                    this.snackBar.open("Thank you so much for your donation!", null, {panelClass: 'snackbar-success', duration: 3000, horizontalPosition: 'center', verticalPosition: 'top'});
                else
                    this.snackBar.open("Sorry, no valid transaction could be found on the live net. Please try again!", null, {panelClass: 'snackbar-failed', duration: 3000, horizontalPosition: 'center', verticalPosition: 'top'});
            }
        });
    }

    donate() {
        this.openDialog = true;
    }

    closeDialog() {
        this.openDialog = false;
    }
}
