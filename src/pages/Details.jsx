import React from 'react';
import propTypes from 'prop-types';
import addToCart from '../services/addToCart';
import FormReview from '../components/FormReview';

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      price: '',
      thumbnail: '',
      products: [],
    };
  }

  componentDidMount() {
    this.getInfo();
  }

  getInfo = async () => {
    const { match: { params: { id } } } = this.props;
    const response = await fetch(`https://api.mercadolibre.com/items/${id}`);
    const item = await response.json();
    this.setState({
      title: item.title,
      price: item.price,
      thumbnail: item.thumbnail,
      products: item,
    });
  }

  addToCartFunc = async () => {
    const { products } = this.state;
    addToCart(products);
  }

  render() {
    const { title, price, thumbnail } = this.state;
    const { match: { params: { id } } } = this.props;
    return (
      <div>
        <div data-testid="product-detail-name">
          <h1>{ title }</h1>
          <p>{ price }</p>
          <img src={ thumbnail } alt={ title } />
        </div>
        <button
          type="button"
          id={ id }
          data-testid="product-detail-add-to-cart"
          onClick={ this.addToCartFunc }
        >
          Adicionar ao carrinho
        </button>
        <FormReview id={ id } />
      </div>
    );
  }
}

Details.propTypes = {
  arrProdutos: propTypes.shape({
    id: propTypes.string,
    title: propTypes.string,
    price: propTypes.string,
    thumbnail: propTypes.string,
  }),
}.isrequired;

export default Details;
