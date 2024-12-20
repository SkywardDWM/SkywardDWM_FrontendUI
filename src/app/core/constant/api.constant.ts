import { environment } from "../../../environments/environment";

const serverPath = environment.serverPath;
const apiPath = serverPath + 'api/';
let basePath = apiPath;

export const APIConstant = {
  basePath: serverPath,

  //Upload
  upload: `${apiPath}Upload`,
  base64File: `${apiPath}upload/GetBase64FromURL`,

  //Login and Registration
  login: `${apiPath}account/login`,
  changepassword: `${apiPath}account/change-passwor`,
  logout: `${apiPath}account/logout`,
  groupcode: `${basePath}groupcode`,
  account: `${basePath}account`,
  role: `${basePath}role`,
  loginbytoken: `${apiPath}account/getuserloginbytoken`,
  modulegroup: `${basePath}modulegroup`,
  termsAndConditions: `${basePath}TermsAndConditions`,

  //Frequency
  frequencyList: `${basePath}Frequency/GetAllFrequencies`,
  frequencyAdd: `${basePath}Frequency/AddFrequency`,
  frequencyEdit: `${basePath}Frequency/EditFrequency`,
  frequencyGetById: `${basePath}Frequency/GetByIdAsync`,
  frequencyDelete: `${basePath}Frequency/DeleteFrequency`,

  //Nature Of Work
  natureOfWorkList: `${basePath}NatureOfWork/GetAllNatureOfWorks`,
  natureOfWorkAdd: `${basePath}NatureOfWork/AddNatureOfWork`,
  natureOfWorkEdit: `${basePath}NatureOfWork/EditNatureOfWork`,
  natureOfWorkGetById: `${basePath}NatureOfWork/GetByIdAsync`,
  natureOfWorkDelete: `${basePath}NatureOfWork/DeleteNatureOfWork`,

  //Plant 
  plantList: `${basePath}Plant/GetAllPlants`,
  plantAdd: `${basePath}Plant/AddPlant`,
  plantEdit: `${basePath}Plant/EditPlant`,
  plantGetById: `${basePath}Plant/GetByIdAsync`,
  plantDelete: `${basePath}Plant/DeletePlant`,

  //Unit Of Measure
  unitOfMeasureList: `${basePath}UnitOfMeasure/GetAllUnitOfMeasures`,
  unitOfMeasureAdd: `${basePath}UnitOfMeasure/AddUnitOfMeasure`,
  unitOfMeasureEdit: `${basePath}UnitOfMeasure/EditUnitOfMeasure`,
  unitOfMeasureGetById: `${basePath}UnitOfMeasure/GetByIdAsync`,
  unitOfMeasureDelete: `${basePath}UnitOfMeasure/DeleteUnitOfMeasure`,



  // Permission API endpoints
  permissionList: `${basePath}RolePermission/GetAllRolePermissions`,
  permissionAdd: `${basePath}RolePermission/AddRolePermission`,
  permissionEdit: `${basePath}RolePermission/UpdateRolePermission`,
  permissionGetById: `${basePath}RolePermission/GetById`,
  permissionDelete: `${basePath}RolePermission/Delete`,
  permission: `${basePath}Permission/GetAllPermissions`,

  // Department API endpoints
  departmentList: `${basePath}Department/GetAllDepartments`,
  departmentAdd: `${basePath}Department/AddDepartment`,
  departmentEdit: `${basePath}Department/EditDepartment`,
  departmentGetById: `${basePath}Department/GetByIdAsync`,
  departmentDelete: `${basePath}Department/DeleteDepartment`,

  // Holiday API endpoints
  holidayList: `${basePath}Holiday/GetAllHoliday`,
  holidayAdd: `${basePath}Holiday/AddHoliday`,
  holidayEdit: `${basePath}Holiday/EditHoliday`,
  holidayGetById: `${basePath}Holiday/GetByIdAsync`,
  holidayDelete: `${basePath}Holiday/Delete`,
  //permission: `${basePath}Permission/GetAllPermissions`,

  // Task API endpoints
  taskList: `${basePath}Task`,
  taskAttachmentDownload: `${basePath}Task/Download`,

  // ActivityTaskKanban API endpoints
  ActivityTaskKanbanList: `${basePath}ActivityTAskKanban/GetAllActivityTaskKanban`,
  ActivityTaskKanbanEdit : `${basePath}ActivityTAskKanban/EditActivityKanban`,
  
  //Activity
  activityList: `${basePath}Activity/GetAllActivity`,
  activityAdd: `${basePath}Activity/AddActivity`,
  activityEdit: `${basePath}Activity/EditActivity`,
  activityGetById: `${basePath}Activity/GetByIdAsync`,
  activityDelete: `${basePath}Activity/DeleteActivity`,
  activityAttachmentDownload:`${basePath}Activity/Download`,

 jobRoleList : `${basePath}JobRole/GetAllJobRole`,

  //Company
  CompanyMasterList: `${basePath}CompanyMaster/GetAllCompany`,  //TrailerInspection service 


  //User
  UserList: `${basePath}users`,  //WeightCHeck service 
  usersExcelList: `${basePath}users/bulk-upload`,


  //Pages
  company: `${apiPath}company`,
  user: `${apiPath}users`,
  country: `${apiPath}country`,
  state: `${apiPath}state`,
  module: `${apiPath}module`,
  student: `${apiPath}Student`,
  bom: `${basePath}bommaster`,
  customer: `${basePath}customer`,
  product: `${basePath}product`,
  salesOrder: `${basePath}salesorder`,
  vendormaster: `${basePath}vendormaster`,
  workflow: `${basePath}workflow`,
  purchaseOrder: `${basePath}purchaseorder`,
  inventorytype: `${basePath}inventorytype`,
  inward: `${basePath}inward`,
  outward: `${basePath}outward`,
  qualityParameter: `${basePath}qualityparameter`,
  materialRequisition: `${basePath}materialrequisition`,
  location: `${basePath}location`,

  //List
  list: {
    modulePermission: `${apiPath}module`,
    role: `${apiPath}role/list`,
    town: `${basePath}parkingauthority/list`,
    onlinetheme: `${basePath}groupcode/list/onlinetheme`,
    locationgrouptype: `${basePath}groupcode/list/locationgrouptype`,
    authenticationtype: `${basePath}groupcode/list/authenticationtype`,
    groupnames: `${basePath}groupcode/groups`,
    names: `${basePath}groupcode/groupname`,
    types: `${apiPath}groupcode/list/types`,
    categories: `${apiPath}groupcode/list/categories`,
    customercategory: `${apiPath}groupcode/list/customercategory`,
    industries: `${apiPath}groupcode/list/industries`,
    sources: `${apiPath}groupcode/list/sources`,
    customertype: `${apiPath}groupcode/list/customertype`,
    territories: `${apiPath}groupcode/list/territories`,
    productGroups: `${apiPath}groupcode/list/productGroups`,
    productCategories: `${apiPath}groupcode/list/productCategories`,
    productTypes: `${apiPath}groupcode/list/productTypes`,
    productBrands: `${apiPath}groupcode/list/productBrands`,
    productSizes: `${apiPath}groupcode/list/productSizes`,
    interStateTaxes: `${apiPath}groupcode/list/interStateTaxes`,
    intraStateTaxes: `${apiPath}groupcode/list/intraStateTaxes`,
    uoms: `${apiPath}groupcode/list/uom`,
    customers: `${basePath}customer/list`,
    salesOrderTypes: `${apiPath}groupcode/list/salesOrderTypes`,
    currencies: `${apiPath}groupcode/list/currencies`,
    products: `${apiPath}product/list`,
    discountTypes: `${apiPath}groupcode/list/discountTypes`,
    productcategories: `${apiPath}groupcode/list/productcategories`,
    approvertypes: `${apiPath}groupcode/list/approvertypes`,
    vendors: `${apiPath}vendormaster/list`,
    approvalStatuses: `${apiPath}groupcode/list/approvalStatus`,
    termsConditions: `${basePath}TermsAndConditions/list`,
    finishedproducts: `${apiPath}product/finishedProducts`,
    qcparameters: `${apiPath}groupcode/list/qcparameters`,
    qcclasses: `${apiPath}groupcode/list/qcclasses`,
    lslDimensions: `${apiPath}groupcode/list/lslDimensions`,
    uslDimensions: `${apiPath}groupcode/list/uslDimensions`,
    measuringInstruments: `${apiPath}groupcode/list/measuringInstruments`,
    sampleFrequencies: `${apiPath}groupcode/list/sampleFrequencies`,
    reportingFrequencies: `${apiPath}groupcode/list/reportingFrequencies`,
    warehouses: `${apiPath}location/warehouses`,
    rawmaterialProducts: `${apiPath}product/rawmaterialProducts`,
    companies: `${apiPath}company/company`,
  },
}

export const PublicAPI = [
  APIConstant.login, APIConstant.loginbytoken
]