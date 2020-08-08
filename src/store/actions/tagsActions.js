import { TagService } from "../../services/tag";

//Action names
export const FETCH_TAGS = 'FETCH_TAGS'

export const fetchTags = (excludes = []) => {
    return dispatch => {
        TagService.getTags(excludes)
            .then(
                result => { 
                    if(result){
                        dispatch({
                            type: FETCH_TAGS,
                            payload: result
                        });
                    }
                }
            );
    };
}