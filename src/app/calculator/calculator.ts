import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calculator.html',
  styleUrls: ['./calculator.scss']
})
export class CalculatorComponent {
  subjects = [
    { mark: null as number | null },
    { mark: null as number | null },
    { mark: null as number | null }
  ];

  result: any = null;
  showError: boolean = false;

  addSubject() {
    this.subjects.push({ mark: null });
  }

  removeSubject(index: number) {
    if (this.subjects.length > 1) {
      this.subjects.splice(index, 1);
    }
  }

  calculate() {
    this.showError = false;

    for (let i = 0; i < this.subjects.length; i++) {
      let currentMark = this.subjects[i].mark;
      if (currentMark === null || currentMark < 0 || currentMark > 100) {
        this.showError = true; 
        return;
      }
    }

    let totalMarks = 0;
    let highest = -1;
    let lowest = 101;
    let isPass = true;

    for (let i = 0; i < this.subjects.length; i++) {
      let m = this.subjects[i].mark as number;
      
      totalMarks = totalMarks + m;

      if (m < 40) {
        isPass = false;
      }
      if (m > highest) {
        highest = m;
      }
      if (m < lowest) {
        lowest = m;
      }
    }

    const maxPossible = this.subjects.length * 100;
    const percentage = (totalMarks / maxPossible) * 100;

    let grade = 'F';
    if (isPass) {
      if (percentage >= 80) grade = 'A';
      else if (percentage >= 60) grade = 'B';
      else if (percentage >= 40) grade = 'C';
    }

    this.result = {
      total: totalMarks,
      maxPossible: maxPossible,
      percentage: percentage.toFixed(2),
      status: isPass ? 'Pass' : 'Fail',
      grade: grade,
      highest: highest,
      lowest: lowest
    };
  }

  reset() {
    this.subjects = [
      { mark: null },
      { mark: null },
      { mark: null }
    ];
    this.result = null;
    this.showError = false;
  }
}