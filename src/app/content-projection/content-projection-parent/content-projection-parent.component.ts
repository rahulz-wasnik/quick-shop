import { Component } from '@angular/core';
import { WidgetComponent } from '../widget/widget.component';
import { WeatherContentComponent } from '../weather-content/weather-content.component';

@Component({
  selector: 'app-content-projection-parent',
  standalone: true,
  imports: [WidgetComponent, WeatherContentComponent],
  templateUrl: './content-projection-parent.component.html',
  styleUrl: './content-projection-parent.component.scss',
})
export class ContentProjectionParentComponent {}
