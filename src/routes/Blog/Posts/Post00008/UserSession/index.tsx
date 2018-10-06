import React from "react";
import createSection from "../../HOC/createSection";

const UserSession = () => {
  return (
    <div>
      Previously, once the user refreshed the page, the user would have to log
      in into the app again. Now, by using cache, when the user logs in, his/her
      access token will get saved into the cache, so when refresing the page,
      the app will get access token from the cache.
    </div>
  );
};

export default createSection("User Session", UserSession);
