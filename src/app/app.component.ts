import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TableHolderComponent } from './table-holder/table-holder.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TableHolderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'db-design';
}
