import React from "react";

const createSection = (subSectionTitle: string, Content: any) => {
  return class Post extends React.Component {
    public render() {
      return (
        <div className="blog-subsection">
          <h2 className="blog-subsection-title">{subSectionTitle}</h2>
          <div className="blog-subsection-content">
            <Content />
          </div>
        </div>
      );
    }
  };
};

export default createSection;
