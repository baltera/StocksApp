import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

const MaterialComponents: any = [MatToolbarModule];

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
