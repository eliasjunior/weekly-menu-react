/**
 * Created by eliasmj on 20/02/2017.
 */
const getDecimal = (dec)=> {
    return (dec <= 9 ? '0' + dec : dec);
}

const mealDetail = (label, icon) => {

    return {
        label : () => {
            return label;
        },
        icon : () => {
            return icon; 
        }
    } 

}

const meal = (name, mealDetail) => {

    return {
        name: () => {
            return name;
        },
        label: () => {
            return mealDetail.label()
        },
        icon: () => {
            return mealDetail.icon()
        }
    }
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
    },

    getMainMealList: () => {
        return [
            meal("fish", mealDetail('Fish','fish.png')),
            meal("meat",  mealDetail('Meat','meat-1.png')),
            meal("poultry",mealDetail('Poultry','chicken-3.png')),
            meal("veg", mealDetail('Vegetarian', 'veg-5.png')),
            meal("pasta", mealDetail('Pasta', 'pasta-1.png')),
            meal("side", mealDetail('Side', 'veg-5.png')),
            meal("groceries", mealDetail('Groceries', 'groceries-1.png')),
            meal("other", mealDetail('Other', 'images.png'))
        ]
    }
}

export default Util;