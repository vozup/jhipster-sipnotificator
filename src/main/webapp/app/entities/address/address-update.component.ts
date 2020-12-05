import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IAddress, Address } from 'app/shared/model/address.model';
import { AddressService } from './address.service';
import { INotification } from 'app/shared/model/notification.model';
import { NotificationService } from 'app/entities/notification/notification.service';

@Component({
  selector: 'jhi-address-update',
  templateUrl: './address-update.component.html',
})
export class AddressUpdateComponent implements OnInit {
  isSaving = false;
  notifications: INotification[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    sipNumber: [null, [Validators.required]],
    description: [],
    notification: [],
    notification: [],
  });

  constructor(
    protected addressService: AddressService,
    protected notificationService: NotificationService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ address }) => {
      this.updateForm(address);

      this.notificationService.query().subscribe((res: HttpResponse<INotification[]>) => (this.notifications = res.body || []));
    });
  }

  updateForm(address: IAddress): void {
    this.editForm.patchValue({
      id: address.id,
      name: address.name,
      sipNumber: address.sipNumber,
      description: address.description,
      notification: address.notification,
      notification: address.notification,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const address = this.createFromForm();
    if (address.id !== undefined) {
      this.subscribeToSaveResponse(this.addressService.update(address));
    } else {
      this.subscribeToSaveResponse(this.addressService.create(address));
    }
  }

  private createFromForm(): IAddress {
    return {
      ...new Address(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      sipNumber: this.editForm.get(['sipNumber'])!.value,
      description: this.editForm.get(['description'])!.value,
      notification: this.editForm.get(['notification'])!.value,
      notification: this.editForm.get(['notification'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAddress>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: INotification): any {
    return item.id;
  }
}
