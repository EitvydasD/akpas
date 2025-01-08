import { Component, Input } from '@angular/core';

@Component({
  selector: 'title-text',
  templateUrl: './title-text.component.html',
  standalone: true,
})
export class TitleTextComponent {
  @Input()
  public title: string = '';

  @Input()
  public text?: string | number | Date | null = '';

  @Input()
  public type: 'horizontal' | 'vertical' = 'vertical';
}
