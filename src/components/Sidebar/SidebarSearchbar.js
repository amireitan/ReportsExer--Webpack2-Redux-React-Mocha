import React, {PropTypes} from 'react';

const SidebarSearchbar = ({textFilter, onSearchChange, isAsc, onSortChange}) => {
    return (
        <section className="app__sidebar__searchBar">
            <input type="text" placeholder="search reports" onChange={onSearchChange}/>
            <div className="app__sidebar__searchBar__buttons">
                <a className={`app__sidebar__searchBar__buttons__up ${isAsc ? 'selected' : ''}`} onClick={() => onSortChange(true)}></a>
                <a className={`app__sidebar__searchBar__buttons__down ${!isAsc ? 'selected' : ''}`} onClick={() => onSortChange(false)}></a>
            </div>
        </section>
    );
};

SidebarSearchbar.propTypes = {
  textFilter: React.PropTypes.string,
  onSearchChange: React.PropTypes.func.isRequired,
  isAsc: React.PropTypes.bool.isRequired,
  onSortChange: React.PropTypes.func.isRequired
}
  
export default SidebarSearchbar;