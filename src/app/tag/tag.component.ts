import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { TagService } from '../tag.service';
import tag from '../tag';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {
  tagname: string;
  private tags;
  selectedtag: tag;
  tagList: Array<{id: number,tagname: string}> = []; 
  angForm: FormGroup;
  constructor(private fb: FormBuilder, private bs: TagService) {
    this.createForm();
  }
  
  createForm() {
    this.angForm = this.fb.group({
      id:0,
      tag_name: ['', Validators.required ]
    });
  }
  getTagList(){
    return this.bs.get().then(res => {
      this.tags = res
    });
  }
  addTag(tag_name:string,id:number) {
    if(id !=0 && id != undefined){
      this.bs.UpdateTag(tag_name,id);   
    }
    else
    {
      this.bs.addTag(tag_name);   
    }    
    this.angForm.reset();
  }
  ngOnInit() {
    this.getTagList();
  }
  
  selectTagForEdit(tag: tag): void {
  this.angForm.setValue(tag);
  }

  deleteTag(id:number): void {    
    this.bs.deleteTag(id); 
    }
}
