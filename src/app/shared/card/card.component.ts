import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UserProfile } from 'src/app/common/models/usersProfile.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class CardComponent {
  @Input() user!: UserProfile;
}
