var Header = React.createClass({
    render: function () {
        return (
            <header className="bar bar-nav">
                <a className={(this.props.refresh==="true"?"icon icon-refresh ":"btn btn-link")  + " pull-right"} href="#"><strong>{(this.props.back==="true"?"":this.props.rightNavText)}</strong></a>
                <a className={(this.props.back==="true"?"icon icon-left-nav ":"btn btn-link") + " pull-left"} href="#">{(this.props.back==="true"?"":this.props.leftNavText)}</a>
                <h1 className="title">{this.props.text}</h1>
            </header>
        );
    }
});

var Footer = React.createClass({
    render: function () {
        return (
            <footer className="bar bar-footer">
                <a className="icon icon-compose pull-right" href="#newCategory"></a>
            </footer>
        );
    }
});

var NewCategory = React.createClass({
    render: function () {
        return (
            <div className={"page page1 " + this.props.position}>
                <Header text="New Category" back="false" refresh="false" rightNavText="Save" leftNavText="Cancel" />
                <div className="content">
                    <form className="input-group">
                        <input type="text" placeholder="Title" />
                        <textarea rows="6" placeholder="Description" />
                    </form>
                </div>
            </div>
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
                <Header text="Categories" back="false" refresh="true"/>
                <SearchBar searchKey={this.props.searchKey} searchHandler={this.props.searchHandler}/>
                <div className="content">
                    <CategoryList categories={this.props.categories}/>
                </div>
                <Footer />
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

        router.addRoute('newCategory', function() {
            this.slidePage(<NewCategory key="newCategory"/>);
        }.bind(this));

        router.start();
    }
});

React.render(<App/>, document.body);