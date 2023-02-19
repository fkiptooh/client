import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';

const Search = ()=> {
    let navigate = useNavigate()
    let dispatch = useDispatch();
    let { search } = useSelector((state)=>({...state}));
    const { text } = search;

    const handleChange =(e)=>{
        //
        dispatch({
            type: "SEARCH_QUERY",
            payload: {text: e.target.value},
        });
    };
    const handleSubmit =(e)=> {
        // 
        e.preventDefault()
        navigate(`/shop?${text}`);
    }

    return(
        <form className='form-inline my-2 my-lg-0' onSubmit={handleSubmit}>
            <input
                type="search"
                onChange={handleChange}
                value={text}
                className="form-control mr-2-sm-2"
                placeholder='search'
            />
            <SearchOutlined onClick={handleSubmit} style={{cursor: 'pointer'}}/>
        </form>
    )

}

export default Search;