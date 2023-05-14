class Cart {
  #cartItems = []
  #checkoutURI = 'https://seguro.keepdog.store/r/'
  constructor() {
    try {
      this.#renderCartBox()
      const storage = localStorage.getItem('cart')

      this.#cartItems = storage
        ? JSON.parse(
            decodeURI(atob(decodeURI(localStorage.getItem('cart') || '{}')))
          )
        : []
      document
        ?.querySelector('#cartToggle')
        ?.addEventListener('click', () => this.#toggleCart(true))
      document
        ?.querySelector('#cart-box .cb-mask')
        ?.addEventListener('click', this.#toggleCart)
      document
        ?.querySelector('#cart-box #continueShop')
        ?.addEventListener('click', this.#toggleCart)
      document
        ?.querySelector('#goCheckout')
        ?.addEventListener('click', (e) => this.#close(e))
      document
        ?.querySelector('.cb-header .close-btn')
        ?.addEventListener('click', this.#toggleCart)

      // console.log("i", this.#cartItems);
      this.fillCartBox()

      $('.cart-toggle-qty').innerText = this.getTotalCount()
    } catch (error) {
      console.error('CART UNSET', error)
    }
  }

  #renderCartBox() {
    document?.body?.insertAdjacentHTML(
      'beforeend',
      `
    <div id="cart-box">
      <div class="cb-mask"></div>
      <div class="cb-content">

        <div class="cb-header">
          <div class="close-btn"></div>
          <h3>SUA SACOLA</h3>
          <span>ICO</span>
        </div>

        <div class="cb-products">
          <ul class="products scroller medium squared">
          </ul>
        </div>

        <div class="cb-footer scroller medium squared">
        <div class="cb-subtotals"><span>Subtotal:</span><span class="value"></span></div>
        <div class="cb-discount"><span>Descontos:</span><span class="value"></span></div>
        <div class="cb-freight"><span>Frete:</span><span class="value"></span></div>
        <div class="cb-totals"><span>Total:</span><span class="value"></span></div>
        <button id="continueShop" class="hoverable">Continuar comprando</button>
        <button id="goCheckout" class="hoverable">Finalizar Compra</button>
        <p style="font-size: .75rem; text-align:center; margin-top:10px; color:#333">Cupons podem ser aplicados na próxima etapa.</p>
        </div>

      </div>
    </div>
    `
    )

    $('.cb-products .products').addEventListener('click', (e) => {
      const itemID = e?.target?.closest('li.item')?.dataset?.id
      // Remove
      if (e.target.classList.contains('item-remove-btn')) {
        const item = e?.target?.parentElement
        item.style.right = '111%'
        item.style.height = item.offsetHeight + 'px'
        item.offsetHeight
        item.style.height = '0px'
        item.style.paddingBottom = '0px'
        item.style.marginBottom = '-1px'
        this.#remove(itemID)
        setTimeout(() => item?.remove(), 800)
      }

      // Plus
      if (e.target.classList.contains('plus')) {
        const item = e?.target?.parentElement
        const qtyIndicator = item?.querySelector('.qty-indicator')
        if (parseInt(item.querySelector('.qty-indicator').innerHTML) < 10) {
          qtyIndicator.classList.add('blink')
          setTimeout(() => qtyIndicator.classList.remove('blink'), 250)
          qtyIndicator.innerHTML = parseInt(qtyIndicator.innerHTML) + 1
          qtyIndicator.dataset.qty = parseInt(qtyIndicator.innerHTML)
          this.#updateCart(itemID, { qty: qtyIndicator.dataset.qty })
        }
      }

      // Minus
      if (e.target.classList.contains('minus')) {
        const item = e?.target?.parentElement
        const qtyIndicator = item.querySelector('.qty-indicator')
        if (parseInt(item.querySelector('.qty-indicator').innerHTML) > 1) {
          qtyIndicator.classList.add('blink')
          setTimeout(() => qtyIndicator.classList.remove('blink'), 250)
          qtyIndicator.innerHTML = parseInt(qtyIndicator.innerHTML) - 1
          qtyIndicator.dataset.qty = parseInt(qtyIndicator.innerHTML)
          this.#updateCart(itemID, { qty: qtyIndicator.dataset.qty })
        }
      }
    })
  }

  fillCartBox() {
    this.#generateCartData()
    let cartHTML = ''
    if (this.#cartItems.length === 0) {
      cartHTML = `
      <div class="empty-cart">
        <svg class="mb15 mt15" viewBox="0 0 27 24" width="54" height="48" role="presentation">
          <g transform="translate(0 1)" stroke-width="2" stroke="#000000dd" fill="none" fill-rule="evenodd">
            <circle stroke-linecap="square" cx="11" cy="20" r="2"></circle>
           <circle stroke-linecap="square" cx="22" cy="20" r="2"></circle>
            <path d="M7.31 5h18.27l-1.44 10H9.78L6.22 0H0"></path>
          </g>
        </svg>
          <h3>Sua sacola está vazia</h3>
          <p>Adicione produtos a sua sacola para continuar comprando.</p>
          <button class="hoverable default mt15 closecartbtn">Continuar comprando</button>
        </div>
      </div>
      `
      $('.cb-products .products').innerHTML = cartHTML
      $('.cb-content').style.gridTemplateRows = '62px auto 0'
      $('.closecartbtn').addEventListener('click', () => this.#toggleCart())
      return
    }

    $('.cb-content').style.gridTemplateRows = '62px auto auto'
    this.#cartItems.forEach((item) => {
      let variations = '<p class="cb-item-variation">'
      item?.variations?.forEach((variation, varIndex) => {
        variations += `${variation.name}: <strong>${variation.value}</strong>${
          varIndex + 1 < item?.variations.length ? ' / ' : ''
        }`
      })
      variations += '</p>'
      cartHTML += `
    <li class="item" data-id="${item?.id || -1}">
       <div class="item-img">
         <img src="${
           item?.images?.data?.[0]?.small?.url ||
           'https://via.placeholder.com/65'
         }" draggable="false">
       </div>
       <div class="item-info">
         <h4 class="item-title">${item?.title}</h4>
         ${variations}
         <span class="item-old-price">${
           item?.price_sale / item?.price_discount > 1
             ? '<span>R$ ' + item?.price_sale.toFixed(2).replace('.', ',')
             : ''
         }${
        item?.price_sale / item?.price_discount > 1
          ? '</span> -' +
            Math.floor(
              Math.abs(item?.price_discount / item?.price_sale - 1) * 100
            ) +
            '%</span>'
          : '</span>'
      }</span>
         <span class="item-price">R$ ${item?.price_discount
           .toFixed(2)
           .replace('.', ',')}</span>
         <span class="item-shipping">Frete: A calcular
         ${
           ''
           //  item?.shipping_price == "0.00"
           //    ? "<span style='color: #00a650'>Grátis</span>"
           //    : item?.shipping_price
           //    ? "R$ " + item?.shipping_price?.replace(".", ",")
           //    : "A calcular"
         }
           </span>
         <div class="qty-holder">
         <button class="cb-qtybtn minus hoverable">-</button><span class="qty-indicator" data-qty="${
           item?.qty || 1
         }">${
        item?.qty || 1
      }</span><button class="cb-qtybtn plus hoverable">+</button>
         </div>
       </div>
       <div class="item-remove-btn">
       </div>
     </li>
    `
    })
    $('.cb-products .products').innerHTML = cartHTML
  }

  #toggleCart(forceLock = false) {
    if ($('#categories').classList.contains('show')) $('.menu-toggler').click()
    $('#cart-box').classList.toggle('open')
    document?.body?.classList?.toggle('locked')
    if (forceLock === true && !document?.body?.classList?.contains('locked'))
      document?.body?.classList?.add('locked')
    $('.cb-products').classList.add('loading-ph')
    setTimeout(() => $('.cb-products').classList.remove('loading-ph'), 300)
  }

  add(item) {
    // console.log(item);
    const id = item?.id
    const found = this.#cartItems.find((i) => i.id == item.id)
    if (found) {
      const qty = Number(found?.qty) || 1
      const newQty =
        (Number(item?.qty) + qty || item?.qty) > 10
          ? 10
          : Number(item?.qty) + qty || item?.qty
      this.#updateCart(id, { qty: newQty })
    } else {
      this.#cartItems.push({
        ...item,
      })
      this.#updateStorage()
    }
    this.fillCartBox()
    this.#toggleCart()
  }

  #remove(id) {
    if (!id) return
    if (this.#cartItems.find((i, index) => i.id == id)) {
      this.#cartItems = this.#cartItems.filter((i) => i.id != id)
      this.#updateStorage()
    }
    if (this.#cartItems.length === 0)
      return setTimeout(() => this.fillCartBox(), 600)
  }

  #updateCart(id, fields) {
    // console.log("Updating", id, fields);
    this.#cartItems.forEach((i, index) => {
      if (i.id == id) {
        Object.entries(fields).forEach(([key, value]) => {
          i[key] = value
        })
      }
    })
    this.#updateStorage()
  }

  clear() {
    this.#cartItems = []
    this.#updateStorage()
  }

  getTotalCount() {
    let qty = 0
    this.#cartItems.forEach((item) => {
      qty += Number(item?.qty) || 1
    })
    return qty || 0
  }

  #updateStorage() {
    localStorage?.setItem(
      'cart',
      btoa(encodeURI(JSON?.stringify(this.#cartItems)))
    )
    this.#generateCartData()
    this.#generateToken()

    const subtotalSpan = $('.cb-subtotals .value')
    const discountSpan = $('.cb-discount .value')
    const freightSpan = $('.cb-freight .value')
    const totalsSpan = $('.cb-totals .value')
    const qtyIndicator = $('.cart-toggle-qty')

    ;[subtotalSpan, discountSpan, freightSpan, totalsSpan].forEach((span) => {
      span.classList.add('blink-delay')
      setTimeout(() => span.classList.remove('blink-delay'), 500)
    })

    qtyIndicator.innerText = this.getTotalCount()
  }

  #generateCartData() {
    const getFullPrice = () => {
      const total = this.#cartItems.reduce((acc, item) => {
        return acc + item?.price_sale * item?.qty
      }, 0)
      return Number(total)
    }

    const getShipping = () => {
      const total = this.#cartItems.reduce((acc, item) => {
        return acc + item?.shipping_price * item?.qty
      }, 0)
      // return Number(total);
      return 0
    }

    const getDiscount = () => {
      const total = this.#cartItems.reduce((acc, item) => {
        return acc + (item?.price_sale - item?.price_discount) * item?.qty
      }, 0)
      return Number(total)
    }

    const updateScreen = () => {
      const subtotalSpan = $('.cb-subtotals .value')
      const discountSpan = $('.cb-discount .value')
      const freightSpan = $('.cb-freight .value')
      const totalsSpan = $('.cb-totals .value')

      subtotalSpan.innerHTML =
        'R$ ' + getFullPrice()?.toFixed(2)?.replace('.', ',')
      discountSpan.innerHTML =
        '- R$ ' + getDiscount()?.toFixed(2)?.replace('.', ',')
      // freightSpan.innerHTML = getShipping() == 0 ? "<span style='color:#00a650'>Grátis</span>" : "R$ " + getShipping()?.toFixed(2)?.replace(".", ",");
      freightSpan.innerHTML = '<span>A calcular</span>'
      totalsSpan.innerHTML =
        'R$ ' +
        (getFullPrice() + getShipping() - getDiscount())
          .toFixed(2)
          ?.replace('.', ',')
    }

    updateScreen()

    return {
      subtotal: getFullPrice(),
      shipping: getShipping(),
      discount: getDiscount(),
      total: getFullPrice() - getDiscount() + getShipping(),
    }
  }

  #generateToken() {
    const str = btoa(encodeURI(JSON.stringify(this.#cartItems)))
    let arrayOfSplits = []
    Array.from({ length: 26 }, (group, index) => {
      const letter = String?.fromCharCode(65 + index).toLowerCase()
      arrayOfSplits[index] = str.split(letter) || [0]
    })

    arrayOfSplits.forEach((group, gI) => {
      arrayOfSplits[gI] =
        group.map((x) => (x = x?.[0] || '0'))?.join('')?.[8] || ''
    })

    arrayOfSplits = arrayOfSplits.join('')
    return arrayOfSplits
  }

  #close(e) {
    if (this.#cartItems.length === 0) return alert('Seu carrinho está vazio!')
    e?.target?.classList?.add('loading-ph', 'soft')
    let checkoutURI = this.#checkoutURI
    const itemCount = this.#cartItems.length
    this.#cartItems.forEach((item, index) => {
      if (item?.purchase_url) checkoutURI += item.purchase_url
      checkoutURI += `:${item.qty || 1}`
      if (index < itemCount - 1) checkoutURI += ','
    })
    return checkoutURI
  }
}

export default Cart
