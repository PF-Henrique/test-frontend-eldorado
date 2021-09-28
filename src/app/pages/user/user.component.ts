import { Component, OnInit, Type } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "ngbd-modal-confirm",
  template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-title">Category Deletion</h4>
      <button
        type="button"
        class="close"
        aria-describedby="modal-title"
        (click)="modal.dismiss('Cross click')"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>
        <strong
          >Are you sure you want to delete
          <span class="text-primary">this device?</span></strong
        >
      </p>
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-outline-secondary"
        (click)="modal.dismiss('cancel click')"
      >
        Cancel
      </button>
      <button
        type="button"
        class="btn btn-danger"
        (click)="modal.close('Ok click')"
      >
        Ok
      </button>
    </div>
  `,
})
export class NgbdModalConfirm {
  constructor(public modal: NgbActiveModal) {}
}

@Component({
  selector: "ngbd-modal-confirm-autofocus",
  template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-title">Edit Category</h4>
      <button
        type="button"
        class="close"
        aria-label="Close button"
        aria-describedby="modal-title"
        (click)="modal.dismiss('Cross click')"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <form>
        <div class=" row">
          <div class=" col-md-6 pr-md-1">
            <div class=" form-group">
              <label> Category Name </label>
              <input
                class=" form-control"
                placeholder="ex: CellPhone"
                type="text"
              />
            </div>
          </div>
          <div class=" col-md-6 pl-md-1">
            <div class=" form-group">
              <label> Type </label>
              <input
                class=" form-control"
                placeholder="Eletronics"
                type="text"
              />
            </div>
          </div>
        </div>
        <div class=" row">
          <div class=" col-md-8">
            <div class=" form-group">
              <label> Description Category</label>
              <textarea
                class=" form-control"
                cols="80"
                placeholder="Here can be your description"
                rows="4"
              ></textarea>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-outline-secondary"
        (click)="modal.dismiss('cancel click')"
      >
        Cancel
      </button>
      <button
        type="button"
        ngbAutofocus
        class="btn btn-danger"
        (click)="modal.close('Ok click')"
      >
        Ok
      </button>
    </div>
  `,
})
export class NgbdModalConfirmAutofocus {
  constructor(public modal: NgbActiveModal) {}
}

const MODALS: { [name: string]: Type<any> } = {
  autofocus: NgbdModalConfirmAutofocus,
  delete: NgbdModalConfirm,
};

@Component({
  selector: "app-user",
  templateUrl: "user.component.html",
  styleUrls: ["user.component.css"],
})
export class UserComponent implements OnInit {
  withAutofocus = `<button type="button" ngbAutofocus class="btn btn-danger"
(click)="modal.close('Ok click')">Ok</button>`;

  constructor(private _modalService: NgbModal) {}

  open(name: string) {
    this._modalService.open(MODALS[name], { size: "lg" });
  }

  ngOnInit() {}
}
