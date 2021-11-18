import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { DataProviderService } from './service/data-provider.service';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ButtonComponent } from './components/navigation/components/button/button.component';
import { MarkerServiceService } from './service/marker.service';
import { VisibleMarkerPipe } from './pipe/visible-marker.pipe';
import { ToggleMarkerVisibilityService } from './service/toggle-marker-visibility.service';
import { CustomMapboxPopupComponent } from './components/map/custom-mapbox-popup/custom-mapbox-popup.component';
import { DynamicComponentService } from './service/dynamic-component.service';
import { PanToMarkerService } from './service/pan-to-marker.service';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    NavigationComponent,
    ButtonComponent,
    VisibleMarkerPipe,
    CustomMapboxPopupComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    DataProviderService,
    MarkerServiceService,
    ToggleMarkerVisibilityService,
    DynamicComponentService,
    PanToMarkerService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
