import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { BankService } from './bank.service';

describe('BankService', () => {
  let component: BankService;
  let fixture: ComponentFixture<BankService>;

  beforeEach(() => TestBed.configureTestingModule({
    providers:[BankService],
    imports: [HttpClientTestingModule]
  }));

  describe(':', () => {

    function setup() {
      const api = TestBed.get(BankService);
      const httpTestingController = TestBed.get(HttpTestingController);
      return { api, httpTestingController };
    }

    it('#getUserDetails userdetails to get', () => {
      const { api, httpTestingController } = setup();
      const mockGoogleMapData = {
        "id": 1,
        "username": "murugesh",
        "password": "123456",
        "accounts": [
          {
            "id": 1,
            "userid": 1,
            "bankname": "ICICI",
            "bankaccountnumber": "12345",
            "bankbranch": "Electronic city phase 1 2nd cross",
            "bankifsccode": "ICICI0012",
            "TotalAssets": 7873.35
          }
        ]
      };
      const arr = {id:2}
      expect(api.getUserDetails()).toBe(mockGoogleMapData);
    });

    it('get addpayee details', () => {
      const { api, httpTestingController } = setup();
      const mockGoogleMapData = {
        "acctname": "algates",
        "nickname": "algates",
        "acctnumber": 2342349458459,
        "ifsccode": "ICICI0019847",
        "id": 2
      };
      const arr = {
        "acctname": "algates",
        "nickname": "algates",
        "acctnumber": 2342349458459,
        "ifsccode": "ICICI0019847",
        "id": 2
      }
      expect(api.addPayee(arr)).toBe(mockGoogleMapData);
    });

    it('get updatePayee details', () => {
      const { api, httpTestingController } = setup();
      const mockGoogleMapData = {
        "acctname": "algates",
        "nickname": "algates",
        "acctnumber": 2342349458459,
        "ifsccode": "ICICI0019847",
        "id": 2
      };
      const arr = {
        "acctname": "algates",
        "nickname": "algates",
        "acctnumber": 2342349458459,
        "ifsccode": "ICICI0019847",
        "id": 2
      }
      expect(api.updatePayee(arr)).toBe(mockGoogleMapData);
    });


    it('set AccountTransfer details', () => {
      const { api, httpTestingController } = setup();
      const mockGoogleMapData = {
        "id": 1,
        "fromacctnumber": 12345,
        "toacctnumber": 4644,
        "amount": 10,
        "balance": 7863.15
      };
      const arr = {
        "id": 1,
      "fromacctnumber": 12345,
      "toacctnumber": 4644,
      "amount": 10,
      "balance": 7863.15
      }
      expect(api.setAccountTransfer(arr)).toBe(mockGoogleMapData);
    });

    it('updateTotalAssets for user', () => {
      const { api, httpTestingController } = setup();
      const mockGoogleMapData = {
        "id": 1,
        "TotalAssets": 6293.35
      };
      const arr = {
        "id": 1,
        "TotalAssets": 6293.35
      }
      expect(api.updateTotalAssets(arr)).toBe(mockGoogleMapData);
    });

    it('getTotalAssets for user', () => {
      const { api, httpTestingController } = setup();
      const mockGoogleMapData = {
        "id": 1,
        "TotalAssets": 6293.35
      };
      const arr = {
        "id": 1,
        "TotalAssets": 6293.35
      }
      expect(api.getTotalAssets()).toBe(mockGoogleMapData);
    }); 

    it('deletePayee for user', () => {
      const { api, httpTestingController } = setup();
      const mockGoogleMapData = {
        "acctname": "algates",
        "nickname": "algates",
        "acctnumber": 2342349458459,
        "ifsccode": "ICICI0019847",
        "id": 2
      };
      const arr = {
        "id": 2
      }
      expect(api.deletePayee(arr)).toBe('');
    });  
    
    afterEach(() => {
      const { httpTestingController } = setup();
      httpTestingController.verify();
    });
  });
});
