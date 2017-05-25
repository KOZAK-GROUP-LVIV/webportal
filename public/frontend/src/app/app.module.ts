import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Route, Routes, RouterModule, ROUTER_CONFIGURATION } from '@angular/router';

import {httpConnection, socketConnection, cookieS} from './tokens';
import {HttpConnectionService} from './http-connection.service';
import {SocketConnectionService} from './socket-connection.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatMessagesListComponent } from './chat-messages-list/chat-messages-list.component';
import { EntryComponent } from './entry/entry.component';
import { CookieLawModule } from 'angular2-cookie-law';
import { NavComponent } from './nav/nav.component';
import { OnlineStatusPipe } from './status.pipe';
import { CustomDatePipe } from './custom-date.pipe';
import { NewsListComponent } from './news-list/news-list.component';
import { padinationNews} from './news-list/paginationNews'

import { InterviewComponent } from './interview/interview.component';
import { AdminEditChatComponent } from './admin-edit-chat/admin-edit-chat.component';
import { NewsEditorComponent } from './news-editor/news-editor.component';
import { FormNewsEditComponent, modalNewsEditor } from './form-news-edit/form-news-edit.component';
import { NgbdPaginationBasic } from './news-editor/paginationNews';
import { InterviewEditorComponent } from './interview-editor/interview-editor.component';
import { FormInterviewEditComponent, modalInterviewEditor } from './form-interview-edit/form-interview-edit.component';
import { VerificBannerComponent } from './verific-banner/verific-banner.component';
import { CookieService } from 'angular2-cookie/core';
import { AuthGuard } from './guards/authGuard'
import { AdminGuard } from './guards/adminGuard'
import { VerifGuard } from './guards/verificGuard';
import { FormProfileEditComponent, modalProfileEditor } from './form-profile-edit/form-profile-edit.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { CookieServiceCustom } from './cookie.service';

const routers:Route[] = [
{path: 'entry/:mode', component: EntryComponent},
{path: 'chat', redirectTo: 'chat/workers', canActivate: [AuthGuard, VerifGuard]},
{path: 'chat/:mode', component: ChatListComponent, canActivate: [AuthGuard, VerifGuard]},
{path: 'news', component: NewsListComponent, canActivate: [AuthGuard, VerifGuard]},
{path: 'interview', component: InterviewComponent, canActivate: [AuthGuard, VerifGuard]},
{path: 'admin', redirectTo: 'admin/editWorkers', canActivate: [AdminGuard]},
{path: 'admin/editWorkers', component: AdminEditChatComponent, canActivate: [AdminGuard]},
{path: 'admin/editNews', component: NewsEditorComponent, canActivate: [AdminGuard]},
{path: 'admin/editInterviews', component: InterviewEditorComponent, canActivate: [AdminGuard]},
{path: 'noVerificWorker', component: VerificBannerComponent, canActivate:[AuthGuard]},
{path: '', pathMatch: 'full', redirectTo: 'news'}
]



@NgModule({
  declarations: [
    AppComponent,
    ChatListComponent,
    ChatMessagesListComponent,
    EntryComponent,
    NavComponent,
    OnlineStatusPipe,
    CustomDatePipe,
    NewsListComponent,
    InterviewComponent,
    AdminEditChatComponent,
    NewsEditorComponent,
    FormNewsEditComponent,
    modalNewsEditor,
    modalInterviewEditor,
    NgbdPaginationBasic,
    padinationNews,
    InterviewEditorComponent,
    FormInterviewEditComponent,
    VerificBannerComponent,
    FormProfileEditComponent,
    modalProfileEditor
  ],
  entryComponents: [modalNewsEditor, modalInterviewEditor, modalProfileEditor],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CookieLawModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routers),
    NgbModule.forRoot(),
    CKEditorModule
  ],
  providers: [{provide: httpConnection, useClass: HttpConnectionService}, 
              {provide: socketConnection, useClass: SocketConnectionService}, AuthGuard, AdminGuard, VerifGuard, 
              CookieService,
              {provide: cookieS, useClass: CookieServiceCustom}],
  bootstrap: [AppComponent]
})
export class AppModule { }
