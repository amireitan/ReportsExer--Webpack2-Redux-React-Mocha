import React, {PropTypes} from 'react';

const Header = ({isSidebar}) => {
    return (
        <header className={`app__header ${!isSidebar ? 'app__header--full' : 'app__header--partial'}`}>
        </header>
    );
};

Header.propTypes = {
  isSidebar: React.PropTypes.bool.isRequired,
}

export default Header;
