import { BaseResourceModel } from "src/app/shared/models/base-resource.model";

export class User extends BaseResourceModel{
    constructor(
        public id? : number,
        public name?: string,
        public email?: string,
        public password?:string) {  
            
        super();
    }

    static fromJson(jsonData: any) : User {
        return Object.assign(new User(), jsonData)
    }
}