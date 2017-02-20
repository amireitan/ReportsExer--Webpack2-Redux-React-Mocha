import React, {PropTypes} from 'react';

const SidebarListItem = ({item}) => {
    return  (
        <li className="app__sidebar__list__item">
            <div className="app__sidebar__list__item__main">
                <div className="app__sidebar__list__item__main__name">
                    <pre title={item.name}>{item.name}</pre>
                </div>   
                <div className="app__sidebar__list__item__main__location">
                    <span>{item.type} {item.location}</span>
                </div>
            </div>
            <div className="app__sidebar__list__item__time">
                <div className="app__sidebar__list__item__time__date">
                    <span>{item.updatedText.date}</span>
                </div>
                 <div className="app__sidebar__list__item__time__hour">
                    <span>{item.updatedText.time}</span>
                </div>
            </div>
        </li>
    );
};

SidebarListItem.propTypes = {
  item: React.PropTypes.object.isRequired
}

export default SidebarListItem;