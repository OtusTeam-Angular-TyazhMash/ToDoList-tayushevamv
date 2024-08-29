import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICreateItem } from 'src/app/models/to-do-list.model';

@Component({
  selector: 'app-to-do-create-item',
  templateUrl: './to-do-create-item.component.html',
  styleUrls: ['./to-do-create-item.component.scss']
})
export class CreateItemComponent implements OnInit{
  itemForm!: FormGroup;
  @Output() addItemEvent = new EventEmitter<ICreateItem>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
      this.itemForm = this.formBuilder.group({
          title: ['', Validators.required],
          description: [''],
      });
  }

  addItem(): void {
    this.addItemEvent.emit(
      { 
        text: this.itemForm.controls['title'].value,
        description: this.itemForm.controls['description'].value
      }
    );
  }
}
