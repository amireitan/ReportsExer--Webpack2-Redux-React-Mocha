import React, {PropTypes} from 'react';

const Main = ({openSidebar, isSidebar}) => {
    return  (
        <main className={`app__main app__main ${!isSidebar ? 'app__main--full' : 'app__main--partial'}`}>
            {
                !isSidebar ?  <a className="app__main__open-sidebar" onClick={openSidebar}><span>Open Sidebar</span></a> : ''
            }         
        </main>
    );
};

Main.propTypes = {
  openSidebar: React.PropTypes.func.isRequired,
  isSidebar: React.PropTypes.bool.isRequired
}

export default Main;