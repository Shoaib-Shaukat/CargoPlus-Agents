export class consigneeResponse {
    cid:number
    consigneeName:string
    consigneeAddress:string;
    PhoneNo:string;
    emailAddress:string;
    mobileNo:string;
    isDeleted:string;
    airportName:string;
    regionName:string;
    countryName:string;
    cityName:string;
    countryID:number;
    stateID:number;
    cityID:number;
    CNIC:string;
}
export class requestConsignee {
    cid:string;
    isNew:boolean=false;
    consigneeName:string;
    consigneeAddress:string;
    countryID:string;
    stateID:string;
    cityID:string;
    CNIC:string;
    PhoneNo:string;
    emailAddress:string;
    faxNo:string;
    mobileNo:string;
    }