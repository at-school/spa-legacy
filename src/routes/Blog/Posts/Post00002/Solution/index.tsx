import React from "react";

export default class Solution extends React.Component {
  public render() {
    return (
      <div>
        <div className="title">The solution </div>
        <div className="description">
          We’ve decided to utilise the power of GraphQl in conjunction with
          React. Make this `React` equation more powerful:
          <code>f(d) = v</code>
          React is all about data. With REST APIS, we have to fetch data
          manually ourselves tell React the changes in data ourselves. On the
          other hand, by using GraphQl, every changes in the database could
          trigger a re-fetch, which then leads to a re-render of the view. All
          of the steps are automatically handled by GraphQl. So now, we could
          remove half of the code we’ve got.
        </div>
      </div>
    );
  }
}
