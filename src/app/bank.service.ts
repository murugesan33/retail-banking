import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpEventType} from '@angular/common/http';
import {Observable,BehaviorSubject} from 'rxjs';

const localUrl = 'http://localhost:3000';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
  reportProgress:true,
  Observe:'events'
};

@Injectable({
  providedIn: 'root'
})
export class BankService {

  public log = new BehaviorSubject<boolean>(false);
  
  public uname = new BehaviorSubject<string>('');
  
  public uId =  new BehaviorSubject<number>(0);
  
  public err = new BehaviorSubject<string>('');

  public bankDetails = new BehaviorSubject([]);

  public totalAsset = new BehaviorSubject(0);
  
  constructor(private http:HttpClient) { }

  getUserDetails(){
    return this.http.get(localUrl+'/users');
  }

  addPayee(arr){
    return this.http.post(localUrl+'/payee',arr,httpOptions);
  }

  getPayeeDetails(){
    return this.http.get(localUrl+'/payee');
  }

  updatePayee(arr){
    return this.http.put(`${localUrl}/payee/${arr.id}`,arr,httpOptions);
  }

  setAccountTransfer(arr){
    return this.http.post<accountTransfer>(localUrl+'/history',arr,httpOptions);
  }

  getAccountTransfer(){
    return this.http.get(localUrl+'/history');
  }

  updateTotalAssets(arr){
    return this.http.put<userTotalAsset>(`${localUrl}/totalAmount/${arr.id}`,arr,httpOptions);
  }
  getTotalAssets(){
    return this.http.get(`${localUrl}/totalAmount/`);
  }

  deletePayee(id){
    return this.http.delete(`${localUrl}/payee/${id}`);
  }

}


export interface payeeDetails{
    id?: number;
    acctname: string;
    nickname: string;
    acctnumber: number;
    ifsccode: string;
}


export interface accountTransfer{
  id?: number;
  amount: number;
  fromacctnumber: number,
  toacctnumber: number,
  balance:string,
  transDetails:string
}


export interface userTotalAsset{
  id?: number;
  TotalAssets: number;
}