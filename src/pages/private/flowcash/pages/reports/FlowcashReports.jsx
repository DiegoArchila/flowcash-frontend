import React from 'react'
import PropTypes from 'prop-types'

//ICONS
import { TbReportAnalytics } from "react-icons/tb";
import { MdAddBox } from "react-icons/md";

//COMPONENTS
import Pagination from '../../../../../components/pagination/Pagination';
import DataManager from '../../../../../components/DataManager/DataManager';
import DataManagerBody from '../../../../../components/DataManager/DataManagerBody';

function FlowcashReports() {

  // Config for DataManager
  const configDataManager = {
    title: "Reportes",
    icon: <TbReportAnalytics size={24} color='#FFFFFF' />
  }

  const HeadersDataManager = ["Fecha incial", "Fecha final", "Acciones"];


  return (
    <DataManager config={configDataManager} isLoadingData={false}>

      <DataManagerBody headerTable={HeadersDataManager} >


      </DataManagerBody>


      <Pagination
        key={"PaginationFlowcashReports" + Date.now()}
        length={1}
        queryFunction={() => { }}
        currentPage={1}
      />


    </DataManager>
  );

}

FlowcashReports.propTypes = {}

export default FlowcashReports


