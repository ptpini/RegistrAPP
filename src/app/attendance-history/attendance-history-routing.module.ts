import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttendanceHistoryPage } from './attendance-history.page';

const routes: Routes = [
  {
    path: '',
    component: AttendanceHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttendanceHistoryPageRoutingModule {}
