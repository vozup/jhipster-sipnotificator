import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'notification',
        loadChildren: () => import('./notification/notification.module').then(m => m.SipNotificatorNotificationModule),
      },
      {
        path: 'address',
        loadChildren: () => import('./address/address.module').then(m => m.SipNotificatorAddressModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class SipNotificatorEntityModule {}
