import { BaseResourceModel } from "src/app/shared/models/base-resource.model";

export class Budget extends BaseResourceModel{
    constructor (
        public id?: number,
        public name?: string,
        public description?: string,
        public amount? : string ) {
            
            super();
        }

    static fromJson(jsonData: any) : Budget{
        return Object.assign(new Budget(), jsonData);
    }
}