import React, {PropTypes, Component} from 'react';
import SidebarListItem from './sidebarListItem';
import { Scrollbars } from 'react-custom-scrollbars';

class sideBarList extends Component {
	constructor(){
		super();
		this.onResizeWindow = this.onResizeWindow.bind(this);

		this.state = {
			height: 0,
			width: 0,
			scroll:{ trackClass:''}
		}
	}
	componentWillMount() {
		window.addEventListener("resize", this.onResizeWindow);	
	}

	componentDidMount() {
		this.onResizeWindow();
	}

	componentWillReceiveProps() {
		this.state.scroll.trackClass = '';
	}

	componentDidUpdate() {
		let listCont = this.refs.listContainer.getBoundingClientRect().height;
		let list     = this.refs.list.getBoundingClientRect().height;

		if (listCont > list && this.state.scroll.trackClass !== 'u-hidden') {
			this.state.scroll.trackClass = 'u-hidden';
			this.setState();
		}
	}

	componentWillUnmount(){
		window.removeEventListener("resize", this.onResizeWindow);
	}

	onResizeWindow() {
		let dimensions = this.refs.listContainer.getBoundingClientRect();
		this.setState({height: dimensions.height, width:dimensions.width});
	}

	render(){	
		let trackClass = "track-vertical" + this.state.scroll.trackClass;

		return(
	        <section ref="listContainer" className="app__sidebar__list__container">
		    	<Scrollbars 
		        	thumbSize={33}
		        	universal={true}
			    	width={this.state.width}
			    	autoHeightMax={this.state.height}
			    	autoHeightMin={this.state.height}
			    	autoHeight
			    	renderTrackVertical={props => <div width={30}  className={trackClass}/>}
			    	renderThumbVertical={props => <div width={32}  className="thumb-vertical"/>}
			    	renderView={props => <div  {...props}  className="scrollbar-view"/>}>
					<ul ref="list"className="app__sidebar__list">
					{this.props.items.map(item => <SidebarListItem key={item.id} item={item}/>)}
					</ul>
				</Scrollbars>
	        </section>
	    );		
	}
   
};

sideBarList.propTypes = {
  items: React.PropTypes.array.isRequired
}

export default sideBarList;