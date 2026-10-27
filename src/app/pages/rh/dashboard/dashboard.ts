import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-login',
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})

export class Dashboard {}
