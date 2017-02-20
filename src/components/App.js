import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Header from './Header';
import Main from './Main';
import SidebarComp from './Sidebar/Sidebar'; 
import {openSidebar} from '../actions/SidebarActions';

class App extends Component {
    constructor() {
        super();
        this.onOpenSidebar = this.onOpenSidebar.bind(this);
    }
    
    onOpenSidebar() {
        if (this.props.isSidebar) return;
        this.props.openSidebar();
    }

    render (){
        return (
            <section className="app">
                <Header isSidebar={this.props.isSidebar}/>
                <Main   isSidebar={this.props.isSidebar} openSidebar={this.onOpenSidebar}/>
                <SidebarComp/> 
            </section>
        );
    }
}

App.propTypes = {
    isSidebar: React.PropTypes.bool.isRequired,
    openSidebar: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        isSidebar: state.sidebarData.isRender
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({openSidebar}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);