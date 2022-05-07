import { Injectable, Injector } from '@angular/core';

import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { Budget } from './budget.model';

@Injectable({
  providedIn: 'root'
})
export class BudgetService extends BaseResourceService<Budget>{

  constructor(protected injector: Injector) { 
    super("api/budgets", injector, Budget.fromJson);
  }
}
