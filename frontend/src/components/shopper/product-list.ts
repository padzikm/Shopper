import { LitElement, customElement, html, property } from "lit-element";

@customElement('product-list')
export class ProductList extends LitElement{
    @property({ type: Array }) products: Array<{name: string}> = [];

    render(){
        return html`${this.products.length > 0 ?
            html`<ul>
            ${this.products.map(p => html`<li>${p.name}</li>`)}
            </ul>`
            : html`nic nie ma`}`;
    }
}