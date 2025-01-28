//REACT
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

//CHAKRA UI
import { Box, Flex, Text } from "@chakra-ui/react";

/**
 * Represents an individual item in the toolbar.
 * 
 * @param {Object} props - The component props.
 * @param {string} props.ToolbarItemSubRoute - The sub-route for the toolbar item link.
 * @param {string} props.ToolbarItemCaption - The caption text displayed for the toolbar item.
 * @param {React.ElementType} props.ToolbarItemIcon - The icon component for the toolbar item.
 * @param {number} [props.ToolbarItemIconSize=24] - The size of the toolbar item icon (default is 24).
 * @param {Object} props.isFullSize - Determines if the toolbar item should display the caption text.
 * 
 * @returns {JSX.Element} A toolbar item component.
 */
function ToolbarItem({
  ToolbarItemSubRoute,
  ToolbarItemCaption,
  ToolbarItemIcon,
  ToolbarItemIconSize = 24,
  isFullSize,
}) {
  return (
    <Box cursor={"pointer"}>
      <Link to={`${ToolbarItemSubRoute}`}>
        <Flex gap={3} flexWrap={"nowrap"}>
          <ToolbarItemIcon size={ToolbarItemIconSize} color="#FFF0F5" />
          {isFullSize ? (
            <Text color="#FFF0F5">{ToolbarItemCaption}</Text>
          ) : null}
        </Flex>
      </Link>
    </Box>
  );
}

ToolbarItem.propTypes = {
  ToolbarItemSubRoute: PropTypes.string.isRequired, // Required sub-route for the toolbar item.
  ToolbarItemCaption: PropTypes.string.isRequired, // Required caption text for the toolbar item.
  ToolbarItemIcon: PropTypes.elementType.isRequired, // Required React component for the toolbar icon.
  ToolbarItemIconSize: PropTypes.number, // Optional size of the toolbar item icon.
  isFullSize: PropTypes.object, // Optional flag to display the caption text.
};

export default ToolbarItem;