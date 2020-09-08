const numberFormatter = new Intl.NumberFormat('vi');
export default {
    getActivityStr:(activity)=>{
        var name = '';
        switch(activity.action){
            case 'CREATED_ORDER':
                name = `Mua hàng #${activity.data.code} (${numberFormatter.format(activity.data.total)}₫)`;
                break;
        }

        return name;
    }
}