import { BaseResourceModel } from "src/app/shared/models/base-resource.model";
import { Budget } from "../../budget/shared/budget.model";
import { Category } from "../../categories/shared";

export class Entry extends BaseResourceModel {

    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public type?: string,
        public amount?: string,
        public date?: string,
        public paid?: boolean,
        public categoryId?: number ,
        public category? : Category,
        public budgetId? : number,
        public budget? : Budget) {
            
        super();
    }

    static types = {
        expense: 'Despesa',
        revenue: 'Receita'
    }

    static fromJson(jsonData: any) : Entry{
        return Object.assign(new Entry(), jsonData);
    }

    get paidText(): string{
        return this.paid ? 'Pago' : 'Pendente';
    }
}