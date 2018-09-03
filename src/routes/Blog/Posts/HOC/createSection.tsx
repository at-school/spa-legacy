import React from "react";

const createSection = (sectionTitle: string, Content: any) => {
  return class Post extends React.Component {
    public render() {
      return (
        <div className="blog-section">
          <h2 className="blog-section-title">{sectionTitle}</h2>
          <p className="blog-section-content">
          <Content />
          </p>
        </div>
      );
    }
  };
};

export default createSection;
