import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => {
  return (
    <div>
      <Link to="/">首页</Link>|
      <Link to="/user">User</Link>|
      <Link to="/about">关于</Link>
    </div>
  );
};

export default Header;
