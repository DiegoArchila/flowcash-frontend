//React
import PropTypes from 'prop-types'
import { useEffect, useState, Fragment } from 'react';
import './Pagination.css'

//Redux
import { useDispatch } from "react-redux";

//Chakra UI
import { Box, HStack, Divider, useBreakpointValue } from '@chakra-ui/react'

//Icons
import {
    MdOutlineKeyboardArrowLeft,
    MdOutlineKeyboardArrowRight,
    MdOutlineLastPage,
    MdOutlineFirstPage
} from "react-icons/md";


/**
 * Pagination Component
 * 
 * This component handles pagination for a list of items. It displays page numbers 
 * and navigation buttons to allow users to navigate between pages. The component 
 * dispatches a Redux action (queryFunction) to fetch data for the selected page.
 *
 * Props:
 * 
 * @param {number} length - The total number of items to paginate.
 * @param {function} queryFunction - A function that dispatches a Redux action to query the data based on the current page and count.
 * @param {number} [currentPage=1] - The current active page that is visually highlighted. Defaults to 1.
 * 
 * Internal State:
 * 
 * - indexPage: Tracks the currently selected page number.
 * - count: Determines the number of items per page. Default is set to 20.
 * - flag: Controls when to dispatch the queryFunction, preventing infinite rendering.
 * 
 * Features:
 * 
 * - First/Last page navigation
 * - Next/Previous page navigation
 * - Page numbers are dynamically rendered based on the total length and count of items per page.
 * - Page buttons are styled to indicate the currently active page.
 */
function Pagination({ length, queryFunction, currentPage }) {

    // Redux
    const dispatch = useDispatch();

    const [indexPage, setIndexPage] = useState(1);
    const [ItemsPerPage, setItemsPerPage] = useState(20);
    const [pagesPerWindows, setPagesPerWindows] = useState([]);

    const [flag, setFlag] = useState(false);

    //Sets the total amount pages for width screen
    const MAXCOUNTVISIBLE_FULL = 21;
    const MAXCOUNTVISIBLE_MD = 11;
    const MAXCOUNTVISIBLE_SD = 5;
    const MAXCOUNTVISIBLE_BASE = 3;

    const breakPointsForCountVisible = useBreakpointValue({
        base: MAXCOUNTVISIBLE_BASE,
        sm: MAXCOUNTVISIBLE_SD,
        md: MAXCOUNTVISIBLE_MD,
        lg: MAXCOUNTVISIBLE_FULL
    });

    useEffect(() => {

        // We obtain the total pages
        const totalPages = Math.ceil(length / ItemsPerPage);

        // We find the middle from total page for width window  and  we set the variable startPage
        const middlePoint = Math.ceil(breakPointsForCountVisible / 2);
        let startPage;

        if (currentPage > middlePoint) {

            startPage = Math.min(currentPage - middlePoint + 1, totalPages - breakPointsForCountVisible + 1);
            if (startPage<1){
                startPage=1;
            }

        } else {
            startPage = 1;
        }

        // We ensure that the visible pages do not exceed the total number of pages and update `pagesPerWindows`.
        const endPage = Math.min(startPage + breakPointsForCountVisible - 1, totalPages);
        setPagesPerWindows(Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i));

        if (flag) {

            dispatch(queryFunction(ItemsPerPage, indexPage));
            window.scrollTo({ top: 0, behavior: 'smooth' });

        } else {
            return;
        }

        setFlag(false);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [flag, indexPage, breakPointsForCountVisible]);


    return (

        <HStack
            direction={"row"}
            width={"100%"}
            h={"36px"}
            bgColor={'#ffffffff'}
            borderRadius="md"
            border={"1px"}
            borderColor={"#E2E8F0"}
            alignContent={"center"}
            justifyContent={"center"}
            gap={0}
            overflow={"hidden"}

        >

            {/**Create the count pages index */}

            {
                pagesPerWindows.map((page, i) => {

                    return (
                        <Fragment key={"index-" + i} >

                            {(i === 0) ?
                                <Divider orientation='vertical' color={"#FFFFFF"} h={"100%"} key={"divider-" + i} />
                                : null}

                            <Box
                                m={0}
                                key={i}
                                cursor={"pointer"}
                                h={"100%"}
                                w={"100%"}
                                maxW={"36px"}
                                alignContent={"center"}
                                justifyContent={"center"}
                                fontWeight={"bold"}
                                textAlign={"center"}
                                fontFamily={"button"}
                                color={page===currentPage ? "#003262" : "#FFFFFF"}
                                bgColor={page===currentPage ? "#FFFFFF" : "#0072BB"}
                                onClick={() => {

                                    setIndexPage(page);
                                    setFlag(true);

                                }}

                                _hover={{
                                    bgColor: "#003262",
                                    color: "#FFFFFF"
                                }}

                                _active={{
                                    bgColor: "#FFFFFF",
                                    color: "#2D3748"
                                }}
                            >
                                {page}
                            </Box>

                            <Divider orientation='vertical' color={"#FFFFFF"} h={"100%"} key={"divider2-" + i} />

                        </Fragment>
                    )
                })
            }


            <Box
                id='controls'
                display={"flex"}
                ml={"auto"}
                mr={3}
            >


                <Box
                    gap={2}
                    display={((currentPage - 1) <= 0) ? "none" : "flex"}
                    alignContent={"flex-start"}
                >
                    <Divider orientation='vertical' color={"#FFFFFF"} h={"100%"} />

                    <MdOutlineFirstPage
                        color='#FFFFFF'
                        size={"28px"}
                        cursor={"pointer"}
                        className='icon'
                        onClick={() => {
                            setIndexPage(1)
                            setFlag(true);
                        }}
                    />

                    <Divider orientation='vertical' color={"#FFFFFF"} h={"100%"} />

                    <MdOutlineKeyboardArrowLeft
                        color='#FFFFFF'
                        size={"28px"}
                        cursor={"pointer"}
                        className='icon'
                        onClick={() => {

                            if ((currentPage - 1) > 0) {
                                setIndexPage(currentPage - 1)
                                setFlag(true);
                            }
                        }}
                    />

                    {/* <Divider orientation='vertical' color={"#FFFFFF"} h={"100%"} /> */}

                </Box>

                {/** Controls next right page and to last page */}
                <Box
                    gap={2}
                    display={(currentPage === Math.ceil(length / ItemsPerPage)) ? "none" : "flex"}
                    flexDirection={"row-reverse"}>

                    <MdOutlineLastPage
                        color='#FFFFFF'
                        size={"28px"}
                        cursor={"pointer"}
                        className='icon'
                        onClick={() => {
                            setIndexPage(Math.ceil(length / ItemsPerPage));
                            setFlag(true);
                        }}
                    />

                    <Divider orientation='vertical' color={"#FFFFFF"} h={"100%"} />

                    <MdOutlineKeyboardArrowRight
                        color='#FFFFFF'
                        size={"28px"}
                        cursor={"pointer"}
                        className='icon'
                        onClick={() => {
                            setIndexPage(currentPage + 1);
                            setFlag(true);
                        }}
                    />

                    <Divider orientation='vertical' color={"#FFFFFF"} h={"100%"} />

                </Box>
            </Box>

        </HStack>
    )
}

Pagination.propTypes = {
    length: PropTypes.number.isRequired,
    queryFunction: PropTypes.func.isRequired,
    currentPage: PropTypes.number
}

export default Pagination;