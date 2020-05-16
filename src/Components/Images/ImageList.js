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
                // console.log("list", this.props.list)
                // console.log("list.length", this.props.list)
                var rows = [];
                var ind = 0;
                var tot = this.props.list.length;

                while(tot > 0){
                    for(var row = 0; row < 4 && tot > 0; row++, ind++){
                        if(rows[row] === undefined){
                            rows.push([]);
                            // console.log("row", row)
                        }
                        // console.log("data", this.props.list[ind])
                        rows[row].push( <Image data={this.props.list[ind]} onclick={this.selectImage} key={ind}/>);
                        tot--;
                    }
                }
                
                // console.log(this.props.list.length)
                // for(var i = 0; i < 4 && tot > 0; i++){
                //     rows.push([]);
                    
                //     for(var j = 0; j < this.props.list.length/4 && tot > 0; j++){
                //         console.log(tot)
                //         ind = i*(this.props.list.length/4) + j;
                //         console.log("ind", ind)
                //         console.log("data", this.props.list[ind])
                //         rows[i].push( <Image data={this.props.list[ind]} onclick={this.selectImage} key={ind}/>);
                //         tot--;
                //     }
                // }
                // console.log("1" , rows[0].length)
                // console.log("2", rows[1].length)
                // console.log("3", rows[2].length)
                // console.log("4", rows[3].length)
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

