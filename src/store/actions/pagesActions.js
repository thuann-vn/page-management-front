import { PageService } from "../../services/pages";

//Action names
export const FETCH_PAGES = 'FETCH_PAGES'
export const fetchPages = () => {
    return dispatch => {
        PageService.getPages()
            .then(
                result => { 
                    if(result){
                        dispatch({
                            type: FETCH_PAGES,
                            payload: result
                        });
                    }
                }
            );
    };
}