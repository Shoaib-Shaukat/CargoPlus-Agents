import { NgModule, Pipe } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { ApiService } from './Services/API/api.service'
import { Auth } from './Services/Guard/guard.service'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ChartsModule } from 'ng2-charts';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BnNgIdleService } from 'bn-ng-idle';
import { PortalModule } from '@angular/cdk/portal';
import { PopoutService } from './Pages/Shared/Service/popout.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { DatePipe } from '@angular/common';

import { NumberOnlyDirective } from './number-only.directive';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { IgxGridModule, IgxMaskModule, IgxComboModule, IgxDropDownModule, IgxSelectModule, IgxExpansionPanelModule, IgxCheckboxModule, IgxIconModule, IgxInputGroupModule, IgxButtonModule, IgxRippleModule, IgxDatePickerModule, IgxTimePickerModule } from "igniteui-angular";

// Material UI Modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import ResizeObserver from 'resize-observer-polyfill'
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

import { AutocompleteLibModule } from 'angular-ng-autocomplete';



import { LoginComponent } from './Pages/Login/login.component';
import { DashBoardComponent } from './Pages/DashBoard/dash-board.component';
import { LeftmenuComponent } from './Pages/Shared/LeftMenu/leftmenu.component';
import { TopbarComponent } from './Pages/Shared/TopBar/topbar.component';
import { LayoutComponent } from './Pages/Shared/Layout/layout.component';
import { AdminAreaComponent } from './Pages/AdminArea/admin-area.component';
import { RasLocationsComponent } from './Pages/AdminArea/RasLocations/ras-locations.component';
import { DepartmentsComponent } from './Pages/AdminArea/Departments/departments.component';
import { ShipperComponent } from './Pages/AdminArea/Shipper/shipper.component';
import { ConsigneeComponent } from './Pages/AdminArea/Consignee/consignee.component';
import { AgentTypeComponent } from './Pages/AdminArea/AgentType/agent-type.component';
import { AgentsComponent } from './Pages/AdminArea/Agents/agents.component';
import { UdmMasterComponent } from './Pages/AdminArea/UDMMaster/udm-master.component';
import { CommodityComponent } from './Pages/AdminArea/Commodity/commodity.component';
import { VehiclesComponent } from './Pages/AdminArea/Vehicles/vehicles.component';
import { ForwaderComponent } from './Pages/AdminArea/Forwader/forwader.component';
import { NatureOfGoodsComponent } from './Pages/AdminArea/NatureofGoods/nature-of-goods.component';
import { AirLinesComponent } from './Pages/AdminArea/AirLines/air-lines.component';
import { TwoDigitDecimaNumberDirective } from './Pages/Directive/two-digit-decima-number.directive';
import { NoticeTypesComponent } from './Pages/AdminArea/NoticeTypes/notice-types.component';
import { ULDTypesComponent } from './Pages/AdminArea/ULDTypes/uldtypes.component';
import { DecimalMaskDirective } from './decimal-mask.directive';
import {AcceptanceComponent} from './Pages/Acceptance/acceptance.component';
import { SignupComponent } from './Pages/SignUp/signup.component';
import { ForgotPasswordComponent } from './Pages/Forgot-Password/forgot-password.component';
import { OtpComponent } from './Pages/OTP/otp.component';
import { ChangePasswordComponent } from './Pages/Change-Password/change-password.component'

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashBoardComponent,
    LeftmenuComponent,
    TopbarComponent,
    LayoutComponent,
    AdminAreaComponent,
    RasLocationsComponent,
    DepartmentsComponent,
    ShipperComponent,
    ConsigneeComponent,
    AgentTypeComponent,
    AgentsComponent,
    UdmMasterComponent,
    CommodityComponent,
    VehiclesComponent,
    ForwaderComponent,
    NatureOfGoodsComponent,
    AirLinesComponent,
    AcceptanceComponent,
    NumberOnlyDirective,
    TwoDigitDecimaNumberDirective,
    NoticeTypesComponent,
    ULDTypesComponent,
    DecimalMaskDirective,
    SignupComponent,
    ForgotPasswordComponent,
    OtpComponent,
    ChangePasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DataTablesModule,
    NgxMaskModule.forRoot(),
    ChartsModule,
    NgxExtendedPdfViewerModule ,
    MatAutocompleteModule,
    MatIconModule,
    AppRoutingModule,
    AutocompleteLibModule,
    PortalModule,
    IgxDatePickerModule,
    MatSelectModule,
    HammerModule,
    BrowserAnimationsModule,
    NgMultiSelectDropDownModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    IgxIconModule,
    IgxInputGroupModule,
    IgxButtonModule,
    IgxRippleModule,
    IgxTimePickerModule,
    TimepickerModule.forRoot(),
    IgxCheckboxModule, IgxGridModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    IgxExpansionPanelModule, IgxComboModule, IgxDropDownModule, IgxSelectModule, IgxMaskModule
  ],
  providers: [DatePipe,ApiService, Auth, BnNgIdleService, { provide: LocationStrategy, useClass: HashLocationStrategy }, Pipe, PopoutService],
  bootstrap: [AppComponent]
})
export class AppModule { }
