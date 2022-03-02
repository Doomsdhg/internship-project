import { Component, OnInit, ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'app-add-transaction-component',
  templateUrl: './add-transaction-component.component.html',
  styleUrls: ['./add-transaction-component.component.scss']
})
export class AddTransactionComponentComponent implements OnInit {

  constructor(
    private http: HttpClient,
   ) {
     }

  @ViewChild('addition_form', {static: false})
  additionForm: ElementRef | undefined;
  status: boolean = false;

  ngOnInit(): void {
  }

  toggleForm =  () => {
    this.additionForm?.nativeElement;
    this.status = !this.status
  }

  addTransaction = (e: any) => {
    e.preventDefault();
    console.log(e.currentTarget.parentNode.children[0]);
    console.log(e.currentTarget.parentNode)
    const formValues = [];
    for (let i = 0; i <= 7; i++) {
      console.log(e.currentTarget.parentNode.children[0][i].value);
      formValues.push(e.currentTarget.parentNode.children[0][i].value);
    }
    const transactionObj = {
      "externalId": formValues[0] || '',
      "provider": formValues[1] || '',
      "amount": {
        "amount": formValues[2] || '',
        "currency": formValues[3] || ''
      },
      "comissionAmount": {
        "amount": formValues[4] || '',
        "currency": formValues[5] || ''
      },
      "username": formValues[6] || '',
      "additionalData": formValues[7] || ''
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    }
    this.http.post('http://localhost:3000/transactions', transactionObj, httpOptions)
      .subscribe((resp)=>{console.log(resp)});
  }
}
