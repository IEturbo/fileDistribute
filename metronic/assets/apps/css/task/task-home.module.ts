import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskHomeComponent }from './component/task-home.component'
import { ZorkPagingModule } from '../paging/zork-paging.module';
@NgModule({
    imports:[ FormsModule, CommonModule, ZorkPagingModule],
    exports: [ TaskHomeComponent ],
    declarations: [TaskHomeComponent],
    providers: [],
})
export class TaskHomeModule{  }