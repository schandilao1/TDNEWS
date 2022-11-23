import React, { Component } from 'react'

export default class NewsItems extends Component {

    render() {
        let { title, description, urlToImage, url, author, publishedAt, source } = this.props;
        return (
            <>
                <div className="container">
                    <div className="card">
                        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-primary" style={{zIndex:2, left:'90%'}}>{source}</span>
                        <img src={!urlToImage ? "https://www.livelaw.in/h-upload/2022/09/15/435194-justices-sk-kaul-abhay-oka-and-sc.jpg" : urlToImage} alt="logo" />
                        <div className="card-body">
                            <h5 className="card-title">{title}....</h5>
                            <p className="card-text">{description}....</p>
                            <p className="card-text"><small className="text-primary">By <b>{!author ? "Unkown" : author}</b> on <b>{new Date(publishedAt).toGMTString()}</b> </small></p>
                            <a href={url} rel="noreferrer" target="__blank" className="btn btn-sm px-3 btn-dark">Read More</a>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
