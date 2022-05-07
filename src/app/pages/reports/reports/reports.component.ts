import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Category } from '../../categories/shared/category.model'
import { CategoryService } from '../../categories/shared';

import { Entry } from '../../entries/shared/entry.model'
import { EntryService } from '../../entries/shared/entry.service';

import currencyFormatter from 'currency-formatter'

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  
  expenseTotal: any = 0;
  revenueTotal: any = 0;
  balance: any = 0;

  expenseChartData: any;
  revenueChartData: any;

  chartOptions = {
    sclaes: {
      yAxes: [ {
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };

  categories: Category[] = [];
  entries: Entry[] = [];

  @ViewChild('month') month : ElementRef = null;
  @ViewChild('year') year : ElementRef = null;

  constructor(
    private entryService : EntryService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.categoryService.getAll()
      .subscribe(categories => this.categories = categories )
  }

  generateReports(): void {
    let month = this.month.nativeElement.value;
    let year = this.year.nativeElement.value;

    if (!month || !year) {
      alert('Você precisa selecionar o Mês e o Ano para gerar os relatórios');
    }
    else{
      this.entryService.getByMonthAndYear(month, year).subscribe(
        this.setValues.bind(this) 
      );
    }
  }
    
  private setValues(entries: Entry[]){
    this.entries = entries;
    this.calculateBalance();
    this.setChartData();
  }

  calculateBalance(){
    let expenseTotal = 0;
    let revenueTotal = 0;

    this.entries.forEach(entry => {
      if (entry.type == 'revenue'){
        revenueTotal += currencyFormatter.unformat(entry.amount, { code: 'BRL'});
      }
      else{
        expenseTotal += currencyFormatter.unformat(entry.amount, { code: 'BRL'}); 
      }
    });
    
    this.expenseTotal = currencyFormatter.format( expenseTotal, { code: 'BRL'});
    this.revenueTotal = currencyFormatter.format( revenueTotal, { code: 'BRL'});
    this.balance = currencyFormatter.format(revenueTotal - expenseTotal, { code: 'BRL'});
  }

  setChartData(){
    this.revenueChartData = this.getChartData('revenue', 'Grafico de Receitas', '#9CCC65');
    this.expenseChartData = this.getChartData('expense', 'Grafico de Despesas', '#e03131');1 
  }

  getChartData(entryType: string, title: string, color : string){
    const chartData = [];

    this.categories.forEach( category => {
      // filtering entries by category and type
      const filteredEntries = this.entries.filter(
        entry => (entry.categoryId == category.id &&
                  entry.type == entryType)
      )

      // if found entries, then sum entries amount and add to chartData
      if (filteredEntries.length > 0){
        const totalAmount = filteredEntries.reduce(
          (total, entry) => total + currencyFormatter.unformat(entry.amount, { code: 'BRL '}), 0
        )

        chartData.push({
          categoryName: category.name,
          totalAmount: totalAmount
        })
      }      

    });

    return {
      labels: chartData.map( item => item.categoryName),
      datasets: [{
        label: title,
        backgroundColor: color,
        data: chartData.map( item => item.totalAmount )
      }]
    }
  }

}
