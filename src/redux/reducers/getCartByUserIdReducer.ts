import { CartProps } from '../../type/Cart/CartProps';
import { CartByUserIdActionTypes, FETCH_CARTBYUSERID_FAILURE, FETCH_CARTBYUSERID_REQUEST, FETCH_CARTBYUSERID_SUCCESS } from '../actions/getCartByUserId';

export interface CartByUserIdState {
  loading: boolean;
  error: string | Error;
  cartByUserId: CartProps | null;
}

const initialState: CartByUserIdState = {
  loading: false,
  error: '',
  cartByUserId: null,
};

export default function getCartByUserIdReducer(
  state = initialState,
  action: CartByUserIdActionTypes
): CartByUserIdState {
  switch (action.type) {
    case FETCH_CARTBYUSERID_REQUEST:
      console.log('Fetching cart by user ID');
      return {
        ...state, 
        loading: true,
      };
    case FETCH_CARTBYUSERID_SUCCESS:
      console.log('Successfully fetched cart by user ID');
      return {
        ...state,
        loading: false,
        cartByUserId: action.payload,
      };
    case FETCH_CARTBYUSERID_FAILURE:
      console.log('Failed to fetch cart by user ID');
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}
