import React from 'react'
import PropTypes from 'prop-types'

//Components
import InvoicesLayout from './layout/InvoicesLayout'
import InConstruction from '../../../components/informative/InConstruction/InConstruction'

function Invoices(props) {
  return (
    <InvoicesLayout>
      <InConstruction />
    </InvoicesLayout>
  )
}

export default Invoices;
