import { LitElement, customElement, html } from "lit-element";

@customElement('event-test')
export class EventTest extends LitElement{
    connectedCallback(){
        super.connectedCallback();
        console.log('w eventtest');
    }

    wyslij(){
        let event = new CustomEvent('customtestevent', {detail: {value: 'from custom-event pzdr'}, bubbles: true, composed: true});
        this.dispatchEvent(event);
    }

    render(){
        return html`<button @click=${this.wyslij}>Event from test</button>`;
    }
}