import { Layout } from "antd";
import React from "react";
import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";
import Intro from "./Intro";

const MainLandingLayout: React.SFC<{
  setIntroRef: (ref: HTMLDivElement) => void;
  scrollIntoIntro: () => void;
}> = ({ setIntroRef, scrollIntoIntro }) => (
  <div className="landing-page">
    <Layout>
      <Header />
      <Intro scrollIntoIntro={scrollIntoIntro} />
      <Content setIntroRef={setIntroRef} />
      <Footer />
    </Layout>
  </div>
);

export default MainLandingLayout;
