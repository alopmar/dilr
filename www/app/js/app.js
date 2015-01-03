var Header = React.createClass({
    render: function () {
        return (
            <header className="bar bar-nav">
                <a href="#" className={"icon icon-left-nav pull-left" + (this.props.back==="true"?"":" hidden")}></a>
                <h1 className="title">{this.props.text}</h1>
            </header>
        );
    }
});

var SearchBar = React.createClass({
    searchHandler: function() {
        this.props.searchHandler(this.refs.searchKey.getDOMNode().value);
    },
    render: function () {
        return (
            <div className="bar bar-standard bar-header-secondary"> 
                <input type="search" ref="searchKey" onChange={this.searchHandler} value={this.props.searchKey}/>
            </div>

        );
    }
});

var CategoryListItem = React.createClass({
    render: function () {
        return (
            <li className="table-view-cell media">
                <a href={"#categories/" + this.props.category.id}>
                    <div className="media-object small pull-left" />
                    {this.props.category.name}
                    <p>{this.props.category.description}</p>
                </a>
            </li>
        );
    }
});

var CategoryList = React.createClass({
    render: function () {
        var items = this.props.categories.map(function (category) {
            return (
                <CategoryListItem key={category.id} category={category} />
            );
        });
        return (
            <ul  className="table-view">
                {items}
            </ul>
        );
    }
});

var HomePage = React.createClass({
    render: function () {
        return (
            <div className={"page " + this.props.position}>
                <Header text="Category" back="false"/>
                <SearchBar searchKey={this.props.searchKey} searchHandler={this.props.searchHandler}/>
                <div className="content">
                    <CategoryList categories={this.props.categories}/>
                </div>
            </div>
        );
    }
});

var App = React.createClass({
    mixins: [PageSlider],
    getInitialState: function() {
        return {
            searchKey: '',
            categories: [] 
        }
    },
    searchHandler: function(searchKey) {
        categoryService.findByName(searchKey).done(function(categories) {
            this.setState({
                searchKey:searchKey,
                categories: categories,
                pages: [<HomePage key="list" searchHandler={this.searchHandler} searchKey={searchKey} categories={categories}/>]});
        }.bind(this));
    },
    componentDidMount: function() {
        
        router.addRoute('', function() {
            this.slidePage(<HomePage key="list" searchHandler={this.searchHandler} searchKey={this.state.searchKey} categories={this.state.categories}/>);
        }.bind(this));
        
        router.start();
    }
});

React.render(<App/>, document.body);