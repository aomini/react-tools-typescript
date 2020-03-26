import * as React from "react";
import Form, {required, minLength} from './Form'

const Contact: React.FC = () => {
    return (
        <Form 
            defaultValue={{name : '', email : '', reason : '', notes : ''}}
            validationRules={{
                email: { validator: required },
                name: [{ validator: required }, { validator: minLength, arg: 2}]
            }}
        >
            <Form.Field name="name" label="Name"></Form.Field>
            <Form.Field name="email" label="Email"></Form.Field>
            <Form.Field type="select" name="reason" label="reason" options={["support", 'maintainance']}></Form.Field>
            <Form.Field name="notes" label="Notes" type="textarea"></Form.Field>
        </Form>
    )
};

export default Contact;
