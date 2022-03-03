import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.scss']
})
export class TableRowComponent implements OnInit {

  transactionId = '';

  @Input() column: any;
  // @Input() getTransactions: ()=>void = ()=>{};
  @Input() displayedColumns: any;
  @Input() columnNames: any;

  

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  deleteTransaction = (e: any, elem: any) => {
    this.http.delete(`http://localhost:3000/transactions/${e.currentTarget.dataset.id}`)
      .subscribe(() => console.log('Transaction deleted successfuly'));
    setTimeout(()=>{
      // this.getTransactions()
    }, 100)
  }

  toggleForms = (element: any) => {
    element.displayForms = !element.displayForms;
  }

  updateTransaction = (e: any) => {
    this.transactionId = e.currentTarget.dataset.id;
    const formValues = [];
    for (let i = 0; i <= 4; i++) {
      if (i === 2 || i === 3) {
        formValues.push(e.currentTarget.parentNode.parentNode.children[i].children[0].children[0].children[0].children[0].children[0].value)
        formValues.push(e.currentTarget.parentNode.parentNode.children[i].children[1].children[0].children[0].children[0].children[0].value)
      } else {
        formValues.push(e.currentTarget.parentNode.parentNode.children[i].children[0].children[0].children[0].children[0].children[0].value);
      }
    }
    console.log(formValues);
    const updateObj = {
      "externalId": formValues[0],
      "username": formValues[1],
      "amount": {
        "amount": formValues[2],
        "currency": formValues[3]
      },
      "comissionAmount": {
        "amount": formValues[4],
        "currency": formValues[5]
      },
      "provider": formValues[6],
      "additionalData": formValues[7]
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    }
    this.http.patch(`http://localhost:3000/transactions/${e.currentTarget.dataset.id}`, updateObj, httpOptions)
      .subscribe((resp)=>{console.log(resp)});
    setTimeout(()=>{
      // this.getTransactions()
    }, 100)
    
  }

}
