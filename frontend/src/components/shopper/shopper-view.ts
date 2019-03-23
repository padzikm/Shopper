import { html, LitElement, customElement, property } from 'lit-element';
import './product-list';
import ApolloClient from 'apollo-boost';
import styles from './styles.css'
import productListQuery from './client.graphql'

const client = new ApolloClient({
    uri: 'http://localhost:4000/'
});

@customElement('shopper-view')
export class ShopperView extends LitElement {
    static styles = styles

    @property({type: Array}) products?: Array<{name: string}> = undefined;

    connectedCallback(){
        super.connectedCallback();
        client.query({query: productListQuery}).then((res: {data: any})  => {
            this.products = res.data.products;
        })
    }

    clickHandler() {
        alert('clicked!');
    }

    render() {
        return html`<p @click="${this.clickHandler}">witamy shopping</p>
        ${this.products === undefined ? html`Loading...` : html`<product-list .products="${this.products}"></product-list>`}`;
    }
}
