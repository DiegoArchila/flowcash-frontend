import moment from "moment";

export const formatDate = {
    /**
     * return the date in format timezone, or iso to format
     * DD/MM/AAAA hh:mm:ss A
     * @param {String} date 
     */
    getDateFormatedLarge: (date) =>{
        return  moment(date).format("DD/MM/YYYY hh:mm:ss A");
    }
}