import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

import './styles.css';

export default class Main extends Component {

   state = {
      products: [],
      productInfo: {},
      page: 1
   }

   //metodo executa uma acao logo que o componente e exibido em tela
   componentDidMount(){
      this.loadProduts();
   }

   loadProduts = async (page = 1) => {
      //endereco que vem apos a baseURL com a /
      const response = await api.get(`/products?page=${page}`);

      //desestrturacao 
      const { docs, ...productInfo } = response.data;

      this.setState({ products: docs, productInfo, page });
      //console.log(response.data.docs);
   }

   prevPage = () => {
      const { page, productInfo } = this.state;

      if(page === 1 ) return;

      const pageNumber = page - 1;

      this.loadProduts(pageNumber);

   }
   nextPage = () => {
      const { page, productInfo } = this.state;

      if(page === productInfo.pages) return;

      const pageNumber = page + 1;

      this.loadProduts(pageNumber);
   }


   render(){
      //desestrturacao de this.state.products.map para products.map
      const { products, page, productInfo } = this.state;

      //return <h1>Total de produtos { this.state.products.length }</h1>
      return (
         <div className="product-list">
            { /* ABRE_CHAVE this.state.products.map(product => ( */ }
            {products.map(product => (
               <article key={product._id}>
                  <strong>{ product.title }</strong>
                  <p>{ product.description }</p>
                  <p> <b>ID do produto:</b> { product._id }</p>
                  <Link to={`/products/${product._id}`}>Acessar</Link>
               </article>
            ))}
            <div className="actions">
               <button disabled={page===1} onClick={this.prevPage}>Anterior</button>
               <button disable={page===productInfo.pages} onClick={this.nextPage}>Próximo</button>
            </div>
         </div>
      );
   }
}