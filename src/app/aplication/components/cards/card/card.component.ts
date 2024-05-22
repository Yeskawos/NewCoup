import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit{

  @Input() user: any;

  @Input() imageUrl: string | null = null;

  constructor(
  ) { }

  ngOnInit(): void {
  }
  
  
}  
