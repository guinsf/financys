import { Injectable, Injector } from '@angular/core';

import { catchError, flatMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Entry } from './entry.model';
import { CategoryService } from '../../categories/shared/category.service'
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { send } from 'process';

import * as moment from 'moment';
import { BudgetService } from '../../budget/shared/budget.service';

@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry> {

  constructor(
    protected injector: Injector,
    private categoryService: CategoryService,
    private budgetService: BudgetService) { 

    super("api/entries", injector, Entry.fromJson)
  }

  create(entry: Entry): Observable<Entry> {
    this.setBudgetAndSendToServer(entry, super.update.bind(this));

    return this.setCategoryAndSendToServer(entry, super.create.bind(this));
  }

  update(entry: Entry): Observable<Entry> {
   this.setBudgetAndSendToServer(entry, super.update.bind(this));

    return this.setCategoryAndSendToServer(entry, super.update.bind(this));    
  } 

  private setCategoryAndSendToServer(entry: Entry, sendFn: any) : Observable<Entry>{

    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap( category => {
        entry.category = category;

        return sendFn(entry)
      }),
      catchError(this.handleError)
    );
  }

  private setBudgetAndSendToServer(entry: Entry, sendFn: any) : Observable<Entry>{

    return this.budgetService.getById(entry.budgetId).pipe(
      flatMap( budget => {
        entry.budget = budget;

        return sendFn(entry)
      }),
      catchError(this.handleError)
    );
  }

  

  getByMonthAndYear(month :number, year: number) : Observable<Entry[]>{
    return this.getAll().pipe(
      map( entries => this.filterByMonthAndYear(entries, month, year))
    ) 
  }

  private filterByMonthAndYear(entries: Entry[], month: number, year: number) {
    return entries.filter(entry => {
      const entryDate = moment(entry.date, "DD/MM/YYYY");
      const monthMatches = entryDate.month() + 1 == month;
      const yearMatches = entryDate.year() == year;

      if(monthMatches && yearMatches) return entry;
    })
  }
}