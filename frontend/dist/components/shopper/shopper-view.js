var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement, customElement, property, css } from 'lit-element';
import './product-list';
import ApolloClient, { gql } from 'apollo-boost';
const client = new ApolloClient({
    uri: 'http://localhost:4000/'
});
const productListQuery = gql `{
    products {
        name
    }
}`;
let ShopperView = class ShopperView extends LitElement {
    constructor() {
        super(...arguments);
        this.products = undefined;
    }
    connectedCallback() {
        super.connectedCallback();
        client.query({ query: productListQuery }).then((res) => {
            console.log(res);
            this.products = res.data.products;
        });
    }
    clickHandler() {
        alert('clicked!');
    }
    render() {
        return html `<p @click="${this.clickHandler}">witamy shopping</p>
        ${this.products === undefined ? html `Loading...` : html `<product-list .products="${this.products}"></product-list>`}`;
    }
};
ShopperView.styles = css `
    p {
        display: inline-block;
        color: red;
    }
    `;
__decorate([
    property({ type: Array })
], ShopperView.prototype, "products", void 0);
ShopperView = __decorate([
    customElement('shopper-view')
], ShopperView);
export { ShopperView };
