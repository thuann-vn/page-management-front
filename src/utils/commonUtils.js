export default {
    getActivityStr:(activity)=>{
        var name = '';
        switch(activity.action){
            case 'CREATED_ORDER':
                name = `Lên đơn mua hàng #${activity.data.code}`;
                break;
        }

        return name;
    }
}