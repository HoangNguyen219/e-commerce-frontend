import styled from 'styled-components';
import { useProductsContext } from '../context/products_context';
import { WHITE, WHITE_DISPLAY, colors } from '../utils/constants';
import { FaCheck } from 'react-icons/fa';
import { formatPrice } from '../utils/helpers';
import { useMemo, useState } from 'react';
import { useEffect } from 'react';

const Filters = () => {
  const {
    categoryId,
    companyId,
    color,
    min_price,
    max_price,
    shipping,
    products_loading,
    handleChange,
    clearFilters,
    categories,
    companies,
  } = useProductsContext();

  const [localSearch, setLocalSearch] = useState('');
  const [localPrice, setLocalPrice] = useState(0);
  useEffect(() => {
    setLocalPrice(max_price);
  }, [max_price]);

  const handleSearch = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === 'categoryId' || name === 'color') {
      value = e.target.dataset.title;
    }

    if (name === 'price') {
      value = Number(value);
    }
    if (name === 'shipping') {
      value = e.target.checked;
    }
    handleChange({ name, value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalSearch('');
    setLocalPrice(max_price);
    clearFilters();
  };

  const debounce = (callback) => {
    let timeoutID;
    return (e) => {
      callback(e);
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        handleChange({ name: e.target.name, value: e.target.value });
      }, 1000);
    };
  };

  const optimizedDebounceText = useMemo(
    () =>
      debounce((e) => {
        setLocalSearch(e.target.value);
      }),
    []
  );

  const optimizedDebouncePrice = useMemo(
    () =>
      debounce((e) => {
        setLocalPrice(e.target.value);
      }),
    []
  );

  return (
    <Wrapper>
      <div className="content">
        <form onSubmit={(e) => e.preventDefault()}>
          {/* search input */}
          <div className="form-control">
            <input
              type="text"
              name="text"
              placeholder="search"
              className="search-input"
              value={localSearch}
              onChange={optimizedDebounceText}
            />
          </div>
          {/* end search input */}
          {/* categories */}
          <div className="form-control">
            <h5>category</h5>
            <div>
              {categories.map((cate) => {
                return (
                  <button
                    key={cate.id}
                    onClick={handleSearch}
                    name="categoryId"
                    type="button"
                    data-title={cate.id}
                    className={`${categoryId === cate.id ? 'active' : null}`}
                  >
                    {cate.name}
                  </button>
                );
              })}
            </div>
          </div>
          {/* end of categories */}
          {/* companies */}
          <div className="form-control">
            <h5>company</h5>
            <select
              name="companyId"
              className="company"
              value={companyId}
              onChange={handleSearch}
            >
              {companies.map((comp) => {
                return (
                  <option key={comp.id} value={comp.id}>
                    {comp.name}
                  </option>
                );
              })}
            </select>
          </div>
          {/* end of companies */}
          {/* colors */}
          <div className="form-control">
            <h5>colors</h5>
            <div className="colors">
              <button
                name="color"
                className={`${
                  color.toLowerCase() === 'all' ? 'all-btn active' : 'all-btn'
                }`}
                data-title="All"
                onClick={handleSearch}
              >
                All
              </button>
              {colors.map((c, index) => {
                const displayColor = c === WHITE ? WHITE_DISPLAY : c;

                return (
                  <button
                    key={index}
                    name="color"
                    style={{ background: displayColor }}
                    className={`${
                      color === c ? 'color-btn active' : 'color-btn'
                    }`}
                    data-title={c}
                    onClick={handleSearch}
                  >
                    {color === c ? <FaCheck /> : null}
                  </button>
                );
              })}
            </div>
          </div>
          {/* end of colors */}
          {/* price */}
          <div className="form-control">
            <h5>price</h5>
            <div className="price">{formatPrice(localPrice)}</div>
            <input
              type="range"
              name="price"
              onChange={optimizedDebouncePrice}
              min={min_price}
              max={max_price}
              value={localPrice}
            />
          </div>
          {/* end of price */}
          {/* shipping */}
          <div className="form-control shipping">
            <label htmlFor="shipping">free shipping</label>
            <input
              type="checkbox"
              name="shipping"
              id="shipping"
              onChange={handleSearch}
              checked={shipping}
            />
          </div>
          {/* end of shipping */}
        </form>
        <button
          type="button"
          className="clear-btn"
          onClick={handleSubmit}
          disabled={products_loading}
        >
          clear filters
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }
  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
    text-transform: capitalize;
  }
  .colors {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    width: fit-content;
  }
  .color-btn {
    position: relative;
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
    :hover::before {
      content: attr(data-title);
      position: absolute;
      top: -26px;
      display: inline-block;
      padding: 3px 6px;
      border-radius: 2px;
      background: #444857;
      color: #fff;
      font-size: 12px;
      white-space: nowrap;
      text-transform: capitalize;
      font-weight: normal !important;
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    bottom: 5px;
    position: relative;
  }

  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 2.5rem;
    font-size: 1rem;
    width: fit-content;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

export default Filters;
