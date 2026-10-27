import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/service/auth.service';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cursos.html',
  styleUrl: './cursos.css'
})

export class Cursos {}
