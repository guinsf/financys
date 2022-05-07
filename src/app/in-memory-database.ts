import { InMemoryDbService } from "angular-in-memory-web-api"
import { Budget } from "./pages/budget/shared/budget.model";
import { Category } from "./pages/categories/shared";
import { Entry } from "./pages/entries/shared/entry.model";
import { User } from "./pages/users/shared/user.model";

export class InMemoryDatabase implements InMemoryDbService{
    
    createDb() {
        const categories : Category[] = [
            {   id:1, name: "Moradia", description: "Pagametnos de contas da casa" },
            {   id:2, name: "Saúde", description: "Plano de saúde" },
            {   id:3, name: "Lazer", description: "Cinema, parques, praia, etc." },
            {   id:4, name: "Salario", description: "Recebimento de salário" },
            {   id:5, name: "Freelas", description: "Trabalhos com freelancer" }
        ]

        const users: User[] = [
            {  id: 1, name: "gustavo", email: "gustavoghdd@gmail.com", password:"123456"},
            {  id: 2, name: "joao", email: "joao@gmail.com", password:"123456"},
            {  id: 3, name: "jose", email: "jose@gmail.com", password:"123456"},
            {  id: 4, name: "gabriel", email: "gabriel@gmail.com", password:"123456"},

        ]

        const budgets : Budget[] = [
            { id: 1, name: 'Orçamento anual 2021', amount: "4000,00"} as Budget,
            { id: 2, name: 'Orçamento semestral 1-2022', amount: "2000,00" } as Budget,
            { id: 3, name: 'Orçamento semestral 2-2002', amount: "2500,00" } as Budget
            
        ]

        const entries: Entry[] = [
            { id: 1, name: 'Gás de Cozinha', budget: budgets[0], budgetId: budgets[0].id, categoryId: categories[0].id, category: categories[0], paid: true, date: "14/10/2021", amount: "70,80", type: "expense", description: "Qualquer descrição para essa despesa" } as Entry,
            { id: 2, name: 'Suplementos', budget: budgets[0], budgetId: budgets[0].id, categoryId: categories[1].id, category: categories[1], paid: false, date: "14/10/2021", amount: "15,00", type: "expense" } as Entry,
            { id: 3, name: 'Salário na Empresa X', budget: budgets[0], budgetId: budgets[0].id, categoryId: categories[3].id, category: categories[3], paid: true, date: "15/10/2021", amount: "4405,49", type: "revenue" } as Entry,
            { id: 4, name: 'Aluguel de Filme', budget: budgets[0], budgetId: budgets[0].id, categoryId: categories[2].id, category: categories[2], paid: true, date: "16/10/2021", amount: "15,00", type: "expense" } as Entry,
            { id: 5, name: 'Suplementos', budget: budgets[0], budgetId: budgets[0].id, categoryId: categories[1].id, category: categories[1], paid: true, date: "17/10/2021", amount: "30,00", type: "expense" } as Entry,
            { id: 6, name: 'Video Game da Filha', budget: budgets[0], budgetId: budgets[0].id, categoryId: categories[2].id, category: categories[2], paid: false, date: "17/10/2021", amount: "15,00", type: "expense" } as Entry,
            { id: 11, name: 'Uber', budget: budgets[0], budgetId: budgets[0].id,categoryId: categories[1].id, category: categories[1], paid: true, date: "17/10/2021", amount: "30,00", type: "expense" } as Entry,
            { id: 12, name: 'Aluguel', budget: budgets[0], budgetId: budgets[0].id, categoryId: categories[2].id, category: categories[2], paid: false, date: "23/10/2021", amount: "15,00", type: "expense" } as Entry,
            { id: 13, name: 'Gás de Cozinha', budget: budgets[0], budgetId: budgets[0].id, categoryId: categories[1].id, category: categories[1], paid: false, date: "25/10/2021", amount: "30,00", type: "expense" } as Entry,
            { id: 14, name: 'Pagamento Pelo Projeto XYZ', budget: budgets[0], budgetId: budgets[0].id, categoryId: categories[4].id, category: categories[4], paid: true, date: "25/10/2021", amount: "2980,00", type: "revenue" } as Entry,
            { id: 19, name: 'Aluguel de Filme', budget: budgets[0], budgetId: budgets[0].id, categoryId: categories[2].id, category: categories[2], paid: false, date: "07/11/2021", amount: "15,00", type: "expense" } as Entry,
            { id: 21, name: 'Video Game da Filha', budget: budgets[0], budgetId: budgets[0].id, categoryId: categories[1].id, category: categories[1], paid: true, date: "17/11/2021", amount: "30,00", type: "expense" } as Entry,
            { id: 22, name: 'Cinema', budget: budgets[0], budgetId: budgets[0].id, categoryId: categories[2].id, category: categories[2], paid: true, date: "18/11/2021", amount: "15,00", type: "expense" } as Entry,
            { id: 23, name: 'Jiu Jitsu', budget: budgets[0], budgetId: budgets[0].id, categoryId: categories[1].id, category: categories[1], paid: false, date: "21/11/2021", amount: "130,00", type: "expense" } as Entry,
            { id: 44, name: 'Uber', budget: budgets[0], budgetId: budgets[0].id, categoryId: categories[2].id, category: categories[2], paid: true, date: "28/11/2021", amount: "15,00", type: "expense" } as Entry,
            { id: 55, name: 'Cinema', budget: budgets[0], budgetId: budgets[0].id, categoryId: categories[1].id, category: categories[1], paid: false, date: "28/11/2021", amount: "30,00", type: "expense" }  as Entry
    
        ]

        return { categories, users, entries, budgets };
    }
}