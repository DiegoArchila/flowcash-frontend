import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Redux
import { useDispatch, useSelector } from "react-redux";
import { BalancePeriodThunks } from "../../../../../../store/slices/flowcash/balancePeriod/BalancePeriodThunks";

// Chakra UI
import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogContent
} from '@chakra-ui/react';

import Alerts from '../../../../../../components/Alerts/Alerts';

function AlertCloseFlowcash({ isOpen, onClose, cancelRef }) {
  const [status, setStatus] = useState(null);

  const dispatch = useDispatch();
  const { isLoading: isLoadingBalancePeriod, errors } = useSelector(state => state.balancePeriod);

  // Limpiar estado cuando se cierra el modal
  useEffect(() => {
    if (!isOpen) {
      setStatus(null);
    }
  }, [isOpen]);

  const handleCreateBalancePeriod = async () => {
    try {
      const resultAction = dispatch(BalancePeriodThunks.createBalancePeriod());

      if (resultAction.meta?.requestStatus === 'fulfilled') {
        setStatus("success");
        onClose();
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
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
            {status === "error" && (
              <Alerts
                status="error"
                description={errors?.message || "Ha ocurrido un error al cerrar el período. Es posible que ya esté cerrado o que haya un problema con los datos."}
                title="Error"
                key={status}
              />
            )}
            {status === "success" && (
              <Alerts
                status="success"
                description="El período ha sido cerrado exitosamente."
                title="Éxito"
                key={status}
              />
            )}
            {status === null && (
              <p>¿Estás seguro(a)? No podrás deshacer esta acción después.</p>
            )}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancelar
            </Button>
            {status !== "success" && (
              <Button
                type='button'
                isLoading={isLoadingBalancePeriod}
                loadingText="Cerrando periodo..."
                colorScheme='red'
                onClick={handleCreateBalancePeriod}
                ml={3}
              >
                Cerrar período
              </Button>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

AlertCloseFlowcash.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  cancelRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any })
  ]).isRequired,
};

export default AlertCloseFlowcash;
