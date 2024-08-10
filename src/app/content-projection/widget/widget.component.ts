import { Component } from '@angular/core';
import { WidgetButtonComponent } from '../widget-button/widget-button.component';

@Component({
  selector: 'app-widget',
  standalone: true,
  imports: [WidgetButtonComponent],
  templateUrl: './widget.component.html',
  styleUrl: './widget.component.scss',
})
export class WidgetComponent {}
