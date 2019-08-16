import React from 'react';

function Pagination({pagination, activePage}) {
  var visibility = true;
  
  if(activePage !== 0)  {
    visibility = false;
  }
  
  return(
        <div hidden={visibility} style={{backgroundImage:"linear-gradient(to right, rgb(139, 119, 212), rgb(159, 201, 201))"}}>
          <ul className="pagination justify-content-center" style={{margin:0}}>
            <li style={{margin:0}} className="page-item" id="Previous"> <span className="page-link">Previous</span> </li>
            <li className="page-item active"><span className="page-link" > {activePage}</span></li>
            <li className="page-item" id="Next"> <span className="page-link" >Next</span> </li>
            {pagination()}
          </ul>
        </div>
    );
}

export default Pagination;