import { LitElement, customElement, html, property } from "lit-element";
import { ApolloClient, gql } from "apollo-boost";
import { Product, TestmutMutation, TestmutMutationVariables } from "../../../typings/types.client";
import testMutat from './testmut.graphql'
import './event-test'

@customElement('product-list')
export class ProductList extends LitElement{
    @property({ type: Array }) products: Product[] = [];

    client?: ApolloClient<any>;
    name: string;
    pobierz?: () => void;

    constructor(){
        super();
        this.name = 'bla'
    }

    connectedCallback(){
        super.connectedCallback();
        console.log('w productlist');
    }

    change(e: Event){
        //console.log((e.target as HTMLInputElement).value)
        //console.log(this.name)
        this.name = (e.target as HTMLInputElement).value;
        //e.preventDefault();
    }

    klik(){
        this.client!.mutate<TestmutMutation, TestmutMutationVariables>({mutation: testMutat, variables: {prod: {name: this.name}}}).then(res => {
            console.log(res.data!.createProduct);
            if(this.pobierz){
                console.log('wysylam')
                this.pobierz();
            }
        });
    }

    writeData(){
        type temp = {
            jakikolwiek: string
        }
        const query = gql`query{
            jakikolwiek @client
        }`;
        this.client!.writeData<temp>({data: {jakikolwiek: 'mamy cie'}});
        let data = this.client!.readQuery<temp>({query});
        console.log(data)
        // let el = document.createElement('p');
        // el.textContent = data ? data.jakikolwiek : 'pusto';
        // this.lastChild!.appendChild(el)
    }

    obsluz(e: CustomEvent){
        console.log('obsluguje event w productlist')
        console.log(e)
    }

    render(){
        return html`${this.products.length > 0 ?
            html`<ul>
            ${this.products.map(p => html`<li>${p.name}</li>`)}
            </ul>`
            : html`nic nie ma!`}
            <input type='text' name='nejm' .value=${this.name} @change=${this.change}/>
            <event-test @customtestevent=${this.obsluz}></event-test>
            <button @click=${this.klik}>wyslij</button>
            <button @click=${this.writeData}>writedata</button>`;

    }
}