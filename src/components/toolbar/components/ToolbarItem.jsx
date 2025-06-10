// React and React Router DOM imports
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Chakra UI ToolbarItem Component
import { Box, Flex, Text, Menu, MenuButton, useBreakpointValue } from "@chakra-ui/react";

/**
 * Represents an individual item in the application's toolbar.
 * 
 * This component displays an icon with optional text and can optionally open a menu (via Chakra UI).
 * It also allows click-based toggling of a full-size state and optional hover animation.
 * 
 * @component
 * 
 * @param {Object} props - The props for the ToolbarItem component.
 * @param {string} [props.ToolbarItemSubRoute] - The sub-route path used for navigation when the item is clicked (only used if `hasMenu` is false).
 * @param {string} props.ToolbarItemCaption - The caption text displayed alongside the icon (visible only if `isFullSize` is true).
 * @param {React.ElementType} props.ToolbarItemIcon - The icon component to render inside the toolbar item.
 * @param {number} [props.ToolbarItemIconSize=24] - Optional size of the icon component.
 * @param {boolean} props.isFullSize - Boolean flag to determine if the item shows both icon and caption or icon only.
 * @param {Function} [props.setFullSize] - Callback function triggered when the item is clicked to toggle full size state.
 * @param {React.ReactNode} [props.children] - Optional children, usually used for `<MenuList>` if `hasMenu` is true.
 * @param {boolean} [props.hasMenu=false] - Whether the item should render as a Chakra `Menu` component instead of a `Link`.
 * @param {boolean} [props.scaleOnhover=true] - Whether to apply a scaling animation on hover.
 * 
 * @returns {JSX.Element} The rendered ToolbarItem component.
 */

function ToolbarItem({
  ToolbarItemSubRoute,
  ToolbarItemCaption,
  ToolbarItemIcon,
  ToolbarItemIconSize = 24,
  isFullSize,
  setFullSize,
  children,
  hasMenu = false,
  scaleOnhover = true,
}) {

  const isViewMobile = useBreakpointValue({
    base: true,
    lg: false
  });

  const iconElement = (
    <Flex gap={3} flexWrap="nowrap" align="center">
      <ToolbarItemIcon size={ToolbarItemIconSize} color="#FFF0F5" />
      {isFullSize && (
        <Text 
          color="#FFF0F5"
          w={!isViewMobile ? '122px' : 'fit-content'}  
        >
          {ToolbarItemCaption}
        </Text>
      )}
    </Flex>
  );

  return (
    <Box
      onClick={(!hasMenu) ?
        (isFullSize && isViewMobile) ? setFullSize : null
        : 
        null}
      cursor="pointer"
      _hover={{ 
        fontWeight: "bold", 
        transform: scaleOnhover ? "scale(1.1)" : "none" 
      }}
    >
      {hasMenu ? (
        <Menu>
          <MenuButton as={Box}>{iconElement}</MenuButton>
          {children}
        </Menu>
      ) : (
        <Link to={ToolbarItemSubRoute}>{iconElement}</Link>
      )}
    </Box>
  );
}

ToolbarItem.propTypes = {
  ToolbarItemSubRoute: PropTypes.string,
  ToolbarItemCaption: PropTypes.string.isRequired,
  ToolbarItemIcon: PropTypes.elementType.isRequired,
  ToolbarItemIconSize: PropTypes.number,
  isFullSize: PropTypes.bool.isRequired,
  setFullSize: PropTypes.func, 
  children: PropTypes.node,
  hasMenu: PropTypes.bool,
  scaleOnhover: PropTypes.bool,
};

export default ToolbarItem;
