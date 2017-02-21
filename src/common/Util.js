/**
 * Created by eliasmj on 20/02/2017.
 */

const getDecimal = (dec)=> {
    return (dec <= 9 ? '0' + dec : dec);
}

const Util = {

    getCurrentDate: () => {

        let myDate = new Date();

        let d = myDate.getDate();
        let m = myDate.getMonth() + 1;
        let y = myDate.getFullYear();
        let h = myDate.getHours();
        let min =  myDate.getMinutes();
        let s =  myDate.getSeconds();

        return getDecimal(d) +
            '/' + getDecimal(m) +
            '/' + y + ' ' +
            getDecimal(h) +
            ':' + getDecimal(min) +
            ':' + getDecimal(s);
    }
}

export default Util;