import React, {Component} from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import ImageList from './Components/Images/ImageList';
import Pagination from './Components/Navigation/Pagination';
import Footer from './Components/Navigation/Footer';


class App extends Component {
  
  constructor(){
    super();
    this.state = {
        photos: [],
        per_page: 20,
        curr_page : {},
        activePage: 0,
        total_images : 0,
        total_pages : 0,
        searchfeild: '',
        modalImg : '',
        loaded: false
    }
  }

  componentDidMount(){
    this.setState({loaded : false});
    fetch(`https://api.pexels.com/v1/curated?per_page=${this.state.per_page}`, {
      headers: {
        "Authorization" : "YOUR API_KEY"
      }
    })
    .then(response => response.json())
    .then(this.changeStates);

    document.getElementById("Next").addEventListener("click", this.show_next);
    document.getElementById("Previous").addEventListener("click", this.show_prev);
  }

  changeStates = (json) => {
      this.setState({curr_page : json});
      this.setState({activePage : json.page});
      this.setState({photos : json.photos});
      this.setState({loaded : true});
  }
  
  componentWillUnmount(){
    document.getElementById("Next").removeEventListener("click");
    document.getElementById("Previous").removeEventListener("click");
  }

  onchange = (event) => {
    this.setState( {searchfeild: event.target.value} );
  }

  onClickSearch = () => {
    this.setState({loaded : false});
    this.setState({photos : []});
    this.setState({activePage : 0});
    fetch(`https://api.pexels.com/v1/search?query=${this.state.searchfeild}&per_page=${this.state.per_page}`, {
      headers: {
        "Authorization" : "YOUR API_KEY"
      }
    })
    .then(response => response.json())
    .then(this.changeStates);
  }

  onPressEnter = (event) => {
    if(event.key === 'Enter'){
      this.setState({loaded : false});
      this.setState({photos : []});
      this.setState({activePage : 0});
      fetch(`https://api.pexels.com/v1/search?query=${this.state.searchfeild}&per_page=${this.state.per_page}`, {
        headers: {
          "Authorization" : "YOUR API_KEY"
        }
      })
      .then(response => response.json())
      .then(this.changeStates);
    }
  }

  //Next Button
  show_next = () => {
    this.setState({photos : []});
    this.setState({loaded : false});
    fetch(`${this.state.curr_page.next_page}`, {
      headers: {
        "Authorization" : "YOUR API_KEY"
      }
    })
    .then(response => response.json())
    .then(this.changeStates);
  }
  
  //Prev Button
  show_prev = () => {
    this.setState({photos : []});
    this.setState({loaded : false});
    fetch(`${this.state.curr_page.prev_page}`, {
      headers: {
        "Authorization" : "YOUR API_KEY"
      }
    })
    .then(response => response.json())
    .then(this.changeStates);
  }

  pagination = () => {
    var element = document.getElementById("Previous");
    if(typeof this.state.curr_page.prev_page === "undefined"){
      if(element != null)
        element.classList.add("disabled");
    }else{
      if(element != null)
        element.classList.remove("disabled");
    }
    element = document.getElementById("Next");
    if(typeof this.state.curr_page.next_page === "undefined"){
      if(element != null)
        element.classList.add("disabled");
    }else{
      if(element != null)
        element.classList.remove("disabled");
    }
  }

  render(){
    return (
      <React.Fragment>
        <Navigation onchange={this.onchange} onclick={this.onClickSearch} onpress={this.onPressEnter}/>
        <ImageList list={this.state.photos} onImgClick={this.onImgClick} />
        <Pagination pagination={this.pagination} activePage={this.state.activePage}/>
        <Footer/>
      </React.Fragment>
    );
  }
}

export default App;
