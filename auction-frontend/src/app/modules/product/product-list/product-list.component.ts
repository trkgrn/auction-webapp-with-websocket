import { Component, OnInit } from '@angular/core';
import {Product} from "../../../models/entity/Product";
import {ProductService} from "../../../services/product.service";
import {Bid} from "../../../models/entity/Bid";
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import {environment} from "../../../../environments/environment";
import {User} from "../../../models/entity/User";
import {AuthService} from "../../../services/auth.service";

declare var $: any;
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  socket?: WebSocket;
  user?: User;
  selectedProduct?: Product;

  stompClients = new Map<string, Stomp.Client>();
  constructor(private productService:ProductService, private authService:AuthService) { }

  async ngOnInit() {
    await this.authService.getAuthenticatedUser().then((data:User) => {
      this.user = data;
    });

    await this.productService.getAll().then((data:Product[]) => {
      this.products = data;
      this.products.forEach((product:Product) => {
        this.connectByProductId(product.productId!);
      });
    });
  }

  showAllBids(product:Product) {
    this.selectedProduct = product;
  }

  bid(product:Product) {
    if (product.increment! > 0){
      const date = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString();
      const bid: Bid = new Bid('', this.user?.username, product.currentPrice! + product.increment!,date);
      console.log(bid)
      this.sendBid(bid, product.productId!);

    }
  }

  connectByProductId(productId: string) {
    const destination = '/topic/products/' + productId;
    this.socket = new SockJS(environment.baseUrl + '/bid');
    let stompClient: Stomp.Client = Stomp.over(this.socket);
    this.stompClients.set(productId, stompClient);

    stompClient.connect({}, (frame) => {
      //func = what to do when connection is established
      console.log('connected to: ' + frame);
      stompClient!.subscribe(
        destination,
        async (response) => {
          let product: Product = JSON.parse(response.body);
          this.products = this.products.map((p:Product) => {
            if (p.productId === product.productId) {
              p = product;
            }
            return p;
          });

            if (this.selectedProduct?.productId === productId) {
              this.selectedProduct = this.products.find((product:Product) => product.productId === productId);
            }
        }
      );
    });
  }

  sendBid(bid:Bid, productId:string) {
    const stompClient = this.stompClients.get(productId);
      stompClient!.send(
        '/app/bid/' + productId,
        {},
        JSON.stringify(bid)
      );
    }

}
