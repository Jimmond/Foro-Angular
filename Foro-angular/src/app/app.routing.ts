// Importar los modulos del router
import {ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserGuard } from './services/user.guard';
import { NoIdentityGuard } from './services/no.identity.guard';

// Importar componentes
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { TopicsComponent } from './components/topics/topics.component';
import { TopicDetailComponent } from './components/topic-detail/topic-detail.component';
import { UsersComponent } from './components/users/users.component';
import { ProfileComponent} from './components/profile/profile.component'


// Array de rutas
const appRoutes: Routes=[
    { path: '', component: HomeComponent },
    { path: 'inicio', component: HomeComponent },
    { path: 'login', canActivate:[NoIdentityGuard], component: LoginComponent },
    { path: 'registro', canActivate:[NoIdentityGuard], component: RegisterComponent },
    { path: 'ajustes', canActivate:[UserGuard], component: UserEditComponent },
    { path: 'temas', component: TopicsComponent} ,
    { path: 'temas/:page', component: TopicsComponent },
    { path: 'tema/:id', component: TopicDetailComponent },
    { path: 'usuarios', component: UsersComponent },
    { path: 'perfil/:id', component: ProfileComponent },
    { path: '**', component: HomeComponent },
]
// Exportar configuracion
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);