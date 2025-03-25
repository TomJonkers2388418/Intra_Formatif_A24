import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators, ReactiveFormsModule, FormControlOptions, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { MatCard } from '@angular/material/card';
import { MatError, MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatCardModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatButtonModule, MatTabsModule,
    CommonModule, MatError, MatFormField, MatCard, MatInput]
})
export class AppComponent {
  title = 'reactive.form';
  form: FormGroup<any>

  formData?: Data;


  constructor(private fb: FormBuilder) {

    this.form = this.fb.group({
      name: ["", [Validators.required]],
      roadnumber: ["", [Validators.required, Validators.min(1000), Validators.max(9999)]],
      postalcode: ["", [Validators.required, Validators.pattern("^[A-Z][0-9][A-Z][ ]?[0-9][A-Z][0-9]$")]],
      comments: ["", [this.commentValidator]]
    }
    )

    // À chaque fois que les valeurs changent, notre propriété formData sera mise à jour
    this.form.valueChanges.subscribe(() => {
      this.formData = this.form.value;
    });
  }



  commentValidator(form: AbstractControl): ValidationErrors | null {
    // On récupère les valeurs de nos champs textes
    const comments = form.value
    const name = form.parent?.get("name")?.value

    if (comments.split(" ").length < 10)
      return { tenWordsInComments: true }

    if (comments.includes(name))
      return { commentsIncludeNames: true }


    return null
  }



}

interface Data {
  name?: string | null;
  roadnumber?: string | null;
  rue?: string | null;
  postalcode?: string | null;
  comments?: string | null;
}


