import {NgModule}      from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule}    from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
//import {LocationStrategy,HashLocationStrategy} from '@angular/common';
import {AppRoutes} from './app.routes';

// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// PrimeNG
import {AccordionModule} from 'primeng/primeng';
import {AutoCompleteModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';
import {CaptchaModule} from 'primeng/primeng';
import {CheckboxModule} from 'primeng/primeng';
import {ConfirmDialogModule} from 'primeng/primeng';
import {FieldsetModule} from 'primeng/primeng';
import {GrowlModule} from 'primeng/primeng';
import {InputMaskModule} from 'primeng/primeng';
import {InputSwitchModule} from 'primeng/primeng';
import {InputTextModule} from 'primeng/primeng';
import {InputTextareaModule} from 'primeng/primeng';
import {MenuModule} from 'primeng/primeng';
import {MenubarModule} from 'primeng/primeng';
import {MessagesModule} from 'primeng/primeng';
import {PaginatorModule} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import {PasswordModule} from 'primeng/primeng';
import {ProgressBarModule} from 'primeng/primeng';
import {RadioButtonModule} from 'primeng/primeng';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {SpinnerModule} from 'primeng/primeng';
import {TableModule} from 'primeng/table';
import {TabMenuModule} from 'primeng/primeng';
import {ToolbarModule} from 'primeng/primeng';
import {CardModule} from 'primeng/primeng';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {ChartModule} from 'primeng/chart';
import {DropdownModule} from 'primeng/dropdown';
import {DialogModule} from 'primeng/dialog';

//App
import { AppComponent } from './app.component';
import {AppTopbarComponent}  from './components/topbar';
import {AppFooterComponent}  from './components/footer';
import { DashboardComponent } from './components/dashboard';
import {XummPaymentComponent} from './components/xummPaymentRequest';

//my components
import {MainComponent} from './pages/main';
import {LatestDonorsComponent} from './pages/latestDonors';
import {StatisticsComponent} from './pages/statistics';
import {AboutUsComponent} from './pages/aboutus';
import {WhatWeDoComponent} from './pages/whatwedo';
import {HowItWorksComponent} from './pages/howitworks';

//my services
import { AppService } from './services/app.service';
import { ApiService } from './services/api.service';
import { StatisticsService } from './services/statistics.service';
import { XummService } from './services/xumm.service';

//special
import { DeviceDetectorModule } from 'ngx-device-detector';

@NgModule({
  declarations: [
    AppComponent,
    AppTopbarComponent,
    AppFooterComponent,
    DashboardComponent,
    XummPaymentComponent,
    MainComponent,
    LatestDonorsComponent,
    StatisticsComponent,
    AboutUsComponent,
    WhatWeDoComponent,
    HowItWorksComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutes,
    HttpClientModule,
    BrowserAnimationsModule,
    //Angular Material:
    MatToolbarModule,
    MatButtonModule,
    MatTooltipModule,
    MatSnackBarModule,
    // PrimeNG:
    AccordionModule,
    AutoCompleteModule,
    ButtonModule,
    CaptchaModule,
    CheckboxModule,
    ConfirmDialogModule,
    FieldsetModule,
    GrowlModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    MenuModule,
    MenubarModule,
    MessagesModule,
    PaginatorModule,
    PanelModule,
    PasswordModule,
    ProgressBarModule,
    RadioButtonModule,
    ScrollPanelModule,
    SpinnerModule,
    TableModule,
    TabMenuModule,
    ToolbarModule,
    CardModule,
    ProgressSpinnerModule,
    ToggleButtonModule,
    ChartModule,
    DropdownModule,
    DialogModule,
    DeviceDetectorModule.forRoot()
  ],
  providers: [AppService,ApiService,StatisticsService,XummService],
  bootstrap: [AppComponent]
})
export class AppModule { }
