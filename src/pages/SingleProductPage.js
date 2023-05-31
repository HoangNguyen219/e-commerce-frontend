import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProductsContext } from '../context/products_context';
import { formatPrice } from '../utils/helpers';
import { useUserContext } from '../context/user_context';
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
  Review,
  FormReview,
} from '../components';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
const SingleProductPage = () => {
  const { id } = useParams();
  const { product, fetchSingleProduct } = useProductsContext();
  const { isLoading, isError, user: userLogin } = useUserContext();

  useEffect(() => {
    fetchSingleProduct(id);
  }, [id]);
  const {
    name,
    price,
    description,
    colorStocks,
    averageRating: stars,
    numOfReviews,
    id: sku,
    companyId: company,
    categoryId: category,
    primaryImage,
    secondaryImages,
    reviews,
  } = product;

  const images = secondaryImages
    ? [primaryImage, ...secondaryImages]
    : [primaryImage];
  const stock = colorStocks
    ? colorStocks.reduce((prev, cur) => {
        return prev + cur.stock;
      }, 0)
    : 0;
  let isReviewed = false;
  if (userLogin) {
    isReviewed = reviews.find((review) => {
      return review.userId.id === userLogin.id;
    });
  }
  const isDisplayForm = userLogin && !isReviewed;
  return (
    <Wrapper>
      <PageHero title={name} product />
      <div className="section section-center page">
        <Link to="/products" className="btn">
          back to products
        </Link>
        {isLoading && <Loading />}
        {isError ? (
          <Error />
        ) : (
          <>
            <div className="product-center">
              <ProductImages images={images} />
              <section className="content">
                <h2>{name}</h2>
                <div className="stars">
                  <Stars stars={stars} />
                  <p className="reviews">({numOfReviews} customer reviews)</p>
                </div>
                <h5 className="price">{formatPrice(price)}</h5>
                <p className="desc">{description}</p>
                <p className="info">
                  <span>Available : </span>
                  {stock > 0 ? 'In stock' : 'out of stock'}
                </p>
                <p className="info">
                  <span>SKU :</span>
                  {sku}
                </p>
                <p className="info">
                  <span>Company :</span>
                  {company && company.name}
                </p>
                <p className="info">
                  <span>Category :</span>
                  {category && category.name}
                </p>
                <hr />
                {stock > 0 && <AddToCart product={product} />}
              </section>
            </div>
            <hr className="section-center hr" />
            {isDisplayForm && <FormReview />}
            {reviews && reviews.length > 0 && <Review reviews={reviews} />}
          </>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .hr {
    margin: 3rem auto;
  }
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    margin-top: 0.5rem;
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  .stars {
    display: flex;
    align-items: center;

    p {
      margin-left: 0.5rem;
      margin-bottom: 0;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;
