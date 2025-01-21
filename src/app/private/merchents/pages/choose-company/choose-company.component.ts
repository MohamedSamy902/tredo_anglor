import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/core/services/payment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MerchentsService } from '../../services/merchents.service';
import Swal from 'sweetalert2';
import { MessageService } from 'primeng/api';
import { OrderingObserverService } from 'src/app/core/services/ordering-observer.service';
import { OrderingState } from 'src/app/core/models/Shared/ordering-state';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
declare var Moyasar;
declare var window: any; // Needed on Angular 8+
const parsedUrl = new URL(window.location.href);
const baseUrl = parsedUrl.origin;
@Component({
  selector: 'app-choose-company',
  templateUrl: './choose-company.component.html',
  styleUrls: ['./choose-company.component.scss'],
  providers: [MessageService]
})
export class ChooseCompanyComponent implements OnInit, AfterViewInit {
  opinionForm: FormGroup;
  openSubmitted = false;
  showError = false;
  creditForm: FormGroup;
  creditSubmitted = false;
  walletForm: FormGroup;
  walletSubmitted = false;
  tamaraForm: FormGroup;
  tamaraSubmitted = false;
  showCards = false;
  paymentToken;

  public offersDTOListData: any;
  public selectedCompany: any;
  public selectedCompanyOffers: any[];
  public openChargeWalletDialog: boolean;
  public walletAmount: number;
  public merchantInfo: any;
  public ordersSubmitionResponseData: any;
  public openOrdersSubmitionResponseDialog: boolean;
  public openSelectedCompanyInfoDialog: boolean;
  public selectCompanyLoading: boolean;
  public OrderHasSubmitedSuccessfully: boolean = false;
  LocalOrderSatat: OrderingState;
  showSuccessMessage: boolean;

  public responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private _MerchentsService: MerchentsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private orderstate:OrderingObserverService,
    private translate: TranslateService,

  ) { }

  ngOnInit(): void {
    this.opinionForm = new FormGroup({
      msg: new FormControl('', [Validators.required, Validators.minLength(20)]),
    });
    this.creditForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      creditNumber: ['', [Validators.minLength(12), Validators.required]],
      endDate: ['', [Validators.required]],
      cvv: [
        '',
        [Validators.required, Validators.maxLength(3), Validators.minLength(3)],
      ],
    });
    this.walletForm = this.fb.group({
      amount: ['', [Validators.required]],
    });
    this.tamaraForm = this.fb.group({
      amount: ['', [Validators.required]],
    });

    this.getOffersDToData();

    this.activatedRoute.queryParams.subscribe((res: any) => {
      if (res.amount && res.id && res.token) {
        this.showSuccessMessage = true;
        this.paymentService
          .updateSuccessTransaction(
            parseInt(res.amount) / 100,
            res.id,
            res.token
          )
          .subscribe({
            next: () => {
              this._MerchentsService
              .getCuurentMerchantInfo(
                JSON.parse(localStorage.getItem('logUserInfo') ?? '')
                .merchentId
                );
            },
          });
      }
    });
  }

  ngAfterViewInit(): void {
    this.orderstate.OrderingStateMeta$.subscribe(res=>{
      this.LocalOrderSatat = res;
      if(this.LocalOrderSatat.IsProcessing&&!this.LocalOrderSatat.IsProcessed&&
        this.LocalOrderSatat.OfferResponseRoot!=null){
          if (!this.offersDTOListData){
            this.offersDTOListData = this.LocalOrderSatat.OfferResponseRoot;
          }
        }
    });
    if (!this.offersDTOListData) {
      Swal.fire({
        icon: 'error',
        title: `لا توجد عروض أسعار برجاء رفع طلبات او إنشاء طلب يدويا!`,
        confirmButtonText: 'إنشاء طلب',
        willClose: () => {
          this.router.navigate(['merchents/excel-order']);
        },
      });
    }
    console.log(baseUrl);

  }

  firstStep: boolean = true;
  secondStep: boolean = false;
  thirdStep: boolean = false;
  showFirst() {
    this.firstStep = true;
    this.secondStep = false;
    this.thirdStep = false;
  }
  showSecond() {
    this.firstStep = false;
    this.secondStep = true;
    this.thirdStep = false;
  }

  /* pay Cases */

  active1 = false;
  active2 = false;
  active3 = false;

  case1() {
    this.submitWallet = false;
    this.active1 = true;
    this.active2 = false;
    this.active3 = false;

  }
  case2() {
    this.active1 = false;
    this.active2 = true;
    this.active3 = false;
  }
  case3() {
    this.submitWallet = false;
    this.active1 = false;
    this.active2 = false;
    this.active3 = true;
  }

  submitOpinion() {
    this.showError = true;
    if (this.opinionForm.valid) {
      console.log(this.opinionForm.value);
      this.openSubmitted = true;
      this.showError = false;
    }
  }

  creditSubmit() {
    this.creditSubmitted = true;
    if (!this.creditForm.invalid) {
      this.firstStep = false;
      this.secondStep = false;
      this.thirdStep = true;
      this.creditSubmitted = false;
    }
  }
  submitWallet: boolean;


  tamaraSubmit() {
    this.tamaraSubmitted = true;
    if (!this.tamaraForm.invalid) {
      this.firstStep = false;
      this.secondStep = false;
      this.thirdStep = true;
      console.log(this.tamaraForm.value);
      this.tamaraSubmitted = false;
    }
  }

  data = [
    {
      id: 1,
      count: 1,
      start: 'الرياض',
      end: 'جدة	',
      amount: 80,
      isSelected: false,
    },
    {
      id: 2,
      count: 3,
      start: 'الرياض',
      end: 'جدة	',
      amount: 80,
      isSelected: false,
    },
    {
      id: 3,
      count: 2,
      start: 'الرياض',
      end: 'جدة	',
      amount: 80,
      isSelected: false,
    },
    {
      id: 4,
      count: 2,
      start: 'الرياض',
      end: 'جدة	',
      amount: 80,
      isSelected: false,
    },
    {
      id: 5,
      count: 2,
      start: 'الرياض',
      end: 'جدة	',
      amount: 80,
      isSelected: false,
    },
  ];

  toggleCards() {
    this.showCards = !this.showCards;
  }



  private getOffersDToData() {
    this._MerchentsService._OffersDTO.subscribe({
      next: (res: any) => {
        this.offersDTOListData = res;
        this.onSelectCompany(this.offersDTOListData?.vendorsOffers[0]);
      },
      error: (err: any) => {
        console.log('error', err);
      }
    });
  }

  public onSelectCompany(company: any) {
    this.selectedCompany = company;
    this.selectedCompanyOffers = company?.offerLines;
    this.selectedCompanyOffers = this.selectedCompanyOffers?.map((offer: any) => {
      return {
        ...this.getOrderInfoByRef(offer?.orderRef),
        ...offer,
        grandTotal: company?.grandTotal
      }
    });
    this.walletAmount =  company?.grandTotal;
  }
  getcovragepercentage(company){


    return company?.totalOffers + "/" +  company?.totalRequests ;
  }

  public getOrderInfoByRef(ref: string) {
    const excelPreOrdersData = JSON.parse(localStorage.getItem('excelPreOrdersData')!);
    return excelPreOrdersData?.find(order => order?.orderRef === ref);
  }

  private checkshipmentTypeValue(type: string): number {
    if (type?.includes('صندوق')) return 1;
    return 2;
  }

  private get userInfo() {
    return JSON.parse(localStorage.getItem('logUserInfo')!);
  }

  private mappingOrderData() {
    return this.selectedCompanyOffers?.map((order: any) => {

      return {
        shippingTypeId: this.checkshipmentTypeValue(order?.shipmentType),
        isProcessed: false,
        operationalStatus: 1,
        pickUpCity: null,
        pickUpAddress: null,
        pickUpLocation: null,
        pickUpEmail: null,
        pickUpMobileNu: null,
        dropOffCity: order?.cityNameArTo,
        dropOffAddress: order?.reciverAddress?.street,
        dropOffLocation: '0,0',
        dropOffMobileNu: order?.reciverAddress?.phone,
        customerName: order?.reciverAddress?.name,
        sendFromCityId: order?.cityIdFrom,
        sendFromCity: null,
        sendToCityId: order?.reciverAddress?.cityIdTo,
        sendToCity: null,
        merchantsInfoId: 4,
        merchantsInfo: null,
        description: order?.shipmentdescription,
        itemsCount: 1,
        orderRefrance: order?.orderRef,
        cODActive: order?.price ? true : false,
        cODValue: order?.codValue,
        cODValuePaid: false,
        shipFee: 0,
        vAT: 0,
        totalCost: this.selectedCompany.grandTotal,
        groupRef: order?.groupRef,
        isGrouped: order?.isGrouped,
        dimensions: order?.dimensions,
        weight: order?.weight,
        warehouseId: order?.warehouseId
      }
    });
  }

  public getOrderDescriptionByOrderRef(orderRef: string): string {
    let selectedOrder = this.mappingOrderData().find(order => order.orderRefrance == orderRef);
    return selectedOrder?.description;
  }


  public handlingObjRequest() {
    let requestObj = {
      merchantsInfoId: this.userInfo?.merchentId,
      vendorInfoId: this.selectedCompany.vendor.id,
      warehouseId: this.offersDTOListData.warehouseId,
      data: this.mappingOrderData(),
      offerResponse: this.selectedCompany
    }
    return requestObj;
  }

  public getMerchantInfo() {
    let merchantId = this.userInfo?.merchentId;
    this._MerchentsService.getMerchantInfo(merchantId).subscribe({
      next: (res: any) => {
        this.merchantInfo = res;
        if (res?.wallet?.balance >= this.mappingOrderData()[0]['totalCost']) {
          this.postOrderSubmition();
        } else {
          this.openChargeWalletDialog = true;
        }
      },
      error: (err: any) => { },
      complete: () => { }
    });
  }

  private postOrderSubmition() {
    this.selectCompanyLoading = true;
    this._MerchentsService.postOrderSubmition(this.handlingObjRequest()).subscribe({
      next: (res: any) => {
        this.messageService.add({ severity: 'success', detail: 'تم حفظ الطلبات بنجاج.' });
        this.ordersSubmitionResponseData = res;
        if((JSON.parse(localStorage.getItem('excelPreOrdersData')!) as any[] ).length ==1 && res[0].errorCode == 0 ){
          this.orderstate.SetOrderingStateIsProcessed(true);
        }
      },
      error: (err: any) => {
        this.selectCompanyLoading = false;
        this.messageService.add({ severity: 'error', detail: 'حدث خطأ ما! برجاء المحاولة مرة اخري.' });
      },
      complete: () => {
        this._MerchentsService.getCuurentMerchantInfo(this.userInfo?.merchentId);
        this.selectCompanyLoading = false;
        this.openOrdersSubmitionResponseDialog = true;
        this.firesuccessfulltrx();
      }
    });
  }

  chargeWallet() {
    this.paymentService
      .createTransAction(this.walletAmount, 'description', null, this.merchantInfo?.id)
      .subscribe({
        next: (res: { token: string }) => {
          this.paymentToken = res.token;
            Moyasar.init({
              element: '.mysr-form-lay',
              amount: this.walletAmount * 100,
              language: 'ar',
              currency: 'SAR',
              description: 'Tredo charge #1',
              publishable_api_key:   environment.moyser.publishable_live_api_key,
              callback_url: `${baseUrl}/merchents?token=${this.paymentToken}`,
              methods: ['creditcard'],
            });
        },
        error: () => {
          this.paymentToken = '';
        },
      });
  }

  public openSelectedCompanyInfo(company) {
    this.selectedCompany = company;
    this.openSelectedCompanyInfoDialog = true;
  }

  public firesuccessfulltrx() {
    if (this.ordersSubmitionResponseData!=null) {
      if (Number.parseInt(this.ordersSubmitionResponseData[0].errorCode) == 0) {
        this.OrderHasSubmitedSuccessfully = true;
      }
    }
  }

  public submitorder(){
    Swal.fire({
      title: `${this.translate.instant("AreYouSureYouWantCreate")}`,
      html:' اختيار شركة ' + this.selectedCompany.vendor.nameAr +' مبلغ  '
      +this.selectedCompany.grandTotal,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#198754',
      cancelButtonColor: '#adb5bd',
      confirmButtonText: '<i class="fas fa-check"></i> '+ `${this.translate.instant("Yes,Ok!")}`,
      cancelButtonText: `${this.translate.instant("Undo")}` + ' <i class="fas fa-undo    "></i>'
    }).then((result) => {
      if (result.isConfirmed) {
        this.getMerchantInfo();
        }
      });
    }
  }

