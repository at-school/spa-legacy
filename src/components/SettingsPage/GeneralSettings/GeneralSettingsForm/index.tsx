import { Button, Form, Input, Select } from "antd";
import React from "react";

class GeneralSettingsForm extends React.Component<{
  email: string;
  phone: string;
  form: any;
  firstname: string;
  lastname: string;
}> {
  public render() {
    const { getFieldDecorator } = this.props.form;

    const prefixPhone = this.props.phone.slice(0, 3);
    const mainPhone = this.props.phone.slice(3);
    console.log(prefixPhone, mainPhone);
    return (
      <Form hideRequiredMark={true}>
        <Form.Item label="Email">
          {getFieldDecorator("email", {
            rules: [
              {
                required: true,
                message: "Please input your email"
              }
            ],
            initialValue: this.props.email
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Phone Number">
          {getFieldDecorator("phone", {
            rules: [
              {
                required: true,
                message: "Please input your phone number!"
              }
            ],
            initialValue: mainPhone
          })(
            <Input
              addonBefore={getFieldDecorator("prefix", {
                initialValue: prefixPhone
              })(
                <Select>
                  <Select.Option value="+61">+61</Select.Option>
                  <Select.Option value="+64">+64</Select.Option>
                </Select>
              )}
            />
          )}
        </Form.Item>
        <Form.Item label="First name">
          {getFieldDecorator("firstname", {
            rules: [
              {
                required: true,
                message: "Please input your first name"
              }
            ],
            initialValue: this.props.firstname
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Last name">
          {getFieldDecorator("lastname", {
            rules: [
              {
                required: true,
                message: "Please input your last name"
              }
            ],
            initialValue: this.props.lastname
          })(<Input />)}
        </Form.Item>
        <Form.Item>
          <Button type="primary">Update Information</Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(GeneralSettingsForm as any) as any;
