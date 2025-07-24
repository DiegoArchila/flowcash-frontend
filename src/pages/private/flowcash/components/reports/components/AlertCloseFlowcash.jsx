import React from 'react'
import PropTypes from 'prop-types'

//Redux
import { useDispatch, useSelector } from "react-redux";
import { BalancePeriodThunks } from "../../../../../../store/slices/flowcash/balancePeriod/BalancePeriodThunks";

//Chakara UI
import { 
    Button,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    AlertDialogContent
} from '@chakra-ui/react';

function AlertCloseFlowcash({isOpen, onClose, cancelRef, onClosePeriod}) {

  // Redux
  const dispatch = useDispatch();
  const { isLoading: isLoadingBalancePeriod } = useSelector(state => state.balancePeriod);

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Cerrar período actual
            </AlertDialogHeader>

            <AlertDialogBody>
              ¿Estás seguro(a)? No podrás deshacer esta acción después.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button
                isDisabled={false} // You can add a condition to disable this button 
                colorScheme='red' 
                onClick={()=>{
                  dispatch(BalancePeriodThunks.createBalancePeriod());
                  onClose();
                  onClosePeriod();
                }} ml={3}>
                Cerrar Periodo
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

AlertCloseFlowcash.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onClosePeriod: PropTypes.func.isRequired,
  cancelRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any })
  ]).isRequired,
}

export default AlertCloseFlowcash;
