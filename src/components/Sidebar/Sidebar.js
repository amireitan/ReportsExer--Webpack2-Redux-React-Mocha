import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {shouldFetchSidebarData, filterReportsList, sortReportsList, closeSidebar} from '../../actions/SidebarActions';
import SidebarList from './SidebarList';
import SidebarHeader from './SidebarHeader';
import SidebarSearchbar from './SidebarSearchbar';

export class Sidebar extends Component {
    
    constructor(props) {
        super();

        this.onRefreshList  = this.onRefreshList.bind(this);
        this.onCloseSidebar = this.onCloseSidebar.bind(this);
        this.onRefreshList  = this.onRefreshList.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onSortChange   = this.onSortChange.bind(this);
    }

    componentWillMount() {
        this.props.shouldFetchSidebarData();
    }

    onSearchChange(e) {
        if (this.props.isWaiting || this.props.isError) return;
        this.props.filterReportsList(e.target.value.toLowerCase());
    }

    onSortChange(isAsc) {
        if (this.props.isAsc === isAsc) return;
        this.props.sortReportsList(isAsc);
    }

    onRefreshList() {
        this.props.shouldFetchSidebarData(true);
    }

    onCloseSidebar() {
        this.props.closeSidebar();
    }

    render() {
        if (!this.props.isRender) return null;

        return (
            <aside className="app__sidebar">
                <SidebarHeader totalData={this.props.data.length} 
                               title={this.props.title} 
                               onRefreshList={this.onRefreshList}
                               onCloseSidebar={this.onCloseSidebar}/>
                <SidebarSearchbar textFilter={this.props.textFilter} 
                                  onSearchChange={this.onSearchChange}
                                  isAsc={this.props.isAsc}
                                  onSortChange={this.onSortChange}/>
                {
                    this.props.isWaiting ? <div className="app__sidebar__message"><h3>Loading...</h3></div> : ""
                }
                {
                    this.props.isError ? (<div className="app__sidebar__message"><h3>Error occured</h3><p>{this.props.errorMessage}</p></div>) : ""
                }
                {
                    !this.props.isWaiting && !this.props.isError ? 
                    <SidebarList items={this.props.data} title={this.props.title} /> : ""
                }
                <footer className="app__sidebar__footer"></footer>
            </aside>
        );
    }
}

Sidebar.propTypes = {
  data: React.PropTypes.array,
  isRender: React.PropTypes.bool,
  title: React.PropTypes.string,
  textFilter: React.PropTypes.string,
  isAsc: React.PropTypes.bool,
  isWaiting: React.PropTypes.bool,
  isError: React.PropTypes.bool ,
  errorMessage: React.PropTypes.string,
  shouldFetchSidebarData: React.PropTypes.func,
  filterReportsList: React.PropTypes.func,
  sortReportsList:React.PropTypes.func,
  closeSidebar: React.PropTypes.func
}

function filterSort(data, filterText, isAsc){
    const sortType = {
        asc: (a, b) => a.updated - b.updated,
        des: (a, b) => b.updated - a.updated
    };
    const sortFunc = isAsc ?  sortType.asc : sortType.des;
    return data.filter(item => item.name.toLowerCase().includes(filterText))
               .sort(sortFunc);
}

function mapStateToProps(state) {
    const {isRender, data, textFilter, title, isAsc, isWaiting, isError, errorMessage} = state.sidebarData;
    return  {
        data: filterSort(data, textFilter, isAsc), 
        isRender, textFilter,title, isAsc, isWaiting, isError 
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        shouldFetchSidebarData, 
        filterReportsList, 
        sortReportsList,
        closeSidebar}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);