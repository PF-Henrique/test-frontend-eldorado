import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { UserComponent } from "../../pages/categories/categorie.component";

export const AdminLayoutRoutes: Routes = [
  { path: "devices", component: DashboardComponent },
  { path: "categories", component: UserComponent },
];
