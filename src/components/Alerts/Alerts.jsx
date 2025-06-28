import React from 'react';
import PropTypes from 'prop-types';

// Chakra UI
import {
    Box,
    Alert,
    AlertTitle,
    AlertDescription,
    useBreakpointValue,
} from '@chakra-ui/react';

// Icons
import { FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import { TfiInfoAlt } from 'react-icons/tfi';
import { PiWarningLight } from 'react-icons/pi';

/**
 * Alerts component for displaying styled alert messages based on status.
 *
 * This component renders a Chakra UI `Alert` with a dynamic icon and color scheme,
 * depending on the `status` prop. It is responsive and adjusts the icon size
 * based on the current screen breakpoint using Chakra's `useBreakpointValue`.
 * The design places the icon next to the title in a flexible column layout.
 *
 * @component
 * @example
 * <Alerts
 * status="error"
 * title="Error de inicio de sesión"
 * description="Verifica tu email y contraseña."
 * />
 *
 * @param {object} props - Props passed to the component
 * @param {'error' | 'success' | 'info' | 'warning'} props.status - Type of alert, determines icon and color.
 * @param {string} props.title - Main title of the alert (bold text).
 * @param {string} props.description - Descriptive text under the title.
 *
 * @returns {JSX.Element} A responsive, styled alert component.
 */
function Alerts({ status, title, description }) {

    // Define a mapping for alert styles based on status
    const alertStyles = {
        error: {
            IconComponent: FiAlertCircle,
            iconColor: '#e53e3e',
            bgColor: 'error.50',
            titleColor: 'error.700',
        },
        success: {
            IconComponent: FiCheckCircle,
            iconColor: '#38a169',
            bgColor: 'success.50',
            titleColor: 'success.700',
        },
        info: {
            IconComponent: TfiInfoAlt,
            iconColor: '#3182ce',
            bgColor: 'info.50',
            titleColor: 'info.700',
        },
        warning: {
            IconComponent: PiWarningLight,
            iconColor: '#dd6b20',
            bgColor: 'warning.50',
            titleColor: 'warning.700',
        },
    };

    // Get the specific styles for the current status, with a fallback to 'info'
    const currentStyles = alertStyles[status] || alertStyles.info;

    // icon size
    const iconSize = "24px"; 

    // Create the icon element
    const IconElement = (
        <currentStyles.IconComponent color={currentStyles.iconColor} size={iconSize} />
    );

    return (
        <Alert
            status={status}
            borderRadius="md"
            mb={4}
            display="flex"
            flexDirection="column" // Alerts stack content vertically
            gap={2} // Reduced gap for a tighter look, adjust as needed
            bgColor={currentStyles.bgColor} // Custom background color
            px={4} // Horizontal padding
            py={3} // Vertical padding
        >
            <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                width="100%"
            >
                <AlertTitle color={currentStyles.titleColor} flex="1" mr={2} fontFamily={'heading'}>
                    {title}
                </AlertTitle>
                <Box minW={iconSize}> {/** Icon */}
                    {IconElement}
                </Box>
            </Box>
            <Box width="100%">
                <AlertDescription
                    color="text.paragraphs" 
                    fontSize={useBreakpointValue({ base: 'sm', md: 'md' })}
                    fontFamily={'paragraphs'} // Ensure this font is loaded/available
                >
                    {description}
                </AlertDescription>
            </Box>
        </Alert>
    );
}

Alerts.propTypes = {
    status: PropTypes.oneOf(['error', 'success', 'info', 'warning']).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

export default Alerts;