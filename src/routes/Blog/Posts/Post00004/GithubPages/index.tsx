import React from "react";
import createSection from "../../HOC/createSection";

const GithubPages = () => {
  return (
    <div>
      We have discovered that we are not able to host SPAs on Github as you
      cannot directly access a URL from the URL bar, instead the user is
      redirected to Github’s 404 page. Whilst the direct origin of the error is
      unknown, several other users have encountered the same issue and solved it
      through hosting on a different service provider. Or, when the users go to
      the 404 page, redirect the user back the desirable page.
    </div>
  );
};

export default createSection("Github Pages", GithubPages);
