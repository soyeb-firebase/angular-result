import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './calculator.html',
  styleUrls: ['./calculator.scss']
})
export class CalculatorComponent {
  markForm: FormGroup;
  result: any = null;

  constructor(private fb: FormBuilder) {
    this.markForm = this.fb.group({
      subjects: this.fb.array([])
    });
    
    this.addSubject();
    this.addSubject();
    this.addSubject();
  }

  get subjects() {
    return this.markForm.get('subjects') as FormArray;
  }

  addSubject() {
    const subjectGroup = this.fb.group({
      mark: ['', [Validators.required, Validators.min(0), Validators.max(100), Validators.pattern("^[0-9]*$")]]
    });
    this.subjects.push(subjectGroup);
  }

  removeSubject(index: number) {
    if (this.subjects.length > 1) {
      this.subjects.removeAt(index);
    }
  }

  calculate() {
    this.markForm.markAllAsTouched();

    if (this.markForm.invalid) {
      return;
    }

    const marks: number[] = this.subjects.value.map((s: any) => Number(s.mark));
    
    const totalMarks = marks.reduce((acc, curr) => acc + curr, 0);
    const maxPossible = marks.length * 100;
    const percentage = (totalMarks / maxPossible) * 100;
    
    const hasFailedSubject = marks.some(mark => mark < 40);
    const isPass = !hasFailedSubject;

    let grade = 'F';
    if (isPass) {
      if (percentage >= 80) grade = 'A';
      else if (percentage >= 60) grade = 'B';
      else if (percentage >= 40) grade = 'C';
    }

    const highest = Math.max(...marks);
    const lowest = Math.min(...marks);

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
    this.markForm.reset();
    this.subjects.clear();
    this.addSubject();
    this.addSubject();
    this.addSubject();
    this.result = null;
  }
}