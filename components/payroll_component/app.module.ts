import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PayrollComponent } from './app.component';
import { HmInputNumericComponent } from '../shared/components/input_numeric/input.numeric.component';

@NgModule({
    bootstrap: [PayrollComponent],
    declarations: [PayrollComponent, HmInputNumericComponent],
    imports: [BrowserModule],
})
export class PayrollModule {
}
