import React from 'react';
import Jumbotron from '../components/cards/Jumbotron';
import NewArrivals from '../components/home/NewArrivals';
import BestSellers from '../components/home/BestSellers'
import CategoryList from '../components/category/CategoryList';

const Home = () => {
    return(
        <>
         <div className='jumbotron text-primary h1 text-center'>
            <Jumbotron text={['Latest Products','New Arrivals', 'Best Sellers']}/>
            {/* {loading ? <h4>Loading</h4> : <h4>All Products</h4>} */}
            {/* {JSON.stringify(products)} */}
        </div>
        <h4 className='text-center p-3 mt-5 mb-5 display-4 jumbotron'>
            <Jumbotron text={['New Arrivals']} />
        </h4>
        <NewArrivals />
        <br />
        <h4 className='text-center p-3 mt-5 mb-5 display-4 jumbotron'>
            <Jumbotron text={['Best Sellers']} />
        </h4>
        <BestSellers />
        <br />
        <h4 className='text-center p-3 mt-5 mb-5 display-4 jumbotron'>
            {/* <Jumbotron text={['Categories']} /> */}
            Categories
        </h4>
        <CategoryList />
        <br />

        </>
       
    );
};

export default Home;