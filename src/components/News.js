import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner'
import PropTypes from 'prop-types'


export default class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
        document.title = `${this.props.category} - FT News`
    }

    async updateNews() {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7df2e55d062d44ccb51e83ba7204fc7b&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        let parseData = await data.json()
        // console.log(parseData);

        this.setState({
            articles: parseData.articles,
            totalResults: parseData.totalResults,
            loading: false
        })
    }

    async componentDidMount() {
        this.updateNews();
    }

    handleNextClick = async () => {
        // console.log("Next Click");
        this.setState({ page: this.state.page + 1 })
        this.updateNews();
    }

    handlePrevClick = async () => {
        // console.log("Previous Click");
        this.setState({ page: this.state.page - 1 })
        this.updateNews();
    }

    render() {
        return (
            <div className="container" style={{ width: '70%', margin: '0rem auto', }}>
                <h1 style={{ textAlign: 'center', margin: '3rem auto' }}>FT-News Top {`${this.props.category}`} Headlines</h1>
                {this.state.loading && <Spinner />}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-md-4 my-3" key={element.url}>
                            <NewsItems title={element.title} description={element.description} urlToImage={element.urlToImage} url={element.url} author={element.author} publishedAt={element.publishedAt} source={element.source.name} />
                        </div>
                    })}
                </div>
                <hr />
                <div className="container d-flex justify-content-between my-3">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&#8592;  Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next  &#8594;</button>
                </div>
            </div>
        )
    }
}
