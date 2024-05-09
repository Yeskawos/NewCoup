import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../../services/registerService/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent{

  page: number = this.registerService.numberPage;

  constructor(
    private registerService: RegisterService,
  ) {}

}
