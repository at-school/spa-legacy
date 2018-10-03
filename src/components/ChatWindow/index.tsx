import { Icon, Input } from "antd";
import { css, StyleSheet } from "aphrodite";
import React from "react";
import { CSSTransition } from "react-transition-group";
import "./styles.css";

export default class ChatWindow extends React.Component<
  {},
  { windowVisible: boolean; inputFocus: boolean }
> {
  public state = {
    windowVisible: false,
    inputFocus: false
  };

  private windowRef: any;

  public componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  public componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  public render() {
    return (
      <div className={css(styles.chatWindow) + " chat-window"} ref={this.setWindowRef}>
        <div
          className="chat-window-main-icon"
          onClick={this.handleWindowVisible}
        >
          <i className="fas fa-comment" />
        </div>
        <CSSTransition
          timeout={300}
          classNames="chatwindow-visible"
          unmountOnExit={true}
          in={this.state.windowVisible}
        >
          <div
            className={`chat-window-main-content ${
              this.state.windowVisible ? null : "hide-window"
            }`}
          >
            <div className="chat-window-main-content-container">
              <div className="chat-window-content-header" />
              <div>
                <div className="chat-window-message-container" />
                <div
                  className={`chat-window-input ${
                    this.state.inputFocus ? "active" : null
                  }`}
                >
                  <Input
                    onFocus={this.toggleInputFocus}
                    onBlur={this.toggleInputFocus}
                    placeholder="Type your message here"
                  />
                  <div className="ulities-container">
                    <Icon type="smile-o" />
                    <Icon type="up-circle-o" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CSSTransition>
      </div>
    );
  }

  private handleClickOutside = (e: any) => {
    if (
      this.windowRef &&
      !this.windowRef.contains(e.target) &&
      this.state.windowVisible
    ) {
      this.handleWindowVisible();
    }
  };

  private setWindowRef = (ref: any) => {
    this.windowRef = ref;
  };

  private toggleInputFocus = () => {
    this.setState(prevState => ({ inputFocus: !prevState.inputFocus }));
  };

  private handleWindowVisible = () => {
    this.setState(prevState => ({ windowVisible: !prevState.windowVisible }));
  };
}

const styles = StyleSheet.create({
  chatWindow: {
    position: "fixed",
    bottom: "10px",
    right: "10px"
  }
});
