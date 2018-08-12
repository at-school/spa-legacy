import React from "react";

export default class AboutTeam extends React.Component {
  public render() {
    return (
      <React.Fragment>
        <div className="group-photo">
          <div className="group-photo-description">Meet The Team</div>
        </div>
        <div className="about-content">
          <div className="team-mission">
            We are a team of three members who want to change the world by the
            innovative use of technology. We believe that education is the most
            priority area to invest on, because simply kids are the future.
          </div>
          <div className="members-introduction">
            <div className="anh-pham member-introduction">
              <div className="image-container">
                <div className="image-container-description" />
              </div>
              <div className="blurb-container">
                <div className="name">Anh Pham</div>
                <div className="role">
                  <strong>Roles: </strong>Project Lead, Machine Learning
                  Engineer, Full Stack Web Developer, UX Designer
                </div>
                <div className="contribution">
                  <strong>Contributions: </strong>
                  Anh is a React Developer as well as Machine Learning Engineer.
                  With his full stack development skills, he has developed the
                  Web Application and Mobile Application of the product. He also
                  contributes his Machine Learning knowledge into developing a
                  facial detection algorithm and a sentiment analysis algorithm.
                  In addition, he is in charge of the quality of the product,
                  and making sure that the development is on the current time
                  track.
                </div>
              </div>
            </div>
            <div className="charl-kruger member-introduction">
              <div className="image-container">
                <div className="image-container-description" />
              </div>
              <div className="blurb-container">
                <div className="name">Charl Kruger</div>
                <div className="role">
                  <strong>Roles: </strong>Front End Developer, Data Analystic, UX Designer
                </div>
                <div className="contribution">
                  <strong>Contributions: </strong>
                  Charl is a Data Scientist and a Designer. He has used his Data Science skills
                  to make an algorithm that helps teachers to find hidden trends related to marks, attendaces.
                  He is also a
                </div>
              </div>
            </div>
            <div className="stephan-kash member-introduction">
              <div className="image-container">
                <div className="image-container-description" />
              </div>
              <div className="blurb-container">
                <div className="name">Stephan Kashkarov</div>
                <div className="role">
                  <strong>Roles: </strong>Back End Developer
                </div>
                <div className="contribution">
                  <strong>Contributions: </strong>
                  Anh is a React Developer as well as Machine Learning Engineer.
                  With his full stack development skills, he has developed the
                  Web Application and Mobile Application of the product. He also
                  contributes his Machine Learning knowledge into developing a
                  facial detection algorithm and a sentiment analysis algorithm.
                  In addition, he is in charge of the quality of the product,
                  and making sure that the development is on the current time
                  track.
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
