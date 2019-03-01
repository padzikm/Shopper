import { html, LitElement, customElement, property, css } from 'lit-element';
import './product-list';
import ApolloClient, { gql } from 'apollo-boost';

const client = new ApolloClient({
    uri: 'http://localhost:4000/'
});

const productListQuery = gql`{
    products {
        name
    }
}`;

@customElement('shopper-view')
export class ShopperView extends LitElement {
    static styles = css`
    p {
        display: inline-block;
        color: red;
    }
    `;

    @property({type: Array}) products?: Array<{name: string}> = undefined;

    connectedCallback(){
        super.connectedCallback();
        client.query({query: productListQuery}).then((res: {data: any})  => {
            console.log(res);
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
