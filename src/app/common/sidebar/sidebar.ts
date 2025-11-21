
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon'; 
import { MatListModule } from '@angular/material/list';

import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, MatListModule, MatIconModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {

}
