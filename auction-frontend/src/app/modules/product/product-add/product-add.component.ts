import { Component, OnInit } from '@angular/core';
import {Product} from "../../../models/entity/Product";
import {ProductService} from "../../../services/product.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

declare var $: any;
@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {

  products: Product[] = [];
  form: FormGroup;
  constructor(private formBuilder: FormBuilder,private productService:ProductService) {
    this.form = formBuilder.group({
      productName: [null, Validators.required],
      description: [null, Validators.required],
      startPrice: [1, [Validators.required, Validators.min(1)]],
    });
  }


  async ngOnInit() {

    await this.productService.getAll().then((data:Product[]) => {
      this.products = data;
    });

    setTimeout(() => {
      this.initJQuery();
    });
  }

  initJQuery() {
    $("#tbl_product").DataTable({
      "responsive": true,
      "lengthChange": false,
      "autoWidth": false,
      "searching": false
    });
  }

  async addProduct() {
    const product:any = this.form.value;
    console.log(product);
    await this.productService.save(product).then((data:Product) => {
      this.products.push(data);
      $("#productFormModal").modal('hide');
      this.form.reset();
    });
  }

}
