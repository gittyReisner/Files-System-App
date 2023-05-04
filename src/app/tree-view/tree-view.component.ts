import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { Folder } from "../Models/TreeViewModel";
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.css']
})

export class TreeViewComponent implements OnInit {
  title = 'client';
  constructor(private http: HttpClient, private cdr: ChangeDetectorRef){}

  baseUrl: string = `https://localhost:7145/api/files`;
  @Input() tree: Folder[];
  timeoutId: any;  

  ngOnInit(): void {
    if(!this.tree){
      this.GetFiles();
    }
  }
  GetFiles(){
    this.http.get(this.baseUrl).subscribe((data: any) => {
      this.tree = data;
    }, (err) => { console.log(err) })
  }

  onInput(event) {
      this.filter(event.target.value)
  }

  filter(event: string){
    this.http.get(this.baseUrl + "/" + event).subscribe((data:Folder[])=>{
      this.tree=data;
      console.log(data);
      this.cdr.detectChanges();
    },
    (err)=>console.log(err))
  }
}
