import React from 'react'
import PropTypes from 'prop-types'

//Components
import ProductsLayout from './layout/ProductsLayout'
import InConstruction from '../../../components/informative/InConstruction/InConstruction'

function Products(props) {
  return (
    <ProductsLayout>
      <InConstruction />
    </ProductsLayout>
  )
}

Products.propTypes = {}

export default Products
