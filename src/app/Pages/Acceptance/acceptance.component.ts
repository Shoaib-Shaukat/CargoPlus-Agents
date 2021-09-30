import { Component, OnInit, ViewChildren, QueryList, ElementRef, Input, EventEmitter, Output, OnChanges, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GvarService } from '../../Services/Globel/gvar.service'
import { ApiService } from '../../Services/API/api.service';
import { responseAirLines } from '../AdminArea/Models/airLines';
import { IGX_INPUT_GROUP_TYPE } from 'igniteui-angular';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { IgxGridComponent, IgxStringFilteringOperand } from 'igniteui-angular';
import { responseDriver, requestWeightRPT, HouseAWB, dimWeightResponse, InquiryResponse, noticeTypesRequest, attachmentResponse, acceptanceModel, requestAcceptance, responseAcceptance, responseModel, employeeModel, weightResponseModel, getWeight, requestWeight, AcceptanceDetailModel, SaveALL, NewAcceptanceResponse, AttachmentTypes, responseStatus, airportResponse } from '../Acceptance/Model/acceptance'
import { IgxExpansionPanelComponent } from 'igniteui-angular';
import { requestGoods, responseGoods } from '../AdminArea/Models/Goods';
import { responseCommodity } from '../AdminArea/Models/commodity';
import { agentsResponse, agentType, requestAgent } from '../AdminArea/Models/agents'
import { vehicleResponse } from '../AdminArea/Models/vehicles'
import { shippereResponse } from '../AdminArea/Models/shipper';
import { consigneeResponse, requestConsignee } from '../AdminArea/Models/consignee';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ULDData } from '../Acceptance/Model/acceptance'
import { requestCity, requestStRegions, responseCity, responseCountries, responseRegions } from '../AdminArea/Models/cityState';
import { thisYear } from '@igniteui/material-icons-extended';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-acceptance',
  templateUrl: './acceptance.component.html',
  styleUrls: ['./acceptance.component.css'],
  providers: [{ provide: IGX_INPUT_GROUP_TYPE, useValue: 'box' }]
})
export class AcceptanceComponent implements OnInit {
  errorMsg: string;
  isLoadingResult: boolean;
  data: any;
  keyword = 'agentName';
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  airportResponse: airportResponse[];
  ChargeableWeight: any;
  AgentName: string = "";
  responseStatus: responseStatus[];
  showShipper: boolean = false;
  showConsignee: boolean = false;
  showConsolidator: boolean = false;
  date: string;
  responseDriver: responseDriver;
  requestWeightRPT: requestWeightRPT;
  AttachmentTypes: AttachmentTypes[];
  public src: Blob;
  noticeTypeArrlen: number;
  NewAcceptanceResponse: NewAcceptanceResponse;
  public now: Date = new Date();
  CBM: any;
  SaveALL: SaveALL;
  SaveAll: any;
  delivered: boolean = false;
  editMode: boolean = false;
  TotalNetWeight: number = 0;
  notifyAWBState: boolean = false;
  notifyNewAgentTab2State: boolean = false;
  notifyComidState: boolean = false;
  notifyNewAgentTab1State: boolean = false;
  notifyShipperState: boolean = false;
  notifyConsigneeState: boolean = false;
  AcceptanceDetailModel: AcceptanceDetailModel;
  /* #region  Initialize Variables etc */
  @ViewChildren('closeConsolidatorModal') closeConsolidatorModal: ElementRef;
  @ViewChildren('closeNatureOfGoodsModal') closeNatureOfGoodsModal: ElementRef;
  @ViewChildren('closeCommodityModal') closeCommodityModal: ElementRef;
  @ViewChildren('closeAgentsModal') closeAgentsModal: ElementRef;
  @ViewChildren('closeShipperModal') closeShipperModal: ElementRef;
  @ViewChildren('closeConsigneeModal') closeConsigneeModal: ElementRef;
  @ViewChildren('closeAWBDetailListModal') closeAWBDetailListModal: ElementRef;
  @ViewChildren('closeShipperListModal') closeShipperListModal: ElementRef;
  @ViewChildren('closeCommodityListModal') closeCommodityListModal: ElementRef;
  @ViewChildren('closeAgentListModal') closeAgentListModal: ElementRef;
  @ViewChildren('closeConsigneeListModal') closeConsigneeListModal: ElementRef;
  @ViewChildren('closeNatureofGoodsListModal') closeNatureofGoodsListModal: ElementRef;
  @ViewChildren('closeShipperHouseListModal') closeShipperHouseListModal: ElementRef;
  @ViewChildren('closeNatureofGoodsHouseListModal') closeNatureofGoodsHouseListModal: ElementRef;
  @ViewChildren('closeConsigneeHouseListModal') closeConsigneeHouseListModal: ElementRef;


  @ViewChildren(DataTableDirective)
  datatableElement: QueryList<DataTableDirective>;
  dtOptions0: DataTables.Settings = {};
  dtTrigger0: Subject<any> = new Subject();
  dtOptions1: DataTables.Settings = {};
  dtTrigger1: Subject<any> = new Subject();
  dtOptions2: DataTables.Settings = {};
  dtTrigger2: Subject<any> = new Subject();
  dtOptions3: DataTables.Settings = {};
  dtTrigger3: Subject<any> = new Subject();
  dtOptions4: DataTables.Settings = {};
  dtTrigger4: Subject<any> = new Subject();
  dtOptions5: DataTables.Settings = {};
  dtTrigger5: Subject<any> = new Subject();
  dtOptions6: DataTables.Settings = {};
  dtTrigger6: Subject<any> = new Subject();
  dtOptions7: DataTables.Settings = {};
  dtTrigger7: Subject<any> = new Subject();
  latestDate: any;
  GoodsID: number;
  AgentIDForTab1: number;
  AgentIDForTab2: number;
  ComidID: number;
  ShipperID: number;
  ConsigneeID: number;
  agentId: number;
  defaultShippereResponse: shippereResponse;
  defaultAirline: responseAirLines;
  defaultAirport: airportResponse;
  defaultAttType: AttachmentTypes;
  defaultConsigneeResponse: consigneeResponse;
  consigneeResponse: consigneeResponse[];
  consigneeResponseTable: consigneeResponse[];
  shippereResponse: shippereResponse[];
  shippereResponseList: shippereResponse[];
  HouseAWB: HouseAWB[];
  dimWeightResponse: dimWeightResponse[];
  InquiryResponse: InquiryResponse[];
  noticeTypesRequest: noticeTypesRequest;
  attachmentResponse: attachmentResponse[];
  fileName: string = "Choose file...";
  @ViewChild("fileUpload") fileUpload: ElementRef; files = [];
  acceptanceModel: acceptanceModel;
  acceptanceData = [];
  acceptanceID: number = 0
  vehicleResponse: vehicleResponse[];
  requestWeight: requestWeight;
  getWeight: getWeight;
  defaultCommodityResponse: responseCommodity;
  weightResponseModel: weightResponseModel;
  agentsResponse: agentsResponse[];
  agentsResponseList: agentsResponse[];
  ConsolidatorResponse: agentsResponse[];
  defaultAgentsResponse: agentsResponse;
  responseCommodity: responseCommodity[];
  responseCommodityList: responseCommodity[];
  defaultGoods: responseGoods;
  responseGoods: responseGoods[];
  public panel: IgxExpansionPanelComponent;
  validAWBFrom: boolean = false;
  validForm: boolean = false;
  validInputSearch: boolean = false;
  validFormWeight: boolean = false;
  validFormWeightdim: boolean = false;
  generalRequest: requestAcceptance;
  employeeModel: employeeModel;
  responseModel: responseModel;
  selectedText: string;
  responseAirLines: responseAirLines[];
  AWBForm: FormGroup;
  acceptanceForm: FormGroup;
  AttachmentForm: FormGroup;
  weightForm: FormGroup;
  ShipperForm: FormGroup;
  houseForm: FormGroup;
  DimweightForm: FormGroup;
  CosigneeForm: FormGroup;
  shownewButton: boolean = true;
  showeditButton: boolean = false;
  showSaveButton: boolean = false;
  showCancelButton: boolean = false;
  showAcceptance: boolean = true;
  addnewAcceptance: boolean = false;
  shownewButtonWeight: boolean = true;
  showeditButtonWeight: boolean = true;
  showSaveButtonWeight: boolean = false;
  showCancelButtonWeight: boolean = false;
  showWeight: boolean = true;
  showNotice: boolean = true;
  addnewWeight: boolean = false;
  shownewButtonWeightDim: boolean = true;
  showeditButtonWeightDim: boolean = true;
  showSaveButtonWeightDim: boolean = false;
  showCancelButtonWeightDim: boolean = false;
  showWeightDim: boolean = true;
  addnewWeightDim: boolean = false;
  shownewButtonAtt: boolean = true;
  showeditButtonAtt: boolean = true;
  showSaveButtonAtt: boolean = false;
  showCancelButtonAtt: boolean = false;
  showAtt: boolean = true;
  addnewAtt: boolean = false;
  shownewButtonHouse: boolean = true;
  showeditButtonHouse: boolean = true;
  showSaveButtonHouse: boolean = false;
  showCancelButtonHouse: boolean = false;
  showHouse: boolean = true;
  addnewHouse: boolean = false;
  AWBNo: string;
  ULDData: ULDData[];
  /* #endregion */
  constructor(public datepipe: DatePipe, public API: ApiService, public GV: GvarService, private router: Router,) {
    this.airportResponse = [];
    this.responseStatus = [];
    this.date = new Date().toISOString().slice(0, 16);
    this.responseDriver = new responseDriver();
    this.requestWeightRPT = new requestWeightRPT();
    this.AttachmentTypes = [];
    this.SaveALL = new SaveALL();
    this.AcceptanceDetailModel = new AcceptanceDetailModel();
    this.NewAcceptanceResponse = new NewAcceptanceResponse();
    this.defaultAirline = new responseAirLines();
    this.defaultAttType = new AttachmentTypes();
    this.defaultShippereResponse = new shippereResponse();
    this.defaultAirport = new airportResponse();
    this.defaultGoods = new responseGoods();
    this.HouseAWB = [];
    this.InquiryResponse = [];
    this.noticeTypesRequest = new noticeTypesRequest();
    this.attachmentResponse = [];
    this.shippereResponse = [];
    this.shippereResponseList = [];
    this.acceptanceModel = new acceptanceModel();
    this.acceptanceData = [];
    this.vehicleResponse = [];
    this.requestWeight = new requestWeight();
    this.getWeight = new getWeight();
    this.weightResponseModel = new weightResponseModel();
    this.responseAirLines = [];
    this.responseModel = new responseModel();
    this.employeeModel = new employeeModel();
    this.generalRequest = new requestAcceptance();
    this.responseGoods = [];
    this.responseCommodity = [];
    this.responseCommodityList = [];
    this.ConsolidatorResponse = [];
    this.agentsResponse = [];
    this.agentsResponseList = [];
    this.dimWeightResponse = [];
    this.ULDData = [];
    this.defaultConsigneeResponse = new consigneeResponse();
    this.defaultAgentsResponse = new agentsResponse();
    this.defaultCommodityResponse = new responseCommodity();
  }
  ngOnInit(): void {
    this.InitializeHouseForm();
    this.consigneeResponse = [];
    this.consigneeResponseTable = [];
    this.InitializeWeightForm();
    this.InitializeForm();
    this.InitializeDimWeightForm();
    this.acceptanceForm.controls.AWBType.setValue("General");
    this.acceptanceForm.controls.Region.setValue("Non-Europe");
    this.getAirports();
    this.getAirLines();
    this.getGoods();
    this.getAttTypes();
    // this.getAirLines();
    // this.getGoods();
    // this.getCommodity();
    // this.getVehicleTypes();
    // this.showhide('New');
    // this.setGrossWeight();
    // this.getStatus();
    // this.acceptanceForm.get("otherAirlineCode").disable();
    // this.weightForm.controls.vehicleID.setValue("1");
    // this.delivered = false;
    // this.InquiryResponse = [];
    // this.showHideWeight('New');
    // this.getAgents();
    // this.getConsignees();
    // this.getConsolidator();
    // this.getShippers();
    // this.getAttTypes();
    // this.acceptanceForm.controls.approvalStatus.setValue(4);
  }
  selectEvent(item) {
    // do something with selected item
  }
  searchCleared() {
    console.log('searchCleared');
    this.data = [];
  }
  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    // do something when input is focused
  }
  /* #region  General Functions */
  uploadFile(file) {
    const formData = new FormData();
    formData.append('fileByte', file.data);
    formData.append('moduleID', '3');
    formData.append('modulePK', this.acceptanceForm.controls.acceptanceID.value);
    formData.append('attType', this.AttachmentForm.controls.atttypeID.value);
    formData.append('airportID', this.acceptanceForm.controls.airportID.value);
    file.inProgress = true;
    this.API.PostData('/Acceptance/uploadFile', formData).subscribe(c => {
      Swal.fire({
        text: "Attachment saved successfully",
        icon: 'success',
        confirmButtonText: 'OK'
      });
      this.showHideATT('Cancel');
      this.AttachmentForm.controls.atttypeID.setValue(0);
      this.getAttachments();
    });
  }
  onClick() {
    const fileUpload = this.fileUpload.nativeElement; fileUpload.onchange = () => {
      this.files = [];
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        this.files.push({ data: file, inProgress: false, progress: 0 });
      }
      this.fileName = this.files[0].data.name;
    };
    fileUpload.click();
  }
  uploadFiles() {
    if (this.acceptanceForm.controls.acceptanceID.value == "" || this.acceptanceForm.controls.acceptanceID.value == null) {
      Swal.fire({
        text: "Save AWB Detail First",
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }
    if (this.AttachmentForm.controls.atttypeID.value == null || this.AttachmentForm.controls.atttypeID.value == 0) {
      Swal.fire({
        text: "Select Att Type",
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return
    }

    this.fileUpload.nativeElement.value = '';
    this.files.forEach(file => {
      this.uploadFile(file);
    });

  }
  viewImage(p) {
    var imageFile = this.attachmentResponse.find(x => x.attachmentID == p.attachmentID);
    var image = new Image();
    image.src = "data:image/jpg;base64," + imageFile.fileData;
    var w = window.open("");
    w.document.write(image.outerHTML);
  }
  getShipperDetailHouse() {
    var shipperDetail = this.shippereResponse.find(x => x.shipperId == this.houseForm.controls.shipperId.value);
    if (shipperDetail != undefined) {
      this.houseForm.controls.shipperAddress.setValue(shipperDetail.shipperAddress);
      this.houseForm.controls.shipperPhoneNo.setValue(shipperDetail.PhoneNo);
      this.houseForm.controls.shippercountryName.setValue(shipperDetail.countryName);
    }
  }
  getConsigneeDetailHouse() {
    var consigneeDetail = this.consigneeResponse.find(x => x.cid == this.houseForm.controls.cid.value);
    if (consigneeDetail != undefined) {
      this.houseForm.controls.consigneeAddress.setValue(consigneeDetail.consigneeAddress);
      this.houseForm.controls.consigneePhoneNo.setValue(consigneeDetail.PhoneNo);
      this.houseForm.controls.consigneecountryName.setValue(consigneeDetail.countryName);
    }
  }
  getChargeable() {
    if (this.houseForm.controls.pieces.value != "" || this.houseForm.controls.pieces.value != null
      || this.houseForm.controls.length.value != null || this.houseForm.controls.length.value != null
      || this.houseForm.controls.height.value != null || this.houseForm.controls.height.value != null
      || this.houseForm.controls.width.value != null || this.houseForm.controls.width.value != null) {
      var width = Number(this.houseForm.controls.width.value);
      var length = Number(this.houseForm.controls.length.value);
      var height = Number(this.houseForm.controls.height.value);
      var pieces = Number(this.houseForm.controls.pieces.value);
      var chargeableWt = (width * length * height * pieces) / 6000;
      this.houseForm.controls.chargeableWeight.setValue(Math.round(chargeableWt));
    }
    this.verifyChargable();
  }
  calculateNetWeight() {
    if (this.weightForm.controls.firstWt.value != "" && this.weightForm.controls.firstWt.value != null
      && this.weightForm.controls.secondWt.value != "" && this.weightForm.controls.secondWt.value != null) {
      var firstWt = Number(this.weightForm.controls.firstWt.value);
      var secondWt = Number(this.weightForm.controls.secondWt.value);
      var netWt = firstWt - secondWt;
      this.weightForm.controls.netWt.setValue(netWt);
    }
    else {
      this.weightForm.controls.netWt.setValue("");
    }
  }
  setGrossWeight() {
    this.weightForm.get("netWt").valueChanges.subscribe(x => {
    })
  }
  editHouse(p) {
    this.showHideHouse("Edit");
    this.houseForm.patchValue(p);
    this.getShipperDetailHouse();
    this.getConsigneeDetailHouse();
    this.houseForm.controls.goodsId.setValue(p.goodsid);
  }
  setGVGoods(value: string) {
    this.GV.GoodsCallFrom = value;
  }
  public formatCurrency(val: string) {
    return parseInt(val, 10).toFixed(2);
  }
  resetForm(value: any = undefined) {
    this.acceptanceForm.reset(value);
    this.acceptanceForm.reset(this.acceptanceForm.value);
    this.acceptanceForm.controls.AWBType.setValue("General");
    this.acceptanceForm.controls.Region.setValue("Non-Europe");
    this.acceptanceForm.controls.approvalStatus.setValue(4);
    this.acceptanceForm.controls.FurShipment.setValue(false);
    this.acceptanceForm.controls.DNR.setValue(false);
    this.acceptanceForm.controls.Occurance.setValue(false);
    this.acceptanceForm.controls.OvrShipment.setValue(false);
    this.acceptanceForm.controls.holdShipment.setValue(false);
    this.acceptanceForm.controls.otherAirline.setValue(false);
  }
  destroyDT = (tableIndex, clearData): Promise<boolean> => {
    return new Promise((resolve) => {
      this.datatableElement.forEach((dtElement: DataTableDirective, index) => {
        if (index == tableIndex) {
          if (dtElement.dtInstance) {
            if (tableIndex == 0) {
              dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                if (clearData) {
                  dtInstance.clear();
                }
                dtInstance.destroy();
                resolve(true);
              });
            }
            else if (tableIndex == 1) {
              dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                if (clearData) {
                  dtInstance.clear();
                }
                dtInstance.destroy();
                resolve(true);
              });
            } else if (tableIndex == 2) {
              dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                if (clearData) {
                  dtInstance.clear();
                }
                dtInstance.destroy();
                resolve(true);
              });
            }
            else if (tableIndex == 3) {
              dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                if (clearData) {
                  dtInstance.clear();
                }
                dtInstance.destroy();
                resolve(true);
              });
            }
            else if (tableIndex == 4) {
              dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                if (clearData) {
                  dtInstance.clear();
                }
                dtInstance.destroy();
                resolve(true);
              });
            }
            else if (tableIndex == 5) {
              dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                if (clearData) {
                  dtInstance.clear();
                }
                dtInstance.destroy();
                resolve(true);
              });
            }
            else if (tableIndex == 6) {
              dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                if (clearData) {
                  dtInstance.clear();
                }
                dtInstance.destroy();
                resolve(true);
              });
            }
          }
          else {
            resolve(true);
          }
        }
      });
    });
  };
  getemployeeDetail() {
    if (this.acceptanceForm.controls.empID.value != undefined) {
      this.API.getdata('/Generic/getEmpDetail?empID=' + this.acceptanceForm.controls.empID.value).subscribe(c => {
        if (c != null) {
          this.employeeModel = c;
          this.acceptanceForm.controls['empID'].setValue(this.employeeModel.empID);
          this.acceptanceForm.controls['empName'].setValue(this.employeeModel.employeeName);
        }
        else {
          this.acceptanceForm.controls['empID'].setValue("");
          this.acceptanceForm.controls['empName'].setValue("");
        }
      },
        error => {
          Swal.fire({
            text: error.error.Message,
            icon: 'error',
            confirmButtonText: 'OK'
          });
        });
    }
  }
  validations() {
    if (this.acceptanceForm.controls.AWBNo.value == "" || this.acceptanceForm.controls.AWBNo.value == null) {
      Swal.fire({
        text: "Enter AWB No.",
        icon: 'error',
        confirmButtonText: 'OK'
      });
      this.validForm = false;
      return;
    }
    if (this.acceptanceForm.controls.airportID.value == "" || this.acceptanceForm.controls.airportID.value == null) {
      Swal.fire({
        text: "Select Airport",
        icon: 'error',
        confirmButtonText: 'OK'
      });
      this.validForm = false;
      return;
    }
    if (this.acceptanceForm.controls.ALCode.value == "" || this.acceptanceForm.controls.ALCode.value == null || this.acceptanceForm.controls.ALCode.value == "0") {
      Swal.fire({
        text: "Select Airline",
        icon: 'error',
        confirmButtonText: 'OK'
      });
      this.validForm = false;
      return;
    }
    if (this.acceptanceForm.controls.Destination.value == "" || this.acceptanceForm.controls.Destination.value == null) {
      Swal.fire({
        text: "Select Destination",
        icon: 'error',
        confirmButtonText: 'OK'
      });
      this.validForm = false;
      return;
    }
    if (this.acceptanceForm.controls.AWBType.value == "" || this.acceptanceForm.controls.AWBType.value == null) {
      Swal.fire({
        text: "Select AWB Type",
        icon: 'error',
        confirmButtonText: 'OK'
      });
      this.validForm = false;
      return;
    }
    if (this.acceptanceForm.controls.Pieces.value == "" || this.acceptanceForm.controls.Pieces.value == null) {
      Swal.fire({
        text: "Enter No. of Pieces",
        icon: 'error',
        confirmButtonText: 'OK'
      });
      this.validAWBFrom = false;
      return;
    }
    if (this.acceptanceForm.controls.goodsId.value == "" || this.acceptanceForm.controls.goodsId.value == null) {
      Swal.fire({
        text: "Select Nature of Good",
        icon: 'error',
        confirmButtonText: 'OK'
      });
      this.validAWBFrom = false;
      return;
    }
    if (this.acceptanceForm.controls.agentId.value == "" || this.acceptanceForm.controls.agentId.value == null) {
      Swal.fire({
        text: "Select Agent",
        icon: 'error',
        confirmButtonText: 'OK'
      });
      this.validAWBFrom = false;
      return;
    }
    if (this.acceptanceForm.controls.comid.value == "" || this.acceptanceForm.controls.comid.value == null) {
      Swal.fire({
        text: "Select Commodity",
        icon: 'error',
        confirmButtonText: 'OK'
      });
      this.validAWBFrom = false;
      return;
    }
    this.validForm = true;
  }
  validationsWeight() {
    if (this.acceptanceForm.controls.acceptanceID.value == "" || this.acceptanceForm.controls.acceptanceID.value == null) {
      Swal.fire({
        text: "Select or Save Acceptance First",
        icon: 'error',
        confirmButtonText: 'OK'
      });
      this.validFormWeight = false;
      return;
    }
    if (this.weightForm.controls.vehicleID.value == "" || this.weightForm.controls.vehicleID.value == null) {
      Swal.fire({
        text: "Select Vehicle",
        icon: 'error',
        confirmButtonText: 'OK'
      });
      this.validFormWeight = false;
      return;
    }
    if (this.weightForm.controls.vehNumer.value == "" || this.weightForm.controls.vehNumer.value == null) {
      Swal.fire({
        text: "Enter Vehicle No.",
        icon: 'error',
        confirmButtonText: 'OK'
      });
      this.validFormWeight = false;
      return;
    }
    if (this.weightForm.controls.driverName.value == "" || this.weightForm.controls.driverName.value == null) {
      Swal.fire({
        text: "Enter Driver Name",
        icon: 'error',
        confirmButtonText: 'OK'
      });
      this.validFormWeight = false;
      return;
    }
    if (this.weightForm.controls.driverCNIC.value == "" || this.weightForm.controls.driverCNIC.value == null) {
      Swal.fire({
        text: "Enter Driver CNIC",
        icon: 'error',
        confirmButtonText: 'OK'
      });
      this.validFormWeight = false;
      return;
    }
    this.validFormWeight = true;
  }
  addNewNatureOfGood() {
    this.router.navigate(['/Admin/Agents']);
  }
  addNewConsolidator() {
    this.router.navigate(['/Admin/Agents']);
  }
  validationsWeightdDIM() {
    if (this.acceptanceForm.controls.acceptanceID.value == "" || this.acceptanceForm.controls.acceptanceID.value == null) {
      Swal.fire({
        text: "Select or Save Acceptance First",
        icon: 'error',
        confirmButtonText: 'OK'
      });
      this.validFormWeightdim = false;
      return;
    }
    if (this.DimweightForm.controls.pieces.value == "" || this.DimweightForm.controls.pieces.value == null) {
      Swal.fire({
        text: "Enter No of Pieces",
        icon: 'error',
        confirmButtonText: 'OK'
      });
      this.validFormWeightdim = false;
      return;
    }
    if (this.DimweightForm.controls.length.value == "" || this.DimweightForm.controls.length.value == null) {
      Swal.fire({
        text: "Enter Length",
        icon: 'error',
        confirmButtonText: 'OK'
      });
      this.validFormWeightdim = false;
      return;
    }
    if (this.DimweightForm.controls.width.value == "" || this.DimweightForm.controls.width.value == null) {
      Swal.fire({
        text: "Enter Width",
        icon: 'error',
        confirmButtonText: 'OK'
      });
      this.validFormWeightdim = false;
      return;
    }
    if (this.DimweightForm.controls.height.value == "" || this.DimweightForm.controls.height.value == null) {
      Swal.fire({
        text: "Enter Height",
        icon: 'error',
        confirmButtonText: 'OK'
      });
      this.validFormWeightdim = false;
      return;
    }
    this.validFormWeightdim = true;
  }
  getShipperDetail() {
    var shipperDetail = this.shippereResponse.find(x => x.shipperId == this.houseForm.controls.shipperId_shipperId.value);
    if (shipperDetail != undefined) {
      this.ShipperForm.controls.shipperAddress.setValue(shipperDetail.shipperAddress);
      this.ShipperForm.controls.shipperPhoneNo.setValue(shipperDetail.PhoneNo);
      this.ShipperForm.controls.shipperEmailAddress.setValue(shipperDetail.emailAddress);
      this.ShipperForm.controls.ShippermobileNo.setValue(shipperDetail.mobileNo);
      this.ShipperForm.controls.shipperregionName.setValue(shipperDetail.regionName);
      this.ShipperForm.controls.shippercountryName.setValue(shipperDetail.countryName);
      this.ShipperForm.controls.shippercityName.setValue(shipperDetail.cityName);
      this.ShipperForm.controls.shipperCNIC.setValue(shipperDetail.CNIC);
    }
  }
  AwbDetailValidations() {
    if (this.acceptanceForm.controls.acceptanceID.value == "" || this.acceptanceForm.controls.acceptanceID.value == null) {
      Swal.fire({
        text: "Save the Acceptance First",
        icon: 'error',
        confirmButtonText: 'OK'
      });
      this.validAWBFrom = false;
      return;
    }
    if (this.AWBForm.controls.AWBNo.value == "" || this.AWBForm.controls.AWBNo.value == null) {
      Swal.fire({
        text: "Enter AWB No.",
        icon: 'error',
        confirmButtonText: 'OK'
      });
      this.validAWBFrom = false;
      return;
    }
    if (this.AWBForm.controls.Destination.value == "" || this.AWBForm.controls.Destination.value == null) {
      Swal.fire({
        text: "Enter Destination",
        icon: 'error',
        confirmButtonText: 'OK'
      });
      this.validAWBFrom = false;
      return;
    }
    if (this.AWBForm.controls.comid.value == "" || this.AWBForm.controls.comid.value == null) {
      Swal.fire({
        text: "Select Commodity",
        icon: 'error',
        confirmButtonText: 'OK'
      });
      this.validAWBFrom = false;
      return;
    }
    if (this.AWBForm.controls.consolidatorID.value == "" || this.AWBForm.controls.consolidatorID.value == null) {
      Swal.fire({
        text: "Select Consolidator",
        icon: 'error',
        confirmButtonText: 'OK'
      });
      this.validAWBFrom = false;
      return;
    }
    this.validAWBFrom = true;
  }
  searchAcceptance() {
  }
  editWeight(p) {
    this.showHideWeight("Edit");
    this.weightForm.patchValue(p);
  }
  editWeightDim(p) {
    this.showHideDimWeight("Edit");
    this.DimweightForm.patchValue(p);
  }
  /* #endregion */
  /* #region  Initialize All Forms */
  InitializeForm(): any {
    // Main Form
    this.acceptanceForm = new FormGroup({
      acceptanceID: new FormControl(""),
      ALCode: new FormControl("", [Validators.required]),
      ALName: new FormControl("", [Validators.required]),
      Destination: new FormControl("", [Validators.required]),
      Region: new FormControl("", [Validators.required]),
      AWBType: new FormControl("", [Validators.required]),
      Schedule: new FormControl("", [Validators.required]),
      AWBNo: new FormControl(""),
      DOBy: new FormControl(""),
      GDNo: new FormControl(""),
      Occurance: new FormControl(""),
      FurShipment: new FormControl(""),
      DNR: new FormControl(""),
      OvrShipment: new FormControl(""),
      holdShipment: new FormControl(""),
      otherAirline: new FormControl(""),
      otherAirlineCode: new FormControl(""),
      docNo: new FormControl(""),
      docDate: new FormControl(""),
      HandedDate: new FormControl(""),
      HandedTime: new FormControl(""),
      Status: new FormControl(""),
      AcceptanceRemarks: new FormControl(""),
      isNew: new FormControl(true),
      Abbr: new FormControl(""),
      searchID: new FormControl(""),
      goodsId: new FormControl("", [Validators.required]),
      cuttTime: new FormControl(""),
      grossWeight: new FormControl("", [Validators.required]),
      chargeableWeight: new FormControl(),
      dimensionalWeight: new FormControl("", [Validators.required]),
      Pieces: new FormControl("", [Validators.required]),
      comid: new FormControl(),
      agentId: new FormControl(),
      consolidatorID: new FormControl("", [Validators.required]),
      cid: new FormControl(),
      shipperId: new FormControl(),
      approvalStatus: new FormControl(),
      laodType: new FormControl(),
      airportID: new FormControl(),
    });
    this.AWBForm = new FormGroup({
      agentId: new FormControl(),
      comid: new FormControl(true),
      consolidatorID: new FormControl(true),
      cid: new FormControl(true),
      shipperId: new FormControl(true),
      AWBNo: new FormControl("", [Validators.required]),
      acceptanceID: new FormControl("", [Validators.required]),
      AgentType: new FormControl(),
      CNICNo: new FormControl('', [
        Validators.pattern("^[0-9]{13}$")]),
      CNICExp: new FormControl(),
      isNew: new FormControl(true),
      Destination: new FormControl(),
      shippercountryName: new FormControl(),
      shipperPhoneNo: new FormControl(),
      shipperAddress: new FormControl(),
      consigneeAddress: new FormControl(),
      consigneecountryName: new FormControl(),
      consigneePhoneNo: new FormControl(),
      agentAddress: new FormControl(),
      agentcountryName: new FormControl(),
      agentPhoneNo: new FormControl(),
      consolidatorCountryName: new FormControl(),
      consolidatorPhoneNo: new FormControl(),
      consolidatorAddress: new FormControl(),

    });
  }
  // Weight Form
  InitializeWeightForm(): any {
    this.weightForm = new FormGroup({
      weightDetailID: new FormControl(),
      acceptanceID: new FormControl(),
      AWBNo: new FormControl(),
      empID: new FormControl(),
      vehicleID: new FormControl(),
      firstWtdatetime: new FormControl(),
      secondWtdatetime: new FormControl(),
      vehNumer: new FormControl(""),
      driverName: new FormControl(""),
      driverCNIC: new FormControl('', [
        Validators.pattern("^[0-9]{13}$")]),
      firstWt: new FormControl(""),
      firstTime: new FormControl(""),
      firstDate: new FormControl(""),
      Status: new FormControl(""),
      secondWt: new FormControl(""),
      secondTime: new FormControl(""),
      secondDate: new FormControl(""),
      AWBWt: new FormControl(""),
      netWt: new FormControl(""),
      remarks: new FormControl(""),
      isNew: new FormControl(""),
    });
    this.AttachmentForm = new FormGroup({
      attType: new FormControl(""),
      atttypeID: new FormControl(""),
      moduleID: new FormControl(""),
    });
  }
  // Dim Weight Form
  InitializeDimWeightForm(): any {
    this.DimweightForm = new FormGroup({
      dimWeightID: new FormControl(),
      acceptanceID: new FormControl(),
      AWBNo: new FormControl(),
      pieces: new FormControl(""),
      length: new FormControl(""),
      width: new FormControl(""),
      height: new FormControl(""),
      CBM: new FormControl(""),
      remarks: new FormControl(""),
      isNew: new FormControl(""),
    });
  }
  // House Form
  InitializeHouseForm(): any {
    this.houseForm = new FormGroup({
      HNo: new FormControl(),
      HAWBNo: new FormControl(),
      acceptanceID: new FormControl(),
      flightID: new FormControl(),
      AWBNo: new FormControl(),
      chargeableWeight: new FormControl(),
      width: new FormControl(),
      height: new FormControl(),
      length: new FormControl(),
      pieces: new FormControl(),
      comid: new FormControl(),
      goodsIdHouse: new FormControl(),
      shipperId: new FormControl(),
      cid: new FormControl(),
      flightNo: new FormControl(),
      ALCode: new FormControl(),
      regNo: new FormControl(),
      depDate: new FormControl(),
      Destination: new FormControl(),
      depTime: new FormControl(),
      Nature: new FormControl(),
      shippercountryName: new FormControl(),
      shipperPhoneNo: new FormControl(),
      shipperAddress: new FormControl(),
      consigneeAddress: new FormControl(),
      consigneecountryName: new FormControl(),
      consigneePhoneNo: new FormControl(),
      isNew: new FormControl(true),
      goodsId: new FormControl(),
      airportID: new FormControl(),
    });
  }
  /* #endregion */
  /* #region  Show Hide Forms */
  showhide(callfrm: string) {
    if (callfrm == "New") {
      this.addnewAcceptance = true;
      this.showAcceptance = false;
      this.showCancelButton = true;
      this.showSaveButton = true;
      this.showeditButton = false;
      this.shownewButton = false;
      this.resetForm();
    }
    if (callfrm == "Cancel") {
      this.addnewAcceptance = false;
      this.showAcceptance = true;
      this.showCancelButton = false;
      this.showSaveButton = false;
      this.showeditButton = false;
      this.shownewButton = true;
      this.acceptanceForm.reset(this.acceptanceForm.value);
      this.resetForm();
    }
    if (callfrm == "Edit") {
      this.addnewAcceptance = true;
      this.showAcceptance = false;
      this.showCancelButton = true;
      this.showSaveButton = false;
      this.showeditButton = true;
      this.shownewButton = false;
      this.acceptanceForm.controls.isNew.setValue(false);
    }
  }
  showHideDimWeight(callfrm: string) {
    if (callfrm == "New") {
      this.addnewWeightDim = false;
      this.showWeightDim = true;
      this.showCancelButtonWeightDim = false;
      this.showSaveButtonWeightDim = false;
      this.showeditButtonWeightDim = true;
      this.shownewButtonWeightDim = true;
      this.DimweightForm.reset(false);
      this.DimweightForm.controls.isNew.setValue(true);
      this.DimweightForm.controls.AWBNo.setValue(this.AWBNo);
    }
    if (callfrm == "Cancel") {
      this.addnewWeightDim = true;
      this.showWeightDim = false;
      this.showCancelButtonWeightDim = true;
      this.showSaveButtonWeightDim = true;
      this.showeditButtonWeightDim = true;
      this.shownewButtonWeightDim = false;
      this.DimweightForm.reset(false);
      this.DimweightForm.controls.isNew.setValue(false);
    }
    if (callfrm == "Edit") {
      this.addnewWeightDim = false;
      this.showWeightDim = true;
      this.showCancelButtonWeightDim = false;
      this.showSaveButtonWeightDim = true;
      this.showeditButtonWeightDim = false;
      this.shownewButtonWeightDim = true;
      this.DimweightForm.controls.isNew.setValue(false);
    }
  }
  showHideWeight(callfrm: string) {
    if (callfrm == "New") {
      this.addnewWeight = false;
      this.showWeight = true;
      this.showNotice = true;
      this.showCancelButtonWeight = false;
      this.showSaveButtonWeight = false;
      this.showeditButtonWeight = true;
      this.shownewButtonWeight = true;
      this.weightForm.reset(false);
      this.weightForm.controls.vehicleID.setValue(1);

      this.weightForm.controls.isNew.setValue(true);
      this.weightForm.controls.AWBNo.setValue(this.acceptanceForm.controls.AWBNo.value);
    }
    if (callfrm == "Cancel") {
      this.addnewWeight = true;
      this.showWeight = false;
      this.showNotice = false;
      this.showCancelButtonWeight = true;
      this.showSaveButtonWeight = true;
      this.showeditButtonWeight = true;
      this.shownewButtonWeight = false;
      this.weightForm.reset(false);
      this.weightForm.controls.vehicleID.setValue("1");

      this.weightForm.controls.isNew.setValue(true);
    }
    if (callfrm == "Edit") {
      this.addnewWeight = false;
      this.showWeight = true;
      this.showNotice = true;
      this.showCancelButtonWeight = false;
      this.showSaveButtonWeight = true;
      this.showeditButtonWeight = false;
      this.shownewButtonWeight = true;

      this.weightForm.controls.isNew.setValue(false);
    }
  }
  showHideATT(callfrm: string) {
    if (callfrm == "New") {
      this.addnewAtt = false;
      this.showAtt = true;
      this.showCancelButtonAtt = false;
      this.showSaveButtonAtt = false;
      this.showeditButtonAtt = true;
      this.shownewButtonAtt = true;
      // this.requestGoods.isNew = true;
      // this.requestAgent.isNew = true;
    }
    if (callfrm == "Cancel") {
      this.addnewAtt = true;
      this.showAtt = false;
      this.showCancelButtonAtt = true;
      this.showSaveButtonAtt = true;
      this.showeditButtonAtt = true;
      this.shownewButtonAtt = false;
      // this.requestGoods.isNew = false;
      // this.requestAgent.isNew = false;
    }
    if (callfrm == "Edit") {
      this.addnewAtt = false;
      this.showAtt = true;
      this.showCancelButtonAtt = false;
      this.showSaveButtonAtt = true;
      this.showeditButtonAtt = false;
      this.shownewButtonAtt = true;
      // this.requestGoods.isNew = false;
      // this.requestAgent.isNew = false;
    }
  }
  showHideHouse(callfrm: string) {
    if (callfrm == "New") {
      this.addnewHouse = false;
      this.showHouse = true;
      this.showCancelButtonHouse = false;
      this.showSaveButtonHouse = false;
      this.showeditButtonHouse = true;
      this.shownewButtonHouse = true;
      // this.requestGoods.isNew = true;
      // this.requestAgent.isNew = true;
      this.houseForm.reset(false);
      this.houseForm.controls.isNew.setValue(true);
    }
    if (callfrm == "Cancel") {
      this.addnewHouse = true;
      this.showHouse = false;
      this.showCancelButtonHouse = true;
      this.showSaveButtonHouse = true;
      this.showeditButtonHouse = true;
      this.shownewButtonHouse = false;
      // this.requestGoods.isNew = false;
      // this.requestAgent.isNew = false;
      this.houseForm.controls.isNew.setValue(false);
      this.houseForm.reset(false);
    }
    if (callfrm == "Edit") {
      this.addnewHouse = false;
      this.showHouse = true;
      this.showCancelButtonHouse = false;
      this.showSaveButtonHouse = true;
      this.showeditButtonHouse = false;
      this.shownewButtonHouse = true;
      // this.requestGoods.isNew = false;
      // this.requestAgent.isNew = false;
      this.houseForm.controls.isNew.setValue(false);
    }
  }
  /* #endregion */
  /* #region  Notify - Get Data from Diaglog Box*/
  notifyAWB(value) {
    var Exists = this.responseGoods.find(x => x.goodsId == value.goodsId);
    if (Exists == undefined) {
      this.responseGoods.push(value);
    }
    this.GoodsID = value.goodsId;
    this.acceptanceForm.controls.goodsId.setValue(value.goodsId);
    this.closeNatureOfGoodsModal["first"].nativeElement.click();
    this.GV.GoodsCallFrom = "";
  }
  notifyNewAgentTab1(value) {
    var Exists = this.agentsResponse.find(x => x.agentId == value.agentId);
    if (Exists == undefined) {
      this.agentsResponse.push(value);
    }
    this.agentId = value.agentId;
    this.acceptanceForm.controls.agentId.setValue(value.agentId);
    this.closeAgentsModal["first"].nativeElement.click();
    this.GV.GoodsCallFrom = "";
  }
  notifyNewAgentTab2(value) {
    var Exists = this.ConsolidatorResponse.find(x => x.agentId == value.agentId);
    if (Exists == undefined) {
      this.ConsolidatorResponse.push(value);
    }
    // this.AgentIDForTab1 = value.agentId;
    this.AWBForm.controls.agentId.setValue(value.agentId);
    this.getConsolidatorDetailAWB();
    this.closeConsolidatorModal["first"].nativeElement.click();
    this.GV.GoodsCallFrom = "";
  }
  notifyComid(value) {
    var Exists = this.responseCommodity.find(x => x.comid == value.comid);
    if (Exists == undefined) {
      this.responseCommodity.push(value);
    }
    this.ComidID = value.comid;
    this.acceptanceForm.controls.comid.setValue(value.comid);
    this.closeCommodityModal["first"].nativeElement.click();
    this.GV.GoodsCallFrom = "";
  }
  notifyShipper(value) {
    var Exists = this.shippereResponse.find(x => x.shipperId == value.shipperId);
    if (Exists == undefined) {
      this.shippereResponse.push(value);
    }
    //this.ShipperID = value.shipperId;
    if (this.showShipper == false) {
      this.AWBForm.controls.shipperId.setValue(value.shipperId);
      this.getShipperDetailAWB();
    }
    else {
      this.houseForm.controls.shipperId.setValue(value.shipperId);
      this.getShipperDetailHouse();
    }
    this.closeShipperModal["first"].nativeElement.click();
    this.GV.GoodsCallFrom = "";
  }

  notifyConsignee(value) {
    var Exists = this.consigneeResponse.find(x => x.cid == value.cid);
    if (Exists == undefined) {
      this.consigneeResponse.push(value);
    }
    //this.ConsigneeID = value.cid;
    if (this.showConsignee == true) {
      this.houseForm.controls.cid.setValue(value.cid);
      this.getConsigneeDetailHouse();
    }
    else {
      this.AWBForm.controls.cid.setValue(value.cid);
      this.getConsigneeDetailAWB();
    }
    this.closeConsigneeModal["first"].nativeElement.click();
    this.GV.GoodsCallFrom = "";
  }
  setConsigneeDetail(status) {
    if (status == "AWB") {
      this.showConsignee = false;
    } else {
      this.showConsignee = true;
    }
  }
  setShipperDetail(status) {
    if (status == "AWB") {
      this.showShipper = false;
    } else {
      this.showShipper = true;
    }
  }
  /* #endregion */
  /* #region  Save Calls */
  // Save Consignee
  // saveConsignee() {
  //   if (this.AWBForm.controls.AWBID.value == "" || this.AWBForm.controls.AWBID.value == null) {
  //     Swal.fire({
  //       text: "Save the AWB Detail First",
  //       icon: 'error',
  //       confirmButtonText: 'OK'
  //     });
  //     return;
  //   }
  //   if (this.CosigneeForm.controls.cid.value == "" || this.CosigneeForm.controls.cid.value == null) {
  //     Swal.fire({
  //       text: "Select Consignee",
  //       icon: 'error',
  //       confirmButtonText: 'OK'
  //     });
  //     return;
  //   }
  //   this.CosigneeForm.controls.AWBID.setValue(this.AWBForm.controls.AWBID.value);
  //   this.API.PostData('/Acceptance/saveConsignee', this.CosigneeForm.value).subscribe(c => {
  //     if (c != null) {
  //       Swal.fire({
  //         text: "Consignee Saved Successfully",
  //         icon: 'success',
  //         confirmButtonText: 'OK'
  //       });
  //     }
  //   },
  //     error => {
  //       Swal.fire({
  //         text: error.error.Message,
  //         icon: 'error',
  //         confirmButtonText: 'OK'
  //       });
  //     });
  // }
  SaveAcceptance(call: string) {
    this.validations();
    if (this.validForm == true) {
      if (call == "New") {
        this.acceptanceForm.controls.isNew.setValue(true);
      }
      else {
        this.acceptanceForm.controls.isNew.setValue(false);
      }
      if (this.acceptanceForm.controls.isNew.value == true) {
        this.API.PostData('/Acceptance/SaveAcceptance', this.acceptanceForm.value).subscribe(c => {
          if (c != null) {
            this.acceptanceForm.controls.acceptanceID.setValue(c.Message);
            this.acceptanceForm.controls.isNew.setValue(false);
            this.editMode = true;
            Swal.fire({
              text: "AWB Detail Saved Successfully",
              icon: 'success',
              confirmButtonText: 'OK'
            });
            this.AWBForm.controls.AWBNo.setValue(this.acceptanceForm.controls.AWBNo.value);
          }
        },
          error => {
            Swal.fire({
              text: error.error.Message,
              icon: 'error',
              confirmButtonText: 'OK'
            });
          });
      }
      else {
        this.API.PostData('/Acceptance/EditAcceptance', this.acceptanceForm.value).subscribe(c => {
          if (c != null) {
            this.acceptanceForm.controls.acceptanceID.setValue(c.Message);
            this.acceptanceForm.controls.isNew.setValue(false);
            this.editMode = true;
            Swal.fire({
              text: "AWB Detail Updated Successfully",
              icon: 'success',
              confirmButtonText: 'OK'
            });
            this.AWBForm.controls.AWBNo.setValue(this.acceptanceForm.controls.AWBNo.value);
          }
        },
          error => {
            Swal.fire({
              text: error.error.Message,
              icon: 'error',
              confirmButtonText: 'OK'
            });
          });
      }
    }
  }
  saveWeight() {
    this.validationsWeight();
    if (this.validFormWeight == true) {
      this.weightForm.controls.AWBNo.setValue(this.acceptanceForm.controls.AWBNo.value);
      this.weightForm.controls.acceptanceID.setValue(this.acceptanceForm.controls.acceptanceID.value);
      this.API.PostData('/Acceptance/saveweightDetail', this.weightForm.value).subscribe(c => {
        Swal.fire({
          text: "Weight Added Successfully",
          icon: 'success',
          confirmButtonText: 'OK'
        });
        this.showHideWeight("Cancel");
        this.getWeightDetail();
      },
        error => {
          Swal.fire({
            text: error.error.Message,
            icon: 'error',
            confirmButtonText: 'OK'
          });
        });
    }
  }
  saveWeightDIM(status) {
    this.validationsWeightdDIM();
    if (this.validFormWeightdim == true) {
      if (status == "New") {
        this.DimweightForm.controls.isNew.setValue(true);
      }
      else {
        this.DimweightForm.controls.isNew.setValue(false);
      }
      this.DimweightForm.controls.acceptanceID.setValue(this.acceptanceForm.controls.acceptanceID.value);
      this.DimweightForm.controls.AWBNo.setValue(this.acceptanceForm.controls.AWBNo.value);
      this.API.PostData('/Acceptance/saveDimWt', this.DimweightForm.value).subscribe(c => {
        Swal.fire({
          text: "Dimensional Weight Added Successfully",
          icon: 'success',
          confirmButtonText: 'OK'
        });
        this.showHideDimWeight("Cancel");
        this.getDimWeight();
      },
        error => {
          Swal.fire({
            text: error.error.Message,
            icon: 'error',
            confirmButtonText: 'OK'
          });
        });
    }
  }
  saveAWBDetail() {
    this.AwbDetailValidations();
    if (this.validAWBFrom) {
      if (this.AWBForm.controls.AWBID.value == "" || this.AWBForm.controls.AWBID.value == null) {
        this.AWBForm.controls.isNew.setValue(true);
      }
      else {
        this.AWBForm.controls.isNew.setValue(false);
      }
      this.AWBForm.controls.acceptanceID.setValue(this.acceptanceForm.controls.acceptanceID.value);
      this.API.PostData('/Acceptance/addawbDetail', this.AWBForm.value).subscribe(c => {
        if (c != null) {
          this.AWBForm.controls.AWBID.setValue(c.AWBID);
          Swal.fire({
            text: "Airbill Detail Updated Successfully",
            icon: 'success',
            confirmButtonText: 'OK'
          });
        }
      },
        error => {
          Swal.fire({
            text: error.error.Message,
            icon: 'error',
            confirmButtonText: 'OK'
          });
        });
    }
  }
  saveHouse(status) {
    if (this.acceptanceForm.controls.acceptanceID.value == "" || this.acceptanceForm.controls.acceptanceID.value == null) {
      Swal.fire({
        text: "Save AWB Detail First",
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }
    if (this.houseForm.controls.HAWBNo.value == "" || this.houseForm.controls.HAWBNo.value == null) {
      Swal.fire({
        text: "Enter House No.",
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }
    if (this.houseForm.controls.pieces.value == "" || this.houseForm.controls.pieces.value == null) {
      Swal.fire({
        text: "Enter No of Pieces",
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }
    if (this.houseForm.controls.length.value == "" || this.houseForm.controls.length.value == null) {
      Swal.fire({
        text: "Enten Length",
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }
    if (this.houseForm.controls.width.value == "" || this.houseForm.controls.width.value == null) {
      Swal.fire({
        text: "Enter Width",
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }
    if (this.houseForm.controls.height.value == "" || this.houseForm.controls.height.value == null) {
      Swal.fire({
        text: "Enter Height",
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }
    if (this.houseForm.controls.shipperId.value == "" || this.houseForm.controls.shipperId.value == null) {
      Swal.fire({
        text: "Select Shipper",
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }
    if (this.houseForm.controls.goodsId.value == "" || this.houseForm.controls.goodsId.value == null) {
      Swal.fire({
        text: "Select Nature of Good",
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }
    if (this.houseForm.controls.cid.value == "" || this.houseForm.controls.cid.value == null) {
      Swal.fire({
        text: "Select Consignee",
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }
    if (this.houseForm.controls.pieces.value > this.acceptanceForm.controls.Pieces.value) {
      Swal.fire({
        text: "No. of Pieces cannot be greater than Master",
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }
    if (this.houseForm.controls.chargeableWeight.value > this.acceptanceForm.controls.chargeableWeight.value) {
      Swal.fire({
        text: "House Chargeable Weight cannot be greater than Master",
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }
    this.houseForm.controls.acceptanceID.setValue(this.acceptanceForm.controls.acceptanceID.value);
    this.houseForm.controls.AWBNo.setValue(this.acceptanceForm.controls.AWBNo.value);
    this.houseForm.controls.airportID.setValue(this.acceptanceForm.controls.airportID.value);

    if (status == "New") {
      this.API.PostData('/Acceptance/SaveHouse', this.houseForm.value).subscribe(c => {
        if (c != null) {
          Swal.fire({
            text: "House Saved Successfully",
            icon: 'success',
            confirmButtonText: 'OK'
          });
          this.showHideHouse("Cancel");
          this.getHouseDetail();
        }
      },
        error => {
          Swal.fire({
            text: error.error.Message,
            icon: 'error',
            confirmButtonText: 'OK'
          });
        });
    }
    else {
      this.API.PostData('/Acceptance/EditHouse', this.houseForm.value).subscribe(c => {
        if (c != null) {
          Swal.fire({
            text: "House Updated Successfully",
            icon: 'success',
            confirmButtonText: 'OK'
          });
          this.showHideHouse("Cancel");
          this.getHouseDetail();
        }
      },
        error => {
          Swal.fire({
            text: error.error.Message,
            icon: 'error',
            confirmButtonText: 'OK'
          });
        });
    }

  }
  /* #endregion */
  /* #region  Get Data Calls */
  getNoticeTypes() {
    this.noticeTypesRequest.ALCode = this.acceptanceForm.controls.ALCode.value;
    this.noticeTypesRequest.goodsId = this.acceptanceForm.controls.goodsId.value;
    this.API.PostData('/Acceptance/getNoticeTypes', this.noticeTypesRequest).subscribe(c => {
      if (c != null) {
        this.InquiryResponse = c;
        this.noticeTypeArrlen = this.InquiryResponse.length;
      }
    },
      error => {
        Swal.fire({
          text: error.error.Message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  }
  getDimWeight() {
    this.API.getdata('/Acceptance/getDimWeight?acceptanceID=' + this.acceptanceForm.controls.acceptanceID.value).subscribe(c => {
      if (c != null) {
        this.dimWeightResponse = c;
        for (let i = 0; i < this.dimWeightResponse.length; i++) {
          this.ChargeableWeight = this.ChargeableWeight + this.dimWeightResponse[i].CBM;
        }
        this.acceptanceForm.controls.chargeableWeight.setValue(Math.round(this.ChargeableWeight));
      }
    },
      error => {
        Swal.fire({
          text: error.error.Message,
          icon: 'error',
          confirmButtonText: 'OK'
        })
      });
  }
  getHouseDetail() {
    this.API.getdata('/Acceptance/getHouseDetail?acceptanceID=' + this.acceptanceForm.controls.acceptanceID.value).subscribe(c => {
      if (c != null) {
        this.HouseAWB = c.houseList;
      }
    },
      error => {
        Swal.fire({
          text: error.error.Message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  }
  getAttachments() {
    this.API.getdata('/Acceptance/getAcceptanceAttachments?acceptanceID=' + this.acceptanceForm.controls.acceptanceID.value).subscribe(c => {
      if (c != null) {
        this.attachmentResponse = c.attList;
      }
    },
      error => {
        Swal.fire({
          text: error.error.Message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  }
  getConsignees() {
    this.API.getdata('/Master/getConsignees?airportID=' + this.acceptanceForm.controls.airportID.value).subscribe(c => {
      if (c != null) {
        this.consigneeResponse = c.consigneeList;
        this.defaultConsigneeResponse.cid = 0;
        this.defaultConsigneeResponse.consigneeName = "Select Consignee";
        this.consigneeResponse.push(this.defaultConsigneeResponse);
        if(this.editMode==false) {
        this.acceptanceForm.controls.cid.setValue(0);
        this.houseForm.controls.cid.setValue(0);
        }

        this.consigneeResponseTable = c.consigneeList;
      }
    },
      error => {
        Swal.fire({
          text: error.error.Message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  }
  getAgents() {
    this.API.getdata('/Master/getAgents?airportID=' + this.acceptanceForm.controls.airportID.value).subscribe(c => {
      if (c != null) {
        this.agentsResponse = c.agentList;
        this.defaultAgentsResponse.agentId = '0';
        this.defaultAgentsResponse.agentName = "Select Agent";
        this.agentsResponse.push(this.defaultAgentsResponse);
        if(this.editMode==false) {
        this.acceptanceForm.controls.agentId.setValue(0);
        }

        this.agentsResponseList = c.agentList;
      }
    },
      error => {
        Swal.fire({
          text: error,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  }
  getAirLines() {
    this.API.getdata('/Master/getAirLines').subscribe(c => {
      if (c != null) {
        this.responseAirLines = c.airlineList;
        this.defaultAirline.ALCode = 0;
        this.defaultAirline.ALName = "Select Airline";
        this.responseAirLines.push(this.defaultAirline);
        this.acceptanceForm.controls.ALCode.setValue(0);
      }
    },
      error => {
        Swal.fire({
          text: error.error.Message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  }
  public saveNotice() {
    for (let i = 0; i < this.InquiryResponse.length; i++) {
      if (this.InquiryResponse[i].NA == null) {
        this.InquiryResponse[i].NA = false;
      }
      if (this.InquiryResponse[i].IsPending == null) {
        this.InquiryResponse[i].IsPending = false;
      }
      if (this.InquiryResponse[i].IsRevieved == null) {
        this.InquiryResponse[i].IsRevieved = false;
      }
      if (this.InquiryResponse[i].mandatory == null) {
        this.InquiryResponse[i].mandatory = false;
      }
      this.InquiryResponse[i].acceptanceID = this.acceptanceForm.controls.acceptanceID.value;
    }
    this.API.PostData('/Acceptance/addAwbNotice', this.InquiryResponse).subscribe(c => {
      if (c != null) {
        Swal.fire({
          text: "Notice Types Saved Successfully.",
          icon: 'success',
          confirmButtonText: 'OK'
        });
      }
    },
      error => {
        Swal.fire({
          text: error.error.Message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  }
  getGoods() {
    this.API.getdata('/Master/getNatofGoods').subscribe(c => {
      if (c != null) {
        this.responseGoods = c.NatureList;
        this.data = c.NatureList;
        this.defaultGoods.goodsId = 0;
        this.defaultGoods.Nature = "Select Nature of Good";
        this.responseGoods.push(this.defaultGoods);
        this.acceptanceForm.controls.goodsId.setValue(0);
        this.houseForm.controls.goodsId.setValue(0);

        this.defaultAirline.ALCode = 0;
        this.defaultAirline.ALName = "Select Airline";
        this.responseAirLines.push(this.defaultAirline);
        this.acceptanceForm.controls.ALCode.setValue(0);
      }
    },
      error => {
        Swal.fire({
          text: error.error.Message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  }
  getCommodity() {
    this.API.getdata('/Master/getCommodity?airportID=' + this.acceptanceForm.controls.airportID.value).subscribe(c => {
      if (c != null) {
        this.responseCommodity = c.commodityList;
        this.defaultCommodityResponse.comid = 0;
        this.defaultCommodityResponse.comm_description = "Select Commodity";
        this.responseCommodity.push(this.defaultCommodityResponse);
        if(this.editMode==false) {
        this.acceptanceForm.controls.comid.setValue(0);
        }
        this.responseCommodityList = c.commodityList;
      }
    },
      error => {
        Swal.fire({
          text: error.error.Message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  }
  getConsolidator() {
    this.API.getdata('/Generic/getConsolidator').subscribe(c => {
      if (c != null) {
        this.ConsolidatorResponse = c;
      }
    },
      error => {
        Swal.fire({
          text: error,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  }
  getWeightDetail() {
    this.getWeight.acceptanceID = this.acceptanceForm.controls.acceptanceID.value;
    this.API.PostData('/Acceptance/getWeight', this.getWeight).subscribe(c => {
      if (c != null) {
        this.weightResponseModel.weightDetailResponse = c.weightDetailResponse;
        for (let i = 0; i < this.weightResponseModel.weightDetailResponse.length; i++) {
          this.TotalNetWeight = this.TotalNetWeight + (+this.weightResponseModel.weightDetailResponse[i].netWt);
        }
        this.acceptanceForm.controls.grossWeight.setValue(this.TotalNetWeight);
        this.TotalNetWeight = 0;
      }
    },
      error => {
        Swal.fire({
          text: error.error.Message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  }
  getVehicleTypes() {
    this.API.getdata('/Setups/getVehicles').subscribe(c => {
      if (c != null) {
        this.vehicleResponse = c;
      }
    },
      error => {
        Swal.fire({
          text: error.error.Message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  }
  getShippers() {
    this.API.getdata('/Master/getShippers?airportID=' + this.acceptanceForm.controls.airportID.value).subscribe(c => {
      if (c != null) {
        this.shippereResponse = c.shipperList;
        this.defaultShippereResponse.shipperId = 0;
        this.defaultShippereResponse.shipperName = "Select Shipper";
        this.shippereResponse.push(this.defaultShippereResponse);
        if(this.editMode==false) {
        this.acceptanceForm.controls.shipperId.setValue(0);
        this.houseForm.controls.shipperId.setValue(0);
        }
        this.shippereResponseList = c.shipperList;
      }
    },
      error => {
        Swal.fire({
          text: error.error.Message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  }
  validationForSearch() {
    if (this.AWBNo == "" || this.AWBNo == null || this.AWBNo == undefined) {
      Swal.fire({
        text: "Enter AWB No.",
        icon: 'error',
        confirmButtonText: 'OK'
      });
      this.validInputSearch = false;
      return;
    }
    this.validInputSearch = true;
  }
  setModalState(state: any) {
    if (state == 'notifyAWB') {
      this.notifyAWBState = true;
      this.notifyNewAgentTab2State = false;
      this.notifyComidState = false;
      this.notifyNewAgentTab1State = false;
      this.notifyShipperState = false;
      this.notifyConsigneeState = false;
    }
    if (state == 'notifyNewAgentTab2') {
      this.notifyAWBState = false;
      this.notifyNewAgentTab2State = true;
      this.notifyComidState = false;
      this.notifyNewAgentTab1State = false;
      this.notifyShipperState = false;
      this.notifyConsigneeState = false;
    }
    if (state == 'notifyComid') {
      this.notifyAWBState = false;
      this.notifyNewAgentTab2State = false;
      this.notifyComidState = true;
      this.notifyNewAgentTab1State = false;
      this.notifyShipperState = false;
      this.notifyConsigneeState = false;
    }
    if (state == 'notifyNewAgentTab1') {
      this.notifyAWBState = false;
      this.notifyNewAgentTab2State = false;
      this.notifyComidState = false;
      this.notifyNewAgentTab1State = true;
      this.notifyShipperState = false;
      this.notifyConsigneeState = false;
    }
    if (state == 'notifyShipper') {
      this.notifyAWBState = false;
      this.notifyNewAgentTab2State = false;
      this.notifyComidState = false;
      this.notifyNewAgentTab1State = false;
      this.notifyShipperState = true;
      this.notifyConsigneeState = false;
    }
    if (state == 'notifyConsignee') {
      this.notifyAWBState = false;
      this.notifyNewAgentTab2State = false;
      this.notifyComidState = false;
      this.notifyNewAgentTab1State = false;
      this.notifyShipperState = false;
      this.notifyConsigneeState = true;
    }
  }
  getAWBDetail() {
    this.validationForSearch();
    if (this.validInputSearch == true) {
      this.API.getdata('/Acceptance/searchAcceptance?AWBNo=' + this.AWBNo).subscribe(x => {
        if (x != null) {
       
          this.editMode = true;
          this.AcceptanceDetailModel.AcceptanceDetail = x.acceptanceList[0];
          this.acceptanceForm.controls.airportID.setValue(this.AcceptanceDetailModel.AcceptanceDetail.airportID);
          this.getAllData();
          this.showHideATT("Cancel");
          this.showHideHouse("Cancel");
          this.acceptanceForm.patchValue(this.AcceptanceDetailModel.AcceptanceDetail);
          this.getAttachments();
          this.getHouseDetail();
          this.selectAirline();
        }
      },
        error => {
          this.resetAcceptance();
          Swal.fire({
            text: "Enter Correct AWB No.",
            icon: 'error',
            confirmButtonText: 'OK'
          });
        });
    }
    /* #endregion */
  }
  resetAcceptance() {
    this.showhide("New");
    this.showHideDimWeight("New");
    this.showHideATT("New");
    this.showHideHouse("New");
    this.showHideWeight("New");
    this.getAirLines();
    this.getAirports();
    this.getGoods();
    this.AWBForm.reset();
    this.weightResponseModel = new weightResponseModel();
    this.dimWeightResponse = [];
    this.HouseAWB = [];
    this.attachmentResponse = [];
    this.editMode = false;
    this.AWBNo = "";
    this.acceptanceForm.enable();
    this.AWBForm.enable();
    this.weightForm.enable();
    this.DimweightForm.enable();
    this.houseForm.enable();
    this.acceptanceForm.controls.ALCode.enable();
    this.acceptanceForm.get("otherAirlineCode").setValue(0);
    this.acceptanceForm.controls.approvalStatus.setValue(4);
    this.delivered = false;
    this.InquiryResponse = [];
    this.destroyDT(0, true);

  }
  // otherAirlineChecked(otherAirline: boolean) {
  //   if (otherAirline) {
  //     this.acceptanceForm.get("otherAirlineCode").enable();
  //     let body = {
  //       noticetypeID: "40",
  //       mandatory: false,
  //       noticeType: 'TRM',
  //       IsRevieved: false,
  //       IsPending: false,
  //       NA: false,
  //       acceptanceID: this.acceptanceForm.controls.acceptanceID.value,
  //       noticeID: null,
  //       noticedetailID: "85",
  //     }
  //     this.InquiryResponse.push(body);
  //   }
  //   else {
  //     this.acceptanceForm.get("otherAirlineCode").reset();
  //     this.acceptanceForm.get("otherAirlineCode").disable();
  //     if (this.noticeTypeArrlen != this.InquiryResponse.length) {
  //       this.InquiryResponse.pop();
  //     }
  //   }
  // }
  calculateCBM() {
    this.CBM = (this.DimweightForm.controls.length.value) * (this.DimweightForm.controls.width.value) * (this.DimweightForm.controls.height.value) * (this.DimweightForm.controls.pieces.value) / 1000000;
    this.DimweightForm.controls.CBM.setValue(Math.floor(this.CBM));
  }
  setCuttoffTime() {
    var cutofTime = this.responseGoods.find(x => x.goodsId == this.acceptanceForm.controls.goodsId.value);
    if (cutofTime != undefined) {
      if (cutofTime.cutTime != null) {
        this.acceptanceForm.controls.cuttTime.setValue(cutofTime.cutTime);
      }
    }
  }

  disableAllForms() {
    this.delivered = true;
    this.acceptanceForm.disable();
    this.AWBForm.disable();
    this.weightForm.disable();
    this.DimweightForm.disable();
    this.houseForm.disable();
    this.AttachmentForm.disable();
  }
  getWeightfromScale(callFrom: string) {
    if (callFrom == "1") {
      this.API.getdata('/Generic/GetWeightScale?locationName=Acceptance').subscribe(c => {
        if (c != null) {
          this.weightForm.controls.firstWt.setValue(c.weight);
          this.weightForm.get('firstWtdatetime').patchValue(c.weightDateTime.slice(0, 16));
          this.calculateNetWeight();
        }
      },
        error => {
          Swal.fire({
            text: error.error.Message,
            icon: 'error',
            confirmButtonText: 'OK'
          });
        });
    }
    if (callFrom == "2") {
      this.API.getdata('/Generic/GetWeightScale?locationName=Acceptance').subscribe(c => {
        if (c != null) {
          this.weightForm.controls.secondWt.setValue(c.weight)
          this.weightForm.get('secondWtdatetime').patchValue(c.weilghtDateTime.slice(0, 16));
          this.calculateNetWeight();
        }
      },
        error => {
          Swal.fire({
            text: error.error.Message,
            icon: 'error',
            confirmButtonText: 'OK'
          });
        });
    }
  }
  selectAirline() {
    var prefixString = this.acceptanceForm.controls.AWBNo.value;
    if (prefixString != null) {
      var prefix = prefixString.substring(0, 3);
      var airline = this.responseAirLines.find(x => x.Prefix == prefix);
      if (airline != null) {
        this.acceptanceForm.controls.ALCode.setValue(airline.ALCode);
      //  this.acceptanceForm.controls.ALCode.disable();
        this.setDestination();
      }
      else {
        this.acceptanceForm.controls.ALCode.setValue("0");
        this.acceptanceForm.controls.ALCode.enable();
      }
    }
    else {
      this.acceptanceForm.controls.ALCode.setValue("0");
      this.acceptanceForm.controls.ALCode.enable();
    }
  }
  setDestination() {
    var Destination = this.responseAirLines.find(x => x.ALCode == this.acceptanceForm.controls.ALCode.value);
    if (Destination != undefined) {
      if (Destination.hub != null) {
        this.acceptanceForm.controls.Destination.setValue(Destination.hub);
      }
      else {
        this.acceptanceForm.controls.Destination.setValue("");
      }
    }
    else {
      this.acceptanceForm.controls.Destination.setValue("");
    }
  }
  getAcceptanceWeight(p) {
    if (p.weightDetailID != null) {
      this.requestWeightRPT.weightDetailID = p.weightDetailID;
      // this.API.downloadFile('/Reports/getAcceptanceWeightReport', this.requestWeightRPT).subscribe(
      this.API.downloadFile('/Reports/getUWS', this.requestWeightRPT).subscribe(
        data => {
          this.src = data; // pdfSrc can be Blob or Uint8Array
          // this.pdfViewer.refresh(); // Ask pdf viewer to load/refresh pdf
        }
        , error => {
          Swal.fire({
            text: error.error.Message,
            icon: 'error',
            confirmButtonText: 'OK'
          });
        });
    }
  }
  getConsigneeDetailAWB() {
    var consigneeDetail = this.consigneeResponse.find(x => x.cid == this.AWBForm.controls.cid.value);
    if (consigneeDetail != undefined) {
      this.AWBForm.controls.consigneeAddress.setValue(consigneeDetail.consigneeAddress);
      this.AWBForm.controls.consigneePhoneNo.setValue(consigneeDetail.PhoneNo);
      this.AWBForm.controls.consigneecountryName.setValue(consigneeDetail.countryName);
    }
  }
  // getAgentDetailAWB() {
  //   var agentDetail = this.agentsResponse.find(x => x.agentId == this.AWBForm.controls.agentId.value);
  //   if (agentDetail != undefined) {
  //     this.AWBForm.controls.agentAddress.setValue(agentDetail.agentAddress);
  //     this.AWBForm.controls.agentPhoneNo.setValue(agentDetail.PhoneNo);
  //     this.AWBForm.controls.agentcountryName.setValue(agentDetail.countryName);
  //   }
  // }
  getShipperDetailAWB() {
    var shipperDetail = this.shippereResponse.find(x => x.shipperId == this.AWBForm.controls.shipperId.value);
    if (shipperDetail != undefined) {
      this.AWBForm.controls.shipperAddress.setValue(shipperDetail.shipperAddress);
      this.AWBForm.controls.shipperPhoneNo.setValue(shipperDetail.PhoneNo);
      this.AWBForm.controls.shippercountryName.setValue(shipperDetail.countryName);
    }
  }
  getConsolidatorDetailAWB() {
    var consolidatorDetail = this.ConsolidatorResponse.find(x => x.agentId == this.AWBForm.controls.agentId.value);
    if (consolidatorDetail != undefined) {
      this.AWBForm.controls.consolidatorID.setValue(consolidatorDetail.agentId);
      this.AWBForm.controls.consolidatorAddress.setValue(consolidatorDetail.agentAddress);
      this.AWBForm.controls.consolidatorPhoneNo.setValue(consolidatorDetail.PhoneNo);
      this.AWBForm.controls.consolidatorCountryName.setValue(consolidatorDetail.countryName);
    }
  }
  getAttTypes() {
    this.API.getdata('/Master/getAttTypes').subscribe(c => {
      if (c != null) {
        this.AttachmentTypes = c.attTypeList;
        this.AttachmentForm.controls.atttypeID.setValue(0);
      }
    },
      error => {
        Swal.fire({
          text: error.error.Message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  }
  setFirstTime() {
    if (this.weightForm.controls.firstWt.value != "") {
      this.weightForm.get('firstWtdatetime').setValue(this.date);
    }
    else {
      this.weightForm.get('firstWtdatetime').reset();
    }
  }
  setSecondTime() {
    if (this.weightForm.controls.secondWt.value != "") {
      this.weightForm.get('secondWtdatetime').setValue(this.date);
    }
    else {
      this.weightForm.get('secondWtdatetime').reset();
    }
  }
  getDriverDetail() {
    if (this.weightForm.controls.driverCNIC.value != null) {

      this.API.getdata('/Generic/getDriverDetail?Cnic=' + this.weightForm.controls.driverCNIC.value).subscribe(c => {
        if (c != null) {
          this.responseDriver = c;
          this.weightForm.controls.driverName.setValue(this.responseDriver.driverName)
          this.weightForm.controls.vehNumer.setValue(this.responseDriver.vehNumer)
        }
      },
        error => {
          Swal.fire({
            text: error.error.Message,
            icon: 'error',
            confirmButtonText: 'OK'
          });
        });
    }
  }
  verifyAgent() {
    var agentInfo = this.agentsResponse.find(x => x.agentId == this.acceptanceForm.controls.agentId.value);
    if (agentInfo.greyList == true) {
      this.AgentName = agentInfo.agentName;
    }
    else {
      this.AgentName = "";
    }
  }
  getStatus() {
    this.API.getdata('/Generic/GetAcceptanceStatus').subscribe(c => {
      if (c != null) {
        this.responseStatus = c;
      }
    },
      error => {
        Swal.fire({
          text: error.error.Message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  }
  // sendEmail (body:any) {
  //   this.API.PostData('/Manifest/sendRCS',body).subscribe(c => {
  //     if (c != null) {

  //     }
  //   },
  //     error => {
  //       Swal.fire({
  //         text: error.error.Message,
  //         icon: 'error',
  //         confirmButtonText: 'OK'
  //       });
  //     });
  // }
  // sendRCS(){
  //   this.API.getdata('/Acceptance/generateRCS?acceptanceID=' + this.acceptanceForm.controls.acceptanceID.value).subscribe(c => {
  //     if (c != null) {
  //       let body={
  //         firstLine:c.firstLine,
  //         SecordLine:c.SecordLine,
  //         thirdLine:c.thirdLine
  //       }
  //       this.sendEmail(body);
  //     }
  //   },
  //     error => {
  //       Swal.fire({
  //         text: error.error.Message,
  //         icon: 'error',
  //         confirmButtonText: 'OK'
  //       });
  //     });
  // }
  getAirports() {
    this.API.getdata('/Master/getAirports').subscribe(c => {
      if (c != null) {
        if (c.Status == "Success") {
          this.airportResponse = c.Airports;
          this.defaultAirport.airportID = 0;
          this.defaultAirport.airportName = "Select Airport";
          this.airportResponse.push(this.defaultAirport);
          this.acceptanceForm.controls.airportID.setValue(0);
        }
        else {
          this.airportResponse = [];
        }
      }
    },
      error => {
        Swal.fire({
          text: error.error.Message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  }
  getAllData() {
    this.getShippers();
    this.getConsignees();
    this.getAgents();
    this.getCommodity();
  }
  searchAWBDetail(p) {
    this.acceptanceForm.patchValue(p);
    this.getShippers();
    this.getConsignees();
    this.getAgents();
    this.getCommodity();
  }

  setCommodity(p) {
    this.acceptanceForm.controls.comid.setValue(p.comid);
    this.closeCommodityListModal["first"].nativeElement.click();
  }
  setAgent(p) {
    this.acceptanceForm.controls.agentId.setValue(p.agentId);
    this.closeAgentListModal["first"].nativeElement.click();
  }
  setShipper(p) {
    this.acceptanceForm.controls.shipperId.setValue(p.shipperId);
    this.closeShipperListModal["first"].nativeElement.click();
  }
  setConsignee(p) {
    this.acceptanceForm.controls.cid.setValue(p.cid);
    this.closeConsigneeListModal["first"].nativeElement.click();
  }
  setGoods(p) {
    this.acceptanceForm.controls.goodsId.setValue(p.goodsId);
    this.closeNatureofGoodsListModal["first"].nativeElement.click();
  }
  setShipperHouse(p) {
    this.houseForm.controls.shipperId.setValue(p.shipperId);
    this.closeShipperHouseListModal["first"].nativeElement.click();
    this.getShipperDetailHouse();
  }
  setGoodsHouse(p) {
    this.houseForm.controls.goodsId.setValue(p.goodsId);
    this.closeNatureofGoodsHouseListModal["first"].nativeElement.click();
  }
  setConsigneeHouse(p) {
    this.houseForm.controls.cid.setValue(p.cid);
    this.closeConsigneeHouseListModal["first"].nativeElement.click();
    this.getConsigneeDetailHouse();
  }
  verifyPieces() {
    if (this.houseForm.controls.pieces.value > this.acceptanceForm.controls.Pieces.value) {
      Swal.fire({
        text: "No. of Pieces cannot be greater than Master",
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }
  verifyChargable() {
    if (this.houseForm.controls.chargeableWeight.value > this.acceptanceForm.controls.chargeableWeight.value) {
      Swal.fire({
        text: "House Chargeable Weight cannot be greater than Master",
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }
  getULD() {
    if (this.acceptanceForm.controls.ALCode.value == "" || this.acceptanceForm.controls.ALCode.value == null) {
      return;
    }
    this.API.getdata('/ULD/getULD?Alcode=' + this.acceptanceForm.controls.ALCode.value).subscribe(c => {
      if (c != null) {
        this.ULDData = c;
      }
    },
      error => {
        Swal.fire({
          text: error.error.Message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  }
  getServerResponse(event) {

    this.isLoadingResult = true;

    this.data = [];
    this.data = this.responseGoods
    this.isLoadingResult = false;
  }

}