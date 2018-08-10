import { Layout } from "antd";
import React from "react";
import Header from "../../../components/HeaderGuest";
import Content from "./Content";
import Footer from "./Footer";
import Intro from "./Intro";

const MainLandingLayout: React.SFC<{
  setIntroRef: (ref: HTMLDivElement) => void;
  scrollIntoIntro: () => void;
}> = ({ setIntroRef, scrollIntoIntro }) => (
  <div className="landing-page">
	<Layout>
	  <Header
		menu={[
			{ name: "Blog", url: "/blog" },
			{ name: "About", url: "/about/company" },
			{ name: "Sign in", url: "authentication/signin" }
		]}
	  />
	  <Intro scrollIntoIntro={scrollIntoIntro} />
	  <Content setIntroRef={setIntroRef} />
	  <Footer />
	</Layout>
  </div>
);

export default MainLandingLayout;
