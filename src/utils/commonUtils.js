const numberFormatter = new Intl.NumberFormat('vi');
export default {
    getActivityStr: (activity) => {
        var name = '';
        switch (activity.action) {
            case 'CREATED_ORDER':
                name = `Mua hàng #${activity.data.code} (${numberFormatter.format(activity.data.total)}₫)`;
                break;
        }

        return name;
    },
    getOrderStatusStr: (status) => {
        var name = '';
        switch (status) {
            case 20:
                name = `Đang giao hàng`;
                break;
            case 30:
                name = `Đã nhận hàng`;
                break;
            case 40:
                name = `Khách hủy`;
                break;
            case 50:
                name = `Trả hàng`;
                break;
            default:
                name = `Mới tạo`;
                break;
        }

        return name;
    },
    getOrderStatusClass: (status) => {
        var name = '';
        switch (status) {
            case 20:
                name = `dark`;
                break;
            case 30:
                name = `info`;
                break;
            case 40:
                name = `warning`;
                break;
            case 50:
                name = `danger`;
                break;
            default:
                name = `light`;
                break;
        }
        return name;
    }
}