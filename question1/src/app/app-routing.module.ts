import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CatComponent } from './cat/cat.component';
import { DogComponent } from './dog/dog.component';
import { apiGuard } from './auth.guard';
import { dogGuard } from './dog.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'cat', component: CatComponent, canActivate: [apiGuard, dogGuard] },
  { path: 'dog', component: DogComponent, canActivate: [apiGuard] },
  { path: 'home', component: HomeComponent, canActivate: [apiGuard] },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
