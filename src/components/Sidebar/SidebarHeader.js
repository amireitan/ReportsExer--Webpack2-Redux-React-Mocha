import React, {PropTypes} from 'react';

const sidebarHeader = ({title, totalData, onRefreshList, onCloseSidebar}) => {
    return (
        <header className="app__sidebar__header">
            <h3 className="app__sidebar__header__title">{`${title} ${totalData}`}</h3>   
            <div className="app__sidebar__header__buttons">
                <a className="app__sidebar__header__buttons__refresh" onClick={onRefreshList}></a>
                <a className="app__sidebar__header__buttons__close"onClick={onCloseSidebar}></a>
            </div>
        </header>
    );
}

sidebarHeader.propTypes = {
  title: React.PropTypes.string.isRequired,
  totalData: React.PropTypes.number,
  onRefreshList: React.PropTypes.func.isRequired,
  onCloseSidebar: React.PropTypes.func.isRequired
}

export default sidebarHeader;