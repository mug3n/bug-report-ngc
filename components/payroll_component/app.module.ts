import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HmInputNumericComponent } from '../shared/components/input_numeric/input.numeric.component';

@NgModule({
    bootstrap: [AppComponent],
    declarations: [AppComponent, HmInputNumericComponent],
    imports: [BrowserModule],
})
export class MainModule {
}
