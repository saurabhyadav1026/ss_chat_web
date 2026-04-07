

import { useState } from "react";
import TrendUser from "../people/trending/TrendUser";
import "./trendUsers.css";

const TrendUsers = () => {
  const [trendUsers, setTrendUsers] = useState({});

  return (
    <div className="trend-container" style={{overflowY:"scroll"}}>
      <h3 className="trend-title">🔥 Trending Users</h3>

      <div className="trend-grid">
        <TrendUser />
        <TrendUser />
        <TrendUser />
        <TrendUser />
        <TrendUser />
      </div>
    </div>
  );
};

export default TrendUsers;
