import { Component, signal } from '@angular/core';
import { CalculatorComponent } from './calculator/calculator';

@Component({
  selector: 'app-root',
  imports: [CalculatorComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('marks-calculator');
}
