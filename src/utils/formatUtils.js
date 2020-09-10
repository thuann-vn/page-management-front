import * as moment from 'moment';
const numberFormatter = new Intl.NumberFormat('vi');
export default {
    dateFormat: (date, format = 'DD/MM/yyyy, hh:mm') => {
        if(date){
            return new moment(new Date(date)).format(format);
        }
        return '';
    }
}