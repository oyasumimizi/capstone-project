import React from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';

export default class Paypal extends React.Component {
    render() {
        const onSuccess = (payment) => {
            console.log("Thank you. Your payment was successful. Here is your order ID.", payment);
            this.props.onSuccess(payment);
        
        }

        const onCancel = (data) => {
            console.log('Payment canceled.', data);
        }

        const onError = (err) => {
            console.log("Error! Paypal's script has caused an error.", err);
        }

        let env = 'sandbox';
        let currency = 'USD';
        let total = this.props.toPay; 


        const client = {
            sandbox: 'AelMA7rUdxce2INjEX1y9KQ47L4J8Idv7rIROe3if2vnMqsIkIz5FFUvA5g-cZiRCnRl3X2EAZljDxWw',
            production: 'YOUR-PRODUCTION-APP-ID',
        }
        // In order to get production's app-ID, you will have to send your app to Paypal for approval first
        // For sandbox app-ID (after logging into your developer account, please locate the "REST API apps" section, click "Create App"):
        //   => https://developer.paypal.com/docs/classic/lifecycle/sb_credentials/
        // For production app-ID:
        //   => https://developer.paypal.com/docs/classic/lifecycle/goingLive/
        
        return (
            <PaypalExpressBtn
                env={env}
                client={client}
                currency={currency}
                total={total}
                onError={onError}
                onSuccess={onSuccess}
                onCancel={onCancel}
                style={{ 
                    size:'large',
                    color:'blue',
                    shape: 'rect',
                    label: 'checkout'
                }}
                 />
        );
    }
}