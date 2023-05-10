

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';
import pdtApi from '../apiPath/pdtApi';
import catApi from '../apiPath/catApi';



export default function Showproduct() {

    var [apidata, setApidata] = useState([]);
    var [catData, setCatData] = useState([]);

    const [page, setPage] = useState(1);
    const [perPage] = useState(10);
    const [pageCount,setPageCount] = useState(0);
    
    useEffect(() => {
        fetchData();
      }, [page]);
    
      const fetchData = () => {
        fetch(pdtApi +`page/${page}&${perPage}`)    
          .then((response) => response.json())
          .then((result) => {
            console.dir(result)
            setApidata(result.data);
            setPageCount(result.meta.totalPages)
        })
          .catch((error) => console.error('Error fetching data', error));
      };
    
      const handleNextPage = () => {
        setPage((prevPage) => prevPage + 1);
      };
    
      const handlePreviousPage = () => {
        if (page > 1) {
          setPage((prevPage) => prevPage - 1);
        }
      };


    useEffect(() => {
            fetch(catApi + 'show-cat')
            .then(res=>res.json())
            .then(val=>{
                console.log(val);
                 setCatData(val);
                // setPro(val['productRec'])
            })
    }, [])

   
    return (
        <div className='container'>
            <h2>Showproduct</h2>
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">Product Id</th>
                       <th scope="col">Product Name</th>
                         <th scope="col">Category Name</th>
                       <th scope="col">Category Id</th>
                        <th scope="col">Delete</th>
                         <th scope="col">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        apidata && apidata.map(obj =>
                            <tr>
                             <td>{obj.id}</td>
                             <td>{obj.name}</td>
                            <td>{catData.filter(cat=>{ return cat.id === obj.catid })[0]?.name}</td>

                             {/* <td>{obj.catvalues[0].name}</td> */}
                            <td>{obj.catid}</td>

                                <td>
                                    <button className='del-btn btn btn-sm btn-danger'>
                                        <Link to={"/delete-pro/" + obj.id}>Delete</Link>
                                    </button>
                                </td>
                                <td>
                                    <button className='edit-btn btn btn-sm btn-info'>
                                        <Link to={"/edit-pro/" + obj.id}>Edit</Link>
                                    </button>
                                </td>
                            </tr>
                        )
                    }

                </tbody>
            </table>

            {/* <div>
      <ul>
        {apidata.map((obj) => (
          <li key={obj.id}>{obj.name}</li>
        ))}
      </ul>
      <button onClick={handlePreviousPage} disabled={page === 1}>
        Previous Page
      </button>
      <button onClick={handleNextPage}>Next Page</button>
    </div> */}

<div className='d-flex justify-content-end'>
                    <Pagination>

                        <Pagination.Prev onClick={handlePreviousPage} disabled={page === 1} />
                        {
                            Array(pageCount).fill(null).map((ele, index) => {
                                return (
                                    <>
                                        <Pagination.Item active={page === index + 1 ? true : false} onClick={() => setPage(index + 1)}>{index + 1}</Pagination.Item>
                                    </>
                                )
                            })
                        }
                        <Pagination.Next onClick={handleNextPage}  />
                    </Pagination>
                </div>




           
        </div>
    )
}





