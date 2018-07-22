import { Button, Form, Icon, Input } from "antd";
import * as React from "react";
import { withRouter } from "react-router-dom";
import { signin } from "../../../../api/auth";
import AppContext from "../../../../contexts/AppContext";
import { IError } from "../../IFormError";

interface IFormData {
  username: string;
  password: string;
}

interface IFormError {
  username: IError[];
  password: IError[];
}

class SignInForm extends React.Component<any> {
  public state = {
    loading: false
  };

  public handleSubmit = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.props.form.validateFields((err: IFormError, values: IFormData) => {
      if (!err) {
        this.setState({ loading: true });
        signin(values.username, values.password).then((res) => {
          this.setState({ loading: false });
          this.props.signinUser(res)
          this.props.history.push("/teacher/dashboard");
        });
      }
    });
  };

  public render() {
    const {
      getFieldDecorator,
      getFieldError,
      isFieldTouched
    } = this.props.form;

    // Only show error after a field is touched.
    const userNameError =
      isFieldTouched("username") && getFieldError("username");
    const passwordError =
      isFieldTouched("password") && getFieldError("password");
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <Form.Item
          validateStatus={userNameError ? "error" : undefined}
          help={userNameError || ""}
        >
          {getFieldDecorator("username", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(<Input prefix={<Icon type="user" />} placeholder="Username" />)}
        </Form.Item>
        <Form.Item
          validateStatus={passwordError ? "error" : undefined}
          help={passwordError || ""}
        >
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your Password!" }]
          })(
            <Input
              prefix={<Icon type="lock" />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item className="signinFormButton">
          <Button
            loading={this.state.loading}
            type="primary"
            htmlType="submit"
            className="loginFormButton"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const SignInFormWithContext = (props: any) => (
  <AppContext.Consumer>
    {value => <SignInForm {...props} {...value} />}
  </AppContext.Consumer>
);
const SignInFormNoRouter = Form.create()(SignInFormWithContext);
export default withRouter(SignInFormNoRouter as any);
