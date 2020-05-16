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
        loaded: false,
        notFound: false
    }
  }

  componentDidMount(){
    this.setState({loaded : false});
    fetch(`https://api.pexels.com/v1/curated?per_page=${this.state.per_page}`, {
      headers: {
        "Authorization" : "563492ad6f91700001000001c85272b4715f4691a6ab608f9cff5c7e"
      }
    })
    .then(response => response.json())
    .then(this.changeStates);

    document.getElementById("Next").addEventListener("click", this.show_next);
    document.getElementById("Previous").addEventListener("click", this.show_prev);
  }

  changeStates = (json) => {
      // console.log(json)
      // console.log(json.total_results)
      if(json.total_results === 0){
        
        this.setState({loaded : true});
        this.setState({notFound : true})
      }else{
        this.setState({curr_page : json});
        this.setState({activePage : json.page});
        this.setState({photos : json.photos});
        this.setState({loaded : true});
        this.setState({notFound : false})
      }
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
    var search = this.state.searchfeild === "" ? "curated?" : `search?query=${this.state.searchfeild}&`
      fetch(`https://api.pexels.com/v1/${search}per_page=${this.state.per_page}`, {
      headers: {
        "Authorization" : "563492ad6f91700001000001c85272b4715f4691a6ab608f9cff5c7e"
      }
    })
    .then(response => {
      return response.json()
    })
    .then(this.changeStates);
  }

  onPressEnter = (event) => {
    if(event.key === 'Enter'){
      this.setState({loaded : false});
      this.setState({photos : []});
      this.setState({activePage : 0});
      // https://api.pexels.com/v1/curated?per_page=${this.state.per_page}`, 
      var search = this.state.searchfeild === "" ? "curated?" : `search?query=${this.state.searchfeild}&`
      fetch(`https://api.pexels.com/v1/${search}per_page=${this.state.per_page}`, {
        headers: {
          "Authorization" : "563492ad6f91700001000001c85272b4715f4691a6ab608f9cff5c7e"
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
        "Authorization" : "563492ad6f91700001000001c85272b4715f4691a6ab608f9cff5c7e"
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
        "Authorization" : "563492ad6f91700001000001c85272b4715f4691a6ab608f9cff5c7e"
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
    
    if(this.state.notFound){
        return(
          <React.Fragment >
            <Navigation onchange={this.onchange} onclick={this.onClickSearch} onpress={this.onPressEnter}/>
            <div className="f4 pa4 center tc measure"> Sorry, nothing found</div>
          </React.Fragment>      
        );
    }
    
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
