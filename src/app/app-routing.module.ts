import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Pages/Login/login.component';
import { LayoutComponent } from './Pages/Shared/Layout/layout.component'
import { Auth } from './Services/Guard/guard.service'
import { DashBoardComponent } from './Pages/DashBoard/dash-board.component';
import { AdminAreaComponent } from './Pages/AdminArea/admin-area.component';
import { ShipperComponent } from './Pages/AdminArea/Shipper/shipper.component'
import { AgentTypeComponent } from './Pages/AdminArea/AgentType/agent-type.component'
import { ConsigneeComponent } from './Pages/AdminArea/Consignee/consignee.component'
import { AgentsComponent } from './Pages/AdminArea/Agents/agents.component'
import { UdmMasterComponent } from './Pages/AdminArea/UDMMaster/udm-master.component'
import { CommodityComponent } from './Pages/AdminArea/Commodity/commodity.component'
import { VehiclesComponent } from './Pages/AdminArea/Vehicles/vehicles.component'
import { ForwaderComponent } from './Pages/AdminArea/Forwader/forwader.component'
import { NatureOfGoodsComponent } from './Pages/AdminArea/NatureofGoods/nature-of-goods.component'
import { AirLinesComponent } from './Pages/AdminArea/AirLines/air-lines.component'
import { AcceptanceComponent } from './Pages/Acceptance/acceptance.component'
import { SignupComponent } from './Pages/SignUp/signup.component';
import { ForgotPasswordComponent } from './Pages/Forgot-Password/forgot-password.component';
import { OtpComponent } from './Pages/OTP/otp.component';
import { ChangePasswordComponent } from './Pages/Change-Password/change-password.component';
const routes: Routes = [

  {
    path: '', component: LayoutComponent, canActivate: [Auth], children: [
      { path: 'Dashboard', component: DashBoardComponent },
      {
        path: 'Admin', component: AdminAreaComponent, children: [
          { path: 'Shipper', component: ShipperComponent },
          { path: 'Consignee', component: ConsigneeComponent },
          { path: 'AgentType', component: AgentTypeComponent },
          { path: 'Agents', component: AgentsComponent },
          { path: 'UDM Master', component: UdmMasterComponent },
          { path: 'Commidity', component: CommodityComponent },
          { path: 'Vehicles', component: VehiclesComponent },
          { path: 'Forwader', component: ForwaderComponent },
          { path: 'NatureOfGoods', component: NatureOfGoodsComponent },
          { path: 'AirLines', component: AirLinesComponent },
        ]
      },
      { path: 'Acceptance', component: AcceptanceComponent },
      { path: 'Signup', component: SignupComponent },
      { path: 'ForgotPassword', component: ForgotPasswordComponent },
      { path: 'OTP', component: OtpComponent },
      { path: 'ChangePassword', component: ChangePasswordComponent },
    ]
  },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
