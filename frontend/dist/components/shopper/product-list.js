var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, customElement, html, property } from "lit-element";
let ProductList = class ProductList extends LitElement {
    constructor() {
        super(...arguments);
        this.products = [];
    }
    render() {
        return html `${this.products.length > 0 ?
            html `<ul>
            ${this.products.map(p => html `<li>${p.name}</li>`)}
            </ul>`
            : html `nic nie ma!`}`;
    }
};
__decorate([
    property({ type: Array })
], ProductList.prototype, "products", void 0);
ProductList = __decorate([
    customElement('product-list')
], ProductList);
export { ProductList };
