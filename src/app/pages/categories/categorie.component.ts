import { Component, OnInit, Type } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CategoryService } from "./categories.service";

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
        (click)="deleteCategory(category.id)"
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
        (click)="updateCategory(category.id, category.name)"
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
export class Categories implements OnInit {
  withAutofocus = `<button type="button" ngbAutofocus class="btn btn-danger"
(click)="modal.close('Ok click')">Ok</button>`;

  currentproduct = null;
  message = "";
  category: any = {
    id: "",
    name: "",
    description: "",
  };

  constructor(
    private _modalService: NgbModal,
    private categoryService: CategoryService
  ) {}

  open(name: string) {
    this._modalService.open(MODALS[name], { size: "lg" });
  }

  ngOnInit(): void {
    this.readCategory();
  }

  createCategory(): void {
    const data = {
      name: this.category.name,
      description: this.category.description,
    };
    if (!data) {
      alert("Please add all fields!");
      return;
    }

    this.categoryService.create(data).subscribe(
      (response) => {
        console.log(response);
        this.message = "The product was created!";
        alert(this.message);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  readCategory(): void {
    this.categoryService.readAll().subscribe(
      (categories) => {
        this.category = categories;
        console.log(this.category);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateCategory(id, data): void {
    this.categoryService.update(id, data).subscribe(
      (response) => {
        console.log(response);
        this.message = "The product was updated!";
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteCategory(id: number) {
    this.categoryService.delete(id).subscribe(
      (response) => {
        this.category = this.category.filter((item) => item.id !== id);
        this.message = "The product was deleted!";
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
