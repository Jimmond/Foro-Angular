// Importar los modulos del router
import {ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Importar componentes
import { HomeComponent } from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';

// Array de rutas
const appRoutes: Routes=[
    { path: '', component: HomeComponent},
    { path: 'inicio', component: HomeComponent},
    { path: 'login', component: LoginComponent},
    { path: 'registro', component: RegisterComponent},
    { path: 'ajustes', component: UserEditComponent},
    { path: '**', component: HomeComponent},
]
// Exportar configuracion
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);