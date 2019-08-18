import React from 'react';
import Image from './Image';
import './ImageList.css';
import Loader from 'react-loader';
import Modal from './Modal';

class ImageList extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            imagesLoaded: false,
            selectedImage: null,
            showModal: false
        }
    }
    
    selectImage = (image) =>{
        this.setState({
            selectedImage: image,
            showModal: true
        });
    }

    onclose = () => {
        this.setState({
            selectedImage: null,
            showModal: false
        });
    }

    render(){
        if(this.props.list.length === 0){
            return(
                <div style={{padding:"400px"}} className="back">
                    <Loader loaded={this.imagesLoaded}></Loader>
                </div>
            );
        }else{
            var rows = [];
            var ind;
            
            for(var i = 0; i < 4; i++){
                rows.push([]);
                for(var j = 0; j < this.props.list.length/4; j++){
                    ind = i*(this.props.list.length/4) + j;
                    rows[i].push( <Image data={this.props.list[ind]} onclick={this.selectImage} key={ind}/>);
                }
            }
            
        }

        return(
            <div className="back">
                {this.state.selectedImage? <Modal image={this.state.selectedImage} onclose={this.onclose}/>:''}
                <div className="row1"> 
                    <div className="column">
                        {rows[0]}
                    </div>
                    <div className="column">
                    {rows[1]}
                    </div>
                    <div className="column">
                        {rows[2]}
                    </div>
                    <div className="column">
                        {rows[3]}
                    </div>
                </div>
            </div>
        );
    }
}
export default ImageList;

