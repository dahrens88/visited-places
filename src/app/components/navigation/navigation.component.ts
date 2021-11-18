import { Component, Input, Output, EventEmitter} from '@angular/core';
import { IMarker } from 'src/app/model/marker.interface';
import { ToggleMarkerVisibilityService } from 'src/app/service/toggle-marker-visibility.service';
import { IUser } from 'src/app/model/user.interface';
import { PanToMarkerService } from 'src/app/service/pan-to-marker.service';

@Component({
  selector: 'component-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  @Input()
  isDynamicallyMarkers: boolean;

  @Input()
  navigationMarkers: IMarker[];

  @Input()
  users: IUser[];

  @Output()
  clickFromNavigationToApp: EventEmitter<boolean> = new EventEmitter<boolean>();

  public showAllMarkers: boolean = true;
  public showDynamicallyMarkers: boolean = false;
  public indexedUsersById: Object = {};

  private toggleMarkerVisibilityService: ToggleMarkerVisibilityService;
  private panToMarkerService: PanToMarkerService;

  constructor(
    toggleMarkerVisibilityService: ToggleMarkerVisibilityService,
    panToMarkerService: PanToMarkerService
  ) {
    this.toggleMarkerVisibilityService = toggleMarkerVisibilityService;
    this.panToMarkerService = panToMarkerService;
  }

  ngOnInit(): void {
    this.users.forEach(user => {
      this.indexedUsersById[user.id] = user;
    });
  }

  public onClickShowAllMarkers(): void {
    this.clickFromNavigationToApp.emit(false);
    this.showAllMarkers = true;
    this.showDynamicallyMarkers = false;

    this.toggleMarkerVisibilityService.setDynamicallyAddedMarker(false);
  }

  public onClickShowViewPortMarkers(): void {
    this.clickFromNavigationToApp.emit(true);
    this.showAllMarkers = false;
    this.showDynamicallyMarkers = true;

    this.toggleMarkerVisibilityService.setDynamicallyAddedMarker(true);
  }

  public onClickPanToMarker(marker: IMarker): void {
    this.panToMarkerService.setMarker(marker);
  }
}