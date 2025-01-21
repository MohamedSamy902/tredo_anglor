import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './components/test/test.component';
import { TestDirective } from './directives/test.directive';
import { TestPipe } from './pipes/test.pipe';
import { NotFoundComponent } from './components/not-found/not-found.component';


@NgModule({
  declarations: [
    TestComponent,
    TestDirective,
    TestPipe,
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
