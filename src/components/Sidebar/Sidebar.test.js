import React from 'react';
import expect from 'expect';
import {mount, shallow} from 'enzyme';
import {Sidebar} from './Sidebar';

describe('Sidebar Tests', () => {
    let props = {
        isRender: true,
        data: [],
        title: 'Reports',
        textFilter:'',
        isAsc: false,
        isWaiting: false,
        isRefresh: false,
        isError: false,
        errorMessage:'',
        shouldFetchSidebarData: () => {},
        closeSidebar: () => {props.isRender = false}
    };
    
    it('set props in component', () => {
        const wrapper = mount(<Sidebar {...props}/>);
        expect(wrapper.props().isWaiting).toEqual(false);
        expect(wrapper.props().title).toEqual('Reports');
        expect(wrapper.props().isError).toEqual(false);
    });

    it('should render subcomponents', () => {
        const wrapper = mount(<Sidebar {...props} />);
        expect(wrapper.find('header').hasClass('app__sidebar__header')).toBe(true);
        expect(wrapper.find('footer').hasClass('app__sidebar__footer')).toBe(true);
        expect(wrapper.find('.app__sidebar__list__container').length).toEqual(1);
        expect(wrapper.find('.app__sidebar__searchBar').length).toEqual(1);
    });

    it('should not render SidebarList when isWaiting = true', () => {
        let newProps = props;
        newProps.isWaiting = true;
        const wrapper = mount(<Sidebar {...newProps} />);
        expect(wrapper.find('.app__sidebar__list__container').length).toEqual(0);
    });

    it('simulate click events', () => {
        const wrapper = mount(<Sidebar {...props} />);
        const closeBtn = wrapper.find('.app__sidebar__header__buttons__close');
        closeBtn.simulate('click');

        expect(wrapper.props().isRender).toEqual(true);
    });

});