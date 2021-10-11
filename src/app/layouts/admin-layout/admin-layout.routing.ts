import { Routes } from "@angular/router";

import { DevicesComponent } from "../../pages/devices/devices.component";
import { CategoriesComponent } from "../../pages/categories/categorie.component";

export const AdminLayoutRoutes: Routes = [
  { path: "devices", component: DevicesComponent },
  { path: "categories", component: CategoriesComponent },
];
