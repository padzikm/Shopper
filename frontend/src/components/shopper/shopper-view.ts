import { html, LitElement, customElement, property } from 'lit-element';
import './product-list';
import ApolloClient, { ObservableQuery } from 'apollo-boost';
import styles from './styles.css'
import productListQuery from './shopper-view.graphql'
import { CokolwQuery, CokolwQueryVariables, Product, Cokolwiek } from '../../../typings/types.client';

const client = new ApolloClient({
    uri: 'http://localhost:4000/'
});

@customElement('shopper-view')
export class ShopperView extends LitElement {
    static styles = styles

    @property({type: Array}) products?: Product[] = undefined;

    @property({type: Object}) wq?: ObservableQuery<CokolwQuery, CokolwQueryVariables>

    connectedCallback(){
        super.connectedCallback();
        console.log('w shopperview')
        //this.addEventListener('customtestevent', this.obsluz);
        this.pobieram();
    }

    clickHandler() {
        alert('clicked!');
    }

    pobieram(){
        console.log('pobieramy')
        console.log(productListQuery)
        this.wq = client.watchQuery<CokolwQuery, CokolwQueryVariables>({query: productListQuery})
        this.wq.result().then(res => {
            console.log(res);
            this.products = res.data.products;
            if(!this.wq)
            console.log('hmmm')
        })
        if(!this.wq)
            console.log('yyyy')
    }

    aktual(){
        console.log(this)
        if(!this.wq)
            {
                console.log('zwijam')
                return
            }
        this.wq!.refetch().then(res => {
            console.log(res);
            this.products = res.data.products;
        });
    }

    obsluz(e: Event){
        console.log('obsluguje event')
        console.log(e)
    }

    render() {
        return html`<p @click="${this.clickHandler}">witamy shopping</p>
        ${this.products === undefined ? html`Loading...` : html`<product-list @customtestevent=${this.obsluz} .products="${this.products}" .client="${client}" .pobierz=${() => this.aktual()}></product-list>`}`;
    }
}
