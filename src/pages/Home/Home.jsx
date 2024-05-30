import React, { useEffect, useState } from "react";
import { CloseButton, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import ProductCard from "../../components/Card/ProductCard";
import Filters from "../../components/Filters/Filters";
import NothingFound from "../../components/NothingFound/NothingFound";
import Pagination from "../../components/Pagination/Pagination";
import { getAllProducts, getFilteredProducts } from "../../redux/actions";
import './Home.css'
import 'bootstrap/dist/css/bootstrap.css';
import Loading from "../../components/Loading/Loading";
import { Toaster } from "react-hot-toast";
import CarouselComponent from "../../components/CarouselPage/CarouselComponent";

export default function Home() {

  const location = useLocation();
  const [searchParams] = useSearchParams();
  const isLoading = useSelector(state => state.isLoading);
  const searchName = searchParams.get('model');
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const products = useSelector(state => state.products);
  const dispatch = useDispatch()
  const filters = []

  searchParams.forEach((value, key) => {
    filters.push([key, value]);
  });

  useEffect(() => {
    if (searchParams.toString()) {
      dispatch(getFilteredProducts(searchParams.toString()));
    } else {
      dispatch(getAllProducts());
    }
  }, [dispatch, searchParams]);

  useEffect(() => {
    window.scrollTo({ top: '0px', behavior: 'smooth' });
  }, [currentPage])

  useEffect(() => {
    setCurrentPage(1);
  }, [products])

  // Pagination logic
  const postPerPage = 6; // Adjust this value as needed
  // const product = useSelector(state => state.products);
  // const totalPages = Math.ceil(product.length / postPerPage);
  const paginate = (number) => {
    setCurrentPage(number);
  };

  //ADD PRODUCTS
  const pageProducts = products.slice(
    (currentPage - 1) * postPerPage,
    currentPage * postPerPage
  );


  // Clear filters
  function clearFilter(filter) {
    searchParams.delete(filter);
    location.search = `?${searchParams.toString()}`;
    navigate(location);
  }

  return (
    <>
      {/* CONTAINER HOME */}
      {isLoading ? <Loading /> :
        // COLUMS HOME
        <div>
          <div className="containerHome">
            {/* NUMBER OF RESULTS */}
            <CarouselComponent />
            <div className="aditionalContent">
              <div className="numberOfResults">
                {searchName ? <span>{searchName.toUpperCase()}</span> : null}
                <p><b>{products.length}</b> results</p>
              </div>
            </div>
            {/* FILTER */}
            {filters.length ? searchName && filters.length === 1 ?
              null :
              <div className="selectedFilters">
                <span>Selected filters: </span>
                {
                  filters.map(filter => {
                    return filter[0] === 'name' ?
                      null :
                      (
                        <div key={filter[0]} className="activeFilter">
                          {filter[0] === 'price' || filter[0] === 'capacity' ? `${filter[0]} ${filter[1]}` : filter[1]}
                          <CloseButton onClick={() => clearFilter(filter[0])} />
                        </div>
                      )
                  })
                }
              </div>
              : null}
            <Pagination currentPage={currentPage} postPerPage={6} totalPosts={products.length} paginate={paginate} />
            <Row>
              <Col sm={3}>
                <Filters />
              </Col>
              <Col>
                <div className="container-card-home">
                  <Row>
                    {(!products || !products.length) ? (<NothingFound />) :
                      pageProducts.map((e, index) =>
                        <Col sm={4} md={4} key={index}>
                          <ProductCard
                            key={e.id}
                            id={e.id}
                            line={e.line}
                            model={e.model}
                            capacity={e.capacity}
                            price={e.price}
                            stock={e.stock}
                            image={e.image}
                            brand={e.brand}
                            memoryRAM={e.memoryRAM}
                          />
                        </Col>
                      )}
                  </Row>
                </div>
              </Col>
              {/* CARDS */}
            </Row>
            {/* PAGINADO */}
            <Pagination
              currentPage={currentPage}
              postPerPage={postPerPage}
              totalPosts={products.length}
              paginate={paginate} />
            <CarouselComponent /> {/*=> component add changes as Carrousel-Home*/}
            {/* ALERT */}
            <Toaster position="bottom-right" reverseOrder={false} />
          </div>
        </div>
      }
    </>
  )
}