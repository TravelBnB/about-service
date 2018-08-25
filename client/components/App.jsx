import React from 'react';
import $ from 'jquery';
import HostInfo from './HostInfo.jsx';
import HostDescription from './HostDescription.jsx';
import ContactAirbnb from './AlwaysContactAbnb.jsx';
import Neighborhood from './Neighborhood.jsx';
import GoogleMap from './Map.jsx';
import CSSModules from 'react-css-modules';
import styles from './css/styles.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: +props.id,
      listingId: +props.listingId,
      host: {},
      joinMonth: '',
      joinYear: '',
      numsOfReviews: 0,
      reviewWording: 'reviews',
      neighborhoodInfo: null,
    };

    this.verifiedOrNot = this.verifiedOrNot.bind(this);
    this.responseTimeConvertor = this.responseTimeConvertor.bind(this);
  }

  componentDidMount() {
    this.getHostInfo();
    this.getReviewInfo();
    this.reviewOrReviews();
    this.getNeighborhoodInfo();
  }

  getHostInfo() {
    $.get(`/api/about/hosts/${this.state.id}`, (data) => {
      this.setState({ host: data });
      this.setState({ joinMonth: this.state.host.joined_in_date.split(' ')[1] });
      this.setState({ joinYear: this.state.host.joined_in_date.split(' ')[3] });
    });
  }

  getReviewInfo() {
    $.get(`/api/about/reviews/${this.state.id}`, (data) => {
      this.setState({ numsOfReviews: data });
    });
  }

  getNeighborhoodInfo() {
    $.get(`/api/about/neighborhood/${this.state.listingId}`, (data) => {
      let neighborhoodInfo = data;
      let lon_location = neighborhoodInfo.lon_location;
      let lat_location = neighborhoodInfo.lat_location;
      // let location = {lon_location, lat_location};
      this.setState({ neighborhoodInfo: neighborhoodInfo });
    });
  }

  reviewOrReviews() {
    if (this.state.numsOfReviews === 1) {
      this.setState({ reviewWording: 'review' });
    } else {
      this.setState({ reviewWording: 'reviews' });
    }
  }

  verifiedOrNot() {
    if (this.state.host.verified === 1) {
      return <span>Verified</span>;
    }
  }

  responseTimeConvertor() {
    if (this.state.host.response_time <= 59) {
      return <span className="boldingWords">Within an hour</span>;
    }
  }

  render() {
    return (
      <div>
        <span styleName='title'>Hosted By {this.state.host.first_name}</span>
        <span><img styleName='hostImg' src={`https://s3-us-west-1.amazonaws.com/dog-photos-bentley/${this.state.host.id}.jpeg`}/></span>
        <HostInfo host={this.state.host} joinMonth={this.state.joinMonth} joinYear={this.state.joinYear} reviews={this.state.numsOfReviews} reviewWording={this.state.reviewWording} verifiedOrNot={this.verifiedOrNot}/>

        <HostDescription host={this.state.host} responseTimeConvertor={this.responseTimeConvertor} />
        <ContactAirbnb />
        {this.state.neighborhoodInfo && <Neighborhood neighborhoodInfo={this.state.neighborhoodInfo} lat={this.state.neighborhoodInfo.lat_location } lng={this.state.neighborhoodInfo.lon_location} zoom='11' /> }



      </div>
    );
  }
}

export default CSSModules(App, styles);
