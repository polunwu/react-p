const reducer = (state, action) => {
  if (action.type === 'CLEAR_CART') {
    return { ...state, cart: [] };
  }

  if (action.type === 'REMOVE') {
    return  {
      ...state,
      cart: state.cart.filter(item => item.id !== action.payload)
    }
  }

  if (action.type === 'INCREASE') {
    let tempCart = state.cart.map(item => {
      if (item.id === action.payload) {
        return { ...item, amount: item.amount + 1 }
      }
      return item
    })
    return { ...state, cart: tempCart }
  }

  if (action.type === 'DECREASE') {
    let tempCart = state.cart
      .map(item => {
        if (item.id === action.payload) {
          return { ...item, amount: item.amount - 1 }
        }
        return item
      }).filter(item => {
        return item.amount > 0
      })
    return { ...state, cart: tempCart }
  }

  if (action.type === 'GET_TOTALS') {
    let {total, amount} = state.cart.reduce((accumulator, item) => {
      const { price, amount } = item
      const itemTotal = price * amount

      accumulator.total += itemTotal
      accumulator.amount += amount
      return accumulator
    }, { total: 0, amount: 0 })

    total = parseFloat(total.toFixed(2)) 

    return { ...state, total, amount }
  }

  if (action.type === 'LOADING') {
    return { ...state, loading: true }
  }

  if (action.type === 'DISPLAY_ITEMS') {
    let newCart = action.payload
    return { ...state, cart: newCart, loading: false }
  }

  return state
}

export default reducer