import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { SidenavListComponent } from './sidenav-list/sidenav-list.component';

@NgModule({
  declarations: [HeaderComponent, SidenavListComponent],
  imports: [SharedModule, RouterModule],
  exports: [HeaderComponent, SidenavListComponent],
})
export class LayoutModule {}
