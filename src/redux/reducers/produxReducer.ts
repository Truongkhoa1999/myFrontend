import { AnyAction } from 'redux'
import { Produx, ProduxProps } from '../../Data/Produx'

const initialState: ProduxProps[] = Produx.map((p) => ({ ...p, status: { isRemoved: false } }))
export const produxReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case REMOVE_PRODUX:
      const removeProdux = state.map((product) =>
        product.id == action.payload.id ? { ...product, status: { isRemoved: true } } : product
      )
      return removeProdux
    case UNREMOVE_PRODUX:
      const unrenewProdux = state.map((product) =>
        product.id == action.payload.id ? { ...product, status: { isRemoved: false } } : product
      )

      return unrenewProdux
    case ADD_PRODUX:
      return [
        ...state,
        {
          ...action.payload,
          status: {
            isRemoved: false,
            isArrival: true,
          },
        },
      ]
    default:
      return state
  }
}

// ACTION TYPE AND CONST
export const REMOVE_PRODUX = 'REMOVE_PRODUX'
export const UNREMOVE_PRODUX = 'UNREMOVE_PRODUX'
export const ADD_PRODUX = 'ADD_PRODUX'
export const removeProdux = (id: number) => ({
  type: REMOVE_PRODUX,
  payload: { id },
})

export const unremoveProdux = (id: number) => ({
  type: UNREMOVE_PRODUX,
  payload: { id },
})

export const addProdux = (product: ProduxProps) => ({
  type: ADD_PRODUX,
  payload: product,
})
