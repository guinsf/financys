import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BaseResourceListComponent } from 'src/app/shared/components/base-resources-list/base-resource-list.components';

import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent extends BaseResourceListComponent<Entry> implements OnInit {

  entryForm: FormGroup;

  entry: Entry = new Entry();

  constructor(
    private entryService: EntryService,
    private formBuilder: FormBuilder) { 
    
    super(entryService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.loadEntryForm();
  }

  get typeOptions(): Array<any>{
    return Object.entries(Entry.types).map(
      ([value, text]) => {
        return { 
          text: text,
          value: value
        }
      }
    );
  }

  search(): void{

    const name : String = this.entryForm.value.name;
    const type : String = this.entryForm.value.type;

    if (this.hasNotNameAndType(name, type)){
      this.loadEntries();
    }
    else if (this.hasNameAndNotType(name, type)){
      this.resources = this.resources.filter(e => e.name.toLowerCase().startsWith(name.toLowerCase()))  
    }   
    else if (this.hasTypeAndNotName(name, type)){
      this.resources = this.resources.filter(e => e.type.toLowerCase().startsWith(type.toLowerCase()))
    } 
    else{
      this.resources = this.resources.filter(e => e.name.toLowerCase().startsWith(name.toLowerCase()) &&
                                          e.type.toLowerCase().startsWith(type.toLowerCase()))
    } 
    
  }  

  // PRIVATE METHODS
  private loadEntries() {
    this.entryService.getAll().subscribe(
      resources => this.resources = 
        resources.sort((a,b) => b.id - a.id),
      error => alert('Erro ao carregar a lista')
    );
  }

  private loadEntryForm() {
    this.entryForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.minLength(2)]],
      type: ["expense", [Validators.minLength(2)]]
    });
  }

  private hasNotNameAndType(name: String, type: String) {
    return (name == null || name == '') && (type == null || type == '');
  }

  private hasNameAndNotType(name: String, type: String) {
    return (name != null || name != '') && (type == null || type == '');
  }

  private hasTypeAndNotName(name: String, type: String) {
    return (type != null || type != '') && (name == null || name == '');
  }

}
