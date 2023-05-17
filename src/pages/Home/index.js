const cookies = document.cookie.split(';').map((i) => i.trim().split('='))
const accessToken = cookies.find((c) => c[0] === 'access_token')?.[1]

function generatePanel() {
  document.querySelector('.panel-global-dlv')?.remove()
  const panelHTML = `
    <div class="panel-global-dlv">
      <style>
        p {
          margin-bottom: 0px;
        }
        .dlv_box{
          overflow-y: auto;
        }
        .dlv_panel_wrapper{
          opacity: 0;
          transition: all .25s ease;
          overflow: hidden;
        }
        .shown{
          opacity: 1!important;
          pointer-events: all;
        }
        input[type='text']{
          border-radius: 8px;
          height: 35px;
          padding: 8px 13px;
          outline: 1px solid #555;
          border: none;
        }
        button{
          border-radius: 8px;
          outline: 1px solid #555!important;
          padding: 0px 13px;
          height: 35px;
          margin-left: 5px;
        }
        button:hover{
          background: #eee
        }
        textarea{
          width: 100%;
          height: 300px;
          padding: 5px 12px;
        }
        .stores-list {
          display: grid;
          grid-auto-flow: row;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
          padding: 10px;
        }
        .stores-list li {
          display: flex;
          align-items: center;
          height: 20px;
          gap: 10px;
      }
      .stores-list li label{
        margin-bottom: 0;
      }
      </style>
      <div class="dlv_panel_wrapper shown" style="position:fixed; background: #00000011; width: 100%; height: 100%; backdrop-filter: blur(3px); padding: 50px 100px; z-index: 99999999999999; user-select:none;">
        <div class="dlv_box" style="background: white; padding: 25px 40px; border-radius: 16px; box-shadow: 0 0px 47px 1px #00000044; height: 100%">
          <h2>Resumo por período</h2>
          <hr>
          <input type="text" class="period-input" placeholder="Ex: 2023-05" />
          <div>
          <br>
            <h3>Selecione as lojas desejadas para extrair os dados desse período.</h3>
            <ul class="stores-list">
              <li>Carregando...</li>
            </ul>
          </div>
          <button class="process">Obter resultados</button>

          <div class="processing">
            <p>Período selecionado: <span class="current-date-period">Carregando...</span></p>
            <p>Loja atual: <span class="current-store">Carregando...</span></p>
            <p>Status: <span class="current-status">Carregando...</span></p>
          </div>
          <div class="result">
          <textarea></textarea>
          </div>
        </div>
      </div>
      </div>
    `

  document.body.insertAdjacentHTML('afterbegin', panelHTML)
  const panel = document.querySelector('.dlv_panel_wrapper')
  const porcessButton = document.querySelector('button.process')
  const period = panel.querySelector('.period-input')
  const storesList = panel.querySelector('.stores-list')

  const currents = {
    period: panel.querySelector('.current-date-period'),
    store: panel.querySelector('.current-store'),
    status: panel.querySelector('.current-status'),
  }

  window.setCurrent = (key, value) => (currents[key].textContent = value)
  getLojas()

  porcessButton.addEventListener('click', completeExtract)
}

generatePanel()

async function completeExtract() {
  const getSelectedStores = () => {
    const storesList = document.querySelector('.stores-list')
    return [...storesList.querySelectorAll("li input[type='checkbox'][data-checked='true']")].map((cb) => ({
      uuid: cb.dataset.uuid,
      simpleName: cb.dataset.simpleName,
    }))
  }

  const period = document.querySelector('.period-input').value
  const storeUIds = getSelectedStores()

  batchGetRevenuesByPeriod(period, storeUIds)
}

async function baseFetch(url) {
  const req = await fetch(url, {
    headers: {
      accept: 'application/json, text/plain, */*',
      'accept-language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
      authorization: 'Bearer ' + accessToken,
      'sec-ch-ua': '"Google Chrome";v="113", "Chromium";v="113", "Not-A.Brand";v="24"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-site',
    },
    referrer: 'https://portal.ifood.com.br/',
    referrerPolicy: 'strict-origin-when-cross-origin',
    body: null,
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
  })

  const res = await req.json()
  return res
}

async function getLojas(qty = 40, page = 0, updateResult = true) {
  const offset = page * qty === 0 ? 0 : page * qty - qty
  const lojas = await baseFetch('https://portal-api.ifood.com.br/next-web-bff/user/restaurants?offset=' + offset + '&size=' + qty)

  const panel = document.querySelector('.dlv_panel_wrapper')
  const storesList = panel.querySelector('.stores-list')
  if (updateResult)
    storesList.innerHTML = lojas
      .map(
        (store, i) => `
        <li data-uuid="${store.uuid}">
          <input type="checkbox" data-uuid="${store.uuid}" data-simple-name="${store.simpleName}" id="dlvCB${i}" data-checked='false'/><label for="dlvCB${i}">${store.simpleName}</label>
        </li>
        `
      )
      .join('\n')
  storesList.querySelectorAll("input[type='checkbox']").forEach((cb) =>
    cb.addEventListener('click', (e) => {
      e.target.setAttribute('data-checked', e.target.checked)
    })
  )
  return lojas
}

async function getRevenuesByPeriod(storeUid, periodDate) {
  const period = await baseFetch(
    'https://portal-api.ifood.com.br/financial-bff/api/financial/v3/' + storeUid + '/revenues/periods?yearMonth=' + periodDate
  )
  return period
}

function checkDateFinishedWeek(date) {
  try {
    let now = Date.now()
    let dateSplitted = date.split('-').map((d) => Number(d))
    let finish = new Date(dateSplitted[0], dateSplitted[1] - 1, dateSplitted[2], 18)
    let hasReachedDate = finish.getTime() - now <= 0
    return hasReachedDate
  } catch (err) {
    return false
  }
}

function sortDates(pA, pB) {
  return new Date(pB.end.replace('-', '/')).getTime() - new Date(pA.end.replace('-', '/')).getTime()
}

async function getPeriodDetails(storeUid, periodId) {
  const periodDetails = await baseFetch(
    'https://portal-api.ifood.com.br/financial-bff/api/financial/v3/merchants/' + storeUid + '/payout/details?periodId=' + periodId
  )
  return periodDetails
}

async function getStoreSummary(storeUid, yearMonth) {
  const date = new Date()
  const day = String(date.getDate()).padStart(2, 0)
  const month = String(date.getMonth() + 1).padStart(2, 0)
  const year = date.getFullYear()

  const req = await baseFetch(
    `https://portal-api.ifood.com.br/financial-bff/api/financial/v2/merchant/${storeUid}/summary?yearMonth=${yearMonth}&date=${year}-${month}-${day}&scopes=BANK_SLIPS,DAILY_SUMMARY,SCHEDULED_TRANSFERS`
  )
  return req
}

async function batchGetRevenuesByPeriod(periodDate, lojas) {
  if (!periodDate) return console.warn('Insira a data', periodDate)
  window.setCurrent('period', periodDate)

  const data = {}

  for (let loja of lojas) {
    const { uuid, simpleName } = loja
    window.setCurrent('store', simpleName)
    window.setCurrent('status', 'Obtendo compras no voucher')

    const summary = await getStoreSummary(uuid, periodDate)

    data[uuid] = { validRevenues: { d30: [], pix: [] }, storeName: simpleName }

    window.setCurrent('status', 'Obtendo lançamentos do período')
    const revenues = await getRevenuesByPeriod(uuid, periodDate)
    const { entries } = revenues

    let { DEFAULT_D30: d30, PIX_PAYMENT_PLAN: pix } = entries

    d30 = d30.filter((p) => checkDateFinishedWeek(p.end))
    pix = pix.filter((p) => checkDateFinishedWeek(p.end))

    d30 = [d30.sort(sortDates)[0]]
    pix = [pix.sort(sortDates)[0]]

    for (let period of d30) {
      window.setCurrent('status', 'Obtendo detalhes do período (normais) — ' + period.init + ' à ' + period.end)
      const periodDetails = await getPeriodDetails(uuid, period.id)
      period.details = periodDetails
    }
    for (let period of pix) {
      window.setCurrent('status', 'Obtendo detalhes do período (PIX) — ' + period.init + ' à ' + period.end)
      const periodDetails = await getPeriodDetails(uuid, period.id)
      period.details = periodDetails
    }
    data[uuid].validRevenues.d30 = d30
    data[uuid].validRevenues.pix = pix
    data[uuid].summary = summary
  }

  window.setCurrent('status', 'Processando dados...')
  window.setCurrent('store', '—')

  return processDada(data)
}

function processDada(data) {
  let dataArr = []

  const entries = Object.entries(data).map(([store, values]) => {
    const { validRevenues } = values
    const d30 = validRevenues.d30
    const pix = validRevenues.pix

    const weekRevenues = {
      d30: d30.reduce(
        (acc, cur) => {
          // return {totalAmount: acc.totalAmount + cur., otherAmount: }
        },
        {
          totalAmount: 0,
          otherAmout: 0,
        }
      ),
    }

    const newPix = pix.map((period) => ({
      ...period,
      summary: {
        totalAmount: period.details.totalAmount.value,
        otherAmount: period.details.others.totalAmount.value,
        totalMinusOther: period.details.totalAmount.value - period.details.others.totalAmount.value,
      },
    }))

    dataArr.push({ ...values, storeId: store, validRevenues: { d30: newD30, pix: newPix } })
  })
  console.log(dataArr) //const formatted = Object.fromEntries(entries) //const voucher = formatted.summary.billedOrders.externalLiability.value;
}
