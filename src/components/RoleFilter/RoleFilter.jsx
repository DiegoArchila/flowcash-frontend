import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

/**
 * RoleFilter is a component that conditionally renders its children
 * based on whether the current user's role matches any of the allowed roles.
 *
 * @component
 * @param {Object} props
 * @param {string[]} props.roles - Array of allowed roles.
 * @param {React.ReactNode} props.children - Elements to render if the role matches.
 * @returns {React.ReactNode|null} The children if access is allowed, otherwise null.
 */
function RoleFilter({ roles=[], children }) {

    const { role } = useSelector((state) => state.user);

    if (!roles.includes(role.name)) {
        return null; // or you can return a message or redirect
    }

    return children;

}

RoleFilter.propTypes = {
    /** Array of roles allowed to view the children */
    roles: PropTypes.arrayOf(PropTypes.string).isRequired,

    /** React children to render if access is granted */
    children: PropTypes.node.isRequired,
}

export default RoleFilter;
