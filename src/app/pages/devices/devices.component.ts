import { Component, OnInit, Type } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DeviceService } from "./devices.service";
import { Categories } from "../categories/categorie.component";

@Component({
  selector: "ngbd-modal-confirm",
  template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-title">Device Deletion</h4>
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
      <h4 class="modal-title" id="modal-title">Edit Device</h4>
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
              <label> Device Name </label>
              <input
                class=" form-control"
                placeholder="ex: CellPhone"
                type="text"
                id="deviceName"
                required
                [(ngModel)]="products.name"
                name="Device Name"
              />
            </div>
          </div>
          <div class=" col-md-6 pl-md-1">
            <div class=" form-group">
              <label> Color </label>
              <input
                class=" form-control"
                placeholder="Eletronics"
                type="text"
                id="color"
                required
                [(ngModel)]="products.color"
                name="Color"
              />
            </div>
          </div>
        </div>
        <div class=" row">
          <div class=" col-md-6 pr-md-1">
            <div class=" form-group">
              <label> Serial Number </label>
              <input
                class=" form-control"
                placeholder="ex: CellPhone"
                type="text"
                id="serialNumber"
                required
                [(ngModel)]="product.serialNumber"
                name="Serial Number"
              />
            </div>
          </div>
          <div class=" col-md-6 pl-md-1">
            <div class=" form-group">
              <label> Categories </label>
              <div class="input-group">
                <label class="input-group-text" for="inputGroupSelect01"
                  >Select One Category</label
                >
                <select
                  class="form-select col-md-4"
                  id="inputGroupSelect01"
                  style="background-color: #525f7f; border-radius: 3px; height: 35px;"
                >
                  <option selected>Choose...</option>
                  <option value="1">{{}}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class=" row">
          <div class=" col-md-10 pr-md-1">
            <div class=" form-group">
              <label> Description Category</label>
              <input
                class=" form-control"
                cols="80"
                rows="4"
                placeholder="Here can be your description"
                type="text"
              />
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
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html",
  styleUrls: ["dashboard.component.css"],
})
export class DevicesComponent implements OnInit {
  withAutofocus = `<button type="button" ngbAutofocus class="btn btn-danger"
  (click)="modal.close('Ok click')">Ok</button>`;

  currentproduct = null;
  message = "";

  products: any = {
    id: "",
    name: "",
    color: "",
    category: [],
    serialNumber: "",
  };
  currentProduct: any;

  constructor(
    private _modalService: NgbModal,
    private deviceService: DeviceService,
    private categoryService: Categories
  ) {}

  open(name: string) {
    this._modalService.open(MODALS[name], { size: "lg" });
  }

  ngOnInit(): void {
    this.readProducts();
    this.getCategories();
  }

  getCategories() {
    this.categoryService.readCategory();
  }

  readProducts(): void {
    this.deviceService.readAll().subscribe(
      (products) => {
        this.products = products;
        console.log(this.products);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  createProduct(): void {
    const data = {
      name: this.products.name,
      color: this.products.color,
      category: this.products.category,
      serialNumber: this.products.serialNumber,
    };
    if (!data) {
      alert("Please add all fields!");
      return;
    }

    this.deviceService.create(data).subscribe(
      (response) => {
        console.log(response);
        this.message = "The product was created!";
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateProduct(id, data): void {
    this.deviceService.update(id, data).subscribe(
      (response) => {
        console.log(response);
        this.message = "The product was updated!";
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteProduct(): void {
    this.deviceService.delete(this.currentProduct.id).subscribe(
      (response) => {
        console.log(response);
        this.message = "The product was updated!";
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
