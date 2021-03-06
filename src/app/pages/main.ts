import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../services/statistics.service';

interface Charity {
  handle: string,
  id: string,
  addInfo: string,
  startDate?: string
  balance: number,
  overallReceived: number,
  isProcessing: boolean,
  isInternalProcessing: boolean
}

@Component({
  selector: 'main',
  templateUrl: 'main.html'
})

export class MainComponent implements OnInit {
  
  xrpcharities:Charity = {handle: 'xrpcharities', id:'1082115799840632832', addInfo:' (old bot)', balance: 0, overallReceived: 0, isProcessing: true, isInternalProcessing: false}
  stjude:Charity = {handle: 'StJude', balance: 0, id:'9624042', addInfo:' (raising funds finished)', overallReceived: 0, isProcessing: true, isInternalProcessing: false}
  wanderingware:Charity = {handle: 'WanderingWare', id:'3443786712', addInfo:'', balance: 0, overallReceived: 0, isProcessing: true, isInternalProcessing: false}
  cranders71:Charity = {handle: 'cranders71', id:'970803226470531072', addInfo:' (replaced by AmwFund)', balance: 0, overallReceived: 0, isProcessing: true, isInternalProcessing: false}
  bigbuckor:Charity = {handle: 'bigbuckor', id:'951179206104403968', addInfo:'', balance: 0, overallReceived: 0, isProcessing: true, isInternalProcessing: false, startDate: '2018-10-15'}
  onemorehome:Charity = {handle: 'onemorehome', id:'1080843472129658880', addInfo:'', balance: 0, overallReceived: 0, isProcessing: true, isInternalProcessing: false}
  cote_uk:Charity = {handle: 'cote_uk', id:'21855719', addInfo:' (not migrated)', balance: 0, overallReceived: 0, isProcessing: true, isInternalProcessing: false}
  goodxrp:Charity = {handle: 'GoodXrp', id:'1059563470952247296', addInfo:' (tip splitter bot - inactive)', balance: 0, overallReceived: 0, isProcessing: true, isInternalProcessing: false, startDate: '2019-03-19'}
  companyOfDogs:Charity = {handle: 'Company_of_Dogs', id:'2247390110', addInfo:'', balance: 0, overallReceived: 0, isProcessing: true, isInternalProcessing: false}
  veteranet1:Charity = {handle: 'Veteranet1', id:'1123635064204595201', addInfo:'', balance: 0, overallReceived: 0, isProcessing: true, isInternalProcessing: false}
  amwfund:Charity = {handle: 'AmwFund', id:'1187153090186600448', addInfo:'', balance: 0, overallReceived: 0, isProcessing: true, isInternalProcessing: false}
  casadeamparo:Charity = {handle: 'casadeamparo', id:'163916324', addInfo:' (not migrated)', balance: 0, overallReceived: 0, isProcessing: true, isInternalProcessing: false}

  charities:Charity[] = [this.onemorehome,this.wanderingware,this.amwfund,this.bigbuckor,this.companyOfDogs,this.veteranet1,this.goodxrp,this.stjude,this.cote_uk,this.casadeamparo,this.cranders71,this.xrpcharities]

  allCharitiesReceived:number=0;
  allCharitiesReceivedTmp:number=0;
  allCharitiesBalance:number=0;
  allCharitiesBalanceTmp:number=0;
  interval: any;
  toogleChecked: boolean = true;
  updatingTotals:boolean = true;

  constructor(public statistics: StatisticsService) {}

  async ngOnInit() {
    this.getBalances();
    this.toogleBalanceUpdate();
  }

  async getBalances(isInit?: boolean) {
    for(let i=0;i<this.charities.length;i++)
      this.charities[i].isInternalProcessing=true;

    this.charities.forEach(async charity => {
      let balances:any[] = await this.statistics.calculateBalances(charity);
      charity.balance = balances[0];
      charity.overallReceived = balances[1];
      charity.isProcessing = false;
      charity.isInternalProcessing = false;
    });

    setTimeout(() => this.updateTotals(isInit),500)
  }

  updateTotals(isInit?: boolean) {
    if(isInit)
      this.updatingTotals = true;

    if(this.charities.filter(charity => charity.isInternalProcessing).length>0) {
      setTimeout(() => this.updateTotals(),500)
    }
    else {
      this.allCharitiesReceivedTmp=0;
      this.allCharitiesBalanceTmp=0;
      for(let i=0;i<this.charities.length;i++) {
        //do not count donations to xrpcharities & GoodXrp into total balance because these would be double counted then.
        //xrpcharities & GoodXrp is forwarding all tips/donations to the other charities
        if(this.charities[i].id != '1082115799840632832' && this.charities[i].id != '1059563470952247296') {
          this.allCharitiesReceivedTmp = (this.allCharitiesReceivedTmp + this.charities[i].overallReceived*1000000);
          this.allCharitiesBalanceTmp = (this.allCharitiesBalanceTmp + this.charities[i].balance*1000000);
        }
      }

      this.allCharitiesBalance = this.allCharitiesBalanceTmp/1000000;
      this.allCharitiesReceived = this.allCharitiesReceivedTmp/1000000;
      this.updatingTotals = false;
    }
  }

  toogleBalanceUpdate() {
    if(this.toogleChecked) {
      //set interval
      this.interval = setInterval(async () => {
        this.getBalances();
      },60000);
    }
    else {
      if(this.interval)
        clearInterval(this.interval);
    }
  }

  isXrpCharitiesOldBot(id:string): boolean {
    return this.xrpcharities.id === id;
  }
}
