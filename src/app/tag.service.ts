import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import tag from './tag';
const tagList = [];
@Injectable({
  providedIn: 'root'
})
export class TagService {
  uri = 'http://localhost:4000/tag';

  constructor(private http: HttpClient) { }
  
  addTag(tag_name) {
    var numberRegex = /^[+-]?\d+(\.\d+)?([eE][+-]?\d+)?$/;
    var arr = tag_name.split(/[\n,;]+/)
    for (var i = 0; i < arr.length; i++) {
      if(numberRegex.test(arr[i])) {
        const obj = { 
          id:this.getId(),    
          tag_name: arr[i]         
        };
        new Promise(resolve => {
          tagList.push(obj);
          resolve(obj);
        });   
     }           
    }    
  }
  UpdateTag(tag_name,id) {
    for (var i in tagList) {
      if (tagList[i].id == id) {
        tagList[i].tag_name = tag_name;
         break; //Stop this loop, we found it!
      }
    }
 }

  get() {
    return new Promise(resolve => resolve(tagList));
  }
  deleteTag(id:number) {debugger
    for (var i = 0; i < tagList.length; i++) {
      if (tagList[i].id == id) {
        tagList.splice(i, 1);
      }
    }  
}
  getId(){
    // assumes numeric ids
    var maxId = 0;
    tagList.reduce(function (prev, item) {
        maxId = Math.max(maxId, typeof item.id === 'number' ? item.id : maxId);
    }, null);
    return maxId + 1;
};
}
